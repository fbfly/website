import { connect } from '@aragon/connect'
import { Voting } from '@aragon/connect-thegraph-voting'
import { TokenManager } from '@aragon/connect-thegraph-tokens'
import { useState, useEffect, useContext } from 'react'
import TorusContext from '../lib/TorusContext'
import Link from 'next/link'
import FbLogo from '../public/images/fb-logo.svg'
import membersLogo from '../public/images/profile.svg'
import capitalLogo from '../public/images/coins.svg'
import votesLogo from '../public/images/thumbs.svg'
import axios from 'axios'
import styles from './DAOListItem.module.sass'

const DAOListItem = ({
  dao: {
    imageHash,
    daoName,
    daoAddress,
    daoENS,
    fbGroupId,
    tokenName,
    tokenSymbol,
  },
  top,
}) => {
  const { web3Obj, connected } = useContext(TorusContext)
  const [members, setMembers] = useState()
  const [capital, setCapital] = useState()
  const [votes, setVotes] = useState()
  useEffect(() => {
    async function aragonConnect() {
      const org = await connect(daoAddress, 'thegraph', { chainId: 4 })
      console.log('org found')
      const votingApp = new Voting(
        (await org.app('voting')).address,
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-rinkeby',
      )
      setVotes((await votingApp.votes()).length)
      const tokenManagerAddress = (await org.app('token-manager')).address
      const tokensApp = new TokenManager(
        tokenManagerAddress,
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-tokens-rinkeby',
      )
      console.log({ tokenManagerAddress })
      console.log({ tokensApp })
      const token = await tokensApp.token()
      console.log({ token })
      setMembers((await token.holders()).length)
      console.log(await org.app('finance'))
      const vaultAppAddress = (await org.app('vault')).address
      const balance = Number(
        web3Obj.web3.utils.fromWei(
          await web3Obj.web3.eth.getBalance(vaultAppAddress),
        ),
      )

      const exchange = Number(
        (
          await axios.get(
            'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
          )
        ).data['USD'],
      )
      setCapital(`$${(balance * exchange).toFixed(0)}`)
    }
    aragonConnect()
  }, [])
  return (
    <div className={`${styles.daoItem} ${top ? styles.top : ''}`}>
      <div className={styles.daoListContent}>
        <div className={styles.daoListContentLogo}>
          <Link href="/daos/[fbGroupId]" as={`/daos/${fbGroupId}`}>
            <a className={styles.daoLink}>
              <img
                className={styles.daoLogoImg}
                src={`https://ipfs.infura.io/ipfs/${imageHash}`}
              />
              <div className={styles.daoTitle}>{daoName}</div>
            </a>
          </Link>
          <a
            className={styles.daoFbLink}
            href={`https://www.facebook.com/groups/${fbGroupId}`}
          >
            <img className={styles.fbLogoImg} src={FbLogo} />
            Go to Facebook Group
          </a>
        </div>
        <div className={styles.daoListContentCount}>
          <img
            className={`${styles.daoCountImg} ${styles.daoCountLeft}`}
            src={membersLogo}
          />
          <div className={styles.daoCountRight}>
            <span className={styles.countValue}>{members}</span>
            <span className={styles.countTitle}>Members</span>
          </div>
        </div>
        <div className={styles.daoListContentCount}>
          <img
            className={`${styles.daoCountImg} ${styles.daoCountLeft}`}
            src={votesLogo}
          />
          <div className={styles.daoCountRight}>
            <span className={styles.countValue}>{votes}</span>
            <span className={styles.countTitle}>Votes</span>
          </div>
        </div>
        <div className={styles.daoListContentCount}>
          <img
            className={`${styles.daoCountImg} ${styles.daoCountLeft}`}
            src={capitalLogo}
          />
          <div className={styles.daoCountRight}>
            <span className={styles.countValue}>{capital}</span>
            <span className={styles.countTitle}>Capital</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DAOListItem
