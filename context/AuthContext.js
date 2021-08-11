import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Magic, MagicOutgoingWindowMessage } from 'magic-sdk'
import { magic_pub_key } from "../utils/getPublicKey"

const AuthContext = createContext()

let magic
export const AuthProvider = (props) => {

    const [user, setUser] = useState(null)

    const router = useRouter()

    const loginUser = async (email) => {
        try{
            await magic.auth.loginWithMagicLink({ email })
            setUser({ email })
            router.push('/')
        } catch(err) {
            setUser(null)
            console.log("Login Failed")
            console.log(err)
        }
    }

    const logoutUser = async () => {
        try {
            await magic.user.logout()
            setUser(null)
            router.push('/')
        } catch(err) {
            console.log("Logout Failed")
            console.log(err)
        }
    }

    const checkUserLoggedIn = async () => {
        try{
            const loggedIn = await magic.user.isLoggedIn()
            if(loggedIn){
                const { email } = await magic.user.getMetadata()
                setUser({ email })
            }
        } catch (err) {
            console.log("Error with persisting login")
            console.log(err)
        }
        const token = await getToken()
        console.log("checkuser token", token)
    }

    const getToken = async () => {
        try{
            const token = await magic.user.getIdToken()
            return token
        } catch(err){
            console.log("Error while fetching Magic token")
            console.log(err)
        }
    }

    useEffect(() => {
        magic = new Magic(magic_pub_key)
        checkUserLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{user, loginUser, logoutUser, getToken}}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext