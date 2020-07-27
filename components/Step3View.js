import '../styles/step3-view.sass'
import Back from '../public/images/back.svg'
import { useContext, useState, useEffect } from 'react'
import Loading from '../public/images/loading.svg'
import CardContext from '../lib/CardContext'
import TorusContext from '../lib/TorusContext'
import InfoButton from './InfoButton'
const axios = require('axios')

const SERVER_ADDRESS = '0xC9F2D9adfa6C24ce0D5a999F2BA3c6b06E36F75E'

const Step3View = () => {
  const { web3Obj } = useContext(TorusContext)

  const [ethAddress, setEthAddress] = useState(null)

  useEffect(() => {
    async function getAddress() {
      web3Obj.web3.eth.getAccounts().then(accounts => {
        setEthAddress(accounts[0])
      })
    }
    getAddress()
  }, [])

  const {
    setStep,
    setLoading,
    tokenName,
    setTokenName,
    tokenSymbol,
    setTokenSymbol,
    daoName,
    url,
    description,
    logoHash,
  } = useContext(CardContext)

  const createNewDao = async () => {
    setLoading({ img: Loading, title: 'Your dao is being created' })
    if (!ethAddress) {
      // Let the user know that they are not properly authenticated
    }

    // Make a transaction to pay for the fees.
    await web3Obj.web3.eth
      .sendTransaction({
        from: ethAddress,
        to: SERVER_ADDRESS,
        value: web3Obj.web3.utils.toWei('0.01'),
      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (confirmationNumber == 1) {
          await axios
            .post('/api/dao', {
              daoName: daoName,
              description: description,
              tokenName: tokenName,
              tokenSymbol: tokenSymbol,
              imageHash: logoHash,
              fbGroupId: url.replace(/^.*[\\\/]/, ''),
              fbGroulURL: url,
              torusAccount: ethAddress,
            })
            .then(({ orgAddress }) => {
              console.log('Organization Address', orgAddress)
              setLoading(undefined)
            })
            .catch(error => {
              console.log('Error:', error)
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
        What would you like your community token?
      </span>
      <input
        className="step3-input"
        placeholder="Ethical"
        value={tokenName}
        onChange={e => {
          setTokenName(e.target.value)
        }}
      />
      <span className="step3-label">
        Write three letter symbol for your token
      </span>
      <input
        className="step3-input"
        placeholder="ETC"
        value={tokenSymbol}
        onChange={e => {
          setTokenSymbol(e.target.value)
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
