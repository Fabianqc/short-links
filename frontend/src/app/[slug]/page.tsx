import RedirectClient from "./RedirectClient"
import axios from "axios"
import { headers } from "next/headers"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug
    try {
        const headersList = await headers();
        const userAgent = headersList.get('user-agent') || '';
        const xForwardedFor = headersList.get('x-forwarded-for') || '';
        const referer = headersList.get('referer') || '';

        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/eventlinks/${slug}`, {
            headers: {
                'User-Agent': userAgent,
                'X-Forwarded-For': xForwardedFor,
                'Referer': referer
            }
        })
        if (response.status !== 200) {
            return <div className="flex justify-center items-center h-screen">Not found</div>
        }
        return <RedirectClient url={response.data} />
    } catch (error) {
        return <div className="flex justify-center items-center h-screen">Something went wrong or this link doesn't exist</div>
    }
}
