import styles from './RampView.module.sass'
import { useContext, useState, useEffect } from 'react'
import CardContext from '../lib/CardContext'
import TorusContext from '../lib/TorusContext'
import Wallet from '../public/images/wallet.svg'
import Arrow from '../public/images/arrow.svg'
import Success from '../public/images/success.svg'
import Failure from '../public/images/failure.svg'
import InfoButton from './InfoButton'

const RampView = () => {
  const { web3Obj } = useContext(TorusContext)
  const {
    setStep,
    setOnRamp,
    setLoading,
    balance,
    setBalance,
    onRampDone,
    setOnRampDone,
    onRampSuccess,
    setOnRampSuccess,
  } = useContext(CardContext)

  useEffect(() => {
    async function checkBalance() {
      const balance = await web3Obj.balance()

      if (balance > 0.1) {
        setBalance(balance)
        setOnRampDone(true)
        setOnRampSuccess(true)
        setLoading(undefined)
      }
    }
    checkBalance()
  }, [balance])

  async function onRamp() {
    setLoading({ img: Wallet, title: 'Your wallet is being funded' })
    try {
      await web3Obj.changeNetwork('mainnet')
      const mainBalance = await web3Obj.balance()
      const daiBalance = await web3Obj.daiBalance()

      // If you don't have DAI, then...
      if (daiBalance < 1) {
        // Check if you have some ether to buy DAI.
        if (mainBalance < 1) {
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
      setBalance(xDaiBalance)
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
    <div className={styles.cardInner}>
      {onRampDone ? (
        <>
          <img
            className={styles.rampImg}
            src={onRampSuccess ? Success : Failure}
          />
          <span className={styles.rampTitle}>
            {onRampSuccess ? 'Transaction Success' : 'Transaction Failed!'}
          </span>
          <span className={styles.rampDescription}>
            {onRampSuccess
              ? `Your balance is ${(xDaiBalance / 10 ** 18).toFixed(3)} xDAI`
              : 'Some problems have occurred during the process'}
          </span>
          <div className={styles.doneButtons}>
            {onRampSuccess ? (
              <a
                className={styles.createButton}
                onClick={() => {
                  setOnRamp(false)
                  setStep(1)
                }}
              >
                Create your DAO now
              </a>
            ) : (
              <a
                className={styles.rampBackButton}
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
          <span className={styles.rampTitle}>
            You need funds to create and manage the DAO
          </span>
          <InfoButton
            title={'Why do I need funds to create and manage a DAO?'}
            content={'Because you do!'}
            link={
              'https://docs.fbfly.xyz/about-daos/why-do-i-need-funds-to-create-and-manage-a-dao'
            }
          />
          <div className={styles.rampInputContainer}>
            <div className={styles.usdInput}>
              <span className={styles.rampLabel}>Send</span>
              <input
                className={styles.rampInput}
                type="number"
                value={usd.toFixed(3)}
                onChange={e => {
                  setUsd(Number(e.target.value))
                  setxDai(calcxDaiFromUsd(e.target.value))
                }}
              />
              <span className={styles.rampUnit}>USD</span>
            </div>
            <div className={styles.rampArrow}>
              <img className={styles.arrowImg} src={Arrow} />
            </div>
            <div className={styles.xDaiInput}>
              <span className={styles.rampLabel}>Receive</span>
              <input
                className={styles.rampInput}
                type="number"
                value={xDai.toFixed(3)}
                onChange={e => {
                  setxDai(Number(e.target.value))
                  setUsd(calcUsdFromxDai(e.target.value))
                }}
              />
              <span className={styles.rampUnit}>xDAI</span>
            </div>
          </div>
          <span className={styles.rampDetails}>
            Each transaction costs ${(usd - xDai).toFixed(3)} USD to process
          </span>

          <a
            className={styles.rampButton}
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
