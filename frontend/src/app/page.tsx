'use client';
import MiFooter from "@/Component/Footer";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import axiosInstanceClient from "./utils/axios";
import { useState } from "react";
import { getAxiosErrorMessage } from "@/app/utils/errorHandler";
import { useRouter } from "next/navigation";
import { Shortlink } from "../types/shortlinks-types";
import ListLinksHome from "@/Component/ListLinksHome";


export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [shortLink, setShortLink] = useState('');
  const [longLink, setLongLink] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [links, setLinks] = useState<Shortlink[]>([]);


  const handelShorten = async () => {
    setError('');
    setLongLink('');
    if (!session) {
      router.push('/Login');
      return;
    }
    if (!longLink) {
      setError('Please enter a long link');
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstanceClient.post('/eventlinks', {
        url: longLink,
      });
      setShortLink(response.data.shortLink);
    } catch (error) {
      setError(getAxiosErrorMessage(error));
    } finally {
      handelListLinks();
      setLoading(false);
    }
  }

  const handelListLinks = async () => {
    if (!session) {
      return;
    }
    axiosInstanceClient.get('/eventlinks')
      .then(response => {
        setLinks(response.data);
      })
      .catch(error => {
        setError(getAxiosErrorMessage(error));
      })
  }

  useEffect(() => {
    if (!session) {
      return;
    }
    handelListLinks();
  }, [session])


  return (
    <main>
      <section className="with-background-pattern flex min-h-screen flex-col items-center justify-center gap-5 p-8 pt-32 md:p-24 md:pt-32 @container bg-[var(--bg-primary)] transition-all duration-300" >
        <div className="flex flex-col items-center justify-center gap-2 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-pretty text-center transition-all duration-300 text-[var(--text-primary)] leading-tight">
            Shorten Your Loooong Links :)
          </h1>
          <p className="text-[var(--text-secondary)] text-pretty text-center text-lg sm:text-xl md:text-3xl transition-all duration-300 px-4">
            ShortLinks is an open source link shortener for developers.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row max-w-3xl">
          <input
            type="url"
            placeholder="Enter your loooong link here"
            className="w-full rounded-xl sm:rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 text-base sm:text-xl md:text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--border-color)] md:w-2/3 text-[var(--text-primary)] shadow-sm"
            value={longLink}
            onChange={(e) => setLongLink(e.target.value)}
          />
          <button onClick={handelShorten} className="w-full md:w-auto rounded-xl sm:rounded-2xl bg-[var(--text-primary)] px-8 py-3 text-lg font-semibold text-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] hover:scale-105 active:scale-95 transition-all duration-300 shadow-md">
            Shorten Now!
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-2">"{error}"</p>}
        {shortLink && <p className="text-green-500 text-center mt-2">"{shortLink}"</p>}
        <ListLinksHome links={links} />

      </section>
      <section className="h-fit with-background-pattern flex  flex-col items-center justify-center p-8 md:p-24 bg-[var(--bg-secondary)] transition-all duration-300" id="About">
        <h2 className="w-full text-4xl font-semibold text-pretty text-center text-left text-[var(--text-primary)]">About US</h2>
        <p className=" md:w-3/5 text-[var(--text-secondary)] text-pretty text-left self-start mt-1">
          We believe in a simpler, more connected internet. In a digital landscape filled with information, every character counts—and thats why we created ShortLinks.
        </p>
        <p className="md:w-3/5 text-[var(--text-secondary)] text-pretty text-left self-start mt-1">
          Our mission is to provide a powerful yet incredibly easy-to-use solution to shorten, manage, and analyze your links. Born as an open-source project, we built this tool with developers, content creators, and anyone who values efficiency and a clean design in mind.
        </p>
        <p className="md:w-3/5 text-[var(--text-secondary)] text-pretty text-left self-start mt-1">
          Thank you for being part of our community. We are constantly working to improve and add new features that make your digital life a little easier.
        </p>
      </section>
      <MiFooter />
    </main>
  );
}

