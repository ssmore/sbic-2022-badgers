import { ethers } from "ethers";

require("dotenv").config()
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;

const contract = require("");  // TODO: Deploy contract via Remix and get artifact
const abi = contract.abi;

async function awardBadge(signer, recipient, tokenURI) {
    const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, signer);
    const txn = await nftContract.mint(recipient, tokenURI);
    const txnReceipt = await txn.wait();

    const event = txnReceipt.events[0];
    return event["tokenId"];
}
