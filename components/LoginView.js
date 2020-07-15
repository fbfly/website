import '../styles/login-view.sass'
import { useContext } from 'react'
import UserContext from '../lib/UserContext'

const LoginView = () => {
  const { enableTorus, setConnected, setStep, balance } = useContext(
    UserContext,
  )
  return (
    <div className="card-inner">
      <span className="login-title">You are not connected!</span>

      <a
        className="login-button"
        onClick={async () => {
          await enableTorus()
            .then(async () => {
              setConnected(true)
              if (balance > 5) {
                setStep(1)
              } else {
                await web3Obj.torus
                  .initiateTopup('rampnetwork', {
                    selectedCryptoCurrency: 'DAI',
                    fiatValue: 10,
                  })
                  .then()
                  .catch(e => {
                    alert('You need to load some cash to pay for the DAO fees!')
                  })
              }
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
