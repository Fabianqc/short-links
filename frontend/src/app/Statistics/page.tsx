'use client'
import React from "react";
// importation of react components 
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import ClicksChart from "@/Component/Charts/ClicksChart";
import DevicesChart from "@/Component/Charts/DevicesChart";
import BrowsersChart from "@/Component/Charts/BrowsersChart";

export default function Statistics() {
    return (
        <main className="flex flex-col items-center justify-between min-h-screen bg-[var(--bg-primary)] transition-all duration-300">
            <Header />
            <div className="w-full max-w-7xl mx-auto space-y-8 pb-10">
                <section id="TitlePage" className="w-full px-4 md:px-6 flex flex-col md:flex-row items-center justify-between pt-24 gap-6">
                    <div>
                        <h2 className="font-bold text-3xl md:text-4xl text-[var(--text-primary)]">Statistics</h2>
                        <p className="text-[var(--text-secondary)] mt-2">Overview of your links performance</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col md:flex-row items-center gap-3 bg-[var(--bg-secondary)] p-2 rounded-xl ring-1 ring-[var(--border-color)] shadow-sm">
                            <div className="flex flex-col w-full md:w-auto">
                                <label htmlFor="StartDate" className="sr-only">Date</label>
                                <input id="StartDate" type="date" className="bg-transparent appearance-none px-3 py-1.5 text-[var(--text-primary)] text-sm focus:outline-none" />
                            </div>
                            <span className="text-[var(--text-secondary)] hidden md:block">-</span>
                            <div className="flex flex-col w-full md:w-auto">
                                <label htmlFor="EndDate" className="sr-only">To</label>
                                <input id="EndDate" type="date" className="bg-transparent appearance-none px-3 py-1.5 text-[var(--text-primary)] text-sm focus:outline-none" />
                            </div>
                        </div>
                        <button className="py-2.5 px-6 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-indigo-500/20">
                            Export Report
                        </button>
                    </div>
                </section>

                {/* Top Section: Main Trends & Recent Activity */}
                <section className="w-full px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Main Chart */}
                    <article className="w-full bg-[var(--bg-secondary)] ring-1 ring-[var(--border-color)]/50 rounded-2xl h-[350px] shadow-sm overflow-hidden transition-all hover:ring-[var(--border-color)]">
                        <ClicksChart />
                    </article>

                    {/* Top Links (Placeholder/Table) */}
                    <article className="w-full bg-[var(--bg-secondary)] ring-1 ring-[var(--border-color)]/50 rounded-2xl h-[350px] shadow-sm p-6 flex flex-col">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Top Performing Links</h3>
                        <div className="flex-1 overflow-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead className="text-xs uppercase text-[var(--text-secondary)] border-b border-[var(--border-color)]">
                                    <tr>
                                        <th className="py-2">Short Link</th>
                                        <th className="py-2 text-right">Clicks</th>
                                        <th className="py-2 text-right">Growth</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i} className="border-b border-[var(--border-color)]/10 hover:bg-[var(--bg-tertiary)]/30 transition-colors">
                                            <td className="py-3 font-medium text-[var(--text-primary)]">short.link/xyz{i}</td>
                                            <td className="py-3 text-right text-[var(--text-primary)]">{120 - i * 10}</td>
                                            <td className="py-3 text-right text-green-500">+{20 - i}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </article>
                </section>

                {/* Bottom Section: Detailed Breakdowns */}
                <section className="w-full px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-6 md:col-span-1">
                        <article className="w-full bg-[var(--bg-secondary)] ring-1 ring-[var(--border-color)]/50 rounded-2xl h-[300px] shadow-sm overflow-hidden">
                            <DevicesChart />
                        </article>
                        <article className="w-full bg-[var(--bg-secondary)] ring-1 ring-[var(--border-color)]/50 rounded-2xl h-[300px] shadow-sm overflow-hidden">
                            <BrowsersChart />
                        </article>
                    </div>

                    <article className="w-full bg-[var(--bg-secondary)] ring-1 ring-[var(--border-color)]/50 rounded-2xl h-[625px] shadow-sm p-6 md:col-span-2 flex flex-col relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-6 z-10">
                            <h3 className="text-lg font-bold text-[var(--text-primary)]">Geographic Distribution</h3>
                        </div>
                        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[var(--border-color)] rounded-xl bg-[var(--bg-tertiary)]/30 z-10">
                            <span className="text-[var(--text-secondary)] flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-50">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                                Interactive Map Container
                            </span>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    </article>
                </section>
            </div>
            <Footer />
        </main>
    )
}