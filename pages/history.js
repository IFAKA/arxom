import React, { useContext } from 'react'
import { useMoralisQuery } from 'react-moralis'
import { PropagateLoader } from 'react-spinners'
import NoStateOf from '@components/NoStateOf'
import Receipt from '@components/Receipt'
import { ArxomContext } from '@context/ArxomContext'
import { styleOf } from '@styles/styles'

const History = () => {
  const { data, isLoading } = useMoralisQuery('_User')
  const { check, filterTerm } = useContext(ArxomContext)
  return (
    <>
      <div className={styleOf.title}>Purchase History</div>
      <div className={styleOf.receiptlist}>
        {check
          ? isLoading
            ? <PropagateLoader />
            : data[0]
              ? filterTerm(data[0].attributes.ownedAssets)
                .map((asset, i) => <Receipt key={i} asset={asset} />)
              : <NoStateOf>Purchase History</NoStateOf>
          : <NoStateOf>Sign, please login</NoStateOf>
        }
      </div>
    </>
  )
}

export default History