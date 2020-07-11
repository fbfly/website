import Head from 'next/head'
import Footer from '../components/Footer'
import MainSection from '../components/MainSection'
import StartNow from '../components/StartNow'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <Navbar />
        <MainSection />
        <StartNow />
        <Footer />
      </div>
    </>
  )
}

export default Home
