require('dotenv').config()

import { ethers } from "ethers";
import { PRIVATE_KEY, ALCHEMY_RPC } from "./config";


const compiledContract = require('../json/BlackWayToken.json')
const contractAddr = '0x3566Cc855eDec5f7551fa7254AD0cdbb64e6753A';

const ownerAddr = '0xa2A0e2EeFb70709c6c4bE488Cc6514fd7b550797';

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);


const main = async () => {
    const contract = new ethers.Contract(
        contractAddr,
        compiledContract.abi,
        wallet
    ) 

    console.log(contract);

    const balance = await contract.balanceOf(ownerAddr)
    console.log(balance.toString());
    const tx = await contract.mint("0x21a958e37157337e36a998B7afD599407A6dd3bA", 1000000000000000000000n)
    console.log(tx);
    

}

main();