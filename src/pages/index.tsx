import { StoreContext } from 'components/StoreContext'
import Head from 'next/head'
import { memo, useContext } from 'react'

const Home = memo(function Home() {
  return (
    <div>
      <Head>
        <title>TODO LIST</title>
        <meta name="description" content="TODO LIST with nested items" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
})

export default Home
