import DAOPageView from '../../components/DAOPageView'
import EthicalBrandLogo from '../../public/images/ethical-brand.svg'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
const axios = require('axios')

async function getDao(fbGroupId) {
  await axios
    .get(`/api/dao/${fbGroupId}`, {
      daoName: daoName,
      description: description,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      imageHash: logoHash,
      fbGroupId: url.replace(/^.*[\\\/]/, ''),
      fbGroulURL: url,
    })
    .then(response => {
      return response.items
    })
    .catch(error => {
      console.log(error)
    })
}

const DaoPage = () => {
  const router = useRouter()
  const { fbGroupId } = router.query

  // This will grab DAO metadata from database with a fbGroupId
  const daoData = getDao(fbGroupId)

  // A few things are not saved on the database, that's why this object exists.
  const dao = {
    name: daoData.daoName,
    logo: EthicalBrandLogo,
    description: daoData.description,
    members: '28', // grab with connect
    capital: '$552', // grab with connect
    votes: '82', // grab with connect
    fbLink: `facebook.com/groups/${fbGroupId}`,
    daoLink: `fbfly.xyz/daos/${fbGroupId}`,
    fbGroupId,
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
