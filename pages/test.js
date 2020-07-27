import Head from 'next/head'
import '../styles/connect.sass'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useState } from 'react'
const axios = require('axios')

const Test = () => {
  const [orgAddress, setOrgAddress] = useState(
    '0x1F98b94eE21470A2A19aCFCeBeD8840436c35a54',
  )

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
                .post('/api/dao/join', {
                  daoAddress: orgAddress,
                  torusAccount: '0xB298bF415FFE9B2BAF0e3f86AFb1777E9f57e6D7',
                })
                .then()
                .catch(error => {
                  console.log('Error:', error)
                })
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
