import '../styles/step3-view.sass'
import Back from '../public/images/back.svg'
import Info from '../public/images/info.svg'
import { useContext } from 'react'
import UserContext from '../lib/UserContext'

const Step3View = () => {
  const {
    web3Obj,
    setStep,
    setLoading,
    currency,
    setCurrency,
    balance,
    userWallet,
  } = useContext(UserContext)
  const createDao = async () => {
    await userWallet().then(async () => {
      if (balance > 1) {
        /* 
            Some way to save the following:
            1. DAO Logo on IPFS (https://github.com/ipfs/js-ipfs)
            2. Save the relation between the FB Group ID and the DAO address.
               This can be achieved by using a smart contract that saves key value pairs.
               Also, another option would be using https://github.com/orbitdb/orbit-db 
               (I think this one is easier)
            We may want to take the fee from creating the DAO in this moment.
        */
        setStep(4)
        setLoading(true)
      } else {
        await web3Obj.torus
          .initiateTopup('rampnetwork', {
            selectedCryptoCurrency: 'DAI',
            fiatValue: 10,
          })
          .then()
          .catch(e => {
            alert('You need to load some cash to pay for the DAO fees!')
          })
      }
    })
  }
  const back = () => {
    setStep(2)
  }

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

      <a className="step3-button" onClick={createDao}>
        Create DAO
      </a>
      <a className="step3-back-button" onClick={back}>
        <img className="back-img" src={Back} />
        Back
      </a>
    </div>
  )
}

export default Step3View
