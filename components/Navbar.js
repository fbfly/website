import FbFlyText from '../public/images/fbfly-text.svg'
import FbFlyLogo from '../public/images/fbfly-logo.svg'
import '../styles/navbar.sass'
import { useState } from 'react'
import Link from 'next/link'

const Navbar = props => {
  const [open, toggleOpen] = useState(false)
  return (
    <nav
      className={open ? 'navbar open' : 'navbar'}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-logo">
            <img className="logo-img" src={FbFlyLogo} width="50" height="50" />
            <img className="logo-txt" src={FbFlyText} width="120" height="60" />
          </a>
        </Link>

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
        <a
          className="navbar-item"
          href="https://aragon.1hive.org/#/0x9a955626885d5286fd7f041a2cdba2acc4c09516"
        >
          The FBFly DAO
        </a>
        <Link href="/daoList">
          <a className="navbar-item">Explore FB DAOs</a>
        </Link>
        <a className="navbar-item" href="https://docs.fbfly.xyz/">
          About
        </a>
        <Link href="/onboarding">
          <a className="navbar-item navbar-start-now">Start now</a>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
