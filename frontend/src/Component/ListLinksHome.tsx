"use client";
import React, { useState, useEffect } from "react";
import { Shortlink } from "../types/shortlinks-types";

// Helper para extraer dominio
function getDomain(url: string) {
    try {
        const domain = new URL(url).hostname;
        return domain.replace("www.", "");
    } catch {
        return "unknown";
    }
}

function LinkItem({ link, index }: { link: Shortlink; index: number }) {
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState("");

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    const domain = getDomain(link.url);
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    const shortUrlFull = `${origin}/${link.shortUrl}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrlFull);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className="flex flex-col md:flex-row items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] shadow-sm transition-all duration-300 gap-4 md:gap-0 animate-fade-in-up hover:shadow-xl hover:-translate-y-1 hover:border-[var(--text-secondary)]"
            style={{ animationDelay: `${index * 100}ms` }}
        >

            {/* Sección 1: Logo + Dominio */}
            <div className="flex items-center gap-3 w-full md:w-1/4 min-w-[150px] group">
                <div className="relative w-10 h-10 rounded-full bg-white p-1 shadow flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <img
                        src={faviconUrl}
                        alt="icon"
                        className="w-full h-full object-contain"
                        onError={(e) => (e.currentTarget.src = "https://www.google.com/s2/favicons?domain=google.com&sz=64")}
                    />
                </div>
                <span className="font-semibold text-[var(--text-primary)] truncate text-lg capitalize transition-colors group-hover:text-blue-500">{domain}</span>
            </div>

            {/* Sección 2: URL Completa (Centro) */}
            <div className="flex-1 px-2 md:px-8 w-full text-center md:text-left overflow-hidden">
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors truncate block w-full max-w-full text-sm md:text-base opacity-80 hover:opacity-100 hover:underline decoration-dotted underline-offset-4"
                >
                    {link.url}
                </a>
            </div>

            {/* Sección 3: Short Link + Botón Copiar */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end bg-[var(--bg-primary)] md:bg-transparent p-2 md:p-0 rounded-lg">
                <span className="text-[var(--text-primary)] font-bold text-sm md:text-base ml-2 md:ml-0 bg-blue-500/10 px-2 py-1 rounded-md text-blue-600 dark:text-blue-400">
                    /{link.shortUrl}
                </span>
                <button
                    onClick={handleCopy}
                    className={`
                        p-2 rounded-lg transition-all duration-300 flex items-center gap-2 active:scale-90
                        ${copied
                            ? "bg-green-500/20 text-green-600 dark:text-green-400 scale-110 ring-2 ring-green-500/50"
                            : "bg-[var(--bg-tertiary)] hover:bg-gray-300 dark:hover:bg-gray-700 text-[var(--text-primary)] hover:scale-105"
                        }
                    `}
                    title="Copy Link"
                >
                    {copied ? (
                        <svg className="animate-bounce" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    )}
                    <span className="md:hidden text-xs font-bold">{copied ? "Copied" : "Copy"}</span>
                </button>
            </div>
        </div>
    );
}

export default function ListLinksHome({ links }: { links: Shortlink[] }) {
    if (!links || links.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mt-12 flex flex-col gap-4 px-4 pb-20">
            {links.slice(0, 6).map((link, index) => (
                <LinkItem key={link.shortUrl} link={link} index={index} />
            ))}
        </div>
    );
}