import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Head from "next/head"
import { api_url } from "../utils/getApiUrl"

const useOrder = (session_id) => {
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try{
                const res = await fetch(`${api_url}/orders/confirm`, {
                    method: `POST`,
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify({checkout_session: session_id})
                })
                const data = await res.json()
                setOrder(data)
            } catch(err) {
                setOrder(null)
            }
        }
        fetchOrder()
    }, [session_id])

    return {order}
}

export default function Success(){

    const router = useRouter()
    const { session_id } = router.query

    const { order } = useOrder(session_id)

    const goToHome = (event) => {
        event.preventDefault()
        router.push("/")
    }

    return (
        <div className={"padding"}>
            <Head>
                <title>Success!</title>
            </Head>
            <h1 >Your payment was successful! Your food should arrive shortly!</h1>
            <a href="#" onClick={goToHome} className={"backHome"}>Back to Home</a>
        </div>
    )
}