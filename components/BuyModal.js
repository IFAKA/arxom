import React, { useContext, useState } from 'react'
import { ethers } from 'ethers'
import { IoIosClose } from 'react-icons/io'
import { HashLoader } from 'react-spinners'
import { arxomCoinAddress, arxomAbi } from '../lib/constants'
import { ArxomContext } from '@context/ArxomContext'
import { styleOf } from '@styles/styles'
import { useMoralis } from 'react-moralis'

const initState = {
  eth: 0.0000.toFixed(4),
  arx: '',
  receipt: '',
  loading: false,
}

const BuyModal = ({ close }) => {
  const { updateBalance } = useContext(ArxomContext)
  const [tokenState, setTokenState] = useState(initState)
  const { Moralis } = useMoralis()
  const { eth, arx, receipt, loading } = tokenState

  const buyTokens = async () => {
    setTokenState(s => ({ ...s, loading: true }))
    const amount = ethers.BigNumber.from(arx)
    const price = amount.mul(ethers.BigNumber.from('100000000000000'))

    const opt = {
      contractAddress: arxomCoinAddress,
      functionName: 'mint',
      abi: arxomAbi,
      msgValue: price,
      params: { amount }
    }

    const tx = await Moralis.executeFunction(opt)
    const receipt = await tx.wait()

    updateBalance()
    setTokenState(s => ({
      ...s,
      loading: false,
      receipt: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
    }))
  }

  const handleTokenAmount = (e) => {
    const arx = Math.abs(e.target.value)
    const eth = parseFloat(arx * 0.0001).toFixed(4)
    setTokenState(s => ({ ...s, arx, eth }))
  }

  const resetModalState = () => (setTokenState(initState), close())

  return (
    loading
      ? <div className={styleOf.loadingModal}><HashLoader size={80} /></div>
      :
      <>
        <div className={styleOf.between}>
          <div className={styleOf.name}>Buy Arxom Coins Here!</div>
          <button onClick={resetModalState}><IoIosClose fontSize={40} /></button>
        </div>

        <div className={styleOf.description}>Select how many tokens you would like to buy.</div>

        <input className={styleOf.input} placeholder='Amount...' min={0} type='number' value={arx}
          onChange={handleTokenAmount} />

        <div className={styleOf.price}>Total Due: {eth} ETH</div>

        <button className={styleOf.primarybtn} disabled={arx < 1}
          onClick={buyTokens}
        >BUY</button>

        {receipt &&
          <>
            <div className={styleOf.description}>Transaction Sucessful! Check out your receipt for your transaction below!</div>
            <a href={receipt} className={styleOf.link} target='_blank' rel="noreferrer">RECEIPT</a>
          </>
        }
      </>
  )
}


export default BuyModal