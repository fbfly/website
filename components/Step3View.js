import '../styles/step3-view.sass'
import Back from '../public/images/back.svg'
import { useContext } from 'react'
import Loading from '../public/images/loading.svg'
import UserContext from '../lib/UserContext'
import InfoButton from './InfoButton'
import ipldService from '../lib/ipld'
import createDAO from '../lib/createDao'

const Step3View = () => {
  const {
    web3Obj,
    setStep,
    setLoading,
    currency,
    setCurrency,
    balance,
    name,
    url,
    description,
    logoHash,
  } = useContext(UserContext)

  const createNewDao = async () => {
    setLoading({ img: Loading, title: 'Your dao is being created' })
    const userInfo = web3Obj.getUserInfo()

    const metadata = {
      creatorName: userInfo.name,
      groupID: url.replace(/^.*[\\\/]/, ''),
      groupURL: url,
      name,
      currency,
      description,
      logoImageHash,
    }

    const metadataHash = ipldService.uploadMetadata(metadata)
    // also call fbFly to store group data and metadata
    // const error = createDAO(web3Obj.torus, metadata)

    setTimeout(() => {
      setLoading(undefined)
    }, 3000)
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

      <InfoButton
        title={'All DAOs come with their own community tokens.'}
        content={'Because they just do!'}
      />
      <a className="step3-button" onClick={createNewDao}>
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
