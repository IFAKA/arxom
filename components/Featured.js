import { styleOf } from '@styles/styles'
import React from 'react'

export const Featured = () => {
  return (
    <>
      <div className={styleOf.title}>Top Assets</div>
      <div className={styleOf.list}>
        <div>
          <video autoPlay loop className={styleOf.card}>
            <source src='https://openseauserdata.com/files/3565db33a856b19f48396062e59e6d62.mp4#t=0.001' />
          </video>
          <div className={styleOf.name}>Adidas #34</div>
          <div className={styleOf.price}>100 ARX</div>
        </div>
        <div>
          <video autoPlay loop className={styleOf.card}>
            <source src='https://openseauserdata.com/files/894fd3d49c7c258d202a22bb710a3416.mp4#t=0.001' />
          </video>
          <div className={styleOf.name}>Mirrorization</div>
          <div className={styleOf.price}>50 ARX</div>
        </div>
        <div>
          <video autoPlay loop className={styleOf.card}>
            <source src='https://openseauserdata.com/files/022c0aad904ddbd8884b12468aaaad28.mp4#t=0.001' />
          </video>
          <div className={styleOf.name}>Lightbuld</div>
          <div className={styleOf.price}>30 ARX</div>
        </div>
      </div>
    </>
  )
}
export default Featured 