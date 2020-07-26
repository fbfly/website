import '../styles/step3-view.sass'
import Back from '../public/images/back.svg'
import { useContext, useState, useEffect } from 'react'
import Loading from '../public/images/loading.svg'
import CardContext from '../lib/CardContext'
import TorusContext from '../lib/TorusContext'
import InfoButton from './InfoButton'
const axios = require('axios')

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
  })

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
    const userInfo = await web3Obj.torus.getUserInfo()
    await axios.post('/api/user', {
      name: userInfo.name,
      profileImage: userInfo.profileImage,
      address: ethAddress,
    })
    if (!ethAddress) {
      // Let the user know that they are not properly authenticated
    }

    // Make a transaction to pay for the fees.
    await web3Obj.web3.eth
      .sendTransaction({
        from: ethAddress,
        to: '0x419a443899Fa8401Bd10dF6D18863d66b36ec320',
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
            })
            .then(response => {
              console.log('Response:', response)
              setLoading(undefined)
            })
            .catch(error => {
              console.log(error)
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
