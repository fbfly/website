import { ethers } from 'ethers'
import { connect } from '@aragon/connect'

const tokenManagerAbi = require('../abis/tokenManager.json')

export function bigNum(number) {
  return ethers.BigNumber.from(number)
}

export default async function joinDao(orgAddress, torusAccount) {
  console.log('Started...')
  const privateKey = process.env.DICTATOR_PK
  // create signer
  const ethersProvider = new ethers.getDefaultProvider('rinkeby', {
    infura: process.env.INFURA_PROJECT_ID,
    etherscan: process.env.ETHERSCAN_API_KEY,
  })

  const wallet = new ethers.Wallet(privateKey, ethersProvider)
  const dictactorAccount = wallet.address
  console.log({ dictactorAccount })

  const org = await connect(orgAddress, 'thegraph', { chainId: 4 })

  const tokenManagerContract = new ethers.Contract(
    (await org.app('token-manager')).address,
    tokenManagerAbi,
    wallet,
  )

  await tokenManagerContract.mint(torusAccount, bigNum(10).pow(18), {
    gasLimit: 9000000,
    gasPrice: 54000000000,
  })

  console.log('Token minted to', torusAccount)
}
