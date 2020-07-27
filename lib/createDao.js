import { ethers } from 'ethers'
import { fetchRepo, getAppAddress, getOrgAddress } from './helpers'

const Namehash = require('eth-ens-namehash')

const aclAbi = require('../abis/acl.json')
const bareTemplateAbi = require('../abis/bareTemplate.json')
const financeAbi = require('../abis/finance.json')
const kernelAbi = require('../abis/kernel.json')
const minimeAbi = require('../abis/minime.json')
const minimeBytecode = require('../abis/bytecode/minime.json')
const tokenManagerAbi = require('../abis/tokenManager.json')
const vaultAbi = require('../abis/vault.json')
const votingAbi = require('../abis/voting.json')

// Bare Template address in aragonPM (rinkeby)
const BARE_TEMPLATE_ADDRESS = '0x789e4695d4D24EBFAcbccDd951A3D4075C5ce261'
const MINIME_FACTORY_ADDRESS = '0x6ffeB4038f7F077C4D20EAF1706980CaeC31e2BF'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// ACL
const ACL_CREATE_PERMISSIONS_ROLE =
  '0x0b719b33c83b8e5d300c521cb8b54ae9bd933996a14bef8c2f4e0285d2d2400a'
// Finance
const FINANCE_APP_ID = Namehash.hash('finance.aragonpm.eth')
const FINANCE_IMPL_ADDRESS = '0x94D3013A8700E8B168f66529aD143590CC6b259d'
const FINANCE_CREATE_PAYMENTS_ROLE =
  '0x5de467a460382d13defdc02aacddc9c7d6605d6d4e0b8bd2f70732cae8ea17bc'
const FINANCE_EXECUTE_PAYMENTS_ROLE =
  '0x563165d3eae48bcb0a092543ca070d989169c98357e9a1b324ec5da44bab75fd'
const FINANCE_MANAGE_PAYMENTS_ROLE =
  '0x30597dd103acfaef0649675953d9cb22faadab7e9d9ed57acc1c429d04b80777'
// Kernel
const KERNEL_MANAGE_APPS_ROLE =
  '0xb6d92708f3d4817afc106147d969e229ced5c46e65e0a5002a0d391287762bd0'
// Token manager
const TOKEN_MANAGER_APP_ID = Namehash.hash('token-manager.aragonpm.eth')
const TOKEN_MANAGER_IMPL_ADDRESS = '0xE775468F3Ee275f740A22EB9DD7aDBa9b7933Aa0'
const TOKEN_MANAGER_MINT_ROLE =
  '0x154c00819833dac601ee5ddded6fda79d9d8b506b911b3dbd54cdb95fe6c3686'
// Vault
const VAULT_APP_ID = Namehash.hash('vault.aragonpm.eth')
const VAULT_IMPL_ADDRESS = '0x35c5Abf253C873deE9ee4fe2687CD378Eff1263e'
const VAULT_TRANSFER_ROLE =
  '0x8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c'
// Voting
const VOTING_APP_ID = Namehash.hash('voting.aragonpm.eth')
const VOTING_IMPL_ADDRESS = '0xb4fa71b3352D48AA93D34d085f87bb4aF0cE6Ab5'
const VOTING_CREATE_VOTES_ROLE =
  '0xe7dcd7275292e064d090fbc5f3bd7995be23b502c1fed5cd94cfddbbdcd32bbc'

export function bigNum(number) {
  return ethers.BigNumber.from(number)
}

export default async function createDao(tokenName, tokenSymbol, torusAccount) {
  console.log('Started...')
  const privateKey = process.env.DICTATOR_PK
  // const dictactorAccount = '0x419a443899Fa8401Bd10dF6D18863d66b36ec320'
  // create signer
  // const ethersProvider = new ethers.getDefaultProvider('rinkeby', {
  //   infura: process.env.INFURA_PROJECT_ID,
  //   etherscan: process.env.ETHERSCAN_API_KEY,
  // })
  //
  const ethersProvider = new ethers.providers.InfuraProvider('rinkeby', {
    infura: process.env.INFURA_PROJECT_ID,
  })

  const wallet = new ethers.Wallet(privateKey, ethersProvider)
  const dictactorAccount = wallet.address
  console.log({ dictactorAccount })

  const bareTemplateContract = new ethers.Contract(
    BARE_TEMPLATE_ADDRESS,
    bareTemplateAbi,
    wallet,
  )

  // Create organization from bare template
  const tx = await bareTemplateContract['newInstance()']({
    gasLimit: 9000000,
    gasPrice: 54000000000,
  })
  console.log('Dao created on transaction ', tx.hash)

  // Filter and get the org address from the events.
  const orgAddress = await getOrgAddress(
    'DeployDao',
    bareTemplateContract,
    tx.hash,
  )

  // Log the DAO address
  console.log(`Organization Address: ${orgAddress}`)

  // Deploy a minime token for the organization
  // The token controller will be the sender
  const minimeFactory = new ethers.ContractFactory(
    minimeAbi,
    minimeBytecode.object,
    wallet,
  )

  const minimeContract = await minimeFactory.deploy(
    MINIME_FACTORY_ADDRESS,
    ZERO_ADDRESS,
    0,
    tokenName,
    18,
    tokenSymbol,
    false, // membership tokens are non transferable
  )

  await minimeContract.deployTransaction.wait()
  console.log(`MineMe Token Address: ${minimeContract.address}`)

  // Instanciate the kernel contract so we can get the ACL
  const kernelContract = new ethers.Contract(orgAddress, kernelAbi, wallet)
  const aclAddress = await kernelContract.acl()

  // Instanciate the ACL contract so we can set token minting permissions
  const aclContract = new ethers.Contract(aclAddress, aclAbi, wallet)

  const tokenManagerInstallTx = await kernelContract[
    'newAppInstance(bytes32,address)'
  ](TOKEN_MANAGER_APP_ID, TOKEN_MANAGER_IMPL_ADDRESS, {
    gasLimit: 9000000,
    gasPrice: 54000000000,
  })
  console.log(
    'Token manager installed on transaction ',
    tokenManagerInstallTx.hash,
  )

  const tokenManagerContractAddress = await getAppAddress(
    'NewAppProxy',
    kernelContract,
    tokenManagerInstallTx.hash,
  )
  console.log('Token manager address: ', tokenManagerContractAddress)

  // Making token manager controller of the minime token
  const changeControllerTx = await minimeContract.changeController(
    tokenManagerContractAddress,
  )
  await changeControllerTx.wait()

  console.log('Transaction changeController', changeControllerTx.hash)

  // Creating a permission for MINT_ROLE on the ACL for token manager
  await aclContract.createPermission(
    dictactorAccount,
    tokenManagerContractAddress,
    TOKEN_MANAGER_MINT_ROLE,
    dictactorAccount,
  )
  console.log('Mint role set')

  const tokenManagerContract = new ethers.Contract(
    tokenManagerContractAddress,
    tokenManagerAbi,
    wallet,
  )

  const tokenManagerInitTx = await tokenManagerContract.initialize(
    minimeContract.address,
    false,
    bigNum(10).pow(18), //setting it to one
  )
  await tokenManagerInitTx.wait()
  console.log('Minime token deployed on contract')

  await tokenManagerContract.mint(torusAccount, bigNum(10).pow(18), {
    gasLimit: 9000000,
    gasPrice: 54000000000,
  })

  console.log('Token minted to', torusAccount)
  //
  // Install a voting app
  const votingInstallTx = await kernelContract[
    'newAppInstance(bytes32,address)'
  ](VOTING_APP_ID, VOTING_IMPL_ADDRESS, {
    gasLimit: 9000000,
    gasPrice: 54000000000,
  })
  console.log('Voting app installed on transaction: ', votingInstallTx.hash)

  const votingContractAddress = await getAppAddress(
    'NewAppProxy',
    kernelContract,
    votingInstallTx.hash,
  )
  console.log('Voting address', votingContractAddress)

  const votingContract = new ethers.Contract(
    votingContractAddress,
    votingAbi,
    wallet,
  )

  await aclContract.createPermission(
    tokenManagerContractAddress,
    votingContractAddress,
    VOTING_CREATE_VOTES_ROLE,
    votingContractAddress,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )
  console.log('Voting permissions set')

  const votingInitializeTx = await votingContract.initialize(
    minimeContract.address,
    bigNum(5).mul(bigNum(10).pow(17)),
    bigNum(15).mul(bigNum(10).pow(16)),
    '86400',
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )
  await votingInitializeTx.wait()
  console.log('Voting app initialized')

  // Install a vault app

  const vaultInstallTx = await kernelContract[
    'newAppInstance(bytes32,address)'
  ](VAULT_APP_ID, VAULT_IMPL_ADDRESS, {
    gasLimit: 9000000,
    gasPrice: 54000000000,
  })

  await vaultInstallTx.wait()

  console.log('Vault app installed')

  const vaultContractAddress = await getAppAddress(
    'NewAppProxy',
    kernelContract,
    vaultInstallTx.hash,
  )

  console.log('Vault contract address', vaultContractAddress)

  const vaultContract = new ethers.Contract(
    vaultContractAddress,
    vaultAbi,
    wallet,
  )
  await vaultContract.initialize()

  console.log('Initialize vault app')

  const financeInstallTx = await kernelContract[
    'newAppInstance(bytes32,address)'
  ](FINANCE_APP_ID, FINANCE_IMPL_ADDRESS, {
    gasLimit: 9000000,
    gasPrice: 54000000000,
  })

  await financeInstallTx.wait()
  console.log('Finance app installed on transaction', financeInstallTx.hash)

  const financeContractAddress = await getAppAddress(
    'NewAppProxy',
    kernelContract,
    financeInstallTx.hash,
  )

  // Creating a permission on Vault so finance can transfer tokens
  await aclContract.createPermission(
    financeContractAddress,
    vaultContractAddress,
    VAULT_TRANSFER_ROLE,
    votingContractAddress,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )
  console.log('VAULT_TRANSFER_ROLE permissions set')

  await aclContract.createPermission(
    votingContractAddress,
    financeContractAddress,
    FINANCE_CREATE_PAYMENTS_ROLE,
    votingContractAddress,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )

  console.log('FINANCE_CREATE_PAYMENTS_ROLE permissions set')

  await aclContract.createPermission(
    votingContractAddress,
    financeContractAddress,
    FINANCE_EXECUTE_PAYMENTS_ROLE,
    votingContractAddress,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )
  console.log('FINANCE_EXECUTE_PAYMENTS_ROLE permissions set')

  const lastFinancePermissionTx = await aclContract.createPermission(
    votingContractAddress,
    financeContractAddress,
    FINANCE_MANAGE_PAYMENTS_ROLE,
    votingContractAddress,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )
  await lastFinancePermissionTx.wait()
  console.log('FINANCE_MANAGE_PAYMENTS_ROLE permissions set')

  const financeContract = new ethers.Contract(
    financeContractAddress,
    financeAbi,
    wallet,
  )

  await financeContract.initialize(vaultContractAddress, '2592000')
  console.log('Finance app initialized')

  await aclContract.grantPermission(
    votingContractAddress,
    tokenManagerContractAddress,
    TOKEN_MANAGER_MINT_ROLE,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )

  console.log('TOKEN_MANAGER_MINT_ROLE permission set')

  await aclContract.grantPermission(
    votingContractAddress,
    aclContract.address,
    ACL_CREATE_PERMISSIONS_ROLE,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )

  console.log('ACL_CREATE_PERMISSIONS_ROLE permission set')

  const votingManageAppsTx = await aclContract.grantPermission(
    votingContractAddress,
    kernelContract.address,
    KERNEL_MANAGE_APPS_ROLE,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )

  votingManageAppsTx.wait()
  console.log('KERNEL_MANAGE_APPS_ROLE permission set')

  // await aclContract.revokePermission(
  //   torusAccount,
  //   tokenManagerContractAddress,
  //   TOKEN_MANAGER_MINT_ROLE,
  //   {
  //     gasLimit: 9000000,
  //     gasPrice: 54000000000,
  //   },
  // )
  // console.log('TOKEN_MANAGER_MINT_ROLE permission revoked')

  await aclContract.revokePermission(
    torusAccount,
    kernelContract.address,
    KERNEL_MANAGE_APPS_ROLE,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )
  console.log('KERNEL_MANAGE_APPS_ROLE permission revoked')

  await aclContract.revokePermission(
    torusAccount,
    aclContract.address,
    ACL_CREATE_PERMISSIONS_ROLE,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )
  console.log('ACL_CREATE_PERMISSIONS_ROLE permission revoked')

  await aclContract.setPermissionManager(
    votingContractAddress,
    tokenManagerContractAddress,
    TOKEN_MANAGER_MINT_ROLE,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )
  console.log('TOKEN_MANAGER_MINT_ROLE permission manager')

  await aclContract.setPermissionManager(
    votingContractAddress,
    kernelContract.address,
    KERNEL_MANAGE_APPS_ROLE,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )
  console.log('KERNEL_MANAGE_APPS_ROLE permission manager')

  await aclContract.setPermissionManager(
    votingContractAddress,
    aclContract.address,
    ACL_CREATE_PERMISSIONS_ROLE,
    {
      gasLimit: 9000000,
      gasPrice: 54000000000,
    },
  )
  console.log('ACL_CREATE_PERMISSIONS_ROLE permission manager')
  return orgAddress
}
