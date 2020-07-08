import Head from 'next/head'
import Fortmatic from 'fortmatic'
import Web3 from 'web3'
import React, { useState } from 'react'
import { AppBar, Main, AppView, EthIdenticon } from '@aragon/ui'
import ButtonConnect from './ButtonConnect'
import Button from '@aragon/ui/dist/Button'

const Layout = props => {
  const [ethAddy, setEthAddy] = useState('')

  function onClick() {
    const fm = new Fortmatic('pk_test_8495FABC042E62AC')
    window.web3 = new Web3(fm.getProvider())

    fm.user.login().then(() => {
      web3.eth.getAccounts().then(setEthAddy) // ['0x...']
    })
  }

  return (
    <>
      <Head>
        <title>Facebook Fly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <AppView
          appBar={
            <AppBar
              title="Love Cats"
              endContent={
                !ethAddy ? (
                  <ButtonConnect onClick={onClick}></ButtonConnect>
                ) : (
                  <Button
                    icon={
                      <EthIdenticon
                        address={() => ethAddy}
                        scale={3}
                        radius={1}
                        soften={0.7}
                      />
                    }
                    label={ethAddy}
                  ></Button>
                )
              }
            />
          }
        >
          <div className="container">{props.children}</div>
        </AppView>
      </Main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Aragon
        </a>
      </footer>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        }
        .container {
          max-width: 42rem;
          margin: 0 auto;
          padding: 2rem 1.25rem;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}

export default Layout
