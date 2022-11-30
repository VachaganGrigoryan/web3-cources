require('dotenv').config()

import Web3 from "web3";

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
const ALCHEMY_API: string = process.env.ALCHEMY_API || '';
const ALCHEMY_URL: string = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API}`


const web3 = new Web3(new Web3.providers.HttpProvider(ALCHEMY_URL));

const abi = require("./abi.json");
const contractAddr: string = "0x623df7fcf3ad2fa11cd28a59408cffc3f1bee2f2";


const main = async () => {
  const contract = new web3.eth.Contract(abi, contractAddr);
  const count = await contract.methods.getCount().call();
  console.log(count);

  const encodedData = await contract.methods.increment().encodeABI();

    const tx = {
        to: contractAddr,
        gas: 1_000_000,
        data: encodedData
    }

  const signedTxn = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

  let res;

  if (typeof signedTxn.rawTransaction === "string")
    res = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);

  console.log(res)
  
  console.log(await contract.methods.getCount().call());

}

main();