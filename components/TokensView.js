import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import styles from './TokensView.module.sass'
import { useContext } from 'react'
import TorusContext from '../lib/TorusContext'
import { TokenManager } from '@aragon/connect-thegraph-tokens'
import { useEffect, useState } from 'react'
import { getUser } from '../lib/helpers'
import UserDisplay from './UserDisplay'
const axios = require('axios')

const TokensView = ({ org }) => {
  const { connected, web3Obj } = useContext(TorusContext)
  const [holders, setHolders] = useState()
  const [token, setToken] = useState()
  const [member, setMember] = useState(false)

  useEffect(() => {
    async function getTokens() {
      const tokenManager = await org.app('token-manager')
      const tokensApp = new TokenManager(
        tokenManager.address,
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-tokens-rinkeby',
      )
      const orgToken = await tokensApp.token()
      // console.log(orgToken)
      setToken(orgToken)
      let holders = await orgToken.holders()
      holders = await Promise.all(
        holders.map(async holder => {
          return {
            ...holder,
            user: await getUser(holder.address),
          }
        }),
      )
      //holders.map(console.log)
      console.log('holders found')
      setHolders(holders)
    }
    getTokens()
  }, [])

  useEffect(() => {
    async function updateMembership() {
      const account = await web3Obj.account()
      setMember(
        holders.reduce((isMember, holder) => {
          const foundUser =
            holder.address.toLowerCase() === account.toLowerCase()
          isMember = isMember || foundUser
          return isMember
        }, false),
      )
    }
    if (connected && holders) {
      updateMembership()
    }
  }, [connected, holders])

  async function joinDao() {
    await axios
      .post('/api/dao/join', {
        daoAddress: org.address,
        torusAccount: await web3Obj.account(),
      })
      .then()
      .catch(error => {
        console.log('Error:', error)
      })
  }

  if (!holders) {
    return null
  }

  return (
    <div className={styles.tokensView}>
      <div className={styles.tokensMainColumn}>
        <div className={`${styles.daoTokens} ${styles.tile}`}>
          <div className={styles.daoTokensHeader}>
            Members
            <span className={styles.daoTokensSymbol}>{token.symbol}</span>
          </div>
          <div className={styles.daoTokensContent}>
            <div className={styles.daoTokensTitle}>
              <span>Holder</span>
              <span>Balance</span>
            </div>
            <div className={styles.daoTokensMembers}>
              {holders &&
                holders.map((holder, index) => (
                  <div className={styles.memberItem} key={index}>
                    <UserDisplay user={holder.user} />
                    <div className={styles.memberItemRight}>
                      <div className={styles.memberTokens}>
                        {holder.balance}
                      </div>
                      <img className={styles.memberMore} src={More} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tokensRightColumn}>
        <div className={`${styles.daoTokensInfo} ${styles.tile}`}>
          <div className={styles.daoTokensInfoTitle}>Token Info</div>
          <div className={styles.daoTokensInfoContent}>
            <div className={styles.tokenItem}>
              <span className={styles.itemLabel}>Name</span>
              <span className={styles.itemValue}>{token.name}</span>
            </div>
            <div className={styles.tokenItem}>
              <span className={styles.itemLabel}>Symbol</span>
              <span className={`${styles.itemValue} ${styles.itemSymbol}`}>
                {token.symbol}
              </span>
            </div>
            <div className={styles.tokenItem}>
              <span className={styles.itemLabel}>Total Supply</span>
              <span className={styles.itemValue}>{token.totalSupply}</span>
            </div>
            <div className={styles.tokenItem}>
              <span className={styles.itemLabel}>Transferable</span>
              <span className={styles.itemValue}>
                {token.transferable ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
        {connected && !member && (
          <div className={`${styles.daoTokensInfo} ${styles.tile}`}>
            <div className={styles.daoTokensInfoTitle}>Become a member</div>
            <div className={styles.daoTokensInfoContent}>
              <span className={styles.daoMemberInfo}>
                Are you a member of our Facebook Group?
              </span>
              <a className={styles.daoJoinButton} onClick={joinDao}>
                Join now
              </a>
            </div>
          </div>
        )}
        <div className={`${styles.daoTokensInfo} ${styles.tile}`}>
          <div className={styles.daoTokensInfoTitle}>
            Ownership Distribution
            <img className={styles.questionImg} src={Question} />
          </div>
          <div className={styles.daoTokensInfoContent}>
            <div className={styles.sharesHeader}>
              <span className={styles.sharesTitle}>Token Holder Stakes</span>
              <div className={styles.sharesDisplay}>
                {holders &&
                  holders.map((holder, index) => (
                    <div className={styles.sharesDisplayItem} key={index}></div>
                  ))}
              </div>
            </div>
            <div className={styles.sharesContent}>
              {holders &&
                holders.map((holder, index) => (
                  <div className={styles.sharesItem} key={index}>
                    <div className={styles.sharesItemLeft}>
                      <div className={styles.itemColor}></div>
                      <UserDisplay user={holder.user} />
                    </div>
                    <div className={styles.itemShares}>
                      {(holder.balance * 100) / token.totalSupply}%
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokensView
