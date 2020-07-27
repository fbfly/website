import Head from 'next/head'
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
        <div className="connectContainer">
          <button
            onClick={async () => {
              await axios
                .post('/api/dao', {
                  daoName: 'Newly DAO',
                  description: 'Brand new',
                  tokenName: 'Newly Token',
                  tokenSymbol: 'NWT',
                  imageHash:
                    'bafybeibjvfp3agnjyxvs2lchivc7gw6ajldg4tjd7rthula3z273i75qmy',
                  fbGroupId: 'fbGroupId',
                  fbGroulURL: 'http://facebook.com/groups/fbGroupId',
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
