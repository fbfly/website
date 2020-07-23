import '../styles/connect.sass'
import Head from 'next/head'
import useSwr from 'swr'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
const axios = require('axios')

const fetcher = url => fetch(url).then(res => res.json())

const Dao = () => {
  const { data, error } = useSwr('/api/dao', fetcher)

  if (error) return <div>Failed to load daos...</div>
  if (!data) return <div>Loading...</div>

  async function btnClick() {
    await axios.post('/api/dao', {
      daoName: 'Fred',
      tokenName: 'Flintstone',
      tokenSymbol: 'FST',
      fbGroupId: '007',
      imageHash: 'IPFSHash',
    })
  }
  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <Navbar />
        <div className="connect-container">
          {data.map(dao => (
            <h1>{dao.daoName}</h1>
          ))}
          <button onClick={btnClick}>Botonsito</button>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Dao
