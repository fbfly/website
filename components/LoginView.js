import '../styles/login-view.sass'

const LoginView = ({ login, setStep }) => (
  <>
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
  </>
)

export default LoginView
