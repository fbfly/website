import Head from 'next/head'
import Card from '../components/Card'
import '../styles/connect.sass'

const Connect = () => {

  return (
    <>
      <Head>
        <title>Connect with Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="connect-container">
          <Card className="onboarding"/>
      </div>
    </>
  )
}

export default Connect
