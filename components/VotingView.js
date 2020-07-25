import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import xDaiLogo from '../public/images/xDai.svg'
import '../styles/voting-view.sass'

import { Voting } from '@aragon/connect-thegraph-voting'
import { useEffect, useState } from 'react'

const VotingView = () => {
  const VOTING_APP_ADDRESS = '0x709e31ba29fb84000f20045590ec664bfc3cdc1d'
  const VOTING_APP_SUBGRAPH_URL =
    'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-mainnet'

  const voting = new Voting(VOTING_APP_ADDRESS, VOTING_APP_SUBGRAPH_URL)
  const [votes, setVotes] = useState(undefined)
  useEffect(() => {
    async function getVotes() {
      const orgVotes = await voting.votes({first: 10})
      setVotes(orgVotes)
      orgVotes.map(vote => {
        if (vote.metadata) {
          console.log(
            vote.creator + ' + ' + vote.metadata + ' + ' + vote.voteNum,
          )
        }
      })
    }
    getVotes()
  })

  return (
    <div className="voting-view">
      <div className="dao-voting tile">
        <div className="dao-voting-header">Voting</div>
        <div className="dao-voting-content">
          {votes &&
            votes.map(
              (
                { creator, metadata, executed, startDate, yea, nay, voteNum },
                index,
              ) => <div className="vote-item" key={index}></div>,
            )}
        </div>
      </div>
    </div>
  )
}

export default VotingView
