import '../styles/step1-view.sass'
import { useState } from 'react'

const Step1View = ({ setStep }) => {
  const submit = () => {
    setStep(2)
  }
  const [url, setUrl] = useState('')
  return (
    <div className="card-inner">
      <span className="step1-label">What is your Facebook Group URL?</span>
      <input
        className="step1-input"
        placeholder="http://www.facebook.com/groups/123456"
        value={url}
        onChange={e => {
          setUrl(e.target.value)
        }}
      />
      <a className="step1-button" onClick={submit}>
        Next Step
      </a>
    </div>
  )
}

export default Step1View
