require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const mnemonic = process.env.mnemonic;

const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => {
          return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/$970a4aa629234bad8c5f7eaf2af499ed');
      },
      network_id: 4
  }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
