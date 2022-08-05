import React, { useContext } from 'react'
import Image from 'next/image'
import { ArxomContext } from '@context/ArxomContext'
import { arxomCoinAddress } from '../lib/constants'
import { styleOf } from '@styles/styles'
import { useMoralis, useMoralisQuery } from 'react-moralis'

export const Card = ({ asset }) => {
  const { price, name, src } = asset
  const { updateBalance } = useContext(ArxomContext)
  const { data } = useMoralisQuery('_User')
  const { Moralis } = useMoralis()

  const buyAsset = async () => {
    const opt = {
      type: 'erc20',
      amount: price,
      receiver: arxomCoinAddress,
      contractAddress: arxomCoinAddress
    }
    const tx = await Moralis.transfer(opt)
    const receipt = await tx.wait()

    updateBalance()

    const res = data[0]?.add('ownedAssets', {
      ...asset,
      purchaseDate: Date.now(),
      etherscanLink: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
    })

    await res.save().then(() => console.log('Successfull purchase!'))
  }

  return (
    <div>
      <div className={styleOf.card}>
        <Image
          src={src}
          width={190}
          height={250}
          alt='product'
          className={styleOf.card}
          onClick={buyAsset}
        />
      </div>
      <div className={styleOf.name}>{name}</div>
      <div className={styleOf.price}>{price} ARX</div>
    </div>
  )
}
export default Card 