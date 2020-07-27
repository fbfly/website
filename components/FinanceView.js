import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import xDaiLogo from '../public/images/xDai.svg'
import styles from './FinanceView.module.sass'
import { Finance } from '@aragon/connect-finance'
import { useEffect, useState } from 'react'
import { getUser } from '../lib/helpers'
import { useContext } from 'react'
import TorusContext from '../lib/TorusContext'
import UserDisplay from './UserDisplay'

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
    <div className={styles.financeView}>
      <div className={`${styles.daoFinance} ${styles.tile}`}>
        <div className={styles.daoFinanceHeader}>Finance</div>
        <div className={styles.daoFinanceContent}>
          <div className={styles.balanceValue}>{`${balance} ($${capital.toFixed(
            2,
          )})`}</div>
          <div className={styles.balanceLabel}>
            {/* <img className={styles.xdaiLogo} src={xDaiLogo} /> */}
            {balanceUnit}
          </div>
        </div>
      </div>
      <div className={`${styles.daoTransfers} ${styles.tile}`}>
        <div className={styles.daoFinanceHeader}>Transfers</div>
        <div className={styles.daoTransfersTitle}>
          <span>Date</span>
          <span>User</span>
          <span>Reference</span>
          <span>Amount</span>
        </div>
        <div className={styles.daoTransfersContent}>
          {transfers &&
            transfers.map(
              ({ dateValue, user, reference, amountValue }, index) => (
                <div className={styles.transferItem} key={index}>
                  <div className={styles.transferDate}>
                    {dateValue.toLocaleDateString()}
                  </div>
                  <UserDisplay user={user} />
                  <div className={styles.transferReference}>{reference}</div>
                  <div className={styles.transferAmount}>
                    <div className={styles.transferValue}>
                      {amountValue} ETH
                    </div>
                    <img className={styles.transferMore} src={More} />
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
