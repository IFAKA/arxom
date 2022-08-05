import React, { useContext } from 'react'
import { useMoralisQuery } from "react-moralis"
import { PropagateLoader } from "react-spinners"
import Card from '@components/Card'
import { styleOf } from '@styles/styles'
import NoStateOf from './NoStateOf'
import { ArxomContext } from '@context/ArxomContext'

export const Cards = () => {
  const { data, isLoading } = useMoralisQuery('assets')
  const { filterTerm } = useContext(ArxomContext)
  return (
    <>
      <div className={styleOf.title}>New Release</div>
      <div className={styleOf.list}>
        {isLoading
          ? <PropagateLoader />
          : data
            ? filterTerm(data)
              .map(item => <Card key={item.id} asset={item.attributes} />)
            : <NoStateOf>data, please reload</NoStateOf>
        }
      </div>
    </>
  )
}
export default Cards