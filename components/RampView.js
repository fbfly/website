import '../styles/ramp-view.sass'
import { useContext, useState } from 'react'
import UserContext from '../lib/UserContext'
import Wallet from '../public/images/wallet.svg'
import Arrow from '../public/images/arrow.svg'
import Success from '../public/images/success.svg'
import Failure from '../public/images/failure.svg'
import InfoButton from './InfoButton'

const RampView = () => {
  const {
    web3Obj,
    setStep,
    setOnRamp,
    setLoading,
    xDaiBalance,
    setxDaiBalance,
    onRampDone,
    setOnRampDone,
    onRampSuccess,
    setOnRampSuccess,
  } = useContext(UserContext)

  async function onRamp() {
    setLoading({ img: Wallet, title: 'Your wallet is being funded' })
    try {
      await web3Obj.changeNetwork('mainnet')
      const balance = await web3Obj.balance()
      const daiBalance = await web3Obj.daiBalance()

      // If you don't have DAI, then...
      if (daiBalance < 1) {
        // Check if you have some ether to buy DAI.
        if (balance < 1) {
          // If you don't have any ether, then buy some ether.
          await web3Obj
            .buyEth()
            .then(() => console.log('You bought some ether'))
        }
        // If you had ether, then just buy DAI.
        await web3Obj.exchangeEthToDAI().then(() => {
          console.log('You got some DAI :)')
        })
      }

      await web3Obj.exchangeDaixDai(1)
      await web3Obj.changeNetwork('xdai')
      const xDaiBalance = await web3Obj.balance()
      setxDaiBalance(xDaiBalance)
      setOnRampDone(true)
      setOnRampSuccess(true)
    } catch (error) {
      console.log({ onRampError: error })
      setOnRampDone(true)
      setOnRampSuccess(false)
    }
    setLoading(undefined)
  }

  function calcxDaiFromUsd(_usd) {
    const _xDai = (982 / 1000) * Number(_usd)
    return _xDai
  }

  function calcUsdFromxDai(_xDai) {
    const _usd = (1000 / 982) * Number(_xDai)
    return _usd
  }

  const [usd, setUsd] = useState(10)
  const [xDai, setxDai] = useState(calcxDaiFromUsd(10))

  return (
    <div className="card-inner">
      {onRampDone ? (
        <>
          <img className="ramp-img" src={onRampSuccess ? Success : Failure} />
          <span className="ramp-title">
            {onRampSuccess ? 'Transaction Success' : 'Transaction Failed!'}
          </span>
          <span className="ramp-description">
            {onRampSuccess
              ? `Your balance is ${(xDaiBalance / 10 ** 18).toFixed(3)} xDAI`
              : 'Some problems have occurred during the process'}
          </span>
          <div className="done-buttons">
            {onRampSuccess ? (
              <a
                className="create-button"
                onClick={() => {
                  setOnRamp(false)
                  setStep(1)
                }}
              >
                Create your DAO now
              </a>
            ) : (
              <a
                className="ramp-back-button"
                onClick={() => {
                  setOnRampDone(false)
                }}
              >
                Go back
              </a>
            )}
          </div>
        </>
      ) : (
        <>
          <span className="ramp-title">
            You need funds to create and manage the DAO
          </span>
          <InfoButton
            title={'Why do I need funds to create and manage a DAO?'}
            content={'Because you do!'}
          />
          <div className="ramp-input-container">
            <div className="usd-input">
              <span className="ramp-label">Send</span>
              <input
                className="ramp-input"
                type="number"
                value={usd.toFixed(3)}
                onChange={e => {
                  setUsd(Number(e.target.value))
                  setxDai(calcxDaiFromUsd(e.target.value))
                }}
              />
              <span class="ramp-unit">USD</span>
            </div>
            <div className="ramp-arrow">
              <img className="arrow-img" src={Arrow} />
            </div>
            <div className="xDai-input">
              <span className="ramp-label">Receive</span>
              <input
                className="ramp-input"
                type="number"
                value={xDai.toFixed(3)}
                onChange={e => {
                  setxDai(Number(e.target.value))
                  setUsd(calcUsdFromxDai(e.target.value))
                }}
              />
              <span class="ramp-unit">xDAI</span>
            </div>
          </div>
          <span className="ramp-details">
            Each transaction costs ${(usd - xDai).toFixed(3)} USD to process
          </span>

          <a
            className="ramp-button"
            onClick={() => {
              onRamp()
            }}
          >
            Buy now
          </a>
        </>
      )}
    </div>
  )
}

export default RampView
