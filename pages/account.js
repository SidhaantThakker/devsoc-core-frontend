import Head from 'next/head'
import {useContext, useState, useEffect} from 'react'
import Link from 'next/link'
import AuthContext from '../context/AuthContext'
import { api_url } from '../utils/getApiUrl'
import { currencyFormat } from '../utils/currencyFormat'
import styles from '../styles/Account.module.css'

const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchOrders = async () => {
            if(user){
                try{
                    setLoading(true)
                    const token = await getToken()
                    const raworders = await fetch(`${api_url}/orders`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const parsedorders = await raworders.json()
                    setOrders(parsedorders)
                } catch(err){
                    console.log("Error while fetching orders")
                    console.log(err)
                    setOrders([])
                }
                setLoading(false)
            }
        }

        fetchOrders()
    }, [user])

    return { orders, loading }
}

const Account = () => {
    
    const { user, logoutUser, getToken } = useContext(AuthContext)
    const { orders, loading } = useOrders(user, getToken)
    const [net, setNet ] = useState(0)
    console.log("Account page - ", orders)

    useEffect(()=>{
        let temp = 0;
        orders.forEach(order => {
            temp+=order.total
        })
        setNet(temp)
    }, [orders])

    if(!user){
        return (
            <div>
                <p>Login to view account details</p>
            </div>
        )
    }
    
    return (
        <div className={"accountInfo"}>
            <Head>
                <title>Account Page</title>
            </Head>

            <h1>Account Page</h1>
            <hr></hr>
            <p>{user.email}</p>
            <a href="#" onClick={logoutUser} className={styles.logout}>Log Out</a>
            <hr></hr>
            <h2>Your Orders</h2>
            <hr></hr>
            {loading && <p>Loading your orders!</p>}
            {
                orders.map(order => (
                    <div key={order.id}>
                        {new Date(order.created_at).toLocaleDateString('en-GB')} {order.dish.name} {currencyFormat(order.total)}
                    </div>
                ))
            }
            <p> Total: {currencyFormat(net)}</p>
        </div>
    )
}

export default Account
