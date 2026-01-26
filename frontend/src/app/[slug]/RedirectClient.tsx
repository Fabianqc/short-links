"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
    url: string
}
function getDomain(url: string) {
    try {
        const domain = new URL(url).hostname;
        return domain.replace("www.", "");
    } catch {
        return "unknown";
    }
}

export default function RedirectClient({ url }: Props) {
    const [countdown, setCountdown] = useState(5) 
    const router = useRouter()

    useEffect(() => {
        if (countdown <= 0) {
            router.push(url)
            return
        }
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 10)

        return () => clearInterval(timer)
    }, [countdown])


const domain = getDomain(url)
const text = `You are being redirected to : ${domain} in ${countdown} seconds`
    return (
        <div className="flex justify-center items-center h-screen text-[var(--text-primary)]">
            <p>{text}</p>
        </div>
    )
}
