import '../styles/globals.css'

import { MoralisProvider } from 'react-moralis'
import Layout  from '@components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>
  )
}

export default MyApp
