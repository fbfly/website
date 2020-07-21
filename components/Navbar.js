import FbFlyText from '../public/images/fbfly-text.svg'
import FbFlyLogo from '../public/images/fbfly-logo.svg'
import '../styles/navbar.sass'
import { useState } from 'react'

const Navbar = props => {
  const [open, toggleOpen] = useState(false)
  return (
    <nav
      className={open ? 'navbar open' : 'navbar'}
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
          onClick={() => {
            toggleOpen(open => !open)
          }}
        >
          <div></div>
        </a>
      </div>
      <div
        className="navbar-menu"
        onClick={() => {
          toggleOpen(open => false)
        }}
      >
        <a className="navbar-item">Why</a>
        <a className="navbar-item">Product</a>
        <a className="navbar-item" href="https://docs.fbfly.xyz/">
          About
        </a>
        <a href="/onboarding" className="navbar-item navbar-start-now">
          Start now
        </a>
      </div>
    </nav>
  )
}

export default Navbar
