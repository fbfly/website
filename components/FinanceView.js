import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import xDaiLogo from '../public/images/xDai.svg'
import '../styles/finance-view.sass'
import { Finance } from '@aragon/connect-finance'
import { useEffect, useState } from 'react'
import { getUser } from '../lib/helpers'
import { useContext } from 'react'
import TorusContext from '../lib/TorusContext'

const FinanceView = ({ org, balance, exchange }) => {
  const { connected, web3Obj } = useContext(TorusContext)
  // Fetch with connect from any rinkeby DAO
  const capital = balance * exchange
  const [transfers, setTransfers] = useState()
  const balanceUnit =
    process.env.network === 'xdai'
      ? 'xDai (USD)'
      : `ETH (1.0 ETH ~ $${exchange.toFixed(2)})`
  useEffect(() => {
    async function getFinance() {
      const financeAppAddress = (await org.app('finance')).address
      const financeApp = new Finance(
        financeAppAddress,
        'https://api.thegraph.com/subgraphs/name/0xgabi/aragon-finance-rinkeby',
      )
      let transactions = await financeApp.transactions()
      transactions = await Promise.all(
        transactions.map(async transaction => {
          return {
            ...transaction,
            user: await getUser(transaction.entity),
            amountValue: web3Obj.web3.utils.fromWei(transaction.amount),
            dateValue: new Date(Number(transaction.date)),
          }
        }),
      )
      setTransfers(transactions)
    }
    getFinance()
  }, [])
  return (
    <div className="finance-view">
      <div className="dao-finance tile">
        <div className="dao-finance-header">Finance</div>
        <div className="dao-finance-content">
          <div className="balance-value">{`${balance} ($${capital.toFixed(
            2,
          )})`}</div>
          <div className="balance-label">
            {/* <img className="xdai-logo" src={xDaiLogo} /> */}
            {balanceUnit}
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
            transfers.map(
              ({ dateValue, user, reference, amountValue }, index) => (
                <div className="transfer-item" key={index}>
                  <div className="transfer-date">
                    {dateValue.toLocaleDateString()}
                  </div>
                  <div className="transfer-user">
                    {user.profileImage && (
                      <div className="transfer-user-img-container">
                        <img
                          className="transfer-user-img"
                          src={user.profileImage}
                        />
                      </div>
                    )}
                    <div className="transfer-user-name">{user.name}</div>
                  </div>
                  <div className="transfer-reference">{reference}</div>
                  <div className="transfer-amount">
                    <div className="transfer-value">{amountValue} ETH</div>
                    <img className="transfer-more" src={More} />
                  </div>
                </div>
              ),
            )}
        </div>
      </div>
    </div>
  )
}

export default FinanceView
