import '../styles/dao-page-view.sass'
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

import { Connect } from '@aragon/connect-react'

const DAOPageView = ({
  dao: { logo, name, members, capital, votes, fbLink, daoLink, daoAddress },
}) => {
  const {
    web3Obj,
    connected,
    setConnected,
    userName,
    setUserName,
    profileImage,
    setProfileImage,
  } = useContext(TorusContext)

  const transfers = [
    {
      date: new Date(),
      user: {
        name: userName,
        profile: profileImage,
      },
      reference: 'Test1',
      amount: '30 xDai',
    },
    {
      date: new Date(),
      user: {
        name: userName,
        profile: profileImage,
      },
      reference: 'Test2',
      amount: '50 xDai',
    },
    {
      date: new Date(),
      user: {
        name: userName,
        profile: profileImage,
      },
      reference: 'Test3',
      amount: '33 xDai',
    },
  ]

  const token = {
    symbol: 'FBC',
    supply: 1000,
    transferable: true,
  }

  const memberList = [
    {
      name: userName,
      profile: profileImage,
      balance: 200,
      percentShare: 20,
    },
    {
      name: userName,
      profile: profileImage,
      balance: 200,
      percentShare: 20,
    },
    {
      name: userName,
      profile: profileImage,
      balance: 200,
      percentShare: 20,
    },
    {
      name: userName,
      profile: profileImage,
      balance: 200,
      percentShare: 20,
    },
    {
      name: userName,
      profile: profileImage,
      balance: 200,
      percentShare: 20,
    },
  ]

  const [selected, setSelected] = useState(0)
  return (
    <Connect location="beehive.aragonid.eth" connector="thegraph">
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
          <div className="user">
            <div className="user-profile">
              <img className="user-profile-img" src={profileImage} />
            </div>
            <div className="user-name">{userName}</div>
            <img src={caratDown} />
          </div>
        </div>
        <main className="dao-main">
          <div className="left-column">
            <div className="dao-view-title tile">
              <img
                className="dao-logo-img"
                //src={`data:image/svg+xml;utf8,${logoFile}`}
                src={logo}
              />
              <div className="dao-name">{name}</div>
              <a className="dao-fb-link">
                <img className="fb-logo-img" src={FbLogo} />
                Go to Facebook Group
              </a>
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
                <span className="count-value">{capital}</span>
                <span className="count-title">Capital</span>
              </div>
            </div>
          </div>
          {selected === 0 ? (
            <TokensView memberList={memberList} token={token} />
          ) : selected === 1 ? (
            <VotingView />
          ) : (
            <FinanceView capital={capital} transfers={transfers} />
          )}
        </main>
      </div>
    </Connect>
  )
}

export default DAOPageView
