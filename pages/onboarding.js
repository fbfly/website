import Card from '../components/Card'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Onboarding = () => {
  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <Navbar />
        <div className="connectContainer">
          <Card className="onboarding" />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Onboarding
