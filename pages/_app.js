import '../styles/styles.sass'
import { TorusProvider } from '../lib/TorusContext'
import UserProfile from '../public/images/user-profile.svg'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [connected, setConnected] = useState(false)
  const [web3Obj, setWeb3Obj] = useState(null)
  const [profileImage, setProfileImage] = useState(UserProfile)
  const [userName, setUserName] = useState('John Doe')

  useEffect(() => {
    async function loadTorus() {
      const { default: web3Obj } = await import('../lib/torus')
      setWeb3Obj(web3Obj)
    }
    loadTorus()
  }, [])

  return (
    <TorusProvider
      value={{
        web3Obj,
        connected,
        setConnected,
        userName,
        setUserName,
        profileImage,
        setProfileImage,
      }}
    >
      <Component {...pageProps} />
    </TorusProvider>
  )
}
