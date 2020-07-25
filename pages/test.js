import Head from 'next/head'
import '../styles/connect.sass'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useState } from 'react'
const axios = require('axios')

const Test = () => {
  const [orgAddress, setOrgAddress] = useState('')

  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <Navbar />
        <div className="connect-container">
          <button
            onClick={async () => {
              await axios
                .post('/api/dao', {
                  daoName: 'Pica Pollo',
                  description: 'Best DAO',
                  tokenName: 'Flintstone',
                  tokenSymbol: 'FST',
                  fbGroupId: 'MyGroupId',
                  fbGroulURL: 'MyGroupURL',
                  imageHash: 'IPFSHash',
                })
                .then(orgAddress => setOrgAddress(orgAddress))
            }}
          >
            Create DAO
          </button>
          <h1>Org Address {orgAddress}</h1>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Test
