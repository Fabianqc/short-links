'use client'
import React, { useEffect, useState } from "react"
import ProfilePhoto from '../icon/ProfilePhoto.webp'
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    const [isScroller, setisScroller] = useState(false);
    const [hasSession, sethasSession] = useState(false);
    const [isOpen, setisOpen] = useState(false);
    const { data: session, status } = useSession();
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setisScroller(true)
            } else {
                setisScroller(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    useEffect(() => {
        if (status === "authenticated") {
            sethasSession(true)
            const sessionexp = session;
            console.log(sessionexp);

        } else {
            sethasSession(false)
        }
    }, [status])
    return (
        <header className={` w-full flex items-center px-4 fixed top-0 z-50 justify-between text-[var(--text-primary)] ease-in-out transition-all duration-500 ${isScroller ? 'bg-[var(--bg-secondary)] shadow-lg h-16 md:h-14' : 'bg-transparent h-24 md:h-20'}`}>
            <div className="flex items-center w-4/5 transition-all duration-500">
                <span><Link href="/" className="text-2xl md:text-xl font-bold" >ShortLinks</Link></span>
            </div>
            <span className={`mx-2 text-lg font-medium transition-opacity duration-300 ${isScroller ? 'opacity-0 md:opacity-100' : 'opacity-0 md:opacity-100'}`}><Link href="/#About">About</Link></span>
            <span className={`mx-2 text-lg font-medium transition-opacity duration-300 ${isScroller ? 'opacity-0 md:opacity-100' : 'opacity-0 md:opacity-100'}`}><Link href="/#Contact">Contact</Link></span>

            <div className="mx-4">
                <ThemeToggle />
            </div>

            {hasSession ?
                <>
                    <Image
                        className={`rounded-full border-2 border-[var(--border-color)] hover:scale-105 transition-all duration-500 cursor-pointer ${isScroller ? 'w-10 h-10 md:w-8 md:h-8' : 'w-12 h-12 md:w-10 md:h-10'} `}
                        width={40}
                        height={40}
                        src={session?.user?.image || ProfilePhoto}
                        alt="Profile Photo"
                    />

                    <button className="h-10 w-10 md:h-8 md:w-8 ml-4 md:ml-2 flex flex-col items-center justify-center space-y-1 md:space-y-1" onClick={() => { setisOpen(!isOpen) }}>
                        <div className={`w-6 md:w-5 h-0.5 bg-[var(--text-primary)] rounded-full transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                        <div className={`w-6 md:w-5 h-0.5 bg-[var(--text-primary)] rounded-full transition-all duration-400 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                        <div className={`w-6 md:w-5 h-0.5 bg-[var(--text-primary)] rounded-full transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                    </button>
                    {isOpen ? (
                        // Contenedor del menú
                        <nav
                            className={`absolute right-4 w-64 origin-top-right rounded-xl bg-[var(--bg-secondary)]/95 backdrop-blur-sm shadow-xl ring-1 ring-[var(--border-color)]/10 transition-all ease-out duration-300 ${isScroller ? 'top-20' : 'top-24'}`}
                            style={{
                                transform: isOpen ? 'scale(1)' : 'scale(0.95)',
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            <ul className="p-2">
                                <li>
                                    <Link href="#" className="flex items-center gap-3 w-full px-4 py-3 text-lg md:text-base text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors">
                                        <span>👤</span> Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="flex items-center gap-3 w-full px-4 py-3 text-lg md:text-base text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors">
                                        <span>🏠</span> Home
                                    </Link>
                                </li>
                                <hr className="border-[var(--border-color)] my-2" />
                                <li>
                                    <Link href="#" className="flex items-center gap-3 w-full px-4 py-3 text-lg md:text-base text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors">
                                        <span>🔗</span> My Links
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Statistics" className="flex items-center gap-3 w-full px-4 py-3 text-lg md:text-base text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors">
                                        <span>📊</span> Statistics
                                    </Link>
                                </li>
                                <hr className="border-[var(--border-color)] my-2" />
                                <li>
                                    <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-3 w-full px-4 py-3 text-lg md:text-base text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                                        <span>🚪</span> Logout
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    ) : null}
                </>
                :
                <div className="flex items-center gap-2">
                    <Link href="/Register" className={`flex items-center justify-center rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md px-6 py-2 text-base md:text-sm ${isScroller ? 'h-10' : 'h-12'}`}>Register</Link>
                    <Link href="/Login" className={`flex items-center justify-center font-semibold text-[var(--text-primary)] rounded-full border-2 border-[var(--border-color)] cursor-pointer hover:scale-105 transition-all duration-300 px-6 py-2 text-base md:text-sm ${isScroller ? 'h-10' : 'h-12'}`} >Login</Link>
                </div>
            }
        </header>
    )

}
