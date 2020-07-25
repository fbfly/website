import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import '../styles/tokens-view.sass'

const TokensView = ({memberList, token}) => {
    return (
        <div className="tokens-view">
          <div className="tokens-main-column">
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
                      <div className="member-item" key={index}>
                        <div className="item-user">
                          <div className="item-user-img-container">
                            <img
                              className="item-user-img"
                              src={member.profile}
                            />
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
          <div className="tokens-right-column">
            <div className="dao-tokens-info tile">
              <div className="dao-tokens-info-title">Token Info</div>
              <div className="dao-tokens-info-content">
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
            <div className="dao-tokens-info tile">
              <div className="dao-tokens-info-title">
                Ownership Distribution
                <img className="question-img" src={Question} />
              </div>
              <div className="dao-tokens-info-content">
                <div className="shares-header">
                  <span className="shares-title">Token Holder Stakes</span>
                  <div className="shares-display"></div>
                </div>
                <div className="shares-content">
                  {memberList &&
                    memberList.map((member, index) => (
                      <div className="shares-item" key={index}>
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
                        <div className="item-shares">
                          {member.percentShare}%
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default TokensView
