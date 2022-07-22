import React, { useContext } from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import logo from '../assets/logotype.png'
import Image from 'next/image'
import { IoMdSearch } from 'react-icons/io'
import { ArxomContext } from '../context/ArxomContext'
import { FaCoins } from 'react-icons/fa'
import {
  ModalProvider,
  Modal,
  useModal,
  ModalTransition,
} from 'react-simple-hook-modal'
import 'react-simple-hook-modal/dist/styles.css'
import BuyModal from './BuyModal'

export const Header = () => {
  const styles = {
    container: `h-[60px] w-full flex items-center gap-5 px-16`,
    logo: `flex items-center ml-[20px] cursor-pointer flex-1`,
    search: `p-[25px] w-[300px] h-[40px] bg-white rounded-full shadow-lg flex flex items-center border border-black`,
    searchInput: `bg-transparent focus:outline-none border-none flex-1 items-center flex`,
    menu: `flex items-center gap-6`,
    menuItem: `flex items-center text-md font-bold cursor-pointer`,
    coins: `ml-[10px]`,
  }

  const { balance, buyTokens } = useContext(ArxomContext)
  const { openModal, isModalOpen, closeModal } = useModal()

  return (
    // <ModalProvider>
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src={logo}
          alt='arxom'
          height={100}
          width={100}
          className='object-cover'
        />
      </div>
      <div className={styles.search}>
        <input
          type='text'
          placeholder='Search Your Assets...'
          className={styles.searchInput}
        />
        <IoMdSearch fontSize={20} />
      </div>
      <div className={styles.menu}>
        <div className={styles.menuItem}>New Releases</div>
        <div className={styles.menuItem}>Featured</div>
        {balance ? (
          <div
            className={(styles.balance, styles.menuItem)}
            onClick={openModal}
          >
            {balance} ARX
            <FaCoins className={styles.coins} />
            <Modal id='buyToken' isOpen={isModalOpen} transition={ModalTransition.SCALE}>
              <BuyModal close={closeModal} buyTokens={buyTokens} />
              {console.log('modal')}
            </Modal>
          </div>
        ) : (
          <div
            className={(styles.balance, styles.menuItem)}
            onClick={openModal}
          >
            0 AC <FaCoins className={styles.coins} />
            <Modal id='buyTokenFirstTime' isOpen={isModalOpen} transition={ModalTransition.SCALE}>
              <BuyModal close={closeModal} buyTokens={buyTokens} />
            </Modal>
          </div>
        )}
        <CgMenuGridO fontSize={30} className={styles.menuItem} />
      </div>
    </div>
    // </ModalProvider>
  )
}