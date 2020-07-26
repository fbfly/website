import '../styles/card.sass'
import HeaderWatermark from '../public/images/card-header-watermark.svg'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import Alert from '../public/images/alert.svg'
import { useState, useEffect, useContext } from 'react'
import { CardProvider } from '../lib/CardContext'
import TorusContext from '../lib/TorusContext'
import DAOView from './DAOView'
import LoginView from './LoginView'
import RampView from './RampView'
import Step1View from './Step1View'
import Step2View from './Step2View'
import Step3View from './Step3View'
import LoadingView from './LoadingView'
import axios from 'axios'

const Card = ({ className }) => {
  const [loading, setLoading] = useState(undefined)
  const [flying, setFlying] = useState(false)
  const [step, setStep] = useState(undefined)
  const [onRamp, setOnRamp] = useState(false)

  const {
    web3Obj,
    connected,
    setConnected,
    userName,
    setUserName,
    profileImage,
    setProfileImage,
  } = useContext(TorusContext)
  const [balance, setBalance] = useState(0)
  const balanceUnit = process.env.network === 'xdai' ? 'xDai (USD)' : 'ETH'

  // Step1 hooks
  const [url, setUrl] = useState('')

  // Step2 hooks
  const [daoName, setDaoName] = useState('')
  const [description, setDescription] = useState('')
  const [logoHash, setLogoHash] = useState(
    'bafybeidsm72bt7kspzyfh4bbtoxmqvsxgt3su25afb77h23t4uw4ys3dtm',
  )

  // Step3 hooks
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')

  const [onRampDone, setOnRampDone] = useState(false)
  const [onRampSuccess, setOnRampSuccess] = useState(false)

  async function updateUserInfo() {
    const userInfo = await web3Obj.torus.getUserInfo()
    setUserName(userInfo.name)
    setProfileImage(userInfo.profileImage)
    const xDaiBalance = await web3Obj.balance()
    setBalance(xDaiBalance)
    await axios.post('/api/user', {
      name: userInfo.name,
      profileImage: userInfo.profileImage,
      address: await web3Obj.account(),
    })
  }

  useEffect(() => {
    if (connected) {
      updateUserInfo()
      setStep(1)
    }
  }, [connected])

  return (
    <div className={className ? `card ${className}` : 'card'}>
      <CardProvider
        value={{
          setStep,
          //Login
          balance,
          setBalance,
          setOnRamp,
          updateUserInfo,
          //onRamp
          onRampDone,
          setOnRampDone,
          onRampSuccess,
          setOnRampSuccess,
          // Step1
          url,
          setUrl,
          // Step2
          daoName,
          setDaoName,
          description,
          setDescription,
          logoHash,
          setLogoHash,
          // Step3
          tokenName,
          setTokenName,
          tokenSymbol,
          setTokenSymbol,
          setLoading,
          done: setFlying,
        }}
      >
        {connected && !loading && (
          <div className="card-user">
            <div className="user-profile">
              <img className="user-profile-img" src={profileImage} />
            </div>
            <div className="user-name">{userName}</div>
          </div>
        )}
        {!loading &&
          (connected ? (
            <div className="card-status connected">
              <div className="balance">
                {`${(balance / 10 ** 18).toFixed(2)} ${balanceUnit}`}
              </div>
              {onRamp && (
                <div className="alert">
                  <img className="alert-img" src={Alert} />
                  {'Insufficient funds'}
                </div>
              )}
            </div>
          ) : (
            <div className="card-status">
              <div className="status-icon false" />
              <div className="status-text">Not connected</div>
            </div>
          ))}
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
        {loading ? (
          <LoadingView img={loading.img} title={loading.title} />
        ) : onRamp ? (
          <RampView />
        ) : !connected ? (
          <LoginView />
        ) : flying ? (
          <DAOView />
        ) : step === 1 ? (
          <Step1View />
        ) : step === 2 ? (
          <Step2View />
        ) : step === 3 ? (
          <Step3View />
        ) : null}
      </CardProvider>
    </div>
  )
}

export default Card
