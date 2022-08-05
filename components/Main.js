import { styleOf } from '@styles/styles'
import React from 'react'

export const Main = ({ children }) => {
  return (
    <div className={styleOf.main}>
      <div className={styleOf.mainContent}>
        {children}
      </div>
    </div>
  )
}
export default Main
