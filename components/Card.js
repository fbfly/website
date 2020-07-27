import styles from './Card.module.sass'
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

const Card = () => {
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
    'bafybeibjvfp3agnjyxvs2lchivc7gw6ajldg4tjd7rthula3z273i75qmy',
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
    <div className={styles.card}>
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
          <div className={styles.cardUser}>
            <div className={styles.userProfile}>
              <img className={styles.userProfileImg} src={profileImage} />
            </div>
            <div className={styles.userName}>{userName}</div>
          </div>
        )}
        {!loading &&
          (connected ? (
            <div className={`${styles.cardStatus} ${styles.connected}`}>
              <div className={styles.balance}>
                {`${(balance / 10 ** 18).toFixed(2)} ${balanceUnit}`}
              </div>
              {onRamp && (
                <div className={styles.alert}>
                  <img className={styles.alertImg} src={Alert} />
                  {'Insufficient funds'}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.cardStatus}>
              <div className={`${styles.statusIcon} ${styles.false}`} />
              <div className={styles.statusText}>Not connected</div>
            </div>
          ))}
        {!flying && !loading && (
          <div className={styles.cardTabs}>
            <div
              className={`${styles.tab} ${step === 1 ? styles.selected : ''}`}
              onClick={() => connected && setStep(1)}
            >
              <span className={styles.tabTitle}>Step 01</span>
              <span className={styles.tabDescription}>FB group URL</span>
            </div>
            <div
              className={`${styles.tab} ${step === 2 ? styles.selected : ''}`}
              onClick={() => connected && setStep(2)}
            >
              <span className={styles.tabTitle}>Step 02</span>
              <span className={styles.tabDescription}>Set DAO profile</span>
            </div>
            <div
              className={`${styles.tab} ${step === 3 ? styles.selected : ''}`}
              onClick={() => connected && setStep(3)}
            >
              <span className={styles.tabTitle}>Step 03</span>
              <span className={styles.tabDescription}>DAO settings</span>
            </div>
            <div
              className={`${styles.tab} ${step === 4 ? styles.selected : ''}`}
              onClick={() => connected && setStep(4)}
            >
              <span className={styles.tabTitle}>Step 04</span>
              <span className={styles.tabDescription}>Confirm DAO</span>
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
