import '../styles/dao-list-view.sass'
import caratDown from '../public/images/carat-down.svg'
import headerWatermark from '../public/images/card-header-watermark.svg'
import FbFlyLogo from '../public/images/fbfly-logo-light.svg'
import FbText from '../public/images/fb.svg'
import FlyText from '../public/images/fly.svg'
import FbLogo from '../public/images/fb-logo.svg'

import membersLogo from '../public/images/profile.svg'
import capitalLogo from '../public/images/coins.svg'
import votesLogo from '../public/images/thumbs.svg'

const DAOListView = ({ list, user: { userName, userProfile } }) => (
  <div className="background">
    <div className="header">
      <img className="header-watermark" src={headerWatermark} />
      <div className="fbfly-text">
        <img className="fbfly-text-img" src={FbText} />
        <img className="fbfly-text-img" src={FlyText} />
      </div>
      <div className="fbfly-logo">
        <img className="fbfly-logo-img" src={FbFlyLogo} />
      </div>
      <div className="user">
        <div className="user-profile">
          <img className="user-profile-img" src={userProfile} />
        </div>
        <div className="user-name">{userName}</div>
        <img src={caratDown} />
      </div>
    </div>
    {list.map(({ logo, name, members, capital, votes, fbLink, daoLink }, index) => (
      <div className={`dao-item ${index === 0 ? 'top' : ''}`}>
        <div className="dao-list-content">
          <div class="vl" />
          <div className="dao-list-content-logo">
            <a className="dao-link" href={daoLink}>
              <img className="dao-logo-img" src={logo} />
              <div className="dao-title">{name}</div>
            </a>
            <a className="dao-fb-link" href={fbLink}>
              <img className="fb-logo-img" src={FbLogo} />
              Go to our Facebook Group
            </a>
          </div>
          <div className="dao-list-content-count">
            <img className="dao-count-img dao-count-left" src={membersLogo} />
            <div className="dao-count-right">
              <span className="count-value">{members}</span>
              <span className="count-title">Members</span>
            </div>
          </div>
          <div className="dao-list-content-count">
            <img className="dao-count-img dao-count-left" src={votesLogo} />
            <div className="dao-count-right">
              <span className="count-value">{votes}</span>
              <span className="count-title">Votes</span>
            </div>
          </div>
          <div className="dao-list-content-count">
            <img className="dao-count-img dao-count-left" src={capitalLogo} />
            <div className="dao-count-right">
              <span className="count-value">{capital}</span>
              <span className="count-title">Capital</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default DAOListView
