import '../styles/dao-page-view.sass'
import FbLogin from '../public/images/fb-login.svg'
import caratDown from '../public/images/carat-down.svg'
import headerWatermark from '../public/images/card-header-watermark.svg'
import FbFlyLogo from '../public/images/fbfly-logo-light.svg'
import FbText from '../public/images/fb.svg'
import FlyText from '../public/images/fly.svg'
import FbLogo from '../public/images/fb-logo.svg'
import Link from 'next/link'

import membersLogo from '../public/images/profile.svg'
import capitalLogo from '../public/images/coins.svg'
import votesLogo from '../public/images/thumbs.svg'

import TokensView from './TokensView'
import VotingView from './VotingView'
import FinanceView from './FinanceView'
import { useState, useEffect, useContext } from 'react'
import TorusContext from '../lib/TorusContext'

import { connect } from '@aragon/connect'
import { Voting } from '@aragon/connect-thegraph-voting'
import { TokenManager } from '@aragon/connect-thegraph-tokens'
import { Finance } from '@aragon/connect-finance'
import axios from 'axios'

// A few things are not saved on the database, that's why this object exists.

const DAOPageView = ({ fbGroupId }) => {
  const {
    web3Obj,
    connected,
    setConnected,
    userName,
    setUserName,
    profileImage,
    setProfileImage,
  } = useContext(TorusContext)
  const balanceUnit = process.env.network === 'xdai' ? 'xDai (USD)' : 'ETH'
  const [dao, setDAO] = useState({})

  // This will grab DAO metadata from database with a fbGroupId
  useEffect(() => {
    async function getDao(fbGroupId) {
      const response = await axios.get(`/api/dao/${fbGroupId}`)
      setDAO(response.data)
    }
    getDao(fbGroupId)
  }, [fbGroupId])

  const { imageHash, daoName, daoAddress, daoENS, tokenName, tokenSymbol } = dao

  async function loginWithTorus() {
    try {
      await web3Obj.initialize('rinkeby')
      const userInfo = await web3Obj.torus.getUserInfo()
      setUserName(userInfo.name)
      setProfileImage(userInfo.profileImage)
      await axios.post('/api/user', {
        name: userInfo.name,
        profileImage: userInfo.profileImage,
        address: await web3Obj.account(),
      })
      setConnected(true)
    } catch (error) {
      console.error(error)
    }
  }


  const [selected, setSelected] = useState(0)
  const [org, setOrg] = useState()
  const [members, setMembers] = useState()
  const [balance, setBalance] = useState()
  const [exchange, setExchange] = useState()
  const [votes, setVotes] = useState()

  useEffect(() => {
    async function aragonConnect() {
      const org = await connect(daoAddress, 'thegraph', { chainId: 4 })
      console.log('org found')
      setOrg(org)
      const votingApp = new Voting(
        (await org.app('voting')).address,
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-rinkeby',
      )
      setVotes((await votingApp.votes()).length)
      const tokensApp = new TokenManager(
        (await org.app('token-manager')).address,
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-tokens-rinkeby',
      )
      setMembers((await (await tokensApp.token()).holders()).length)
      const vaultAppAddress = (await org.app('vault')).address
      setBalance(
        Number(
          web3Obj.web3.utils.fromWei(
            await web3Obj.web3.eth.getBalance(vaultAppAddress),
          ),
        ),
      )

      setExchange(
        Number(
          (
            await axios.get(
              'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
            )
          ).data['USD'],
        ),
      )
    }
    if (dao.daoAddress) {
      aragonConnect()
    }
  }, [dao])
  return (
    <>
      <div className="background">
        <div className="header">
          <img className="header-watermark" src={headerWatermark} />
          <Link href="/">
            <a className="fbfly-text">
              <img className="fbfly-text-img" src={FbText} />
              <img className="fbfly-text-img" src={FlyText} />
            </a>
          </Link>
          <Link href="/">
            <a className="fbfly-logo">
              <img className="fbfly-logo-img" src={FbFlyLogo} />
            </a>
          </Link>
          {connected ? (
            <div className="user">
              <div className="user-profile">
                <img className="user-profile-img" src={profileImage} />
              </div>
              <div className="user-name">{userName}</div>
              {/* <img src={caratDown} /> */}
            </div>
          ) : (
            <a
              className="login-button"
              onClick={() => {
                loginWithTorus()
              }}
            >
              <img className="fb-login-img" src={FbLogin} />
              Login with Facebook
            </a>
          )}
        </div>
        <main className="dao-main">
          <div className="left-column">
            <div className="dao-view-title tile">
              {imageHash && (
                <img
                  className="dao-logo-img"
                  src={`https://ipfs.infura.io/ipfs/${imageHash}`}
                />
              )}
              <a
                href={`https://rinkeby.aragon.org/#/${daoAddress}`}
                className="dao-name"
              >
                {daoName}
              </a>
              <a
                className="dao-fb-link"
                href={`https://www.facebook.com/groups/${fbGroupId}`}
              >
                <img className="fb-logo-img" src={FbLogo} />
                Go to Facebook Group
              </a>
              <a className="dao-donate-button">Donate now</a>
            </div>
            <div className="dao-count tile" onClick={() => setSelected(0)}>
              <img className="dao-count-img dao-count-left" src={membersLogo} />
              <div className="dao-count-right">
                <span className="count-value">{members}</span>
                <span className="count-title">Members</span>
              </div>
            </div>
            <div className="dao-count tile" onClick={() => setSelected(1)}>
              <img className="dao-count-img dao-count-left" src={votesLogo} />
              <div className="dao-count-right">
                <span className="count-value">{votes}</span>
                <span className="count-title">Votes</span>
              </div>
            </div>
            <div className="dao-count tile" onClick={() => setSelected(2)}>
              <img className="dao-count-img dao-count-left" src={capitalLogo} />
              <div className="dao-count-right">
                <span className="count-value">
                  {exchange && `$${(balance * exchange).toFixed(0)}`}
                </span>
                <span className="count-title">Capital</span>
              </div>
            </div>
          </div>
          {org &&
            (selected === 0 ? (
              <TokensView org={org} />
            ) : selected === 1 ? (
              <VotingView org={org} />
            ) : (
              <FinanceView balance={balance} exchange={exchange} org={org} />
            ))}
        </main>
      </div>
    </>
  )
}

export default DAOPageView
