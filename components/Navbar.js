import FbFlyText from '../public/images/fbfly-text.svg'
import FbFlyLogo from '../public/images/fbfly-logo.svg'
import styles from './Navbar.module.sass'
import { useState } from 'react'
import Link from 'next/link'

const Navbar = props => {
  const [open, toggleOpen] = useState(false)
  return (
    <nav
      className={`${styles.navbar} ${open ? styles.open : ''}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className={styles.navbarbrand}>
        <Link href="/">
          <a className={styles.navbarlogo}>
            <img
              className={styles.logoimg}
              src={FbFlyLogo}
              width="50"
              height="50"
            />
            <img
              className={styles.logotxt}
              src={FbFlyText}
              width="120"
              height="60"
            />
          </a>
        </Link>

        <a
          role="button"
          className={styles.navbarburger}
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
        className={styles.navbarmenu}
        onClick={() => {
          toggleOpen(open => false)
        }}
      >
        <a
          className={styles.navbaritem}
          href="https://aragon.1hive.org/#/0x9a955626885d5286fd7f041a2cdba2acc4c09516"
        >
          The FBFly DAO
        </a>
        <Link href="/daoList">
          <a className={styles.navbaritem}>Explore FB DAOs</a>
        </Link>
        <a className={styles.navbaritem} href="https://docs.fbfly.xyz/">
          About
        </a>
        <Link href="/onboarding">
          <a className={`${styles.navbaritem} ${styles.navbarstartnow}`}>
            Start now
          </a>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
