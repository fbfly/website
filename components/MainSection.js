import '../styles/main.sass'
import Section1 from '../public/images/section1.svg'
import Section2 from '../public/images/section2.svg'
import Section3 from '../public/images/section3.svg'
import ExampleCard from './ExampleCard'

const MainSection = props => (
  <main className="main">
    <section className="main-header">
      <span className="main-header-title">Create your next-level communities</span>
      <span className="main-header-subtitle">directly from Facebook</span>
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
          <div className="section-title">
            Aragon + Facebook, a powerful combination
          </div>
          <div className="section-description">
            Fast fashion is easy for consumers because it’s just that: fast and
            inexpensive.
          </div>
        </div>
        <div className="main-sections-item">
          <img className="section-img" src={Section2} />
          <div className="section-title">Fast and really easy onboarding</div>
          <div className="section-description">
            Fast fashion is easy for consumers because it’s just that: fast and
            inexpensive.
          </div>
        </div>
        <div className="main-sections-item">
          <img className="section-img" src={Section3} />
          <div className="section-title">
            Create your community and invite your friends
          </div>
          <div className="section-description">
            Fast fashion is easy for consumers because it’s just that: fast and
            inexpensive.
          </div>
        </div>
      </div>
    </section>
  </main>
)

export default MainSection
