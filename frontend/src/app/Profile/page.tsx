'use client'
import React, { useState } from "react";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProfilePhoto from "@/icon/ProfilePhoto.webp";

export default function Profile() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState<'general' | 'security'>('general');

    const [formData, setFormData] = useState({
        username: "shortuser", // Mock data, replace with session/api data
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="flex flex-col min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
            <Header />

            <div className="flex-1 w-full max-w-5xl mx-auto px-4 pt-28 pb-12">

                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">My Profile</h1>
                <p className="text-[var(--text-secondary)] mb-8 text-lg">Manage your account settings and preferences.</p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Sidebar / User Card */}
                    <aside className="md:col-span-4 lg:col-span-3 space-y-6">
                        <div className="bg-[var(--bg-secondary)] ring-1 ring-[var(--border-color)]/50 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
                            <div className="relative w-28 h-28 mb-4 group cursor-pointer">
                                <Image
                                    src={session?.user?.image || ProfilePhoto}
                                    alt="Profile"
                                    fill
                                    className="object-cover rounded-full ring-4 ring-[var(--bg-tertiary)] group-hover:ring-indigo-500 transition-all duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)]">{session?.user?.name || "User"}</h2>
                            <p className="text-[var(--text-secondary)] text-sm">{session?.user?.email || "user@example.com"}</p>

                            <div className="mt-6 w-full pt-6 border-t border-[var(--border-color)]/20 flex flex-col gap-2">
                                <button
                                    onClick={() => setActiveTab('general')}
                                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/50'}`}
                                >
                                    General Information
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/50'}`}
                                >
                                    Security & Password
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <section className="md:col-span-8 lg:col-span-9">
                        <div className="bg-[var(--bg-secondary)] ring-1 ring-[var(--border-color)]/50 rounded-2xl p-8 shadow-sm min-h-[500px]">
                            {activeTab === 'general' && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="border-b border-[var(--border-color)]/20 pb-4">
                                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">General Information</h3>
                                        <p className="text-[var(--text-secondary)] text-sm">Update your public profile information.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[var(--text-primary)]">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[var(--text-primary)]">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-[var(--text-primary)]">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                disabled
                                                value={formData.email}
                                                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-tertiary)]/50 border border-[var(--border-color)] text-[var(--text-secondary)] cursor-not-allowed"
                                            />
                                            <p className="text-xs text-[var(--text-secondary)]">Email cannot be changed directly for security reasons.</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button className="px-6 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/10">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="border-b border-[var(--border-color)]/20 pb-4">
                                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">Security</h3>
                                        <p className="text-[var(--text-secondary)] text-sm">Manage your password and account security.</p>
                                    </div>

                                    <div className="space-y-6 max-w-lg">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[var(--text-primary)]">Current Password</label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[var(--text-primary)]">New Password</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[var(--text-primary)]">Confirm New Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4 border-t border-[var(--border-color)]/20 mt-8">
                                        <button className="px-6 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/10">
                                            Update Password
                                        </button>
                                    </div>

                                    <div className="mt-10 pt-10 border-t border-[var(--border-color)]/20">
                                        <h4 className="text-red-500 font-semibold mb-2">Danger Zone</h4>
                                        <p className="text-[var(--text-secondary)] text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                        <button className="px-5 py-2 border border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10 font-medium rounded-xl transition-colors text-sm">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    )
}
