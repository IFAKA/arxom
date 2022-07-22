import '../styles/globals.css'

import { MoralisProvider } from 'react-moralis'
import { ArxomProvider } from '../context/ArxomContext'
import { ModalProvider } from 'react-simple-hook-modal'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL} appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID} >
      <ArxomProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </ArxomProvider>
    </MoralisProvider>
  )
}

export default MyApp
