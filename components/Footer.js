import FbFlyText from '../public/images/fbfly-text.svg'
import FbFlyLogo from '../public/images/fbfly-logo.svg'
import Link from 'next/link'
import '../styles/footer.sass'

const Footer = props => (
  <footer className="footer">
    <Link href="/">
      <img className="logo-txt" src={FbFlyText} width="120" height="60" />
    </Link>
    <Link href="/">
      <img className="logo-img" src={FbFlyLogo} width="50" height="50" />
    </Link>
    <div className="footer-menu">
      <a className="footer-item" href="https://docs.fbfly.xyz/">
        About
      </a>
    </div>
  </footer>
)

export default Footer
