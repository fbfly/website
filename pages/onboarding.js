import { useState, useEffect } from 'react'
import BoxLoading from '../components/BoxLoading/index'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState('')
  const [selectedVerifier, setSelectedVerifier] = useState('google')
  const [verifierId, setVerifierId] = useState(null)
  const [buildEnv, setBuildEnv] = useState('development')
  const [web3Obj, setWeb3Obj] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    async function loadTorus() {
      const { default: web3Obj } = await import('../lib/helper')
      setWeb3Obj(web3Obj)
    }
    loadTorus()
      .then(() => {
        setIsLoading(false)
      })
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    const isTorus = sessionStorage.getItem('pageUsingTorus')
    if (isTorus && web3Obj) {
      web3Obj.initialize(isTorus).then(() => {
        userInfo()
      })
    }
    setIsLoading(false)
  }, [web3Obj])

  async function enableTorus(e) {
    e.preventDefault()
    try {
      await web3Obj.initialize(buildEnv)
    } catch (error) {
      console.error(error)
    }
  }

  function getPublicAddress() {
    web3Obj.torus
      .getPublicAddress({
        verifier: selectedVerifier,
        verifierId: verifierId,
        isExtended: true,
      })
      .then(console.log(''))
  }

  function userInfo() {
    web3Obj.web3.eth.getAccounts().then(accounts => {
      setAccount(accounts[0])
      web3Obj.web3.eth.getBalance(accounts[0]).then(balance => {
        setBalance(balance)
      })
    })
  }

  function sendEth() {
    web3Obj.web3.eth.sendTransaction({
      from: account,
      to: account,
      value: web3Obj.web3.utils.toWei('0.01'),
    })
  }

  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <Navbar />
        {isLoading ? (
          <BoxLoading />
        ) : !account ? (
          <form onSubmit={enableTorus}>
            <p>Build Environment</p>
            <select
              name="buildEnv"
              value={buildEnv}
              onChange={e => setBuildEnv(e.target.value)}
            >
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="testing">Testing</option>
              <option value="development">Development</option>
              <option value="lrc">LRC</option>
            </select>
            <button>Login</button>
          </form>
        ) : (
          <div>
            <div>Account: {account}</div>
            <div>Balance: {balance}</div>
          </div>
        )}

        <Footer />
      </div>
    </>
  )
}

export default Onboarding
