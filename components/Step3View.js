import '../styles/step3-view.sass'
import Back from '../public/images/back.svg'
import { useState } from 'react'

const Step3View = ({ setStep }) => {
  const submit = () => {
    setStep(4)
  }
  const back = () => {
    setStep(2)
  }
  const [currency, setCurrency] = useState('')
  return (
    <>
      <span className="step3-label">What would you like your community currency?</span>
      <input
        className="step3-input"
        placeholder="http://www.facebook.com/groups/333456"
        value={currency}
        onChange={e => {
          setCurrency(e.target.value)
        }}
      />
      <a className="step3-button" onClick={submit}>
        Next Step
      </a>
      <a className="step3-back-button" onClick={back}>
        <img className="back-img" src={Back} />
        Back
      </a>
    </>
  )
}

export default Step3View
