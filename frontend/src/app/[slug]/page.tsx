import RedirectClient from "./RedirectClient"
import axios from "axios"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/eventlinks/${slug}`)
        if (response.status !== 200) {
            return <div className="flex justify-center items-center h-screen">Not found</div>
        }
        return <RedirectClient url={response.data} />
    } catch (error) {
        return <div className="flex justify-center items-center h-screen">Something went wrong or this link doesn't exist</div>
    }
}
