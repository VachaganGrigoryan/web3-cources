require('dotenv').config()

import { ethers } from "ethers";

export const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
export const ALCHEMY_API = process.env.ALCHEMY_API || '';
export const ALCHEMY_RPC = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API}`

