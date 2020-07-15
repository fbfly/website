import '../styles/card.sass'
import HeaderWatermark from '../public/images/card-header-watermark.svg'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import UserProfile from '../public/images/user-profile.svg'
import { useState, useEffect } from 'react'
import { UserProvider } from '../lib/UserContext'
import DAOView from './DAOView'
import LoginView from './LoginView'
import Step1View from './Step1View'
import Step2View from './Step2View'
import Step3View from './Step3View'
import LoadingView from './LoadingView'

const Card = ({ className }) => {
  const userProfile = UserProfile
  const [userName, setUserName] = useState('John Doe')
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [flying, setFlying] = useState(false)
  const [step, setStep] = useState(undefined)
  const data = {
    name: 'Ethical Brand',
    logo: EthicalBrandLogo,
    description:
      'Fast fashion is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.',
    members: '28',
    capital: '552$',
    votes: '82',
  }
  // Tor.us hooks
  const [account, setAccount] = useState(null)
  // const [balance, setBalance] = useState('')
  // const [daiBalance, setDaiBalance] = useState('')
  const [buildEnv, setBuildEnv] = useState('testing')
  const [web3Obj, setWeb3Obj] = useState(null)

  // Step1 hooks
  const [url, setUrl] = useState('')

  // Step2 hooks
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [logoHash, setLogoHash] = useState(
    'bafybeidsm72bt7kspzyfh4bbtoxmqvsxgt3su25afb77h23t4uw4ys3dtm',
  )

  // Step3 hooks
  const [currency, setCurrency] = useState('')

  useEffect(() => {
    async function loadTorus() {
      const { default: web3Obj } = await import('../lib/torus')
      setWeb3Obj(web3Obj)
    }
    loadTorus()
  }, [])

  // useEffect(() => {
  //   const isTorus = sessionStorage.getItem('pageUsingTorus')
  //   const networkTorus = sessionStorage.getItem('networkTorus')
  //   if (isTorus && web3Obj) {
  //     web3Obj.initialize(isTorus, networkTorus).then(async () => {
  //       const userInfo = await web3Obj.torus.getUserInfo()
  //       setUserName(userInfo.name)
  //       setConnected(true)
  //       setStep(1)
  //     })
  //   }
  // }, [web3Obj])

  async function loginWithTorus() {
    try {
      await web3Obj.initialize(buildEnv, 'xdai')
      const xDaiBalance = await web3Obj.balance()
      console.log({ xDaiBalance })
      if (balance < 1) {
        await web3Obj.changeNetwork('mainnet')
        const balance = await web3Obj.balance()
        console.log({ balance })
        const daiBalance = await web3Obj.daiBalance()
        console.log({ daiBalance })
        if (daiBalance < 1) {
            await web3Obj.buyDai()
        }
        await web3Obj.exchangeDaixDai(1)
        await web3Obj.changeNetwork('xdai')
      }
      const userInfo = await web3Obj.torus.getUserInfo()
      setUserName(userInfo.name)

      setConnected(true)
      setStep(1)
    } catch (error) {
      console.error(error)
    }
  }

  // async function updateUserWallet() {
  //   const accounts = await web3Obj.web3.eth.getAccounts()
  //   setAccount(accounts[0])
  //   const balance = await web3Obj.web3.eth.getBalance(accounts[0])
  //   setBalance(balance)
  // }

  return (
    <div className={className ? `card ${className}` : 'card'}>
      <UserProvider
        value={{
          web3Obj,
          loginWithTorus,
          setConnected,
          setStep,
          // Step1
          account,
          url,
          setUrl,
          // Step2
          name,
          setName,
          description,
          setDescription,
          logoHash,
          setLogoHash,
          // Step3
          currency,
          setCurrency,
          setLoading,
          // balance,
          // updateUserWallet,
          // LoadingView
          done: setFlying,
        }}
      >
        {connected && !loading && (
          <div className="card-user">
            <div className="user-profile">
              <img className="user-profile-img" src={userProfile} />
            </div>
            <div className="user-name">{userName}</div>
          </div>
        )}
        {!loading && (
          <div className="card-status">
            <div
              className={connected ? 'status-icon true' : 'status-icon false'}
            />
            <div className="status-text">
              {connected ? 'Connected' : 'Not Connected'}
            </div>
          </div>
        )}
        {!flying && !loading && (
          <div className="card-tabs">
            <div
              className={step === 1 ? 'tab selected' : 'tab'}
              onClick={() => connected && setStep(1)}
            >
              <span className="tab-title">Step 01</span>
              <span className="tab-description">FB group URL</span>
            </div>
            <div
              className={step === 2 ? 'tab selected' : 'tab'}
              onClick={() => connected && setStep(2)}
            >
              <span className="tab-title">Step 02</span>
              <span className="tab-description">Set DAO profile</span>
            </div>
            <div
              className={step === 3 ? 'tab selected' : 'tab'}
              onClick={() => connected && setStep(3)}
            >
              <span className="tab-title">Step 03</span>
              <span className="tab-description">DAO settings</span>
            </div>
            <div
              className={step === 4 ? 'tab selected' : 'tab'}
              onClick={() => connected && setStep(4)}
            >
              <span className="tab-title">Step 04</span>
              <span className="tab-description">Confirm DAO</span>
            </div>
          </div>
        )}
        {!connected ? (
          <LoginView />
        ) : flying ? (
          <DAOView data={data} />
        ) : step === 1 ? (
          <Step1View />
        ) : step === 2 ? (
          <Step2View />
        ) : step === 3 ? (
          <Step3View />
        ) : step === 4 || loading ? (
          <LoadingView />
        ) : null}
      </UserProvider>
    </div>
  )
}

export default Card

// function getPublicAddress() {
//   web3Obj.torus
//     .getPublicAddress({
//       verifier: selectedVerifier,
//       verifierId: verifierId,
//       isExtended: true,
//     })
//     .then(console.log(''))
// }
// function sendEth() {
//   web3Obj.web3.eth.sendTransaction({
//     from: account,
//     to: account,
//     value: web3Obj.web3.utils.toWei('0.01'),
//   })
// }
