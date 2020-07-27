import styles from './MainSection.module.sass'
import Section1 from '../public/images/section1.svg'
import Section2 from '../public/images/section2.svg'
import Section3 from '../public/images/section3.svg'
import ExampleCard from './ExampleCard'

const MainSection = props => (
  <main className={styles.main}>
    <section className={styles.mainHeader}>
      <span className={styles.mainHeaderTitle}>
        Transform your facebook group into a DAO
      </span>
      <span className={styles.mainHeaderSubtitle}>
        Money and Voting super powers for your Facebook Group
      </span>
    </section>
    <section className={styles.mainExamples}>
      <ExampleCard background={true} />
      <ExampleCard background={false} />
    </section>
    <section className={styles.mainSections}>
      <span className={styles.mainSectionsText}>What Fbfly does</span>
      <div className={styles.mainSectionsGrid}>
        <div className={styles.mainSectionsItem}>
          <img className={styles.sectionImg} src={Section1} />
          <div className={styles.sectionTitle}>Collect or Earn Funds</div>
          <div className={styles.sectionDescription}>
            Raise funds for your Facebook Group or commercialise operations
          </div>
        </div>
        <div className={styles.mainSectionsItem}>
          <img className={styles.sectionImg} src={Section2} />
          <div className={styles.sectionTitle}>Manage funds</div>
          <div className={styles.sectionDescription}>
            Group members decide collectively & transparently what funds should be spent on what, to whom and when
          </div>
        </div>
        <div className={styles.mainSectionsItem}>
          <img className={styles.sectionImg} src={Section3} />
          <div className={styles.sectionTitle}>Fly</div>
          <div className={styles.sectionDescription}>
            Give your Facebook Group the wings it needs to fly and be
            independent
          </div>
        </div>
      </div>
    </section>
  </main>
)

export default MainSection
