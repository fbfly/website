import '../styles/dao-page-view.sass'
import caratDown from '../public/images/carat-down.svg'
import headerWatermark from '../public/images/card-header-watermark.svg'
import FbFlyLogo from '../public/images/fbfly-logo-light.svg'
import FbText from '../public/images/fb.svg'
import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import FlyText from '../public/images/fly.svg'
import FbLogo from '../public/images/fb-logo.svg'

import membersLogo from '../public/images/profile.svg'
import capitalLogo from '../public/images/coins.svg'
import votesLogo from '../public/images/thumbs.svg'

const DAOPageView = ({
  dao: { logo, name, members, capital, votes, fbLink, daoLink },
  user: { userName, userProfile },
}) => {
  const token = {
    symbol: 'FBC',
    supply: 1000,
    transferable: true,
  }

  const memberList = [
    {
      name: userName,
      profile: userProfile,
      balance: 200,
      percentShare: 20,
    },
    {
      name: userName,
      profile: userProfile,
      balance: 200,
      percentShare: 20,
    },
    {
      name: userName,
      profile: userProfile,
      balance: 200,
      percentShare: 20,
    },
    {
      name: userName,
      profile: userProfile,
      balance: 200,
      percentShare: 20,
    },
    {
      name: userName,
      profile: userProfile,
      balance: 200,
      percentShare: 20,
    },
  ]
  return (
    <div className="background">
      <div className="header">
        <img className="header-watermark" src={headerWatermark} />
        <div className="fbfly-text">
          <img className="fbfly-text-img" src={FbText} />
          <img className="fbfly-text-img" src={FlyText} />
        </div>
        <div className="fbfly-logo">
          <img className="fbfly-logo-img" src={FbFlyLogo} />
        </div>
        <div className="user">
          <div className="user-profile">
            <img className="user-profile-img" src={userProfile} />
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
          <div className="dao-count tile">
            <img className="dao-count-img dao-count-left" src={membersLogo} />
            <div className="dao-count-right">
              <span className="count-value">{members}</span>
              <span className="count-title">Members</span>
            </div>
          </div>
          <div className="dao-count tile">
            <img className="dao-count-img dao-count-left" src={votesLogo} />
            <div className="dao-count-right">
              <span className="count-value">{votes}</span>
              <span className="count-title">Votes</span>
            </div>
          </div>
          <div className="dao-count tile">
            <img className="dao-count-img dao-count-left" src={capitalLogo} />
            <div className="dao-count-right">
              <span className="count-value">{capital}</span>
              <span className="count-title">Capital</span>
            </div>
          </div>
        </div>
        <div className="main-column">
          <div className="dao-tokens tile">
            <div className="dao-tokens-header">
              Tokens
              <span className="dao-tokens-symbol">FBC</span>
            </div>
            <div className="dao-tokens-content">
              <div className="dao-tokens-title">
                <span>Holder</span>
                <span>Balance</span>
              </div>
              <div className="dao-tokens-members">
                {memberList &&
                  memberList.map((member, index) => (
                    <div className="member-item">
                      <div className="item-user">
                        <div className="item-user-img-container">
                          <img className="item-user-img" src={member.profile} />
                        </div>
                        <div className="item-user-name">{member.name}</div>
                      </div>
                      <div className="member-item-right">
                        <div className="member-tokens">{member.balance}</div>
                        <img className="member-more" src={More} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="dao-info tile">
            <div className="dao-info-title">Token Info</div>
            <div className="dao-info-content">
              <div className="token-item">
                <span className="item-label">Total Supply</span>
                <span className="item-value">{token.supply}</span>
              </div>
              <div className="token-item">
                <span className="item-label">Transferable</span>
                <span className="item-value">
                  {token.transferable ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="token-item">
                <span className="item-label">Token</span>
                <span className="item-value item-symbol">{token.symbol}</span>
              </div>
            </div>
          </div>
          <div className="dao-info tile">
            <div className="dao-info-title">
              Ownership Distribution
              <img className="question-img" src={Question} />
            </div>
            <div className="dao-info-content">
              <div className="shares-header">
                <span className="shares-title">Token Holder Stakes</span>
                <div className="shares-display"></div>
              </div>
              <div className="shares-content">
                {memberList &&
                  memberList.map((member, index) => (
                    <div className="shares-item">
                      <div className="shares-item-left">
                        <div className="item-color"></div>
                        <div className="item-user">
                          <div className="item-user-img-container">
                            <img
                              className="item-user-img"
                              src={member.profile}
                            />
                          </div>
                          <div className="item-user-name">{member.name}</div>
                        </div>
                      </div>
                      <div className="item-shares">{member.percentShare}%</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DAOPageView
