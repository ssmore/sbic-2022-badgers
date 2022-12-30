import { ethers } from "ethers";

require("dotenv").config()
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;

const contract = require("../../contracts/artifacts/BadgersNFT.json");
const abi = contract.abi;

async function getABI() {
    return abi;
}

async function awardBadge(abi, signer, recipient, skillName, tokenURI) {
    const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, signer);
    const txn = await nftContract.mint(recipient, skillName, tokenURI);
    const txnReceipt = await txn.wait();

    return txnReceipt.status == 1;
}
