"use client";

import React from "react";
import { signIn } from "next-auth/react";
import svgGoogleIcon from "@/icon/GoogleIcon.svg";
import Image from "next/image";

export default function GoogleButton() {
    return (
        <>
            <button onClick={() => signIn('google', { callbackUrl: '/' })} className="w-full h-12 text-base rounded-full bg-zinc-800 px-6 py-3 font-semibold flex flex-row justify-center text-center item-center transition-all duration-300 hover:bg-zinc-200 hover:text-zinc-800 group ">
                <Image src={svgGoogleIcon} alt="Google Icon" width={36} height={36} className="h-6 w-6 invert group-hover:invert-0 transition-all duration-300" />
                <span className="ml-3 flex flex-col justify-center">Continue with Google</span>
            </button>
        </>
    )
}