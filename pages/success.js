import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Head from "next/head"
import { api_url } from "../utils/getApiUrl"

const useOrder = (session_id) => {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true)
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
            setLoading(false)
        }
        fetchOrder()
    }, [session_id])

    return {order, loading}
}

export default function Success(){

    const router = useRouter()
    const { session_id } = router.query

    const { order, loading } = useOrder(session_id)

    return (
        <div>
            <Head>
                <title>Success!</title>
            </Head>
            <h1>Your payment was successful! Your food should arrive shortly!</h1>
            {loading && <p>Loading...</p>}
            {order && <p>Order placed with Order ID: {order.id}</p>}
        </div>
    )
}