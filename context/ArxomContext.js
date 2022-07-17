import { createContext, useEffect, useState } from "react"
import { useMoralis, useMoralisQuery } from 'react-moralis'

export const ArxomContext = createContext()

export const ArxomProvider = ({ children }) => {
    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled
    } = useMoralis()

    useEffect(() => {
        ; (async () => {
            if (isAuthenticated) {
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })()
    }, [isAuthenticated, user, username])

    const handleSetUsername = () => {
        user ?
            nickname ? (
                user.set('nickname', nickname),
                user.save(),
                setNickname('')
            ) : console.log("Can't set empty nickname")
            : console.log('No user')
    }

    return (
        <ArxomContext.Provider value={{
            isAuthenticated,
            nickname,
            setNickname,
            username,
            handleSetUsername
        }}>
            {children}
        </ArxomContext.Provider>
    )
}