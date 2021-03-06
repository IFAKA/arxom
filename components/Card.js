import React, { useContext } from 'react'
import Image from 'next/image'
import { FaCoins } from 'react-icons/fa'
import { ArxomContext } from '../context/ArxomContext'

const styles = {
    cardContainer: 'flex flex-col',
    card: 'h-[250px] w-[190px] rounded-3xl flex cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden border border-black shadow-xl border-4 border-[#fb9701]',
    cardTitle:'text-xl font-bold flex text-center w-full flex-1 justify-center mt-[10px]',
    price:'text-md font-bold flex justify-center',
    coins:'ml-[7px] mt-[4px]'
}

export const Card = ({ item }) => {
    const {buyAsset} = useContext(ArxomContext)
    return (
        <div className={styles.cardContainer}>
            <div className={styles.card} onClick={()=>buyAsset(item.price, item)} >
                <Image
                    src={item.src}
                    className={'object-cover object-center'}
                    width={190}
                    height={250}
                    alt='product'
                />
            </div>
            <div>
                <div className={styles.cardTitle}>{item.name}</div>
                <div className={styles.price}>{item.price} ARX <FaCoins className={styles.coins} /></div>
            </div>
        </div>
    )
}