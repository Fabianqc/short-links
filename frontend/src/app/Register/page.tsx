"use client"
// importation of libraries 
import React, { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getAxiosErrorMessage } from "@/app/utils/errorHandler";
import GoogleButton from "@/Component/GoogleButton";
// importation of images 
import PasswordEyeClosed from "@/icon/PasswordEyeClosed";
import PasswordEyeOpen from "@/icon/PasswordEyeOpen";
export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const router = useRouter();
    const handleRegister = async () => {
        setError(''); // Reset error
        if (password !== repeatPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!username || !email || !password || !repeatPassword) {
            setError('All fields are required');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                Email: email,
                password: password,
                name: username,
            });
            console.log(response.data);
            await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            router.push('/');

        } catch (error) {
            setError(getAxiosErrorMessage(error));

        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="flex flex-col items-center justify-around gap-10 w-full h-screen transition-all duration-300 bg-[var(--bg-primary)] p-4">

            <section className="w-full max-w-md p-8 rounded-3xl bg-[var(--bg-tertiary)] @container transition-all duration-300 shadow-xl">
                <h2 className="text-4xl font-semibold text-pretty text-center mb-10 text-[var(--text-primary)]">Register</h2>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-full">
                        <label htmlFor="Username" className="flex flex-col items-start justify-center w-full text-sm font-medium text-[var(--text-secondary)] mb-1">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            name="Username"
                            id="Username"
                            required
                            className="w-full h-12 text-base rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-2 focus:outline-none focus:border-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-all duration-300 text-[var(--text-primary)]"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="Email" className="flex flex-col items-start justify-center w-full text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="Email"
                            id="Email"
                            required
                            className={`w-full h-12 text-base rounded-2xl border bg-[var(--bg-secondary)] px-4 py-2 focus:outline-none focus:border-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-all duration-300 text-[var(--text-primary)] ${error.toLowerCase().includes('email already exists') ? 'border-red-500' : 'border-[var(--border-color)]'}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="Password" className="flex flex-col items-start justify-center w-full text-sm font-medium text-[var(--text-secondary)] mb-1">Password</label>

                        <div className="w-full h-12 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] flex px-4 hover:border-[var(--text-secondary)] transition-all duration-300 items-center">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder={showPassword ? "Password" : "************"}
                                name="Password"
                                id="Password"
                                required
                                className="w-full text-base bg-transparent focus:outline-none text-[var(--text-primary)]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="ml-2 flex items-center justify-center transition-all duration-300 opacity-70 hover:opacity-100" onClick={() => setShowPassword(!showPassword)} type="button">
                                {showPassword ?
                                    <PasswordEyeOpen />
                                    :
                                    <PasswordEyeClosed />
                                }
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="RepeatPassword" className="flex flex-col items-start justify-center w-full text-sm font-medium text-[var(--text-secondary)] mb-1">Repeat Password</label>

                        <div className="w-full h-12 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] flex px-4 hover:border-[var(--text-secondary)] transition-all duration-300 items-center">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder={showPassword ? "Password" : "************"}
                                name="RepeatPassword"
                                id="RepeatPassword"
                                className="w-full text-base bg-transparent focus:outline-none text-[var(--text-primary)] "
                                value={repeatPassword}
                                required
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm w-full text-center">{error}</p>}

                    <button className="w-full h-12 text-lg rounded-full bg-[var(--text-primary)] px-4 font-semibold text-[var(--bg-primary)] transition-all duration-300 hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] mt-4" onClick={handleRegister}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    <p> Already have an account? <a href="/Login" className="text-[var(--text-primary)]">Login</a></p>
                </div>
                <hr className="w-full h-px my-6 bg-[var(--border-color)] border-none " />

                <GoogleButton />
            </section>
        </main>
    )
}
