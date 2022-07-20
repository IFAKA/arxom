import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import isotype from '../assets/isotype.png'
import logotype from '../assets/logotype.png'
import { ConnectButton } from 'web3uikit'
import { FaBox } from 'react-icons/fa'
import { BsFillPersonFill, BsFillBookmarkFill } from 'react-icons/bs'
import { AiOutlineHistory } from 'react-icons/ai'
import { ArxomContext } from '../context/ArxomContext'

const styles = {
  container: `h-full w-[300px] flex flex-col bg-[#fff] static`,
  profile: `shadow-md w-full py-10 flex flex-col justify-center items-center rounded-r-3xl bg-gradient-to-t from-[#FF6A00] to-[#FFD700] mt-[40px] mb-[50px] border-2 border-[#fb9701]`,
  profilePicContainer: `flex rounded-xl items-center justify-center w-full h-full mb-3`,
  profilePic: `rounded-3xl object-cover`,
  welcome: `text-md mb-4 font-bold text-2xl text-white`,
  walletAddress: `text-xl flex w-full justify-center font-extrabold mb-4`,
  menu: `flex flex-col w-full h-full px-10 gap-8`,
  menuItem: `flex items-center text-lg font-bold cursor-pointer gap-4`,
  logo: `mr-4 flex object-cover`,
  companyName: `text-lg font-bold flex flex-1 pl-10 items-center mt-[20px]`,
  usernameInput: `bg-transparent border-white border-2 rounded-lg w-[80%] py-2 px-4 text-lg mt-[20px] placeholder:text-white focus:outline-none flex justify-center items-center text-white`,
  username: `flex items-center w-full justify-center`,
  setNickname: `text-lg font-bold flex flex-1 items-center mt-[20px] mb-[20px] text-white`,
}

export const Sidebar = () => {
  const {
    isAuthenticated,
    nickname,
    setNickname,
    username,
    handleSetUsername
  } = useContext(ArxomContext)
  
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {isAuthenticated && (
          <>
            <div className={styles.profilePicContainer}>
              <Image
                src={`https://avatars.dicebear.com/api/pixel-art/${username}.svg`}
                alt='profile'
                className={styles.profilePic}
                height={80}
                width={80}
              />
            </div>
            {!username ? (
              <>
                <div className={styles.username}>
                  <input
                    type={'text'}
                    placeholder='Username'
                    className={styles.usernameInput}
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                  />
                </div>
                <button
                  className={styles.setNickname}
                  onClick={handleSetUsername}
                >
                  CHANGE
                </button>
              </>
            ) : (
              <div>
                <div className={styles.welcome}>{username}</div>
              </div>
            )}
          </>
        )}
        <div className={styles.ConnectButton}>
          <ConnectButton />
        </div>
      </div>
      <div className={styles.menu}>
        <Link href='/'>
          <div className={styles.menuItem}>
            <Image
              alt='isotype'
              src={isotype}
              height={20}
              width={20}
              className={styles.logo}
            />
            My board
          </div>
        </Link>

        <div className={styles.menuItem}>
          <FaBox color="#FF6A00"/>
          Collections
        </div>
        <div className={styles.menuItem}>
          <BsFillBookmarkFill color="#FF6A00"/>
          Saved
        </div>
        <div className={styles.menuItem}>
          <BsFillPersonFill color="#FF6A00"/>
          Profile
        </div>
        <Link href='/history'>
          <div className={styles.menuItem}>
            <AiOutlineHistory color="#FF6A00"/>
            History
          </div>
        </Link>
      </div>
      <div className={styles.companyName}>
        <Image src={logotype} alt='arxom' height={100} width={100} />
      </div>
    </div>

  )
}