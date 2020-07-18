import '../styles/step1-view.sass'
import { useContext, useEffect } from 'react'
import UserContext from '../lib/UserContext'

const Step1View = () => {
  const { setStep, url, setUrl, balance, web3Obj } = useContext(UserContext)

  const submit = () => {
    setStep(2)
  }

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
