import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'
import DaiStableCoinAbi from '../abis/DaiStableCoin.json'
import { ChainId, Token, WETH, Fetcher, Trade } from '@uniswap/sdk'

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
  } else if (network === 'rinkeby') {
    return {
      host: 'rinkeby',
      chainId: 4,
      networkName: 'Rinkeby Ethereum Testnet',
    }
  }
  return undefined
}

const web3Obj = {
  web3: new Web3(
    new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/21e923ffa7274f368b7be4fc8d691396',
    ),
  ),
  provider: null,
  torus: {},
  setweb3: function(provider) {
    const web3Inst = new Web3(provider)
    web3Obj.web3 = web3Inst
  },
  initialize: async function(network) {
    const torus = new Torus()
    const buildEnv = 'testing' //comment in production

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
    web3Obj.provider = torus.provider
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
    const daiValue = BigInt(value) * BigInt(10 ** 18)
    return newPromise((resolve, reject) => {
      instance.methods
        .transfer(xDaiBridgeAddress, daiValue)
        .send({
          from: account,
        })
        .on('confirmation', confirmationNumber => {
          if (confirmationNumber === 8) {
            resolve()
          }
        })
        .on('error', error => {
          reject(error)
        })
    })
  },
  buyDai: async function() {
    const torus = web3Obj.torus
    return await torus.initiateTopup('rampnetwork', {
      selectedCryptoCurrency: 'DAI',
    })
  },
  buyEth: async function() {
    const torus = web3Obj.torus
    return await torus.initiateTopup('rampnetwork', {
      selectedCryptoCurrency: 'ETH',
    })
  },
  exchangeEthToDAI: async function() {
    /* This is not yet finished. Trying to get DAI with ETH with Uniswap v2 SDK */
    const DAI = new Token(
      ChainId.MAINNET,
      '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      18,
    )
    const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

    const route = new Route([pair], WETH[DAI.chainId])

    const amountIn = '1000000000000000000' // 1 WETH

    const trade = new Trade(
      route,
      new TokenAmount(WETH, amountIn),
      TradeType.EXACT_INPUT,
    )
  },
}

export default web3Obj
