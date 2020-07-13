import '../styles/connect.sass'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { main } from '../lib/createDao'

const Test = () => {
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
              await main()
                .then(() => process.exit(0))
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
