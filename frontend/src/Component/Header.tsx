'use client'
import React, { use, useEffect, useState } from "react"
import ProfilePhoto from '../../public/ProfilePhoto.webp'
import Link from "next/link";
import Image from "next/image";
export default function Header() {
    const [isScroller, setisScroller] = useState(false);
    const [hasSession, sethasSession] = useState(false);
    const [isOpen, setisOpen] = useState(false);

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

    return (
        <header className={` w-full flex items-center px-10 fixed top-0 z-50 justify-between text-white ease-in-out ${isScroller ? 'bg-zinc-900 shadow-lg h-12' : 'bg-transparent h-20'} transition-all duration-500`}>
            <div className="flex items-center w-4/5 transition-all duration-500">
                <span><Link href="#">ShortLinks</Link></span>
            </div>
            <span className="m-2"><Link href="/#About">About</Link></span>
            <span className="m-2"><Link href="#">Contact</Link></span>

            {hasSession ?
                <>
                    <Image className='w-10 h-10 rounded-full border-2 border-black invert hover:scale-105 transition-all duration-500 cursor-pointer"' width={40} height={40} src={ProfilePhoto} alt="Profile Photo" />
                    <button className="h-10 w-10 flex items-center justify-center flex-col  items-center justify-center space-y-2 " onClick={() => { setisOpen(!isOpen) }}>
                        <div className={`w-5 h-px bg-white rounded-full transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-[9px] ' : ''}`}></div>
                        <div className={`w-5 h-px bg-white rounded-full transition-all duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                        <div className={`w-5 h-px bg-white rounded-full transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></div>
                    </button>
                    {isOpen ? (
                        // Contenedor del menú con posicionamiento y animación mejorados
                        <nav
                            className={`absolute right-4 mt-2 w-56 origin-top-right rounded-md bg-zinc-900/90 backdrop-blur-sm shadow-lg ring-1 ring-white/10 ocus:outline-none transition-all ease-out duration-500  ${isScroller ? 'top-10' : 'top-20'}`}
                            // Estas clases controlan la animación de entrada
                            style={{
                                transform: isOpen ? 'scale(1)' : 'scale(0.95)',
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            <ul className="p-2">
                                {/* Cada item es un enlace con padding, ícono y efecto hover */}
                                <li>
                                    <Link href="#" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-300 rounded-md hover:bg-zinc-700">
                                        <span>👤</span> Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-300 rounded-md hover:bg-zinc-700">
                                        <span>🏠</span> Home
                                    </Link>
                                </li>
                                <hr className="border-zinc-700 my-1" />
                                <li>
                                    <Link href="#" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-300 rounded-md hover:bg-zinc-700">
                                        <span>🔗</span> My Links
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-300 rounded-md hover:bg-zinc-700">
                                        <span>📊</span> Statistics
                                    </Link>
                                </li>
                                <hr className="border-zinc-700 my-1" />
                                <li>
                                    <Link href="#" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 rounded-md hover:bg-red-500/20">
                                        <span>🚪</span> Logout
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    ) : (
                        // El fragmento vacío cuando el menú está cerrado
                        <></>
                    )}
                </>
                :
                <>
                    <button className={`w-25 m-2 flex items-center justify-center rounded-full bg-zinc-200 p-2 font-semibold text-zinc-900 cursor-pointer transition-all duration-500 hover:scale-105 ${isScroller ? 'h-8' : 'h-10'}`}>Register</button>
                    <Link href="/Login" className={`w-25 p-2 m-2 flex items-center justify-center font-semibold text-zinc-200 rounded-full border-2 cursor-pointer hover:scale-105 transition-all duration-500 ${isScroller ? 'h-8' : 'h-10'}`} >Login</Link>
                </>
            }
        </header>
    )

}