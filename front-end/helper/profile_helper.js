import { ethers } from "ethers";

require("dotenv").config()
const PROFILE_CONTRACT_ADDRESS = process.env.PROFILE_CONTRACT_ADDRESS;

const contract = require("");  // TODO: Deploy contract via Remix and get artifact
const abi = contract.abi;

async function createProfile(signer, displayName) {
    const profileContract = new ethers.Contract(PROFILE_CONTRACT_ADDRESS, abi, signer);
    
    const txn = await profileContract.createProfile(displayName);
    const txnReceipt = await txn.wait();
    
    return txnReceipt.status == 1;
}
