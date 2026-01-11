'use client'
import React from "react";
// importation of react components 
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";


export default function Statistics() {


    return (
        <main className="flex flex-col items-center justify-around gap-4 w-full  transition-all duration-800 ">
            <Header />
            <section id="TitlePage" className="w-full px-4 md:px-10 flex flex-col md:flex-row items-center justify-between pt-20 gap-4">
                <h2 className="w-fit font-mono text-3xl md:text-4xl text-pretty">Statistics</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex flex-col w-full">
                            <label htmlFor="StartDate" className="font-mono text-sm mb-1 text-pretty">Date</label>
                            <input id="StartDate" type="date" className="w-full appearance-none px-4 py-2 text-[var(--text-primary)] border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all duration-300" />
                        </div>
                        <div className="group flex flex-col items-center w-full">
                            <label htmlFor="EndDate" className="font-mono text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-all duration-300 mb-1">To</label>
                            <input id="EndDate" type="date" className="w-full appearance-none px-4 py-2 text-[var(--text-primary)] border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all duration-300" />
                        </div>
                    </div>
                    <button className="py-2 px-6 rounded-xl ring-2 ring-zinc-800 hover:bg-zinc-700 hover:text-white transition-all duration-300"> Export</button>
                </div>
            </section>

            <section className="w-full px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="w-full bg-[var(--bg-secondary)] ring-zinc-700 ring-1 rounded-2xl h-64 flex items-center justify-center ">
                    <h3>grafico</h3>
                </article>
                <article className="w-full bg-[var(--bg-secondary)] ring-zinc-700 ring-1 rounded-2xl h-64 flex items-center justify-center">
                    <h3>articulos</h3>
                </article>
            </section>

            <section className="w-full px-4 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-6 md:col-span-1">
                    <article className="w-full bg-[var(--bg-secondary)] ring-zinc-700 ring-1 rounded-2xl h-64 flex items-center justify-center ">
                        <h3>grafico</h3>
                    </article>
                    <article className="w-full bg-[var(--bg-secondary)] ring-zinc-700 ring-1 rounded-2xl h-64 flex items-center justify-center">
                        <h3>grafico</h3>
                    </article>
                </div>

                <article className="w-full bg-[var(--bg-secondary)] ring-zinc-700 ring-1 rounded-2xl h-[530px] flex items-center justify-center md:col-span-2">
                    <h3>articulos</h3>
                </article>
            </section>
            <Footer />
        </main>
    )
}