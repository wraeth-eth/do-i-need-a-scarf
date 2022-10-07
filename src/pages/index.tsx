import { Button } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Crypto Bets</h1>
        <Button size="large">Create game</Button>

        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Curabitur &rarr;</h2>
            <p>Vivamus posuere dui at laoreet varius.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Donec &rarr;</h2>
            <p>Pellentesque finibus est vitae neque auctor, at pellentesque ante vehicula.</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/canary/examples" className={styles.card}>
            <h2>Curabitur &rarr;</h2>
            <p>Curabitur molestie ac urna et vulputate.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Integer &rarr;</h2>
            <p>Cras varius egestas aliquam.</p>
          </a>
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home
