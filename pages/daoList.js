import DAOListView from '../components/DAOListView'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import MoralBrandLogo from '../public/images/section2.svg'
import useSWR from 'swr'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const DaoList = () => {
  let list = []
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR('/api/dao', fetcher)
  if (!data) {
    console.log('Loading...')
  } else {
    data.forEach(({ daoAddress, daoName, fbGroupId }) =>
      list.push({
        name: daoName,
        logo: EthicalBrandLogo,
        description: `${daoName} is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.`,
        members: '28',
        capital: '$552',
        votes: '82',
        fbLink: '',
        daoLink: '',
        fbGroupId,
        daoAddress,
      }),
    )
  }

  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        {/* <Navbar /> */}
        <DAOListView list={list}/>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default DaoList
