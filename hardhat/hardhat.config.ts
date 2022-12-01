require('dotenv').config()

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
const ALCHEMY_RPC: string = `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API || ''}`

const config: HardhatUserConfig = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: ALCHEMY_RPC,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: "0.8.17",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;
