import { ethers } from 'ethers';
import  contract from "./artifacts/BadgersProfile.json"


export async function getDetails(){

  const PROFILE_CONTRACT_ADDRESS = "0xb3152bc3f1a792c64be1ebf590b1299270d57612"

  const abi = contract.abi;
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const erc20 = new ethers.Contract(PROFILE_CONTRACT_ADDRESS,abi,provider)
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  const details = await erc20.userMap(signerAddress)
  //console.log(details)
  //console.log(details.name)
  //console.log(details.image)
  return [details.name,details.image]
}


export default {
  getDetails
};
