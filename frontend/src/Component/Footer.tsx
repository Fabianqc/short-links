'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";

import GithubPhoto from "../icon/GithubIcono.webp"
import InstagramIcono from "../icon/InstagramIcono.webp"
import GmailIcono from "../icon/GmailIcono.svg"
export default function MiFooter() {
    return (
        <footer className="w-full bg-[var(--bg-secondary)] p-2 pt-10 flex flex-row items-center justify-center gap-10 text-[var(--text-secondary)] text-center @container transition-all duration-300">
            <address className="text-base md:text-sm">
                Developed by: Fabianqc
                <br />

                <article className="flex flex-row items-center justify-center gap-8 text-[var(--text-secondary)] text-center mt-4">
                    <figure className="w-fit flex flex-col items-center justify-center" >
                        <Link href="https://github.com/Fabianqc" target="_blank" rel="noopener noreferrer" className="w-fit flex flex-col items-center justify-center">
                            <Image src={GithubPhoto} alt="Icono de GitHub" width={100} height={100} className="w-12 md:w-8 dark:invert hover:scale-105 transition-all duration-500 cursor-pointer" />
                            <figcaption className="text-sm md:text-xs mt-1"> GitHub</figcaption>
                        </Link>
                    </figure>
                    <figure className="w-fit flex flex-col items-center justify-center" >
                        <Link href="https://www.instagram.com/fabianq05?igsh=MTRzZ21oaHc5Z2g3dQ==" target="_blank" rel="noopener noreferrer" className="w-fit flex flex-col items-center justify-center">
                            <Image src={InstagramIcono} alt="Icono de Instagram" width={100} height={100} className="w-10 md:w-7 dark:invert hover:scale-105 transition-all duration-500 cursor-pointer" />
                            <figcaption className="text-sm md:text-xs mt-1"> Instagram</figcaption>
                        </Link>
                    </figure>
                    <figure className="w-fit flex flex-col items-center justify-center" >
                        <Link href="mailto:fabian05demayo@gmail.com" target="_blank" rel="noopener noreferrer" className="w-fit flex flex-col items-center justify-center">
                            <Image src={GmailIcono} alt="Icono de Instagram" width={100} height={100} className="w-12 md:w-8 hover:scale-105 transition-all duration-500 cursor-pointer dark:brightness-0 dark:invert" />
                            <figcaption className="text-sm md:text-xs mt-1"> Gmail</figcaption>
                        </Link>
                    </figure>
                </article>

                developed with much love to demonstrate my fullstack skills
            </address>
        </footer>
    )
}
