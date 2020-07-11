import '../styles/step3-view.sass'
import Back from '../public/images/back.svg'
import Info from '../public/images/info.svg'
import { useState } from 'react'

const Step3View = ({ setStep, setLoading }) => {
  const submit = () => {
    setStep(4)
    setLoading(true)
  }
  const back = () => {
    setStep(2)
  }
  const [currency, setCurrency] = useState('')
  return (
    <div className="card-inner">
      <span className="step3-label">
        What would you like your community currency?
      </span>
      <input
        className="step3-input"
        placeholder="Ethical"
        value={currency}
        onChange={e => {
          setCurrency(e.target.value)
        }}
      />
      <div className="step3-info">
        <img className="info-img" src={Info} />
        <span className="info-text">
          All DAOs come with their own community currency. <a>Learn more</a>
        </span>
      </div>

      <a className="step3-button" onClick={submit}>
        Next Step
      </a>
      <a className="step3-back-button" onClick={back}>
        <img className="back-img" src={Back} />
        Back
      </a>
    </div>
  )
}

export default Step3View
