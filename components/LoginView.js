import '../styles/login-view.sass'

const LoginView = ({ login, setStep }) => (
  <div className="card-inner">
    <span className="login-title">You are not connected!</span>
    <a
      className="login-button"
      onClick={() => {
        login(true)
        setStep(1)
      }}
    >
      Login
    </a>
  </div>
)

export default LoginView
