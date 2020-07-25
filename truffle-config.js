const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    xdai: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          'https://dai.poa.network',
        )
      },
      network_id: 100,
      gas: 500000,
      gasPrice: 1000000000,
    },
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
  },

  contracts_directory: './contracts',
  contracts_build_directory: './abis',

  compilers: {
    solc: {
      version: '0.6.0',
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
      },
    },
  },
}
