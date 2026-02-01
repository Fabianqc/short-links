'use client'
import React, { useState } from "react";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import Link from "next/link";
import { format } from "date-fns";

// Mock data to simulate links from backend
const MOCK_LINKS = [
    {
        id: "1",
        originalUrl: "https://www.google.com",
        shortCode: "ggle",
        clicks: 1250,
        createdAt: new Date("2024-01-15"),
        title: "Google Search",
    },
    {
        id: "2",
        originalUrl: "https://example.com",
        shortCode: "exmpl",
        clicks: 340,
        createdAt: new Date("2024-02-01"),
        title: "Example Domain",
    },
    {
        id: "3",
        originalUrl: "https://nextjs.org",
        shortCode: "nxtjs",
        clicks: 890,
        createdAt: new Date("2024-02-10"),
        title: "Next.js Framework",
    },
    {
        id: "4",
        originalUrl: "https://tailwindcss.com",
        shortCode: "twcss",
        clicks: 560,
        createdAt: new Date("2024-02-15"),
        title: "Tailwind CSS",
    }
];

export default function MyLinks() {
    return (
        <main className="flex flex-col min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
            <Header />

            <div className="flex-1 w-full max-w-7xl mx-auto px-4 pt-28 pb-12">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">My Links</h1>
                        <p className="text-[var(--text-secondary)] text-lg">Manage and track your shortened URLs.</p>
                    </div>
                    <Link href="/" className="px-6 py-3 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold shadow-lg hover:scale-105 hover:shadow-indigo-500/20 transition-all duration-300 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create New
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_LINKS.map((link) => (
                        <Link
                            href={`/Statistics/${link.id}`}
                            key={link.id}
                            className="group relative bg-[var(--bg-secondary)] rounded-2xl overflow-hidden ring-1 ring-[var(--border-color)]/50 hover:ring-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col h-[400px]"
                        >
                            {/* Iframe Preview Container */}
                            <div className="relative h-48 w-full bg-[var(--bg-tertiary)] overflow-hidden border-b border-[var(--border-color)]/20">
                                {/* Overlay to intercept clicks and show hover effect */}
                                <div className="absolute inset-0 z-20 bg-transparent group-hover:bg-indigo-900/10 transition-colors flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-black/80 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-opacity transform translate-y-2 group-hover:translate-y-0 text-[var(--text-primary)]">
                                        View Stats
                                    </span>
                                </div>

                                {/* Iframe */}
                                <iframe
                                    src={link.originalUrl}
                                    title={`Preview of ${link.title}`}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    sandbox="allow-scripts allow-same-origin"
                                    loading="lazy"
                                />

                                {/* Fallback/Badge if iframe likely fails (optional logic could go here) */}
                                <div className="absolute top-3 right-3 z-10">
                                    <span className="px-2 py-1 text-xs font-bold bg-[var(--bg-primary)]/80 backdrop-blur rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)]">
                                        Preview
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-bold text-[var(--text-primary)] line-clamp-1" title={link.title}>{link.title || link.originalUrl}</h3>
                                        <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-tertiary)]/50 px-2 py-1 rounded-md">
                                            <span>/</span>
                                            <span className="font-semibold text-indigo-500">{link.shortCode}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 break-all hover:text-[var(--text-primary)] transition-colors mb-4">
                                        {link.originalUrl}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-sm pt-4 border-t border-[var(--border-color)]/20">
                                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0h18M5.25 12h13.5h-13.5Zm1.5 8.625a2.25 2.25 0 0 1-2.25-2.25 2.25 2.25 0 0 1 2.25 2.25Z" />
                                        </svg>
                                        {format(link.createdAt, "MMM d, yyyy")}
                                    </div>
                                    <div className="flex items-center gap-1.5 font-semibold text-indigo-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                        </svg>
                                        {link.clicks}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}
