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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> Buy
                </button>

            }
        </>
    )
}
