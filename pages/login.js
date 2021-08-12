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
            <div className={styles.loginBox}>
                <h1 className={styles.loginTitle}>Login</h1> 
                <hr className={styles.hr}></hr>
                <form onSubmit={handleSubmit}>
                    <input
                    type="email" 
                    value={email} 
                    onChange={(event)=>{
                        setEmail(event.target.value)
                    }}
                    placeholder="Your Email Address"
                    className={styles.inputBox}/>
                    <br></br>
                    <button type="submit" className={styles.loginButton}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login