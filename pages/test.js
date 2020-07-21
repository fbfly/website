import '../styles/connect.sass'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import main from '../lib/createDao'

const Test = () => {
  const [web3Obj, setWeb3Obj] = useState(null)
  useEffect(() => {
    async function loadTorus() {
      const { default: web3Obj } = await import('../lib/torus')
      setWeb3Obj(web3Obj)
    }
    loadTorus()
  }, [])

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
              await web3Obj.initialize('rinkeby')
            }}
          >
            Login
          </button>
          <button
            onClick={async () => {
              await main(web3Obj.provider)
                .then()
                .catch(err => {
                  console.log(`Error: `, err)
                  console.log(
                    '\nPlease report any problem to https://github.com/aragon/connect/issues',
                  )
                })
            }}
          >
            Create DAO
          </button>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Test
