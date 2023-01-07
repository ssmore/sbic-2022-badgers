import  contractAbi from "./artifacts/BadgersNFT.json"

// Get contract ABI file


const ethers = require('ethers');

// Get Alchemy App URL
const API_KEY = process.env.REACT_APP_API_KEY
console.log(API_KEY)

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)


// Create a signer
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY
console.log(PRIVATE_KEY)
const abi = contractAbi.abi;
const signer = new ethers.Wallet(PRIVATE_KEY, provider)

// Get contract address
const contractAddress = '0xd7932f97a26807a1f635989ad9eb877ab0e046c8'

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmcdoZHUnqDwbymHvFDAhCPW1BQJ19VKoLbU96n8iLV5hY"

// Call mintNFT function

async function mintNFT(address,tokenUri){
    let nftTxn = await contract.safeMint(address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

export async function sendBadgesNFT(receipent,title,imageURL,desc,sender,date){
  let nftTxn = await contract.safeMint(receipent, title,imageURL,desc,sender,date)
  await nftTxn.wait()
  console.log(`Badgers NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)

}

/*
mintNFT("0x5f3A894B5C1e7bFF115D302F2034ae88A27C9840",tokenUri)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});
*/

//module.exports = { sendBadgesNFT }
