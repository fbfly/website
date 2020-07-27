import styles from './StartNow.module.sass'
import LogoWatermark from '../public/images/logo-watermark-startnow.svg'

const StartNow = props => (
  <section className={styles.startNow}>
    <div className={styles.startNowInner}>
      <img className={styles.logoWatermark} src={LogoWatermark} />
      <span className={styles.startNowText}>Bring DeFi to your Facebook Group</span>
      <a href="/onboarding" className={styles.startNowButton}>
        Start now
      </a>
    </div>
  </section>
)

export default StartNow
