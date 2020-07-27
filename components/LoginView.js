import styles from './LoginView.module.sass'
import { useContext } from 'react'
import CardContext from '../lib/CardContext'
import TorusContext from '../lib/TorusContext'
import FbLogin from '../public/images/fb-login.svg'
import Login from '../public/images/login.svg'
import Wallet from '../public/images/wallet.svg'

const LoginView = () => {
  const { web3Obj, setConnected } = useContext(TorusContext)
  const {
    setLoading,
    setStep,
    setBalance,
    setOnRamp,
    updateUserInfo,
  } = useContext(CardContext)

  async function loginWithTorus() {
    try {
      setLoading({ img: Wallet, title: 'Your wallet is being created' })
      await web3Obj.initialize('rinkeby')
      const userInfo = await web3Obj.torus.getUserInfo()
      const xDaiBalance = await web3Obj.balance()
      setBalance(xDaiBalance)
      // if (xDaiBalance < 1) {
        setOnRamp(true)
      // } else {
      //   setStep(1)
      // }
      await updateUserInfo()
      setLoading(undefined)
      setConnected(true)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className={styles.cardInner}>
      <img className={styles.loginImg} src={Login} />
      <span className={styles.loginTitle}>Connect your Facebook account</span>

      <a
        className={styles.loginButton}
        onClick={() => {
          loginWithTorus()
        }}
      >
        <img className={styles.fbLoginImg} src={FbLogin} />
        Login with Facebook
      </a>
    </div>
  )
}

export default LoginView
