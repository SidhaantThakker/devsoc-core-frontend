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
                <a href="#" onClick={goBack}>Back</a>
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
                <Link href="/account">
                    <a>{user.email}</a>
                </Link>
            ) : (
                <Link href="/login">
                    <a>Log in</a>
                </Link>
            )

            }
        </div>
    </div>
   
    )
}

export default Header