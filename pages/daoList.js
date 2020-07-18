import DAOListView from '../components/DAOListView'
import '../styles/connect.sass'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'

const Onboarding = () => {
  const data = {
    name: 'Ethical Brand',
    logo: EthicalBrandLogo,
    description:
      'Fast fashion is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.',
    members: '28',
    capital: '552$',
    votes: '82',
  }
  const list = [data, data]
  return (
    <>
      {/* <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <Navbar />
        <div className="connect-container"> */}
          <DAOListView list={list}/>
        {/* </div>
        <Footer />
      </div> */}
    </>
  )
}

export default Onboarding