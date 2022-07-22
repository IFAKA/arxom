import { ethers } from "ethers"
import { createContext, useCallback, useEffect, useState } from "react"
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { arxomCoinAddress, arxomAbi } from '../lib/constants'

export const ArxomContext = createContext()

export const ArxomProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formattedAccount, setFormattedAccount] = useState('')
    const [balance, setBalance] = useState('')
    const [tokenAmount, setTokenAmount] = useState('')
    const [amountDue, setAmountDue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [etherscanLink, setEtherscanLink] = useState('')
    const [nickname, setNickname] = useState('')
    const [username, setUsername] = useState('')
    const [assets, setAssets] = useState([])
    const [recentTransactions, setRecentTransactions] = useState([])
    const [ownedItems, setOwnedItems] = useState([])

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

    const getBalance = useCallback(async () => {
        try {
            if (!isAuthenticated || !currentAccount) {
                return
            }

            const options = {
                contractAddress: arxomCoinAddress,
                functionName: 'balanceOf',
                abi: arxomAbi,
                params: {
                    account: currentAccount
                }
            }

            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options)
                setBalance(response.toString())
            }

        } catch (error) {
            console.log(error)
        }
    }, [Moralis, currentAccount, isAuthenticated, isWeb3Enabled])

    const buyTokens = async () => {
        !isAuthenticated && await authenticate()

        const amount = ethers.BigNumber.from(tokenAmount)
        const price = ethers.BigNumber.from('100000000000000')
        const calcPrice = amount.mul(price)

        const options = {
            contractAddress: arxomCoinAddress,
            functionName: 'mint',
            abi: arxomAbi,
            msgValue: calcPrice,
            params: { amount }
        }

        const transaction = await Moralis.executeFunction(options)
        const receipt = await transaction.wait(4)

        setIsLoading(false)
        setEtherscanLink(`https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`)
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
                await getBalance()
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
                const account = await user?.get('ethAddress')
                setCurrentAccount(account)
            } else {
                setCurrentAccount('')
                setBalance('')
            }
        })()
    }, [isWeb3Enabled, isAuthenticated, balance, setBalance, authenticate, currentAccount, setUsername, user, username, getBalance])

    useEffect(() => {
        ; (async () => {
            if (isWeb3Enabled) {
                await getAssets()
            }
        })()
    }, [assetsData, assetsDataIsLoading, isWeb3Enabled, getAssets, setAssets, enableWeb3])

    return (
        <ArxomContext.Provider value={{
            formattedAccount,
            isAuthenticated,
            buyTokens,
            getBalance,
            balance,
            setTokenAmount,
            tokenAmount,
            amountDue,
            setAmountDue,
            isLoading,
            setIsLoading,
            setEtherscanLink,
            etherscanLink,
            // buyAsset,
            currentAccount,
            nickname,
            setNickname,
            username,
            setUsername,
            handleSetUsername,
            assets,
            recentTransactions,
            ownedItems,
        }}>
            {children}
        </ArxomContext.Provider>
    )
}