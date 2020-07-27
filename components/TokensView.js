import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import '../styles/tokens-view.sass'
import { useContext } from 'react'
import TorusContext from '../lib/TorusContext'
import { TokenManager } from '@aragon/connect-thegraph-tokens'
import { useEffect, useState } from 'react'
import { getUser } from '../lib/helpers'

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
        daoAddress: dao,
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
    <div className="tokens-view">
      <div className="tokens-main-column">
        <div className="dao-tokens tile">
          <div className="dao-tokens-header">
            Members
            <span className="dao-tokens-symbol">{token.symbol}</span>
          </div>
          <div className="dao-tokens-content">
            <div className="dao-tokens-title">
              <span>Holder</span>
              <span>Balance</span>
            </div>
            <div className="dao-tokens-members">
              {holders &&
                holders.map((holder, index) => (
                  <div className="member-item" key={index}>
                    <div className="item-user">
                      {holder.user.profileImage && (
                        <div className="item-user-img-container">
                          <img
                            className="item-user-img"
                            src={holder.user.profileImage}
                          />
                        </div>
                      )}
                      <div className="item-user-name">{holder.user.name}</div>
                    </div>
                    <div className="member-item-right">
                      <div className="member-tokens">{holder.balance}</div>
                      <img className="member-more" src={More} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="tokens-right-column">
        <div className="dao-tokens-info tile">
          <div className="dao-tokens-info-title">Token Info</div>
          <div className="dao-tokens-info-content">
            <div className="token-item">
              <span className="item-label">Name</span>
              <span className="item-value">{token.name}</span>
            </div>
            <div className="token-item">
              <span className="item-label">Symbol</span>
              <span className="item-value item-symbol">{token.symbol}</span>
            </div>
            <div className="token-item">
              <span className="item-label">Total Supply</span>
              <span className="item-value">{token.totalSupply}</span>
            </div>
            <div className="token-item">
              <span className="item-label">Transferable</span>
              <span className="item-value">
                {token.transferable ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
        {connected && !member && (
          <div className="dao-tokens-info tile">
            <div className="dao-tokens-info-title">Become a member</div>
            <div className="dao-tokens-info-content">
              <span className="dao-member-info">
                Are you a member of our Facebook Group?
              </span>
              <a className="dao-join-button" onClick={joinDao}>
                Join now
              </a>
            </div>
          </div>
        )}
        <div className="dao-tokens-info tile">
          <div className="dao-tokens-info-title">
            Ownership Distribution
            <img className="question-img" src={Question} />
          </div>
          <div className="dao-tokens-info-content">
            <div className="shares-header">
              <span className="shares-title">Token Holder Stakes</span>
              <div className="shares-display">
                {holders &&
                  holders.map((holder, index) => (
                    <div className="shares-display-item"></div>
                  ))}
              </div>
            </div>
            <div className="shares-content">
              {holders &&
                holders.map((holder, index) => (
                  <div className="shares-item" key={index}>
                    <div className="shares-item-left">
                      <div className="item-color"></div>
                      <div className="item-user">
                        {holder.user.profileImage && (
                          <div className="item-user-img-container">
                            <img
                              className="item-user-img"
                              src={holder.user.profileImage}
                            />
                          </div>
                        )}
                        <div className="item-user-name">{holder.user.name}</div>
                      </div>
                    </div>
                    <div className="item-shares">
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
