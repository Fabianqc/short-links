'use client'
import React, { useState, useEffect } from "react";
import {useSession} from 'next-auth/react'

// importacion de componentes de react necesarios 
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";


export default function Statistics() {
    const { data: session, status } = useSession();
    console.log(session);
    console.log(status);
    
    return (
        <main className="flex flex-col items-center justify-around gap-4 w-full  transition-all duration-800 ">
            <Header />
            <section id="TitlePage" className="w-screen  @container flex items-center justify-around pt-20">
                <h2 className="w-fit font-mono text-[2cqw] text-pretty">Statistics</h2>
                <div className="w-3/10 h-1/10 flex flex-row items-center justify-around">
                    <div className="h-full flex flex-col items-center justify-center">
                        <label htmlFor="StartDate" className="w-fit font-mono text-[1cqw] text-pretty">Date</label>
                        <input id="StartDate" type="date" className="w-full appearance-none pl-4 pr-10  text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500  transition-all duration-300" />
                        <div className="group flex flex-col items-center">
                            <label htmlFor="EndDate" className="font-mono text-sm text-zinc-700 group-hover:text-zinc-100 transition-all duration-300">To</label>
                            <input id="EndDate" type="date" className="w-full appearance-none pl-4 pr-10 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500  transition-all duration-300" />
                        </div>
                    </div>
                    <button className=" py-[1cqw] px-[2cqw] rounded-[2cqw] ring-1 ring-zinc-800 focus:outline-offset-5  focus:outline-zinc-500 focus:outline-2  active:ring-2 active:ring-zinc-200 active:bg-zinc-700 focus:outline-offset-2 "> Export</button>
                </div>
            </section>
            <section className="w-full flex flex-row items-center justify-around">
                <article className="w-11/20 bg-zinc-900 ring-zinc-700 ring-1 rounded-[2cqw] h-[30cqw] flex items-center justify-center ">
                    <h3>grafico</h3>
                </article>
                <article className="w-8/20 bg-zinc-900 ring-zinc-700 ring-1 rounded-[2cqw] h-[30cqw] flex items-center justify-center">
                    <h3>articulos</h3>
                </article>
            </section>
            <section className="w-full flex flex-row items-center justify-around">
                <div className="w-7/20 h-full flex flex-col items-center">
                    <article className="w-full bg-zinc-900 ring-zinc-700 ring-1 rounded-[2cqw] h-[29cqw] flex items-center justify-center ">
                        <h3>grafico</h3>
                    </article>
                    <article className="w-full bg-zinc-900 ring-zinc-700 ring-1 rounded-[2cqw] h-[29cqw] flex items-center justify-center mt-4 ">
                        <h3>grafico</h3>
                    </article>

                </div>

                <article className="w-12/20 bg-zinc-900 ring-zinc-700 ring-1 rounded-[2cqw] h-[60cqw] flex items-center justify-center">
                    <h3>articulos</h3>
                </article>
            </section>
            <Footer />
        </main>
    )
}