import '../styles/card.sass'
import HeaderWatermark from '../public/images/card-header-watermark.svg'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import FbLogo from '../public/images/fb-logo.svg'
import UserProfile from '../public/images/user-profile.svg'
import { useState } from 'react'

const Card = ({ className }) => {
  const userName = 'Adrian G.'
  const userProfile = UserProfile
  const [connected, setConnected] = useState(false)
  const [flying, setFlying] = useState(false)
  const [step, setStep] = useState(undefined)
  const data = {
    title: 'Ethical Brand',
    logo: EthicalBrandLogo,
    description:
      'Fast fashion is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.',
    members: '28',
    captial: '552$',
    votes: '',
  }

  return (
    <div className={className ? `card ${className}` : 'card'}>
      {connected && (
        <div className="card-user">
          <div className="user-profile">
            <img className="user-profile-img" src={userProfile} />
          </div>
          <div className="user-name">{userName}</div>
        </div>
      )}
      <div className="card-status">
        <div className={connected ? 'status-icon true' : 'status-icon false'} />
        <div className="status-text">
          {connected ? 'Connected' : 'Not Connected'}
        </div>
      </div>
      {!flying && (
        <div className="card-tabs">
          <div
            className={step === 1 ? 'tab selected' : 'tab'}
            onClick={() => connected && setStep(1)}
          >
            <span className="tab-title">Step 01</span>
            <span className="tab-description">FB group URL</span>
          </div>
          <div
            className={step === 2 ? 'tab selected' : 'tab'}
            onClick={() => connected && setStep(2)}
          >
            <span className="tab-title">Step 02</span>
            <span className="tab-description">Set DAO profile</span>
          </div>
          <div
            className={step === 3 ? 'tab selected' : 'tab'}
            onClick={() => connected && setStep(3)}
          >
            <span className="tab-title">Step 03</span>
            <span className="tab-description">DAO settings</span>
          </div>
          <div
            className={step === 4 ? 'tab selected' : 'tab'}
            onClick={() => connected && setStep(4)}
          >
            <span className="tab-title">Step 04</span>
            <span className="tab-description">Confirm DAO</span>
          </div>
        </div>
      )}
      <div className="card-inner">
        {!connected ? (
          <LoginView login={setConnected} />
        ) : flying ? (
          <DAOView data={data} />
        ) : step === 1 ? (
          <div> STEP 1 </div>
        ) : step === 2 ? (
          <div> STEP 2 </div>
        ) : step === 3 ? (
          <div> STEP 3 </div>
        ) : step === 4 ? (
          <div> STEP 4 </div>
        ) : null}
      </div>
    </div>
  )
}

const LoginView = ({ login }) => (
  <>
    <span className="login-title">You are not connected!</span>
    <a
      className="login-button"
      onClick={() => {
        login(true)
      }}
    >
      Login
    </a>
  </>
)

const DAOView = ({
  data: { logo, title, description, members, capital, votes },
}) => (
  <>
    <div className="card-logo">
      <img className="card-logo-img" src={logo} />
    </div>
    <div className="card-title">{title}</div>
    <a className="card-fb-link">
      <img className="fb-logo-img" src={FbLogo} />
      Go to our Facebook Group
    </a>
    <div className="card-content">
      <div className="card-content-about">
        <div className="card-content-title">About {title}</div>
        <div className="card-content-description">
          {description}
          <a className="more-link">Read more</a>
        </div>
      </div>
      <div className="card-content-count">
        <span className="count-title">Members</span>
        <span className="count-value">{members}</span>
        <a className="count-link">View more</a>
      </div>
      <div className="card-content-count">
        <span className="count-title">Capital</span>
        <span className="count-value">{capital}</span>
        <a className="count-link">View more</a>
      </div>
      <div className="card-content-count">
        <span className="count-title">Votes</span>
        <span className="count-value">{votes}</span>
        <a className="count-link">View more</a>
      </div>
    </div>
    <a className="card-donate-button">Donate to {title}</a>
  </>
)

export default Card
