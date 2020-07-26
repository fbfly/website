import '../styles/dao-list-view.sass'
import FbLogin from '../public/images/fb-login.svg'
import caratDown from '../public/images/carat-down.svg'
import headerWatermark from '../public/images/card-header-watermark.svg'
import FbFlyLogo from '../public/images/fbfly-logo-light.svg'
import FbText from '../public/images/fb.svg'
import FlyText from '../public/images/fly.svg'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import TorusContext from '../lib/TorusContext'

import axios from 'axios'
import DAOListItem from './DAOListItem'

const DAOListView = () => {
  const {
    web3Obj,
    connected,
    setConnected,
    userName,
    setUserName,
    profileImage,
    setProfileImage,
  } = useContext(TorusContext)

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

  const [daoList, setDaoList] = useState()

  useEffect(() => {
    async function getDaoList() {
      let response
      try {
        response = await axios.get('/api/dao')
      } catch (error) {
        console.log(error)
      }
      setDaoList(response.data)
    }
    getDaoList()
  }, [])

  return (
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
      {daoList &&
        daoList.map((dao, index) => (
          <DAOListItem
            dao={dao}
            className={`dao-item ${index === 0 ? 'top' : ''}`}
            key={index}
          />
        ))}
    </div>
  )
}

export default DAOListView
