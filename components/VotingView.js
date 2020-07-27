import Question from '../public/images/question.svg'
import More from '../public/images/more.svg'
import xDaiLogo from '../public/images/xDai.svg'
import styles from './VotingView.module.sass'

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
    <div className={styles.votingView}>
      <div className={`${styles.daoVoting} ${styles.tile}`}>
        <div className={styles.daoVotingHeader}>Voting</div>
        <div className={styles.daoVotingTitle}>
          <span>Description</span>
          <span>Yes</span>
          <span>No</span>
          <span>Status</span>
        </div>
        <div className={styles.daoVotingContent}>
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
                <div className={styles.voteItem} key={index}>
                  <div className={styles.voteMetadata}> {metadata} </div>
                  <div className={styles.voteCount}>{yea}</div>
                  <div className={styles.voteCount}>{nay}</div>
                  {executed ? (
                    <div className={`${styles.voteStatus} ${styles.pass}`}>
                      Passed
                    </div>
                  ) : (
                    <div className={`${styles.voteStatus} ${fail}`}>
                      Rejected
                    </div>
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
