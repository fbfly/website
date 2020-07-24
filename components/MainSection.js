import '../styles/main.sass'
import Section1 from '../public/images/section1.svg'
import Section2 from '../public/images/section2.svg'
import Section3 from '../public/images/section3.svg'
import ExampleCard from './ExampleCard'

const MainSection = props => (
  <main className="main">
    <section className="main-header">
      <span className="main-header-title">
        Transform your facebook group into a DAO
      </span>
      <span className="main-header-subtitle">
        Money and Voting super powers for your Facebook Group
      </span>
    </section>
    <section className="main-examples">
      <ExampleCard className="background-card" />
      <ExampleCard className="foreground-card" />
    </section>
    <section className="main-sections">
      <span className="main-sections-text">What Fbfly does</span>
      <div className="main-sections-grid">
        <div className="main-sections-item">
          <img className="section-img" src={Section1} />
          <div className="section-title">Collect or Earn Funds</div>
          <div className="section-description">
            Raise funds for your Facebook Group or commercialise operations
          </div>
        </div>
        <div className="main-sections-item">
          <img className="section-img" src={Section2} />
          <div className="section-title">Manage funds</div>
          <div className="section-description">
            Group members decide collectively & transparently what funds should be spent on what, to whom and
            when 
          </div>
        </div>
        <div className="main-sections-item">
          <img className="section-img" src={Section3} />
          <div className="section-title">Fly</div>
          <div className="section-description">
            Give your Facebook Group the wings it needs to fly and be
            independent
          </div>
        </div>
      </div>
    </section>
  </main>
)

export default MainSection
