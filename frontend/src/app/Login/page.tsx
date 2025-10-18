'use client'
// importacion de librerias necesarias 
import React, { useState } from "react";
import Image from "next/image";

// importacion de imagenes 
import svgPasswordEyeOpen from '../../../public/PasswordEyeOpen.svg'
import svgPasswordEyeClosed from '../../../public/PasswordEyeClosed.svg'
import svgGoogleIcon from '../../../public/GoogleIcon.svg'
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <main className="flex flex-col items-center justify-around gap-10 w-full h-screen transition-all duration-800">

            <section className="w-3/10 p-[3cqw] min-w-80 rounded-[3cqw] bg-zinc-600 @container">
                <h2 className="text-[10cqw] font-semibold text-pretty text-center mb-[10cqw]">Login</h2>
                <form className="  flex flex-col items-center justify-center  gap-4">
                    <label htmlFor="Email" className="flex flex-col items-start justify-center w-full text-[3.5cqw] text-pretty text-zinc-100  -mb-[3cqw]">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="Email"
                        id="Email"
                        className="w-full h-[15cqw] text-[5cqw] rounded-[3cqw] border border-zinc-800 bg-zinc-900 px-[5cqw] py-2 focus:outline-none focus:ring-2 focus:ring-zinc-200 hover:border-zinc-200 transition-all duration-300"
                    />
                    <label htmlFor="Password" className="flex flex-col items-start justify-center w-full text-[3.5cqw] text-pretty text-zinc-100 -mb-[3cqw]">Password</label>

                    <div className="w-full h-[15cqw]  rounded-[3cqw] border border-zinc-800 bg-zinc-900 flex px-[5cqw] hover:border-zinc-200 transition-all duration-300 ">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={showPassword ? "Password" : "************"}
                            name="Password"
                            id="Password"
                            className="w-9/10 text-[5cqw] rounded-lg py-2 focus:outline-none text-base trasition-all duration-300"
                        />
                        <button className="w-1/10 flex items-center justify-center transition-all duration-300" onClick={() => setShowPassword(!showPassword)} type="button">
                            {showPassword ?
                                <Image src={svgPasswordEyeOpen} alt="Open Eye" width={20} height={20} className="w-6/10 invert transition-all duration-300" />
                                :
                                <Image src={svgPasswordEyeClosed} alt="Closed Eye" width={20} height={20} className="w-6/10 invert transition-all duration-300" />
                            }
                        </button>
                    </div>
                    <button className="w-full h-[15cqw] text-[5cqw] rounded-[3cqw] bg-zinc-200 px-4 py-2 font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-800 hover:text-zinc-200 ">
                        Login
                    </button>
                </form>
                <hr className="w-full h-[0.5cqw] my-[3cqw] bg-zinc-700 border-none " />
                <button className="w-full h-[12cqw] text-[4cqw] rounded-[3cqw] bg-zinc-800 px-[5cqw] py-[3cqw] font-semibold flex flex-row justify-center text-center item-center transition-all duration-300 hover:bg-zinc-200 hover:text-zinc-800 group ">
                    <Image src={svgGoogleIcon} alt="Google Icon" width={36} height={36} className="h-[6cqw] w-[6cqw] invert group-hover:invert-0 transition-all duration-300" />
                    <span className="ml-[2cqw] flex flex-col justify-center">Continue with Google</span>
                </button>
            </section>
        </main>
    )
}