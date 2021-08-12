import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import styles from '../styles/Header.module.css'
import React from 'react'
import AuthContext from '../context/AuthContext'


const Header = () => {

    const router = useRouter()

    const goBack = (event) => {
        event.preventDefault()
        router.back()
    }

    const { user } = useContext(AuthContext)

    return (
    <div className={styles.nav}>
        { !(router.pathname === '/') && 
            <div className={styles.back}>
                <a href="#" onClick={goBack}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
            </div>
        }
        <div className={styles.title}>
            <Link href="/">
                <a>
                    <h1>
                        RestroManager
                    </h1>
                </a>
            </Link>
        </div>
        <div className={styles.auth}>
            {user? (
                <div className={styles.login}>
                <Link href="/account">
                    <a>{user.email}</a>
                </Link>
                </div>
            ) : (
                <div className={styles.login}>
                    <Link href="/login">
                        <a>Log in</a>
                    </Link>
                </div>
               
            )

            }
        </div>
    </div>
   
    )
}

export default Header