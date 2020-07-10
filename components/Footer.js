import FbFlyText from '../public/images/fbfly-text.svg'
import FbFlyLogo from '../public/images/fbfly-logo.svg'
import '../styles/footer.sass'

const Footer = props => (
  <footer className="footer">
    <img className="logo-txt" src={FbFlyText} width="120" height="60" />
    <img className="logo-img" src={FbFlyLogo} width="50" height="50" />
    <div className="footer-menu">
      <a className="footer-item">Why</a>
      <a className="footer-item">Product</a>
      <a className="footer-item">About</a>
    </div>
  </footer>
)

export default Footer
