import '../styles/startnow.sass'
import LogoWatermark from '../public/images/logo-watermark-startnow.svg'

const StartNow = props => (
  <section className="start-now">
    <div className="start-now-inner">
      <img className="logo-watermark" src={LogoWatermark} />
      <span className="start-now-text">
        Start now, create your first community
      </span>
      <a href="/onboarding" className="start-now-button">
        Start now
      </a>
    </div>
  </section>
)

export default StartNow
