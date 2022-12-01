require('dotenv').config()

import Web3 from "web3";

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
const ALCHEMY_API: string = process.env.ALCHEMY_API || '';
const ALCHEMY_URL: string = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API}`


const web3 = new Web3(new Web3.providers.HttpProvider(ALCHEMY_URL));

const compiledContract = require('../json/copiledFile.json');


const main = async () => {
  let contract = new web3.eth.Contract(compiledContract.abi);

  const encodedDeploy = contract.deploy({
    data: compiledContract.bytecode,
    arguments: []
  }).encodeABI();

  let tx = {
    gas: 1_000_000,
    data: encodedDeploy,
  }

  let signedTxn = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

  let res = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction || '');

  
  let contractAddress: string = res.contractAddress || '';

  contract = new web3.eth.Contract(
    compiledContract.abi,
    contractAddress
  );


  console.log(`Contract depled, Address ${contractAddress}`);
  
  console.log(await contract.methods.getCount().call());
  

    // make increment call

  const encodedData = await contract.methods.increment().encodeABI();

  let increment_tx = {
      to: contractAddress,
      gas: 1_000_000,
      data: encodedData
  }

  signedTxn = await web3.eth.accounts.signTransaction(increment_tx, PRIVATE_KEY);

  res = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction || '');

  console.log(res)
  
  console.log(await contract.methods.getCount().call());
    


}

main();