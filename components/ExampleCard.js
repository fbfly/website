import styles from './ExampleCard.module.sass'
import HeaderWatermark from '../public/images/card-header-watermark.svg'
import EthicalBrand from '../public/images/ethical-brand.svg'
import FbLogo from '../public/images/fb-logo.svg'
import UserProfile from '../public/images/user-profile.svg'

const ExampleCard = ({ background }) => {
  const userName = 'Adrian G.'
  const connectionStatus = true

  return (
    <div
      className={`${styles.exampleCard} ${
        background ? styles.backgroundCard : styles.foregroundCard
      }`}
    >
      <div className={styles.exampleCardHeader}>
        <img
          className={styles.exampleCardHeaderWatermark}
          src={HeaderWatermark}
        />
        <div className={styles.exampleCardUser}>
          <div className={styles.userProfile}>
            <img className={styles.userProfileImg} src={UserProfile} />
          </div>
          <div className={styles.userName}>{userName}</div>
        </div>
        <div className={styles.exampleCardStatus}>
          <div
            className={`${styles.statusIcon} ${
              connectionStatus ? styles.true : styles.false
            }`}
          />
          <div className={styles.statusText}>
            {connectionStatus ? 'Connected' : 'Not Connected'}
          </div>
        </div>
      </div>
      <div className={styles.exampleCardLogo}>
        <img className={styles.exampleCardLogoImg} src={EthicalBrand} />
      </div>
      <div className={styles.exampleCardInner}>
        <div className={styles.exampleCardTitle}>Ethical Brand</div>
        <a className={styles.exampleCardFbLink}>
          <img className={styles.fbLogoImg} src={FbLogo} />
          Go to our Facebook Group
        </a>
        <div className={styles.exampleCardContent}>
          <div className={styles.exampleCardContentAbout}>
            <div className={styles.exampleCardContentTitle}>
              About Ethical Brand
            </div>
            <div className={styles.exampleCardContentDescription}>
              Fast fashion is easy for consumers because it’s just that: fast
              and inexpensive. Lasting for only a season or so, it’s easy for us
              to end up with clothes that tatter and rip after just a few wears.{' '}
              <a className={styles.moreLink}>Read more</a>
            </div>
          </div>
          <div className={styles.exampleCardContentCount}>
            <span className={styles.countTitle}>Members</span>
            <span className={styles.countValue}>28</span>
            <a className={styles.countLink}>View more</a>
          </div>
          <div className={styles.exampleCardContentCount}>
            <span className={styles.countTitle}>Capital</span>
            <span className={styles.countValue}>552$</span>
            <a className={styles.countLink}>View more</a>
          </div>
          <div className={styles.exampleCardContentCount}>
            <span className={styles.countTitle}>Votes</span>
            <span className={styles.countValue}>82</span>
            <a className={styles.countLink}>View more</a>
          </div>
        </div>
        <a className={styles.exampleCardDonateButton}>
          Donate to Ethical Brand
        </a>
      </div>
    </div>
  )
}

export default ExampleCard
