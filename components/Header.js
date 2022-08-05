import 'react-simple-hook-modal/dist/styles.css'
import React, { useContext } from 'react'
import Link from 'next/link'
import logo from '../assets/logotype.png'
import Image from 'next/image'
import { Modal, ModalTransition } from 'react-simple-hook-modal'
import { useModal } from 'react-simple-hook-modal'
import { ConnectButton } from 'web3uikit'
import { IoMdSearch } from 'react-icons/io'
import { ArxomContext } from '@context/ArxomContext'
import { styleOf } from '@styles/styles'
import BuyModal from '@components/BuyModal'

export const Header = () => {
  const { check, balance, searchTerm, term } = useContext(ArxomContext)
  const { openModal, isModalOpen, closeModal } = useModal()

  return (
    <div className={styleOf.header}>

      <div className={styleOf.menu}>
        <Image src={logo} alt='arxom' height={100} width={100} />
        <div className={styleOf.search}>
          <input value={term} onChange={searchTerm} className='focus:outline-none' type='text' placeholder='Search Your Assets...' /> <IoMdSearch fontSize={20} /> </div>
      </div>

      <div className={styleOf.menu}>
        {check &&
          <>
            <Link href='/'>Board</Link>
            <Link href='/history'>History</Link>
            <button onClick={openModal}>{balance} ARX</button>
          </>
        }
        <ConnectButton />
      </div >

      <Modal isOpen={isModalOpen} transition={ModalTransition.NONE} id='buyTokens'>
        <BuyModal close={closeModal} /> </Modal>

    </div >
  )
}
export default Header 