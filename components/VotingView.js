import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import xDaiLogo from '../public/images/xDai.svg'
import '../styles/voting-view.sass'

import { Voting } from '@aragon/connect-thegraph-voting'
import { useEffect, useState } from 'react'
import { getUser } from '../lib/helpers'

const VotingView = ({ org }) => {
  const [votes, setVotes] = useState()

  useEffect(() => {
    async function getVotes() {
      const votingApp = new Voting(
        (await org.app('voting')).address,
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-rinkeby',
      )
      let orgVotes = await votingApp.votes()
      orgVotes = await Promise.all(
        orgVotes.map(async vote => {
          if (!vote.metadata) {
            return {
              ...vote,
              metadata: 'Mint Token',
            }
          }
          return vote
        }),
      )
      setVotes(orgVotes)
      //orgVotes.map(console.log)
    }
    getVotes()
  }, [])

  if (!votes) {
    return null
  }

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
                {
                  user,
                  creator,
                  metadata,
                  executed,
                  startDate,
                  yea,
                  nay,
                  voteNum,
                },
                index,
              ) => (
                <div className="vote-item" key={index}>
                  <div className="vote-metadata"> {metadata} </div>
                  <div className="vote-count">{yea}</div>
                  <div className="vote-count">{nay}</div>
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
