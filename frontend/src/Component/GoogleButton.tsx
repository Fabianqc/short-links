"use client";

import React from "react";
import { signIn } from "next-auth/react";
import svgGoogleIcon from "@/icon/GoogleIcon.svg";
import Image from "next/image";

export default function GoogleButton() {
    return (
        <>
            <button onClick={()=> signIn('google', { callbackUrl: '/' })} className="w-full h-[12cqw] text-[4cqw] rounded-[3cqw] bg-zinc-800 px-[5cqw] py-[3cqw] font-semibold flex flex-row justify-center text-center item-center transition-all duration-300 hover:bg-zinc-200 hover:text-zinc-800 group ">
                <Image src={svgGoogleIcon} alt="Google Icon" width={36} height={36} className="h-[6cqw] w-[6cqw] invert group-hover:invert-0 transition-all duration-300" />
                <span className="ml-[2cqw] flex flex-col justify-center">Continue with Google</span>
            </button>
        </>
    )
}