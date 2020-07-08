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
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end" style={{ marginRight: '80px' }}>
        <a class="navbar-item">Why</a>
        <a class="navbar-item">Product</a>
        <a class="navbar-item">About</a>
      </div>
    </div>
  </nav>
)

export default Navbar
