import { Cast, Vote, Voting } from '@aragon/connect-thegraph-voting'

function voteTitle(vote) {
  // Filtering out the extra data on governance.aragonproject.eth votes
  return (
    vote.metadata
      .split('\n')[0]
      .replace(/\(Link[^\)]+\)/, '')
      .replace(/\(SHA256[^\)]+\)/, '') || 'Untitled'
  )
}

function voteId(vote) {
  return (
    '#' +
    String(parseInt(vote.id.match(/voteId:(.+)$/)?.[1] || '0')).padEnd(2, ' ')
  )
}

const envs = new Map(
  Object.entries({
    rinkeby: {
      chainId: 4,
      votingSubgraphUrl:
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-rinkeby',
    },
    mainnet: {
      chainId: 1,
      votingSubgraphUrl:
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-mainnet',
    },
  }),
)

async function getVotes(orgAddress) {
  // Get network
  const env = envs.get(process.env.ETH_NETWORK || '') || envs.get('mainnet')
  // Connect to organization
  const org = await connect(orgAddress, 'thegraph', { chainId: env.chainId })
  // Query organization apps
  const apps = await org.apps()
  // Find the voting app
  const votingApp = apps.find(app => app.appName === 'voting.aragonpm.eth')

  if (!votingApp?.address) {
    console.log('\nNo voting app found in this organization')
    return
  }

  const voting = new Voting(votingApp.address, env.votingSubgraphUrl)

  const votes = await voting.votes()

  return votes
}
