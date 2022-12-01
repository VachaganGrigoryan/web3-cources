require('dotenv').config()

import {ethers} from "ethers";

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
const ALCHEMY_API: string = process.env.ALCHEMY_API || '';
const ALCHEMY_RPC: string = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API}`

const compiledContract = require("./copiledFile.json");

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);


const main = async () => {
  const ContractFactory = new ethers.ContractFactory(
    compiledContract.abi,
    compiledContract.bytecode,
    wallet
  );
  

  const contract = await ContractFactory.deploy();
  await contract.deployed();


  console.log(`Contract Address is ${contract.address}`);
  

}
main();