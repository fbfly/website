import '../styles/login-view.sass'
import { useContext } from 'react'
import UserContext from '../lib/UserContext'
import FbLogin from '../public/images/fb-login.svg'
import Login from '../public/images/login.svg'
import Wallet from '../public/images/wallet.svg'

const LoginView = () => {
  const {
    web3Obj,
    setLoading,
    setConnected,
    setStep,
    setxDaiBalance,
    setOnRamp,
    setUserName,
    setProfileImage,
  } = useContext(UserContext)

  async function loginWithTorus() {
    try {
      setLoading({ img: Wallet, title: 'Your wallet is being created' })
      await web3Obj.initialize('xdai')
      const userInfo = await web3Obj.torus.getUserInfo()
      const xDaiBalance = await web3Obj.balance()
      setxDaiBalance(xDaiBalance)
      // if (xDaiBalance < 1) {
        setOnRamp(true)
      // } else {
      //   setStep(1)
      // }
      setLoading(undefined)
      setUserName(userInfo.name)
      setProfileImage(userInfo.profileImage)
      setConnected(true)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="card-inner">
      <img className="login-img" src={Login} />
      <span className="login-title">Connect your Facebook account</span>

      <a
        className="login-button"
        onClick={() => {
          loginWithTorus()
        }}
      >
        <img className="fb-login-img" src={FbLogin} />
        Login with Facebook
      </a>
    </div>
  )
}

export default LoginView
