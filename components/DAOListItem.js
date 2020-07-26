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
  className,
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
      const tokensApp = new TokenManager(
        (await org.app('token-manager')).address,
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-tokens-rinkeby',
      )
      setMembers((await (await tokensApp.token()).holders()).length)
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
    <div className={className}>
      <div className="dao-list-content">
        <div className="dao-list-content-logo">
          <Link href="/daos/[fbGroupId]" as={`/daos/${fbGroupId}`}>
            <a className="dao-link">
              <img
                className="dao-logo-img"
                src={`https://ipfs.infura.io/ipfs/${imageHash}`}
              />
              <div className="dao-title">{name}</div>
            </a>
          </Link>
          <a
            className="dao-fb-link"
            href={`https://www.facebook.com/groups/${fbGroupId}`}
          >
            <img className="fb-logo-img" src={FbLogo} />
            Go to Facebook Group
          </a>
        </div>
        <div className="dao-list-content-count">
          <img className="dao-count-img dao-count-left" src={membersLogo} />
          <div className="dao-count-right">
            <span className="count-value">{members}</span>
            <span className="count-title">Members</span>
          </div>
        </div>
        <div className="dao-list-content-count">
          <img className="dao-count-img dao-count-left" src={votesLogo} />
          <div className="dao-count-right">
            <span className="count-value">{votes}</span>
            <span className="count-title">Votes</span>
          </div>
        </div>
        <div className="dao-list-content-count">
          <img className="dao-count-img dao-count-left" src={capitalLogo} />
          <div className="dao-count-right">
            <span className="count-value">{capital}</span>
            <span className="count-title">Capital</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DAOListItem
