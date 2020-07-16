import '../styles/dao-list-view.sass'
import FbLogo from '../public/images/fb-logo.svg'

const DAOListView = ({
  data: { logo, name, members, capital, votes },
}) => (
  <div className="card">
  <div className="card-inner">
    {/* <div className="dao-logo">
      <img className="dao-logo-img" src={logo} />
    </div>
    <div className="dao-title">{name}</div>
    <a className="dao-fb-link">
      <img className="fb-logo-img" src={FbLogo} />
      Go to our Facebook Group
    </a> */}
    <div className="dao-content">
      {/* <div className="dao-content-about">
        <div className="dao-content-title">About {name}</div>
        <div className="dao-content-description">
          {description}
          <a className="more-link">Read more</a>
        </div>
      </div> */}
      <div className="dao-content-logo">
        <div className="dao-logo">
          <img className="dao-logo-img" src={logo} />
        </div>
        <div className="dao-title">{name}</div>
        <a className="dao-fb-link">
          <img className="fb-logo-img" src={FbLogo} />
          Go to our Facebook Group
        </a>
      </div>
      {/* <div className="dao-content-counts-container"> */}
        <div className="dao-content-count">
          <div className="dao-logo dao-count-left">
            <img className="dao-logo-img" src={logo} />
          </div>
          <div className="dao-count-right">
            <span className="count-value">{members}</span>
            <span className="count-title">Members</span>
          </div>
        </div>
        <div className="dao-content-count">
          <div className="dao-logo dao-count-left">
            <img className="dao-logo-img" src={logo} />
          </div>
          <div className="dao-count-right">
            <span className="count-value">{capital}</span>
            <span className="count-title">Capital</span>
          </div>
        </div>
        <div className="dao-content-count">
          <div className="dao-logo dao-count-left">
            <img className="dao-logo-img" src={logo} />
          </div>
          <div className="dao-count-right">
            <span className="count-value">{votes}</span>
            <span className="count-title">Votes</span>
          </div>
        </div>
      {/* </div> */}
    </div>
    {/* <a className="dao-donate-button">Donate to {name}</a> */}
  </div>
  </div>
)

export default DAOListView