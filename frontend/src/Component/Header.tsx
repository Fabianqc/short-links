'use client'
import React, { useEffect, useState, useRef } from "react"
import ProfilePhoto from '../icon/ProfilePhoto.webp'
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const [isScroller, setisScroller] = useState(false);
    const [isOpen, setisOpen] = useState(false);
    const { data: session, status } = useSession();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setisScroller(true)
            } else {
                setisScroller(false)
            }
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setisOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    // Mostrar header SOLO en rutas permitidas
    const allowedRoutes = ['/Statistics', '/', '/Profile', '/MyLinks'];

    if (!allowedRoutes.includes(pathname)) return null;

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out px-4 md:px-8 border-b ${isScroller
                ? 'bg-[var(--bg-primary)]/80 backdrop-blur-md shadow-sm h-16 border-[var(--border-color)]/20'
                : 'bg-transparent h-20 border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        ShortLinks
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/#About" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                            About
                        </Link>
                        <Link href="/#Contact" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                            Contact
                        </Link>
                    </nav>
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    {status === "loading" ? (
                        <div className="h-9 w-9 rounded-full bg-[var(--bg-tertiary)] animate-pulse" />
                    ) : status === "authenticated" ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setisOpen(!isOpen)}
                                className="flex items-center gap-2 p-1 pl-2 rounded-full border border-[var(--border-color)]/30 hover:bg-[var(--bg-tertiary)]/50 transition-all duration-200 group"
                            >
                                <span className="hidden sm:block text-sm font-medium text-[var(--text-primary)] max-w-[100px] truncate">
                                    {session?.user?.name || "User"}
                                </span>
                                <Image
                                    className="rounded-full object-cover ring-2 ring-white/20"
                                    width={32}
                                    height={32}
                                    src={session?.user?.image || ProfilePhoto}
                                    alt="Profile"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 pr-1 ${isOpen ? 'rotate-180' : ''}`}
                                >
                                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute right-0 top-full mt-2 w-64 origin-top-right rounded-2xl bg-[var(--bg-secondary)]/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-200 ease-out p-1.5 ${isOpen
                                    ? 'transform opacity-100 scale-100 translate-y-0'
                                    : 'transform opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                    }`}
                            >
                                <div className="px-3 py-2 mb-1 border-b border-[var(--border-color)]/20">
                                    <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Signed in as</p>
                                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{session?.user?.email}</p>
                                </div>

                                <div className="space-y-0.5">
                                    <Link href="/Profile" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-[var(--text-secondary)] rounded-xl hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        Profile
                                    </Link>
                                    <Link href="/" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-[var(--text-secondary)] rounded-xl hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                        Home
                                    </Link>
                                    <Link href="/MyLinks" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-[var(--text-secondary)] rounded-xl hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                        </svg>
                                        My Links
                                    </Link>
                                    <Link href="/Statistics" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-[var(--text-secondary)] rounded-xl hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                                        </svg>
                                        Statistics
                                    </Link>
                                </div>

                                <div className="mt-1 pt-1 border-t border-[var(--border-color)]/20">
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-500 rounded-xl hover:bg-red-500/10 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/Login" className="text-sm font-medium text-[var(--text-primary)] hover:opacity-70 transition-opacity hidden md:block" >
                                Login
                            </Link>
                            <Link
                                href="/Register"
                                className="px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-semibold hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
