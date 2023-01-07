import { ethers } from "ethers";

require("dotenv").config()
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const ADMIN_WALLET_KEY = process.env.ADMIN_WALLET_KEY;

const contract = require("../../contracts/artifacts/BadgersNFT.json");
const abi = contract.abi;

const provider = new ethers.providers.EtherscanProvider("goerli");
const signer = new ethers.Wallet(ADMIN_WALLET_KEY, provider);

async function getContract() {
    const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, signer);
    return nftContract;
}

async function awardBadge(contract, recipient, title, uri, desc, sender) {
    const date = Date.now();
    const txn = await contract.safeMint(recipient, title, uri, desc, sender, date);
    const txnReceipt = await txn.wait();

    return txnReceipt.status == 1;
}

async function getTokensOfOwner(contract, address) {
    const tokens = await contract.getTokensOfOwner(address);
    return tokens.map(id => parseInt(id, 10));
}

async function getTokenDetails(contract, tokenId) {
    const details = await contract.getTokenDetails(tokenId);
    return {
        "title": details[0],
        "image": details[1],
        "description": details[2],
        "sender": details[3], 
        "date": (new Date (parseInt(details[4].toString(), 10))).toISOString()
    }
}
