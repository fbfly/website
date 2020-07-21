import { ethers } from 'ethers'
import { fetchRepo, getOrgAddress, getTokenManagerAddress } from './helpers'

const MAIN_SUBGRAPH_RINKEBY =
  'https://api.thegraph.com/subgraphs/name/aragon/aragon-rinkeby'

const TEMPLATE_NAME = 'membership-template'

// ABIs

/*
Access Control List
Use the Access Control List (ACL) to control who can access your app's functionality
*/
const aclAbi = require('../abis/acl.json')
const tokenManagerAbi = require('../abis/tokenManager.json')
const kernelAbi = require('../abis/kernel.json')

// Token manager
const TOKEN_MANAGER_MINT_ROLE =
  '0x154c00819833dac601ee5ddded6fda79d9d8b506b911b3dbd54cdb95fe6c3686'

export default async function main(torusProvider) {
  const delay = ms => new Promise(res => setTimeout(res, ms))
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

  // This is the creator of the DAO
  const dictatorAccount = '0x419a443899Fa8401Bd10dF6D18863d66b36ec320'

  // DAO metadata
  const tokenName = 'Peseta'
  const tokenSymbol = 'PST'
  const daoName = 'Pica Pollo' + Math.random()
  const daoMembers = [dictatorAccount]
  const votingSettings = [30, 20, 30]
  const financePeriod = 0

  // Creating the dao with the previous settings
  const tx = await templateContract[
    'newTokenAndInstance(string,string,string,address[],uint64[3],uint64,bool)'
  ](
    tokenName,
    tokenSymbol,
    daoName,
    daoMembers,
    votingSettings,
    financePeriod,
    false,
  )

  // Filter and get the org address from the events.
  const orgAddress = await getOrgAddress('DeployDao', templateContract, tx.hash)
  console.log(`Organization Address: ${orgAddress}`)

  // Instanciate the kernel contract so we can get the ACL
  const kernelContract = new ethers.Contract(
    orgAddress,
    kernelAbi,
    ethersSigner,
  )
  console.log(kernelContract)

  const aclAddress = await kernelContract.acl()

  // Instanciate the ACL contract so we can set token minting permissions
  const aclContract = new ethers.Contract(aclAddress, aclAbi, ethersSigner)
  console.log(aclContract)

  /* 
  This is just temporal, waiting for the subgraph to update.
  */
  await delay(30 * 1000)

  /* 
  I think there's no way to get the token manager address besides using connect.
  May look into other ways though.
  */
  const tokenManagerContractAddress = await getTokenManagerAddress(orgAddress)
  console.log('TokenManager', tokenManagerContractAddress)

  /* 
  Creating a permission for MINT_ROLE on the ACL for token manager
   https://hack.aragon.org/docs/aragonos-ref#create-permission
  */

  await aclContract.createPermission(
    dictatorAccount,
    tokenManagerContractAddress,
    TOKEN_MANAGER_MINT_ROLE,
    dictatorAccount,
  )

  const tokenManagerContract = new ethers.Contract(
    tokenManagerContractAddress,
    tokenManagerAbi,
    ethersSigner,
  )

  const altAccount = '0xFc2D132d9Eb3868fca6B924715D5AB2Cd7296Ac2'
  /*
   Why am I trying to mint a token like this? If we can do this, 
   then we can verify and send the token if the user is a member of the FB group 
   using Tor.us facebook integration.

   Resources:
   https://help.aragon.org/article/18-tokens
   https://github.com/aragon/aragon-apps/blob/master/apps/token-manager/contracts/TokenManager.sol
   
  */
  await tokenManagerContract.mint(altAccount, bigNum(10).pow(18))
  console.log('Minted an extra token to', altAccount)
}
