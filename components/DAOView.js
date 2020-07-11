import '../styles/dao-view.sass'
import FbLogo from '../public/images/fb-logo.svg'

const DAOView = ({
  data: { logo, name, description, members, capital, votes },
}) => (
  <div className="card-inner">
    <div className="dao-logo">
      <img className="dao-logo-img" src={logo} />
    </div>
    <div className="dao-title">{name}</div>
    <a className="dao-fb-link">
      <img className="fb-logo-img" src={FbLogo} />
      Go to our Facebook Group
    </a>
    <div className="dao-content">
      <div className="dao-content-about">
        <div className="dao-content-title">About {name}</div>
        <div className="dao-content-description">
          {description}
          <a className="more-link">Read more</a>
        </div>
      </div>
      <div className="dao-content-counts-container">
        <div className="dao-content-count">
          <span className="count-title">Members</span>
          <span className="count-value">{members}</span>
          <a className="count-link">View more</a>
        </div>
        <div className="dao-content-count">
          <span className="count-title">Capital</span>
          <span className="count-value">{capital}</span>
          <a className="count-link">View more</a>
        </div>
        <div className="dao-content-count">
          <span className="count-title">Votes</span>
          <span className="count-value">{votes}</span>
          <a className="count-link">View more</a>
        </div>
      </div>
    </div>
    <a className="dao-donate-button">Donate to {name}</a>
  </div>
)

export default DAOView
