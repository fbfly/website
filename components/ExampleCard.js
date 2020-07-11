import '../styles/example-card.sass'
import HeaderWatermark from '../public/images/card-header-watermark.svg'
import EthicalBrand from '../public/images/ethical-brand.svg'
import FbLogo from '../public/images/fb-logo.svg'
import UserProfile from '../public/images/user-profile.svg'

const ExampleCard = ({ className }) => {
  const userName = 'Adrian G.'
  const connectionStatus = true

  return (
    <div className={className ? `example-card ${className}` : 'example-card'}>
      <div className="example-card-header">
        <img className="example-card-header-watermark" src={HeaderWatermark} />
        <div className="example-card-user">
          <div className="user-profile">
            <img className="user-profile-img" src={UserProfile} />
          </div>
          <div className="user-name">{userName}</div>
        </div>
        <div className="example-card-status">
          <div
            className={
              connectionStatus ? 'status-icon true' : 'status-icon false'
            }
          />
          <div className="status-text">
            {connectionStatus ? 'Connected' : 'Not Connected'}
          </div>
        </div>
      </div>
      <div className="example-card-logo">
          <img className="example-card-logo-img" src={EthicalBrand} />
      </div>
      <div className="example-card-inner">
        <div className="example-card-title">Ethical Brand</div>
        <a className="example-card-fb-link">
          <img className="fb-logo-img" src={FbLogo} />
          Go to our Facebook Group
        </a>
        <div className="example-card-content">
          <div className="example-card-content-about">
            <div className="example-card-content-title">About Ethical Brand</div>
            <div className="example-card-content-description">
              Fast fashion is easy for consumers because it’s just that: fast
              and inexpensive. Lasting for only a season or so, it’s easy for us
              to end up with clothes that tatter and rip after just a few wears.{' '}
              <a className="more-link">Read more</a>
            </div>
          </div>
          <div className="example-card-content-count">
              <span className="count-title">Members</span>
              <span className="count-value">28</span>
              <a className="count-link">View more</a>
          </div>
          <div className="example-card-content-count">
              <span className="count-title">Capital</span>
              <span className="count-value">552$</span>
              <a className="count-link">View more</a>
          </div>
          <div className="example-card-content-count">
              <span className="count-title">Votes</span>
              <span className="count-value">82</span>
              <a className="count-link">View more</a>
          </div>
        </div>
        <a className="example-card-donate-button">Donate to Ethical Brand</a>
      </div>
    </div>
  )
}

export default ExampleCard
