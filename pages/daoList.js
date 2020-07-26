import DAOListView from '../components/DAOListView'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import MoralBrandLogo from '../public/images/section2.svg'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const DaoList = () => {
  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        {/* <Navbar /> */}
        <DAOListView />
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default DaoList
