import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'

const web3Obj = {
  web3: new Web3(),
  torus: {},
  setweb3: function (provider) {
    const web3Inst = new Web3(provider)
    web3Obj.web3 = web3Inst
  },
  initialize: async function (buildEnv, network) {
    const torus = new Torus()
    if (network === 'xdai') {
      await torus.init({
        buildEnv: buildEnv || 'production',
        network: {
          host: 'https://xdai.poanetwork.dev',
          chainId: 100,
          networkName: 'xDai',
        },
      })
    } else {
      await torus.init({
        buildEnv: buildEnv || 'production',
        network: {
          host: 'mainnet',
          chainId: 1,
          networkName: 'Ethereum Mainnet',
        },
      })
    }

    await torus.login()
    web3Obj.setweb3(torus.provider)
    web3Obj.torus = torus
    sessionStorage.setItem('pageUsingTorus', buildEnv)
    sessionStorage.setItem('networkTorus', network)
  },
}

export default web3Obj
