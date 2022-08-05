import React from 'react'
import Header  from '@components/Header'
import { ArxomProvider } from '../context/ArxomContext'
import { ModalProvider } from 'react-simple-hook-modal'
import { Main } from '@components/Main'

const Layout = ({ children }) => {
  return (
    <ArxomProvider>
      <ModalProvider>
        <Header />
        <Main>{children}</Main>
      </ModalProvider>
    </ArxomProvider>
  )
}

export default Layout 