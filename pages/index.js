import Head from 'next/head'
import { useUser } from '../lib/hooks'
import '../styles/styles.sass'

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
          <h1 className="title">Facebook Fly</h1>
        </div>
      </section>
    </div>
  )
}

export default Home
