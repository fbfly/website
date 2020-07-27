import FbFlyText from '../public/images/fbfly-text.svg'
import FbFlyLogo from '../public/images/fbfly-logo.svg'
import Link from 'next/link'
import styles from './Footer.module.sass'

const Footer = props => (
  <footer className={styles.footer}>
    <Link href="/">
      <img className={styles.logoTxt} src={FbFlyText} width="120" height="60" />
    </Link>
    <Link href="/">
      <img className={styles.logoImg} src={FbFlyLogo} width="50" height="50" />
    </Link>
    <div className={styles.footerMenu}>
      <a className={styles.footerItem} href="https://docs.fbfly.xyz/">
        About
      </a>
    </div>
  </footer>
)

export default Footer
