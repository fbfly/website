import '../styles/startnow.sass'
import LogoWatermark from '../public/images/logo-watermark-startnow.svg'

const StartNow = props => (
  <section className="start-now">
    <div className="start-now-inner">
      <img className="logo-watermark" src={LogoWatermark} />
      <span className="start-now-text">
          Bring DeFi to your Facebook Group
      </span>
      <a href="/onboarding" className="start-now-button">
        Start now
      </a>
    </div>
  </section>
)

export default StartNow
