import Head from 'next/head'
import '../styles/connect.sass'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { connect } from '@aragon/connect'
import { useState, useEffect } from 'react'

const testVote = () => {
  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <Navbar />
        <div className="connect-container">
          <button>Test Connect</button>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default testVote
