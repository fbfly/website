import Head from 'next/head'
import { useUser } from '../lib/hooks'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  const user = useUser()

  return (
    <div>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="section">
        <div className="container">
          <Navbar></Navbar>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
