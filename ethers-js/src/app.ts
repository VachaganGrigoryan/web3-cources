require('dotenv').config()

import {ethers} from "ethers";

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
const ALCHEMY_API: string = process.env.ALCHEMY_API || '';
const ALCHEMY_RPC: string = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API}`

const abi = require("./abi.json");
const contractAddr: string = "0x623df7fcf3ad2fa11cd28a59408cffc3f1bee2f2";

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);


const main = async () => {
  const contract = new ethers.Contract(contractAddr, abi, wallet);
  
  let count = await contract.getCount();
  console.log(count.toString());

  const tx = await contract.increment();
  console.log(tx)
  
  console.log((await contract.getCount()).toString());
}

main();