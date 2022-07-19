import { createContext, useCallback, useEffect, useState } from "react"
import { useMoralis, useMoralisQuery } from 'react-moralis'

export const ArxomContext = createContext()

export const ArxomProvider = ({ children }) => {
    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')
    const [assets, setAssets] = useState([])

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled
    } = useMoralis()

    const {
        data: assetsData,
        error: assetsDataError,
        isLoading: assetsDataIsLoading
    } = useMoralisQuery('assets')

    const handleSetUsername = () => {
        user ?
            nickname ? (
                user.set('nickname', nickname),
                user.save(),
                setNickname('')
            ) : console.log("Can't set empty nickname")
            : console.log('No user')
    }

    const getAssets = useCallback(async () => {
        try {
            await enableWeb3()
            setAssets(assetsData)
        } catch (error) {
            console.log(error)
        }
    }, [assetsData, enableWeb3])

    useEffect(() => {
        ; (async () => {
            if (isAuthenticated) {
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })()
    }, [isAuthenticated, user, username])

    useEffect(() => {
        ; (async () => {
            if (isWeb3Enabled) {
                await getAssets()
            }
        })()
    }, [getAssets, isWeb3Enabled])

    return (
        <ArxomContext.Provider value={{
            isAuthenticated,
            nickname,
            setNickname,
            username,
            handleSetUsername,
            assets
        }}>
            {children}
        </ArxomContext.Provider>
    )
}