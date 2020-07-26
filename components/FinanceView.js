import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import xDaiLogo from '../public/images/xDai.svg'
import '../styles/finance-view.sass'

const FinanceView = ({ transfers, capital }) => {
  return (
    <div className="finance-view">
      <div className="dao-finance tile">
        <div className="dao-finance-header">Finance</div>
        <div className="dao-finance-content">
          <div className="balance-value">{capital}</div>
          <div className="balance-label">
            <img className="xdai-logo" src={xDaiLogo} />
            {'xDAI (USD)'}
          </div>
        </div>
      </div>
      <div className="dao-transfers tile">
        <div className="dao-finance-header">Transfers</div>
        <div className="dao-transfers-title">
            <span>Date</span>
            <span>User</span>
            <span>Reference</span>
            <span>Amount</span>
        </div>
        <div className="dao-transfers-content">
          {transfers &&
            transfers.map(({ date, user, reference, amount }, index) => (
              <div className="transfer-item" key={index}>
                <div className="transfer-date">{date.toLocaleDateString()}</div>
                <div className="transfer-user">
                  <div className="transfer-user-img-container">
                    <img className="transfer-user-img" src={user.profile} />
                  </div>
                  <div className="transfer-user-name">{user.name}</div>
                </div>
                <div className="transfer-reference">{reference}</div>
                <div className="transfer-amount">
                  <div className="transfer-value">{amount}</div>
                  <img className="transfer-more" src={More} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FinanceView
