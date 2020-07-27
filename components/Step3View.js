import styles from './Step3View.module.sass'
import Router from 'next/router'
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
    setLoading({ img: Loading, title: 'Your DAO is being created' })
    if (!ethAddress) {
      // Let the user know that they are not properly authenticated
    }
    const fbGroupId = url.replace(/^.*[\\\/]/, '')

    // Make a transaction to pay for the fees.
    // await web3Obj.web3.eth.sendTransaction({
    //   from: ethAddress,
    //   to: SERVER_ADDRESS,
    //   value: web3Obj.web3.utils.toWei('0.01'),
    // })

    try {
      const response = await axios.post(
        '/api/dao',
        {
          daoName: daoName,
          description: description,
          tokenName: tokenName,
          tokenSymbol: tokenSymbol,
          imageHash: logoHash,
          fbGroupId: fbGroupId,
          fbGroulURL: url,
          torusAccount: ethAddress,
        },
        { timeout: 1000000 },
      )

      const { orgAddress } = response.data
      console.log('Organization Address', orgAddress)
      setLoading(undefined)
      Router.push('/daos/[fbGroupId]', `/daos/12345`)
    } catch (error) {
      console.log('Could not create DAO Error:', error)
      setStep(2)
    }
  }

  const back = () => {
    setStep(2)
  }

  return (
    <div className={styles.cardInner}>
      <span className={styles.step3Label}>
        What would you like to name your community token?
      </span>
      <input
        className={styles.step3Input}
        placeholder="Ethical"
        value={tokenName}
        onChange={e => {
          setTokenName(e.target.value)
        }}
      />
      <span className={styles.step3Label}>
        Write three letter symbol for your token
      </span>
      <input
        className={styles.step3Input}
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
      <a className={styles.step3Button} onClick={createNewDao}>
        Create DAO
      </a>
      <a className={styles.step3BackButton} onClick={back}>
        <img className={styles.backImg} src={Back} />
        Back
      </a>
    </div>
  )
}

export default Step3View
