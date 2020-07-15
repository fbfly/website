import '../styles/login-view.sass'
import { useContext } from 'react'
import UserContext from '../lib/UserContext'

const LoginView = () => {
  const { enableTorus, setConnected, setStep } = useContext(UserContext)
  return (
    <div className="card-inner">
      <span className="login-title">You are not connected!</span>

      <a
        className="login-button"
        onClick={async () => {
          await enableTorus()
            .then(async () => {
              setConnected(true)
              setStep(1)
            })
            .catch(e => console.log(e))
        }}
      >
        Login
      </a>
    </div>
  )
}

export default LoginView
