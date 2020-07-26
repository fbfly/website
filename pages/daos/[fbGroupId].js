import DAOPageView from '../../components/DAOPageView'
import EthicalBrandLogo from '../../public/images/ethical-brand.svg'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'

const DaoPage = () => {
  const router = useRouter()
  const { fbGroupId } = router.query
  const dao = {
    name: 'Ethical Brand',
    logo: EthicalBrandLogo,
    description:
      'Fast fashion is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.',
    members: '28',
    capital: '$552',
    votes: '82',
    fbLink: '',
    daoLink: '',
    fbGroupId
  }

  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        {/* <Navbar /> */}
        <DAOPageView dao={dao} />
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default DaoPage
