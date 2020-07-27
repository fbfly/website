import styles from './Step1View.module.sass'
import { useContext, useEffect } from 'react'
import InfoButton from './InfoButton'
import CardContext from '../lib/CardContext'

const Step1View = () => {
  const { setStep, url, setUrl } = useContext(CardContext)

  const submit = () => {
    setStep(2)
  }

  return (
    <div className={styles.cardInner}>
      <span className={styles.step1Label}>
        What is your Facebook Group URL?
      </span>
      <input
        className={styles.step1Input}
        placeholder="http://www.facebook.com/groups/123456"
        value={url}
        onChange={e => {
          setUrl(e.target.value)
        }}
        style={{ marginBottom: '2rem' }}
      />
      <InfoButton
        title={'Why do we need your FB Group?'}
        content={'All DAOs have a FB Group linked!'}
      />
      <a className={styles.step1Button} onClick={submit}>
        Next Step
      </a>
    </div>
  )
}

export default Step1View
