import '../styles/globals.css'

import { MoralisProvider } from 'react-moralis'
import { ArxomProvider } from '../context/ArxomContext'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL} appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID} >
      <ArxomProvider>
        <Component {...pageProps} />
      </ArxomProvider>
    </MoralisProvider>
  )
}

export default MyApp
