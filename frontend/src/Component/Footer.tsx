'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";

import GithubPhoto from "../../public/GithubIcono.webp"
import InstagramIcono from "../../public/InstagramIcono.webp"
import GmailIcono from "../../public/GmailIcono.svg"
export default function MiFooter() {
    return (
        <footer className="w-full bg-zinc-950 p-2 pt-10 flex flex-row items-center justify-center gap-10 text-zinc-400 text-center">
            <address className="">
                Developed by: Fabianqc
                <br />

                <article className="flex flex-row items-center justify-center gap-10 text-zinc-400 text-center mt-2">
                    <figure className="w-fit flex flex-col items-center justify-center" >
                        <Link href="https://github.com/Fabianqc" target="_blank" rel="noopener noreferrer" className="w-fit flex flex-col items-center justify-center">
                            <Image src={GithubPhoto} alt="Icono de GitHub" width={40} height={40} className="invert hover:scale-105 transition-all duration-500 cursor-pointer" />
                            <figcaption className="text-xs"> GitHub</figcaption>
                        </Link>
                    </figure>
                    <figure className="w-fit flex flex-col items-center justify-center" >
                        <Link href="https://www.instagram.com/fabianq05?igsh=MTRzZ21oaHc5Z2g3dQ==" target="_blank" rel="noopener noreferrer" className="w-fit flex flex-col items-center justify-center">
                            <Image src={InstagramIcono} alt="Icono de Instagram" width={38} height={38} className="invert hover:scale-105 transition-all duration-500 cursor-pointer" />
                            <figcaption className="text-xs"> Instagram</figcaption>
                        </Link>
                    </figure>
                    <figure className="w-fit flex flex-col items-center justify-center" >
                        <Link href="mailto:fabian05demayo@gmail.com" target="_blank" rel="noopener noreferrer" className="w-fit flex flex-col items-center justify-center">
                            <Image src={GmailIcono} alt="Icono de Instagram" width={38} height={38} className=" hover:scale-105 transition-all duration-500 cursor-pointer brightness-0 invert" />
                            <figcaption className="text-xs"> Gmail</figcaption>
                        </Link>
                    </figure>
                </article>

                developed with much love to demonstrate my fullstack skills
            </address>
        </footer>
    )
}