import config from '@config/app_config'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: config.appName,
  chains,
})

export const wagmiClient = createClient({ autoConnect: true, connectors, provider })
