import React, { useEffect,useState } from 'react';
import { ethers } from 'ethers';

export const Main = () => {

  const [accountAddress, setAccountAddress] = useState('')

  async function connectWallet(){
    const {ethereum} = window
    console.log(ethereum)
    try{
      if(!ethereum){
        console.log("No blockchain wallet was found")
      }

      const accounts = await ethereum.request({
        method:'eth_requestAccounts',
      })
      setAccountAddress(accounts[0])
      localStorage.setItem('ethAddress', accountAddress);
      localStorage.setItem('isConnected', true);
      console.log(accounts[0])
    }catch(error){
      console.log("Not Connected")
      console.log("Error" + error.message)
    }
  }
  useEffect(() => {
    connectWallet()
    // do something with the provider and signer objects
  }, []);

  return (
    <div>
      <h2>Main</h2>
        <button type="button" class="btn btn-primary float-end" onClick={connectWallet}>Send Kudos</button>
    </div>
  );
};
