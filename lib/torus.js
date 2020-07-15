import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'
import DaiStableCoinAbi from '../abis/DaiStableCoin.json'

const DaiStableCoinAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'
const xDaiBridgeAddress = '0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016'

const getNetworkParams = network => {
  if (network === 'xdai') {
    return {
      host: 'https://xdai.poanetwork.dev',
      chainId: 100,
      networkName: 'xDai',
    }
  } else if (network === 'mainnet') {
    return {
      host: 'mainnet',
      chainId: 1,
      networkName: 'Ethereum Mainnet',
    }
  }
  return undefined
}

const web3Obj = {
  web3: new Web3(),
  torus: {},
  setweb3: function(provider) {
    const web3Inst = new Web3(provider)
    web3Obj.web3 = web3Inst
  },
  initialize: async function(buildEnv, network) {
    const torus = new Torus()

    await torus.init({
      buildEnv: buildEnv || 'production',
      network: getNetworkParams(network),
      enabledVerifiers: {
        google: false,
        facebook: true,
        reddit: false,
        discord: false,
        twitch: false,
      },
    })

    await torus.login({ verifier: 'facebook' })
    web3Obj.setweb3(torus.provider)
    web3Obj.torus = torus
    sessionStorage.setItem('pageUsingTorus', buildEnv)
    sessionStorage.setItem('networkTorus', network)
  },
  account: async function() {
    const accounts = await web3Obj.web3.eth.getAccounts()
    return accounts[0]
  },
  balance: async function() {
    const account = await web3Obj.account()
    const balance = await web3Obj.web3.eth.getBalance(account)
    return parseInt(balance)
  },
  changeNetwork: async function(network) {
    const torus = web3Obj.torus
    await torus.setProvider(getNetworkParams(network))
    sessionStorage.setItem('networkTorus', network)
  },
  daiBalance: async function() {
    const account = await web3Obj.account()
    const instance = new web3Obj.web3.eth.Contract(
      DaiStableCoinAbi,
      DaiStableCoinAddress,
    )
    const balance = await instance.methods.balanceOf(account).call({
      from: account,
    })
    return parseInt(balance)
  },
  exchangeDaixDai: async function(value) {
    const account = (await web3Obj.web3.eth.getAccounts())[0]
    const instance = new web3Obj.web3.eth.Contract(
      DaiStableCoinAbi,
      DaiStableCoinAddress,
    )
    const daiValue = BigInt(value) * BigInt(10**18)
    const receipt = await instance.methods
      .transfer(xDaiBridgeAddress, daiValue)
      .send({
        from: account,
      })
    return receipt
  },
  buyDai: async function() {
    const torus = web3Obj.torus
    return await torus.initiateTopup('rampnetwork', {
      selectedCryptoCurrency: 'DAI',
    })
  },
}

export default web3Obj
