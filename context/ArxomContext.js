import { createContext, useEffect, useState } from "react"
import { arxomCoinAddress, arxomAbi } from '../lib/constants'
import { useMoralis } from 'react-moralis'
import { useRouter } from "next/router"

export const ArxomContext = createContext()

export const ArxomProvider = ({ children }) => {
  const [term, setTerm] = useState('')
  const [balance, setBalance] = useState(0)
  const { Moralis, enableWeb3, isWeb3Enabled, isAuthenticated, user } = useMoralis()
  const { pathname } = useRouter()
  const check = isWeb3Enabled && isAuthenticated && user


  const updateBalance = async () => {
    if (check) {
      const account = await user?.get('ethAddress')
      const options = {
        contractAddress: arxomCoinAddress,
        functionName: 'balanceOf',
        abi: arxomAbi,
        params: { account }
      }
      const res = await Moralis.executeFunction(options)
      setBalance(Number(res))
    }
  }


  const searchTerm = (e) => setTerm(e.target.value.toLowerCase())
  const resetSearch = () => setTerm("")
  const filterTerm = (data) => {
    return data.filter(item => {
      if (term == "") return item
      if (item.attributes && item.attributes.name.toLowerCase().includes(term)) return item
      if (item.name && item.name.toLowerCase().includes(term)) return item
    })
  }


  useEffect(() => { pathname && resetSearch() }, [pathname])

  useEffect(() => {
    (async () => !check && await enableWeb3())()
    check && updateBalance()
  }, [check])


  return (
    <ArxomContext.Provider value={{
      check,
      balance,
      term,
      resetSearch,
      searchTerm,
      filterTerm,
      updateBalance
    }}>
      {children}
    </ArxomContext.Provider>
  )
}