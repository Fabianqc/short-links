'use client'
import React, { use, useEffect, useState } from "react"
import ProfilePhoto from '../icon/ProfilePhoto.webp'
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
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
        } else {
            sethasSession(false)
        }
    }, [status])
    return (
        <header className={` w-full flex items-center px-[3cqw] fixed top-0 z-50 justify-between text-white ease-in-out  ${isScroller ? 'bg-zinc-900 shadow-lg h-[13cqw] md:h-[3cqw] ' : 'bg-transparent h-[20cqw] md:h-[6cqw]'} transition-all duration-500 @container`}>
            <div className="flex items-center w-4/5 transition-all duration-500">
                <span><Link href="/" className="text-[5cqw] md:text-[1.5cqw]" >ShortLinks</Link></span>
            </div>
            <span className="m-[0.5cqw]  opacity-0 text-[1.5cqw] md:opacity-100"><Link href="/#About">About</Link></span>
            <span className="m-[0.5cqw] opacity-0 text-[1.5cqw] md:opacity-100"><Link href="/#Contact">Contact</Link></span>

            {hasSession ?
                <>
                    <Image className={`  rounded-full border-2 border-black invert hover:scale-105 transition-all duration-500 cursor-pointer ${isScroller ? 'w-[11cqw] h-[11cqw] md:w-[2.5cqw] md:h-[2.5cqw]' : 'w-[13cqw] h-[13cqw] md:w-[4cqw] md:h-[4cqw]'} `} width={40} height={40} src={session?.user?.image || ProfilePhoto} alt="Profile Photo" />
                    {/* hay que terminar de agregar el nom,bre del usuario 
                    <span>{session?.user?.name}</span> */}
                    <button className="h-[10cqw] w-[5cqw] md:h-[5cqw] md:w-[2cqw] m-[4cqw] md:m-[0.5cqw] flex items-center justify-center flex-col  items-center justify-center space-y-[1.5cqw] md:space-y-[0.5cqw] " onClick={() => { setisOpen(!isOpen) }}>
                        <div className={`w-[5cqw] md:w-[2cqw] h-px bg-white rounded-full transition-all duration-500 ${isOpen ? 'rotate-45 my-0 translate-y-[1.2cqw] md:translate-y-[0.3cqw] ' : ''}`}></div>
                        <div className={`w-[5cqw] md:w-[2cqw] h-px bg-white rounded-full transition-all duration-400 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                        <div className={`w-[5cqw] md:w-[2cqw] h-px bg-white rounded-full transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-[1.2cqw] md:-translate-y-[0.2cqw]' : ''}`}></div>
                    </button>
                    {isOpen ? (
                        // Contenedor del menú con posicionamiento y animación mejorados
                        <nav
                            className={`absolute right-4 mt-[2cqw] md:mt-[1cqw] w-[30cqw] md:w-[20cqw] origin-top-right rounded-[2cqw] md:rounded-[1cqw] bg-zinc-900/90 backdrop-blur-sm shadow-lg ring-1 ring-white/10 ocus:outline-none transition-all ease-out duration-500  ${isScroller ? 'top-[13cqw] md:top-[3cqw]' : 'top-[18cqw] md:top-[8cqw]'}`}
                            // Estas clases controlan la animación de entrada
                            style={{
                                transform: isOpen ? 'scale(1)' : 'scale(0.95)',
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            <ul className="p-[1cqw]">
                                {/* Cada item es un enlace con padding, ícono y efecto hover */}
                                <li>
                                    <Link href="#" className="flex items-center gap-3 w-full px-[1.5cqw] py-[0.8cqw] text-[3cqw] md:px-[1cqw] md:text-[1.3cqw] text-zinc-300 rounded-[1.8cqw] hover:bg-zinc-700">
                                        <span>👤</span> Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="flex items-center gap-3 w-full px-[1.5cqw] py-[0.8cqw] text-[3cqw] md:px-[1cqw] md:text-[1.3cqw] text-zinc-300 rounded-[1.8cqw] hover:bg-zinc-700">
                                        <span>🏠</span> Home
                                    </Link>
                                </li>
                                <hr className="border-zinc-700 my-1" />
                                <li>
                                    <Link href="#" className="flex items-center gap-3 w-full px-[1.5cqw] py-[0.8cqw] text-[3cqw] md:px-[1cqw] md:text-[1.3cqw] text-zinc-300 rounded-[1.8cqw] hover:bg-zinc-700">
                                        <span>🔗</span> My Links
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Statistics" className="flex items-center gap-3 w-full px-[1.5cqw] py-[0.8cqw] text-[3cqw] md:px-[1cqw] md:text-[1.3cqw] text-zinc-300 rounded-[1.8cqw] hover:bg-zinc-700">
                                        <span>📊</span> Statistics
                                    </Link>
                                </li>
                                <hr className="border-zinc-700 my-1" />
                                <li>
                                    <button onClick={()=>signOut({callbackUrl:"/"}) } className="flex items-center gap-3 w-full px-[1.5cqw] py-[0.8cqw] text-[3cqw] md:px-[1cqw] md:text-[1.3cqw] text-red-400 rounded-[1cqw] hover:bg-red-500/20">
                                        <span>🚪</span> Logout
                                    </button>
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
                    <Link  href="/Register" className={`text-[5cqw] p-[1cqw] m-[1cqw] md:text-[1.5cqw] md:w-[7cqw] md:p-[1cqw] m-[0.5cqw] flex items-center justify-center rounded-full bg-zinc-200 p-2 font-semibold text-zinc-900 cursor-pointer transition-all duration-500 hover:scale-105 ${isScroller ? 'h-[6cqw] md:h-[2cqw]' : 'md:h-[4cqw] h-[8cqw]'}`}>Register</Link>
                    <Link href="/Login" className={`text-[5cqw] p-[2cqw] m-[1cqw] md:text-[1.5cqw] md:w-[7cqw] md:p-[1cqw] md:m-[0.5cqw] flex items-center justify-center font-semibold text-zinc-200 rounded-full border-[0.2cqw] cursor-pointer hover:scale-105 transition-all duration-500 ${isScroller ? 'h-[6cqw] md:h-[2cqw]' : 'md:h-[4cqw] h-[8cqw]'}`} >Login</Link>
                </>
            }
        </header>
    )

}