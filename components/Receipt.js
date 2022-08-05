import React from 'react'
import Image from 'next/image'
import moment from 'moment'
import { styleOf } from '@styles/styles'

export const Receipt = ({ asset }) => {
  return (
    <div className={styleOf.receipt}>
      <div className={styleOf.name}>{asset.name}</div>
      <Image
        alt='item'
        width={210}
        height={190}
        src={asset.src}
        className={styleOf.receiptimg}
      />
      <div className={styleOf.price}>Bought on {moment(asset.purchaseDate).format('MM/DD/YY')}</div>
      <div className={styleOf.price}>Price: {asset.price} ARX</div>
      <a className={styleOf.secondarybtn} href={asset.etherscanLink} target='_blank' rel="noopener noreferrer">
        RECEIPT
      </a>
    </div>
  )
}
export default Receipt 