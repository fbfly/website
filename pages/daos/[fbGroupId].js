import DAOPageView from '../../components/DAOPageView'
import EthicalBrandLogo from '../../public/images/ethical-brand.svg'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

// OLD PICA POLLO ADDRESS IN MONGODB : 0xA4D0745Dc93555B3b2Fa93Ea0a665E1c3D945249

const DaoPage = () => {
  const router = useRouter()
  const { fbGroupId } = router.query

  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        {/* <Navbar /> */}
        {fbGroupId && <DAOPageView fbGroupId={fbGroupId} />}
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default DaoPage
