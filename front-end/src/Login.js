import badgersLogo from "./badges_logo.png"
import badgersNamedLogo from "./logo_with_name.png"
import people from "./people.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import  contract from "./artifacts/BadgersProfile.json"
import completed from "./completed.png"


export const Login = () =>{

  const navigate = useNavigate();

  const PROFILE_CONTRACT_ADDRESS = "0xb3152bc3f1a792c64be1ebf590b1299270d57612"
  const [isRegistrationTabOpened, setIsRegistrationTabOpened] = useState(false)
  const [registrationName, setRegistrationName]= useState("")
  const [registrationImage, setRegistrationImage] = useState("")
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false)
  const [isAlert, setIsAlert]=useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [statusLink,setStatusLink] = useState("https://www.google.com")

  const toggleResgistrationTab = () => {
    setIsRegistrationTabOpened(!isRegistrationTabOpened);
    setRegistrationName("")
    setRegistrationImage("")
    setIsAlert(false)
    //console.log("kudostate" + isKudoOpen);
  };
  const toggleSuccessSubmitted = () => {
    setIsSuccessSubmitted(!isSuccessSubmitted);
    setRegistrationName("")
    setRegistrationImage("")
    setIsAlert(false)
    //console.log("kudostate" + isKudoOpen);
  };
  function updateName(event){
    setRegistrationName(event.target.value)
    console.log(registrationName)
  }
  function updateImageLink(event){
    setRegistrationImage(event.target.value)


  }

  function registerProfile () {
    setIsAlert(false)
    if(registrationName==""||registrationImage==""){
      console.log("empty values")
      setAlertMessage("Empty Fields. Please fill them up")
      setIsAlert(true)
      return
    }



    console.log(registrationName)
    console.log(registrationImage)
    addProfile(registrationName,registrationImage)
  };

  async function addProfile(registrationName,registrationImage){
    try{
    const abi = contract.abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contractProfile = new ethers.Contract(PROFILE_CONTRACT_ADDRESS,abi,signer)

    const params = {
      displayName: registrationName,
      imageURI: registrationImage
    }


      const profileCreateTxn = await contractProfile.createProfile(registrationName,registrationImage).then(transaction =>{
        console.log('View on Etherscan at: https://goerli.etherscan.io/tx/' + transaction.hash)
        setStatusLink("https://goerli.etherscan.io/tx/" + transaction.hash)
        setIsRegistrationTabOpened(false)
        setIsSuccessSubmitted(true)
      })
    }catch(e){
      setAlertMessage("Something,somewhere went wrong. Please try again")
      setIsAlert(true)
      console.log(e)
    }
    /*
    const signerAddress = await signer.getAddress();

    let profileCreateTxn = await erc20.createProfile(registrationName,registrationImage)
    await profileCreateTxn.wait()
    console.log(`Profile is created! Check it out at: https://goerli.etherscan.io/tx/${profileCreateTxn.hash}`)
    */
  }



  async function getDetails(){


    const abi = contract.abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract(PROFILE_CONTRACT_ADDRESS,abi,provider)
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const details = await erc20.userMap(signerAddress)
    //console.log(details)

    return [details.name,details.image]
  }



  async function connectWallet() {
    const { ethereum } = window;
    console.log(ethereum);
    try {
      if (!ethereum) {
        console.log("No blockchain wallet was found");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      //setAccountAddress(accounts[0]);
      //setConnected(true);
      //setConnectedStatus("Connected")
      console.log(accounts[0]);
      //navigate("/")
      var details= await getDetails()

      console.log("name is" + details[0])
      console.log("image is" + details[1])

      if(details[0] != null && details[0] != undefined && details[0] != "" && details[1] != null && details[1] != undefined && details[1] != ""){
        navigate("/")
      }

    } catch (error) {
      console.log("Not Connected");
      console.log("Error" + error.message);
    }
  }



  useEffect (() =>{

    connectWallet()
    setIsRegistrationTabOpened(false)
    setIsSuccessSubmitted(false)



  },[])

  return <>

    <header class="p-3 text-bg-dark fixed-top d-flex justify-content-center">
    <div class="container" style={{padding:"0px",margin:"0px"}}>
    <div class="row d-flex justify-content-around">
    <div class="col">
    <a
      href="/"
      class="d-flex  mb-lg-0 text-white text-decoration-none"
    >
      <img class="logo-small" src={badgersNamedLogo} alt="Logo" />
    </a>
    </div>


    <div class="col-md-5" align="right">
      <button type="button" class="btn btn-outline-light me-2" onClick={connectWallet}>
        Not Connected
      </button>
    </div>


    </div>

    </div>
  </header>
  <div>
<div class="medium-break"></div>
<div class="medium-break"></div>
<div class="medium-break"></div>
<div class="medium-break"></div>
<div class="container">
<div class="row">
<div class="d-flex justify-content-around align-items-center">


  <div class="p-2 bd-highlight col">


    <img class="img-mid" src={people} alt="Logo" />
  </div>
  <div class="p-2 bd-highlight col">
  <div class="row">
  <div class="box-register">
  <div class="row align-items-center">
  <div class="col">
    <img class="img-small" src={badgersLogo} />
    </div>
      <div class="col-7">
      <div class="row">
      <h5>Why not, join us today?</h5>

      </div>
      <div class="row">
      <div class="col-5">
    <div class="medium-break"></div>
      <button
        type="button"
        class="btn btn-primary btn-sm"
        onClick={toggleResgistrationTab}
      >
        Register
      </button>
      </div>
      </div>

      </div>

    <p><small> <i>If you do not have a metamask plugin or unsure what and how to use it. Click <a href="https://consensys.net/blog/metamask/how-to-use-the-browser-buy-eth-and-send-transactions-on-metamask-mobile/">here</a> for an interesting article to get you started. </i></small></p>
    </div>




  </div>
  </div>
</div>
</div>
</div>
</div>
<div class="container">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <a
        href="/"
        class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
      >
        <svg class="bi" width="30" height="24"></svg>
      </a>
      <span class="mb-3 mb-md-0 text-muted">&copy; Dexperts</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3">
        <a class="text-muted" href="#">
          <svg class="bi" width="24" height="24"></svg>
        </a>
      </li>
      <li class="ms-3">
        <a class="text-muted" href="#">
          <svg class="bi" width="24" height="24"></svg>
        </a>
      </li>
      <li class="ms-3">
        <a class="text-muted" href="#">
          <svg class="bi" width="24" height="24"></svg>
        </a>
      </li>
    </ul>
  </footer>
</div>
{isRegistrationTabOpened ? (<div>
  <div class="container">
  <div>
    <div class="box-success">

    <div class="row">
      <div class="col align-self-end">
        <button
          type="button"
          class="btn-close float-end"
          onClick={toggleResgistrationTab}
        ></button>
      </div>
    </div>


    <h5 class="modal-title"> Registration</h5>

    <hr />
    {isAlert ? (<div class="alert alert-danger" role="alert">
    {alertMessage}
  </div>):(<div></div>)}

    <form>
      <div class="mb-3">
        <label for="recipient" class="form-label">

          <h6>Registration Name</h6>


          <small><i> This would be your display name</i> </small>

        </label>
        <input
          type="email"
          class="form-control"
          onChange={updateName}

        />



      </div>
      <div class="medium-break"></div>
      <div class="mb-3">
        <label for="recipient" class="form-label">

          <h6>Image URL/IPFS</h6>


          <small><i>Looking for your image IPFS? Follow this <a href="https://medium.com/coinmonks/how-to-find-your-nft-on-ipfs-e51bc5e7c8a1" target="_blank">guide</a></i> </small>

        </label>
        <input
          onChange={updateImageLink}
          class="form-control"


        />




      </div>
      <button
        type="button"
        onClick={registerProfile}
        class="btn btn-primary"
      >
        Register
      </button>
      </form>
    </div>
    </div>
    </div>

  </div>):(<div></div>)}

  {isSuccessSubmitted ? (<div>
    <div class="container">
    <div>
      <div class="box-success">

      <div class="row">
        <div class="col align-self-end">
          <button
            type="button"
            class="btn-close float-end"
            onClick={toggleSuccessSubmitted}
          ></button>
        </div>
      </div>

      <div>
        <img class="success-image" src={completed} />

      </div>
      <div class="large-break"></div>
      <h5 align="center">
        Congratulations! <div class="small-break"></div>Your Profile Creation has been initialized
      </h5>
      <div class="small-break"></div>
      <p> <small> <i> It may take up to 2 mins to be completed. You can check your progress <a href={statusLink} target="_blank"> here </a> </i> </small> </p>

      </div>
      </div>
      </div>

      </div>):(<div></div>)}



  </div>
  </>
}
