import { useContext } from 'react'
import router, { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'
import styles from '../styles/BuyButton.module.css'
import AuthContext from '../context/AuthContext'
import { STRIPE_PK } from '../utils/getStripePk'
import { api_url } from '../utils/getApiUrl'

const stripePromise = loadStripe(STRIPE_PK)

export default function BuyButton ({dish}) {
    
    const { user, getToken } = useContext(AuthContext)
    const router = useRouter()

    const goToLogin = () => {
        router.push('/login')
    }

    const handleBuy = async () => {
        const stripe = await stripePromise
        const token = await getToken()

        const res =  await fetch(`${api_url}/orders`,{
            method: 'POST',
            body: JSON.stringify({dish}),
            headers: {
                'Content-type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const session = await res.json()
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        })
    }

    return (
        <>
            {!user &&
                <button 
                className={styles.buy}
                onClick={goToLogin}>
                    Login To Order
                </button>
            }
            {user &&
                <button
                className={styles.buy}
                onClick={handleBuy}>
                    Buy
                </button>

            }
        </>
    )
}
