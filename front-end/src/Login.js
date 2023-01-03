import badgersLogo from "./badges_logo.png"
import badgersNamedLogo from "./logo_with_name.png"
import people from "./people.png";
import { useNavigate } from "react-router-dom";
import React, {useEffect} from "react";

export const Login = () =>{
  const navigate = useNavigate();

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

    } catch (error) {
      console.log("Not Connected");
      console.log("Error" + error.message);
    }
  }

  useEffect (() =>{

    connectWallet()

  },[])

  return <>

  <header class="p-3 text-bg-dark fixed-top">
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
  <div class="col-sm">
<img class="img-small" src={badgersLogo} alt="Logo" />
  </div>
  <div class="col-sm">
  Join Us Today
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
  </div>
  </>
}
