import { ethers } from 'ethers'
import { fetchRepo, getOrgAddress } from './helpers'

const MAIN_SUBGRAPH_RINKEBY =
  'https://api.thegraph.com/subgraphs/name/aragon/aragon-rinkeby'

const TEMPLATE_NAME = 'membership-template'

export async function main(torusProvider) {
  // fetch Repos data
  const { data } = await fetchRepo(TEMPLATE_NAME, MAIN_SUBGRAPH_RINKEBY)

  // parse data from last version published
  const { lastVersion } = data.repos[0]
  const templateAddress = lastVersion.codeAddress
  const templateArtifact = JSON.parse(lastVersion.artifact)

  // create signer
  const ethersProvider = new ethers.providers.Web3Provider(torusProvider)
  const ethersSigner = ethersProvider.getSigner()

  // create template contract
  const templateContract = new ethers.Contract(
    templateAddress,
    templateArtifact.abi,
    ethersSigner,
  )

  const daoName = 'MyTestDao'
  const daoMembers = ['0x419a443899Fa8401Bd10dF6D18863d66b36ec320']
  const votingSettings = [30, 20, 30]
  const financePeriod = 0

  const tx = await templateContract[
    'newInstance(string,address[],uint64[3],uint64,bool)'
  ](daoName, daoMembers, votingSettings, financePeriod, false)

  // Filter and get the org address from the events.
  const orgAddress = await getOrgAddress('DeployDao', templateContract, tx.hash)

  console.log(`Organization Address: ${orgAddress}`)
}
