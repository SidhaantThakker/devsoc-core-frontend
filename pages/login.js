import { loadGetInitialProps } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import styles from '../styles/Login.module.css'

const Login = () => {

    const [email, setEmail] = useState("")
    const { loginUser } = useContext(AuthContext)
    const handleSubmit = (event) => {
        event.preventDefault()
        loginUser(email)
    }

    return (
        <div className={styles.loginInfo}>
            <Head>
                <title>Login</title>
            </Head>

            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="email" 
                value={email} 
                onChange={(event)=>{
                    setEmail(event.target.value)
                }}
                placeholder="Your Email Address"
                className={styles.input}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login