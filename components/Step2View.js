import '../styles/step2-view.sass'
import Back from '../public/images/back.svg'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import { useState } from 'react'

const Step2View = ({ setStep }) => {
  const submit = () => {
    setStep(3)
  }
  const back = () => {
    setStep(1)
  }
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  return (
    <div className="card-inner">
      <div className="step2-inner">
        <div className="text-section">
          <span className="name-label">DAO Name</span>
          <input
            className="name-input"
            placeholder="Ethical Brand"
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <span className="description-label">DAO Description</span>
          <textarea
            className="description-input"
            placeholder="About Ethical Brand"
            value={description}
            onChange={e => {
              setDescription(e.target.value)
            }}
          />
        </div>
        <div className="logo-section">
          <span className="logo-label label">DAO Logo</span>
          <div className="logo-input">
            <div className="logo-container">
              <img className="logo-img" src={EthicalBrandLogo} />
            </div>
            <a className="logo-upload-button">Upload new</a>
          </div>
        </div>
      </div>
      <a className="step2-button" onClick={submit}>
        Next Step
      </a>
      <a className="step2-back-button" onClick={back}>
        <img className="back-img" src={Back} />
        Back
      </a>
    </div>
  )
}

export default Step2View
