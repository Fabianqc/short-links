"use client";
// importation of libraries
import React, { useState } from "react";
import GoogleButton from "@/Component/GoogleButton";
import { signIn } from "next-auth/react";


// importation of images
import PasswordEyeClosed from "@/icon/PasswordEyeClosed";
import PasswordEyeOpen from "@/icon/PasswordEyeOpen";
import { useRouter } from "next/navigation";
export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errorKey, setErrorKey] = useState(0);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('All fields are required');
            setErrorKey(prev => prev + 1);
            return;
        }
        setLoading(true);
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })
            if (result?.error) {
                setError('Invalid credentials');
                setErrorKey(prev => prev + 1);
            } else {
                router.push('/');
            }
        } catch (error) {
            setError('Something went wrong');
            setErrorKey(prev => prev + 1);
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="flex flex-col items-center justify-around gap-10 w-full h-screen transition-all duration-300 bg-[var(--bg-primary)] p-4">
            <section className="w-full max-w-md p-8 rounded-3xl bg-[var(--bg-tertiary)] @container transition-all duration-300 shadow-xl">
                <h2 className="text-4xl font-semibold text-pretty text-center mb-10 text-[var(--text-primary)]">
                    Login
                </h2>
                <div className="flex flex-col items-center justify-center gap-5">
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    <button className="w-full h-12 text-lg rounded-full bg-[var(--text-primary)] px-4 font-semibold text-[var(--bg-primary)] transition-all duration-300 hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--text-primary)]"
                        onClick={handleLogin}>
                        Login
                    </button>
                    <div className="w-full flex items-center justify-between flex-col ">
                        <p> Don't have an account? <a href="/Register" className="text-[var(--text-primary)]">Register</a></p>
                        {error && <p key={errorKey} className="text-red-500 text-sm mt-2 animate-shake">{error}</p>}
                    </div>
                </div>
                <hr className="w-full h-px my-6 bg-[var(--border-color)] border-none " />
                <GoogleButton />
            </section>
        </main>
    );
}

