import MiFooter from "@/Component/Footer";
import Header from "@/Component/Header";
import React from "react";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="with-background-pattern flex min-h-screen flex-col items-center justify-center gap-5 p-[7cqw] @container" >
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-[11cqw] md:text-[5cqw] font-semibold text-pretty text-center transition-all duration-300">
            Shorten Your Loooong Links :)
          </h1>
          <p className="text-zinc-400 text-pretty text-center text-[5cqw] md:text-[2.5cqw] transition-all duration-300">
            ShortLinks is an open source link shortener for developers.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
          <input
            type="url"
            placeholder="Enter your loooong link here"
            className="w-full rounded-[3cqw] border border-zinc-800 bg-zinc-900 px-[1cqw] py-[1cqw] text-[6cqw] md:text-[2cqw] transition-all duration-300 focus:outline-none focus:ring-[0.2cqw] focus:ring-zinc-700 md:w-1/2"
          />
          <button className="w-full rounded-[3cqw] bg-zinc-200 px-[2cqw] py-[1cqw] text-[6cqw] md:text-[2cqw] hover:bg-zinc-800 hover:text-zinc-200 hover:scale-105 font-semibold text-zinc-900 md:w-fit transition-all duration-300">
            Shorten Now!
          </button>
        </div>

      </section>
      <section className="h-fit with-background-pattern flex  flex-col items-center justify-center p-8 md:p-24  bg-zinc-900" id="About">
        <h2 className="w-full text-4xl font-semibold text-pretty text-center text-left">About US</h2>
        <p className=" md:w-3/5 text-zinc-400 text-pretty text-left self-start mt-1">
          We believe in a simpler, more connected internet. In a digital landscape filled with information, every character counts—and thats why we created ShortLinks.
        </p>
        <p className="md:w-3/5 text-zinc-400 text-pretty text-left self-start mt-1">
          Our mission is to provide a powerful yet incredibly easy-to-use solution to shorten, manage, and analyze your links. Born as an open-source project, we built this tool with developers, content creators, and anyone who values efficiency and a clean design in mind.
        </p>
        <p className="md:w-3/5 text-zinc-400 text-pretty text-left self-start mt-1">
          Thank you for being part of our community. We are constantly working to improve and add new features that make your digital life a little easier.
        </p>
      </section>
      <MiFooter/>
    </main>
  );
}
