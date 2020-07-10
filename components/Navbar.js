import FbFlyText from '../public/images/fbfly-text.svg'
import FbFlyLogo from '../public/images/fbfly-logo.svg'
import '../styles/navbar.sass'

const Navbar = props => (
  <nav
    className="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <a className="navbar-logo" href="https://fbfly.xyz">
        <img className="logo-img" src={FbFlyLogo} width="50" height="50" />
        <img className="logo-txt" src={FbFlyText} width="120" height="60" />
      </a>

      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div className="navbar-menu">
      <a className="navbar-item">Why</a>
      <a className="navbar-item">Product</a>
      <a className="navbar-item">About</a>
      <a className="navbar-item navbar-start-now">Start now</a>
    </div>
  </nav>
)

export default Navbar
