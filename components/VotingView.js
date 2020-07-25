import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import xDaiLogo from '../public/images/xDai.svg'
import '../styles/voting-view.sass'

import { Voting } from '@aragon/connect-thegraph-voting'
import { useEffect, useState } from 'react'

const VotingView = () => {
  const tempVotes = [
    {
      creator: '',
      metadata: 'Send money to XYZ',
      executed: true,
      yea: 50,
      nay: 0,
    },
    {
      creator: '',
      metadata: 'Add ABC as a member',
      executed: true,
      yea: 40,
      nay: 0,
    },
    {
      creator: '',
      metadata: 'This is a vote',
      executed: false,
      yea: 70,
      nay: 0,
    },
    {
      creator: '',
      metadata: 'This is another vote',
      executed: true,
      yea: 70,
      nay: 0,
    },
  ]
  const [votes, setVotes] = useState(tempVotes)

  // const VOTING_APP_ADDRESS = '0x709e31ba29fb84000f20045590ec664bfc3cdc1d'
  // const VOTING_APP_SUBGRAPH_URL =
  //   'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-mainnet'

  // const voting = new Voting(VOTING_APP_ADDRESS, VOTING_APP_SUBGRAPH_URL)
  // useEffect(() => {
  //   async function getVotes() {
  //     const orgVotes = await voting.votes()
  //     setVotes(orgVotes)
  //     orgVotes.map(vote => {
  //       if (vote.metadata) {
  //         console.log(
  //           vote.creator + ' + ' + vote.metadata + ' + ' + vote.voteNum,
  //         )
  //       }
  //     })
  //   }
  //   getVotes()
  // })

  return (
    <div className="voting-view">
      <div className="dao-voting tile">
        <div className="dao-voting-header">Voting</div>
        <div className="dao-voting-title">
          <span>Description</span>
          <span>Yes</span>
          <span>No</span>
          <span>Status</span>
        </div>
        <div className="dao-voting-content">
          {votes &&
            votes.map(
              (
                { creator, metadata, executed, startDate, yea, nay, voteNum },
                index,
              ) => (
                <div className="vote-item" key={index}>
                  <div className="vote-metadata"> {metadata} </div>
                  <div className="vote-count">{yea} %</div>
                  <div className="vote-count">{nay} %</div>
                  {executed ? (
                    <div className="vote-status pass">Passed</div>
                  ) : (
                    <div className="vote-status fail">Rejected</div>
                  )}
                </div>
              ),
            )}
        </div>
      </div>
    </div>
  )
}

export default VotingView
