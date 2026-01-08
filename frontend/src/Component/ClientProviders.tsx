'use client'

import { ThemeProvider } from "@/context/ThemeContext"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export default function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    )
}
