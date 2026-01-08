"use client";
// importation of libraries
import React, { useEffect, useState } from "react";
import GoogleButton from "@/Component/GoogleButton";


// importation of images
import PasswordEyeClosed from "@/icon/PasswordEyeClosed";
import PasswordEyeOpen from "@/icon/PasswordEyeOpen";
import { getServerSession } from "next-auth";
export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    return (
        <main className="flex flex-col items-center justify-around gap-10 w-full h-screen transition-all duration-300 bg-[var(--bg-primary)] p-4">
            <section className="w-full max-w-md p-8 rounded-3xl bg-[var(--bg-tertiary)] @container transition-all duration-300 shadow-xl">
                <h2 className="text-4xl font-semibold text-pretty text-center mb-10 text-[var(--text-primary)]">
                    Login
                </h2>
                <form className="flex flex-col items-center justify-center gap-6">
                    <div className="w-full">
                        <label
                            htmlFor="Email"
                            className="flex flex-col items-start justify-center w-full text-sm font-medium text-[var(--text-secondary)] mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="Email"
                            id="Email"
                            className="w-full h-12 text-base rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-all duration-300 text-[var(--text-primary)]"
                        />
                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="Password"
                            className="flex flex-col items-start justify-center w-full text-sm font-medium text-[var(--text-secondary)] mb-2"
                        >
                            Password
                        </label>

                        <div className="w-full h-12 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] flex px-4 hover:border-[var(--text-secondary)] transition-all duration-300 items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder={showPassword ? "Password" : "************"}
                                name="Password"
                                id="Password"
                                className="w-full text-base bg-transparent focus:outline-none text-[var(--text-primary)]"
                            />
                            <button
                                className="ml-2 flex items-center justify-center transition-all duration-300 opacity-70 hover:opacity-100"
                                onClick={() => setShowPassword(!showPassword)}
                                type="button"
                            >
                                {showPassword ? <PasswordEyeOpen /> : <PasswordEyeClosed />}
                            </button>
                        </div>
                    </div>

                    <button className="w-full h-12 text-lg rounded-full bg-[var(--text-primary)] px-4 font-semibold text-[var(--bg-primary)] transition-all duration-300 hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--text-primary)]">
                        Login
                    </button>
                </form>
                <hr className="w-full h-px my-6 bg-[var(--border-color)] border-none " />
                <GoogleButton />
            </section>
        </main>
    );
}

