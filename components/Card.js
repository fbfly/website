import '../styles/card.sass'
import HeaderWatermark from '../public/images/card-header-watermark.svg'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import UserProfile from '../public/images/user-profile.svg'
import { useState } from 'react'

import DAOView from './DAOView'
import LoginView from './LoginView'
import Step1View from './Step1View'
import Step2View from './Step2View'
import Step3View from './Step3View'

const Card = ({ className }) => {
  const userName = 'Adrian G.'
  const userProfile = UserProfile
  const [connected, setConnected] = useState(false)
  const [flying, setFlying] = useState(false)
  const [step, setStep] = useState(undefined)
  const data = {
    name: 'Ethical Brand',
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
          <LoginView login={setConnected} setStep={setStep} />
        ) : flying ? (
          <DAOView data={data} />
        ) : step === 1 ? (
          <Step1View setStep={setStep}/>
        ) : step === 2 ? (
          <Step2View setStep={setStep}/>
        ) : step === 3 ? (
          <Step3View setStep={setStep}/>
        ) : step === 4 ? (
          <div> STEP 4 </div>
        ) : null}
      </div>
    </div>
  )
}


export default Card
