import FbFlyText from '../public/images/fbfly-text.svg'
import FbFlyLogo from '../public/images/fbfly-logo.svg'

const Navbar = props => (
  <nav
    className="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <a className="navbar-item" href="https://fbfly.xyz">
        <img
          src={FbFlyLogo}
          style={{ marginLeft: '100px', marginTop: '20px' }}
          width="50"
          height="50"
        />
        <img
          src={FbFlyText}
          style={{ marginTop: '25px' }}
          width="120"
          height="60"
        />
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
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-end" style={{ marginRight: '80px' }}>
        <a className="navbar-item">Why</a>
        <a className="navbar-item">Product</a>
        <a className="navbar-item">About</a>
        <a className="navbar-item navbar-start-now">Start now</a>
      </div>
    </div>
  </nav>
)

export default Navbar
