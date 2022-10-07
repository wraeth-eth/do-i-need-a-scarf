import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Layout } from 'antd'

export default function NavBar() {
  return (
    <Layout.Header
      style={{
        padding: '0.5rem 2rem',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1>High Seas Gambling</h1>
      <ConnectButton accountStatus="avatar" chainStatus="icon" />
    </Layout.Header>
  )
}
