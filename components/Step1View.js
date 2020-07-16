import '../styles/step1-view.sass'
import { useContext, useEffect } from 'react'
import UserContext from '../lib/UserContext'

const Step1View = () => {
  const { setStep, url, setUrl, balance, web3Obj } = useContext(
    UserContext,
  )
  const submit = () => {
    setStep(2)
  }

  // const sendDai = async () => {
  //   await web3Obj.torus.setProvider({ host: 'mainnet' });
  //   const localWeb3 = web3Obj.web3
  //   const instance = new localWeb3.eth.Contract(
  //     DaiStableCoinAbi,
  //     '0x6b175474e89094c44da98b954eedeac495271d0f',
  //   )
  //   const value = 2
  //   const xdaiBridge = '0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016'
  //   const result = await instance.methods.transfer(xdaiBridge, value).send({
  //     from: account,
  //   })
  //   console.log(result)
  // }

  // useEffect(() => {
  //   async function onRamping() {
  //     await updateDaiBalance()
  //     console.log({balance});
  //     if (balance < 1) {
  //       await web3Obj.torus
  //         .initiateTopup('rampnetwork', {
  //           selectedCryptoCurrency: 'DAI',
  //           fiatValue: 10,
  //         })
  //         .catch(e => {
  //           alert('You need to load some cash to pay for the DAO fees!')
  //         })
  //     } else {
  //       await sendDai()
  //         .catch(e => {
  //           alert('You need to exchange DAI for xDAI DAO fees!')
  //         })
  //     }
  //   }
  //   onRamping()
  // }, [balance])

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
