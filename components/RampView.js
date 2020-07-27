import styles from './RampView.module.sass'
import { useContext, useState, useEffect } from 'react'
import CardContext from '../lib/CardContext'
import TorusContext from '../lib/TorusContext'
import Wallet from '../public/images/wallet.svg'
import Arrow from '../public/images/arrow.svg'
import Success from '../public/images/success.svg'
import Failure from '../public/images/failure.svg'
import InfoButton from './InfoButton'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import axios from 'axios'

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

  const [exchange, setExchange] = useState()
  const [account, setAccount] = useState()
  useEffect(() => {
    async function getExchange() {
      // setExchange(
      //   Number(
      //     (
      //       await axios.get(
      //         'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
      //       )
      //     ).data['USD'],
      //   ),
      // )
      setExchange(325)
      setUsd(100)
      setETH(100 / 325)
      setAccount(await web3Obj.account())
    }
    getExchange()
  }, [])

  useEffect(() => {
    async function checkBalance() {
      const balance = await web3Obj.balance()

      // if (balance > 0.1) {
      //   setBalance(balance)
      //   setOnRampDone(true)
      //   setOnRampSuccess(true)
      //   setLoading(undefined)
      // }
    }
    checkBalance()
  }, [balance])

  async function onRamp() {
    setLoading({ img: Wallet, title: 'Your wallet is being funded' })
    new RampInstantSDK({
      hostAppName: 'Facebook Fly',
      hostLogoUrl:
        'http://ipfs.infura.io/ipfs/bafybeihzp6wnwg4botki5aiker3q2hy5hmvbu2lt67fcprfhn3hoxvbvpu',
      swapAmount: BigInt(ETH * 10 ** 18),
      swapAsset: 'ETH',
      userAddress: account,
      url: 'https://ri-widget-staging.firebaseapp.com/',
      variant: 'auto',
    })
      .on('WIDGET_CLOSE', event => {
        setOnRampDone(true)
        setOnRampSuccess(true)
        setLoading(undefined)
      })
      .show()
  }

  function calcETHFromUsd(_usd) {
    const _ETH = Number(_usd) / exchange
    return _ETH
  }

  function calcUsdFromETH(_ETH) {
    const _usd = exchange * Number(_ETH)
    return _usd
  }

  const [usd, setUsd] = useState(1)
  const [ETH, setETH] = useState(1)

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
              ? `Your balance is ${(balance / 10 ** 18).toFixed(3)} ETH`
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
                  setETH(calcETHFromUsd(e.target.value))
                }}
              />
              <span className={styles.rampUnit}>USD</span>
            </div>
            <div className={styles.rampArrow}>
              <img className={styles.arrowImg} src={Arrow} />
            </div>
            <div className={styles.ETHInput}>
              <span className={styles.rampLabel}>Receive</span>
              <input
                className={styles.rampInput}
                type="number"
                value={ETH.toFixed(3)}
                onChange={e => {
                  setETH(Number(e.target.value))
                  setUsd(calcUsdFromETH(e.target.value))
                }}
              />
              <span className={styles.rampUnit}>ETH</span>
            </div>
          </div>

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
