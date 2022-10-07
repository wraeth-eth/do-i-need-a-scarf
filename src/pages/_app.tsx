import '@rainbow-me/rainbowkit/styles.css'
// import 'antd/dist/antd.css'

import '../styles/index.css'
import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { Layout } from 'antd'
import NavBar from '@components/NavBar/NavBar'
import { Head } from '@components/common'
import { useAccount, useNetwork, useProvider, useSigner, WagmiConfig } from 'wagmi'
import { chains, wagmiClient } from 'providers/chainProvider'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

function MyApp({ Component, pageProps }: AppProps) {
  const {} = useAccount()
  useNetwork()
  useSigner()
  useProvider()
  return (
    <>
      <Head />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Layout>
            <NavBar />
            <Layout.Content>
              <Component {...pageProps} />
            </Layout.Content>
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default MyApp
