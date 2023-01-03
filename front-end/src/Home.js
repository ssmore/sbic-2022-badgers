import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import banner from "./dexperts-banner.png";
import profilepic from "./mayc.png";
import "./dexpert.css";
import badgersLogo from "./badges_logo.png"
import badgersNamedLogo from "./logo_with_name.png"
import lockedContent from "./restricted_content.png"

//data points
import expertiseData from "./expertise.json";
import reviewData from "./reviews.json";
import kudosData from "./kudos.json";
import skillsMapper from "./skillsmapper.json";

import { ethers } from "ethers";

export const Home = () => {
  //for login
  const [isConnected, setConnected] = useState(false);
  const [connectedStatus,setConnectedStatus] = useState("Not Connected")
  const [accountAddress, setAccountAddress] = useState("");
  const navigate = useNavigate();

  const [expertiseList, setExpertiseList] = useState([]);
  const [testimonialList, setTestimonialList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [softSkillsList, setSoftSkillsList] = useState([]);
  const [hardSkillsList, setHardSkillsList] = useState([]);

  const [expertiseTitle, setExpertiseTitle] = useState("");
  const [kudosTitle, setKudosTitle] = useState([]);
  const [reviewTitle, setReviewsTitle] = useState([]);

  const [isExpertiseTab, setExpertiseTab] = useState();
  const [isKudosTab, setKudosTab] = useState();
  const [isReviewTab, setReviewTab] = useState();

  const [isKudoOpen, setIsKudoOpen] = useState(false);

  const toggleOpenKudo = () => {
    setIsKudoOpen(!isKudoOpen);
    console.log("kudostate" + isKudoOpen);
  };

  async function connectWallet() {
    const { ethereum } = window;
    console.log(ethereum);
    try {
      if (!ethereum) {
        console.log("No blockchain wallet was found");
        navigate("/login")
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountAddress(accounts[0]);
      setConnected(true);
      setConnectedStatus("Connected")
      console.log(accounts[0]);
    } catch (error) {
      navigate("/login")
      console.log("Not Connected");
      console.log("Error" + error.message);
    }
  }

  async function addTestimonial(testimonialRow) {
    //console.log(JSON.stringify(testimonialRow))

    var element = (
      <div class="row align-items-center">
        <div class="col align-items-center">

          <img class="company-logo" src={testimonialRow.imageUrl} />

        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-4">
              <h5> {testimonialRow.reviewer} </h5>
            </div>
            <div
              class="col-8 align-items-end"
              style={{ textAlign: "right" }}
            ></div>
          </div>
          <div class="row">
            <span class="align-middle">{testimonialRow.description}</span>
          </div>
        </div>
        <div class="large-break"></div>
      </div>
    );
    setTestimonialList((prevList) => [...prevList, element]);
  }

  async function addSkills(firstSkill, secondSkill) {
    //console.log(JSON.stringify(firstSkill))
    //console.log(JSON.stringify(secondSkill))
    if (secondSkill != null) {
      var element = (
        <div class="row">
          <div class="col">
            <div class="row align-items-center">
              <div class="col-sm-2 align-items-center">
                <img class="skills-logo" src={firstSkill.imageUrl} />
              </div>
              <div class="col">
                <div class="row">
                  <div class="col">
                    <h5 style={{ textAlign: "left" }}> {firstSkill.type} </h5>
                  </div>
                  <div
                    class="col align-items-end"
                    style={{ textAlign: "right" }}
                  >
                    {firstSkill.reviews} Reviews
                  </div>
                </div>
                <div class="row">
                  <span class="align-middle">
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped"
                        role="progressbar"
                        style={{ width: firstSkill.value }}
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="large-break"></div>
            </div>
          </div>

          <div class="col">
            <div class="row align-items-center">
              <div class="col-sm-2 align-items-center">
                <img class="skills-logo" src={secondSkill.imageUrl} />
              </div>
              <div class="col">
                <div class="row">
                  <div class="col">
                    <h5> {secondSkill.type} </h5>
                  </div>
                  <div
                    class="col align-items-end"
                    style={{ textAlign: "right" }}
                  >
                    {secondSkill.reviews} Reviews
                  </div>
                </div>
                <div class="row">
                  <span class="align-middle">
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped"
                        role="progressbar"
                        style={{ width: secondSkill.value }}
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="large-break"></div>
            </div>
          </div>
        </div>
      );
      setSkillsList((prevList) => [...prevList, element]);
    } else {
      var element = (
        <div class="row">
          <div class="col">
            <div class="row align-items-center">
              <div class="col-sm-2 align-items-center">
                <img class="skills-logo" src={firstSkill.imageUrl} />
              </div>
              <div class="col">
                <div class="row">
                  <div class="col">
                    <h5 style={{ textAlign: "left" }}> {firstSkill.type} </h5>
                  </div>
                  <div
                    class="col align-items-end"
                    style={{ textAlign: "right" }}
                  >
                    {firstSkill.reviews} Reviews
                  </div>
                </div>
                <div class="row">
                  <span class="align-middle">
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped"
                        role="progressbar"
                        style={{ width: firstSkill.value }}
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="large-break"></div>
            </div>
          </div>

          <div class="col"></div>
        </div>
      );

      setSkillsList((prevList) => [...prevList, element]);
    }
  }

  async function addExpertise(expertiseRow) {
    //console.log(JSON.stringify(expertiseRow))
    var skills = expertiseRow.skills
    var element = (
      <div class="row align-items-center">
        <div class="col align-items-center">
          <img class="company-logo" src={expertiseRow.imageUrl} />
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-3">

              <p class="h5">
                {" "}
                {expertiseRow.title}
                </p>
                </div>
                <div class="col-6">

                {skills.map(skillsTab =>  {if (skillsMapper['hard'].includes(skillsTab)) {
          return <span
            class="badge bg-dark m-1"
          >
            {skillsTab}
          </span>;
        } else {
          return <span
            class="badge bg-secondary m-1"
          >
            {skillsTab}
          </span>;
        }
      } )}
                <div>

    </div>

            </div>
            <div class="col align-items-end" style={{ textAlign: "right" }}>
              {expertiseRow.duration}
            </div>
          </div>
          <div class="row">
            <span class="align-middle">{expertiseRow.description}</span>
          </div>
        </div>
        <div class="large-break"></div>
      </div>
    );
    setExpertiseList((prevList) => [...prevList, element]);
  }

  async function addSoftSkills(
    firstSoftSkill,
    secondSoftSkill,
    thirdSoftSkill
  ) {
    console.log("first" + firstSoftSkill);
    console.log("second" + secondSoftSkill);
    console.log("third" + thirdSoftSkill);
    var element = "";
    if (
      firstSoftSkill != null &&
      secondSoftSkill != null &&
      thirdSoftSkill != null
    ) {
      element = (
        <div class="row">
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={firstSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{firstSoftSkill.kudosTitle}</h5>
                <p class="card-text">{firstSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={secondSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{secondSoftSkill.kudosTitle}</h5>
                <p class="card-text">{secondSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={thirdSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{thirdSoftSkill.kudosTitle}</h5>
                <p class="card-text">{thirdSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div class="medium-break"></div>
        </div>
      );
    } else if (firstSoftSkill != null && secondSoftSkill != null) {
      element = (
        <div class="row">
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={firstSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{firstSoftSkill.kudosTitle}</h5>
                <p class="card-text">{firstSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={secondSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{secondSoftSkill.kudosTitle}</h5>
                <p class="card-text">{secondSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div class="medium-break"></div>
        </div>
      );
    } else {
      element = (
        <div class="row">
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={firstSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{firstSoftSkill.kudosTitle}</h5>
                <p class="card-text">{firstSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <div class="medium-break"></div>
        </div>
      );
    }

    setSoftSkillsList((prevList) => [...prevList, element]);
    //add medium break
    //element = <div class = "medium-break"></div>
    //setSoftSkillsList((prevList) => [...prevList,element])
  }

  async function addHardSkills(
    firstSoftSkill,
    secondSoftSkill,
    thirdSoftSkill
  ) {
    console.log("first" + firstSoftSkill);
    console.log("second" + secondSoftSkill);
    console.log("third" + thirdSoftSkill);
    var element = "";
    if (
      firstSoftSkill != null &&
      secondSoftSkill != null &&
      thirdSoftSkill != null
    ) {
      element = (
        <div class="row">
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={firstSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{firstSoftSkill.kudosTitle}</h5>
                <p class="card-text">{firstSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={secondSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{secondSoftSkill.kudosTitle}</h5>
                <p class="card-text">{secondSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={thirdSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{thirdSoftSkill.kudosTitle}</h5>
                <p class="card-text">{thirdSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div class="medium-break"></div>
        </div>
      );
    } else if (firstSoftSkill != null && secondSoftSkill != null) {
      element = (
        <div class="row">
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={firstSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{firstSoftSkill.kudosTitle}</h5>
                <p class="card-text">{firstSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={secondSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{secondSoftSkill.kudosTitle}</h5>
                <p class="card-text">{secondSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div class="medium-break"></div>
        </div>
      );
    } else {
      element = (
        <div class="row">
          <div class="col-sm-4">
            <div class="card" style={{ width: "18rem" }}>
              <img
                src={firstSoftSkill.imageUrl}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{firstSoftSkill.kudosTitle}</h5>
                <p class="card-text">{firstSoftSkill.description}</p>
                <a href="#" class="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div class="medium-break"></div>
          </div>
        </div>
      );
    }

    setHardSkillsList((prevList) => [...prevList, element]);
  }

  useEffect(() => {
    console.log(expertiseData);
    setExpertiseList([]);
    for (let i = 0; i < expertiseData.length; i++) {
      console.log("i called it" + i);
      addExpertise(expertiseData[i]);
    }

    setTestimonialList([]);
    var receivedTestimonialList = reviewData.testimonial;
    for (let i = 0; i < receivedTestimonialList.length; i++) {
      console.log("i called it" + i);
      addTestimonial(receivedTestimonialList[i]);
    }

    setSkillsList([]);
    var receivedSkillsList = reviewData.skills;
    for (let i = 0; i < receivedSkillsList.length; i += 2) {
      console.log("i called it" + i);
      var firstSkill = receivedSkillsList[i];
      var secondSkill = null;

      if (i + 1 < receivedSkillsList.length) {
        secondSkill = receivedSkillsList[i + 1];
      }

      addSkills(firstSkill, secondSkill);
    }

    setSoftSkillsList([]);
    setHardSkillsList([]);
    //Arrange kudos
    var softSkills = [];
    var hardSkills = [];
    for (var i = 0; i < kudosData.length; i++) {
      if (kudosData[i].type === "Soft") {
        softSkills.push(kudosData[i]);
      } else hardSkills.push(kudosData[i]);
    }

    //SoftSkillsSet
    for (var i = 0; i < softSkills.length; i += 3) {
      var firstSkill = softSkills[i];
      var secondSkill = null;
      var thirdSkill = null;
      if (i + 1 < softSkills.length) {
        secondSkill = softSkills[i + 1];
      }
      if (i + 2 < softSkills.length) {
        thirdSkill = softSkills[i + 2];
      }
      addSoftSkills(firstSkill, secondSkill, thirdSkill);
    }
    //HardSkillsSet
    for (var i = 0; i < hardSkills.length; i += 3) {
      console.log(JSON.stringify(hardSkills[i]));
      var firstSkill = hardSkills[i];
      var secondSkill = null;
      var thirdSkill = null;
      if (i + 1 < hardSkills.length) {
        secondSkill = hardSkills[i + 1];
      }
      if (i + 2 < hardSkills.length) {
        thirdSkill = hardSkills[i + 2];
      }
      addHardSkills(hardSkills[i], secondSkill, thirdSkill);
    }

    setExpertiseTitle(<b>Expertise & Skills</b>);
    setExpertiseTab(true);
    setKudosTab(false);
    setKudosTitle("Badges Wall");
    setReviewTab(false);
    setReviewsTitle("Reviews");
    setIsKudoOpen(false);
  }, [accountAddress]);

  useEffect(() => {
    connectWallet();
    /*
    console.log(expertiseData)
    setExpertiseList([])
    for(let i = 0; i< expertiseData.length;i++){
      console.log("i called it" + i)
      addExpertise(expertiseData[i])
    }

    setTestimonialList([])
    var receivedTestimonialList = reviewData.testimonial
    for(let i = 0; i< receivedTestimonialList.length;i++){
      console.log("i called it" + i)
      addTestimonial(receivedTestimonialList[i])
    }

    setSkillsList([])
    var receivedSkillsList = reviewData.skills
    for(let i = 0; i< receivedSkillsList.length;i+=2){
      console.log("i called it" + i)
      var firstSkill = receivedSkillsList[i]
      var secondSkill = null

      if(i+1 < receivedSkillsList.length){
        secondSkill = receivedSkillsList[i+1]
      }

      addSkills(firstSkill,secondSkill)
    }


    setSoftSkillsList([])
    setHardSkillsList([])
    //Arrange kudos
    var softSkills = []
    var hardSkills = []
    for(var i = 0; i<kudosData.length;i++){
      if(kudosData[i].type==="Soft"){
        softSkills.push(kudosData[i])
      }else(
        hardSkills.push(kudosData[i])
      )
    }

    //SoftSkillsSet
    for(var i = 0; i<softSkills.length;i+=3){
      var firstSkill = softSkills[i]
      var secondSkill=null
      var thirdSkill=null
      if(i+1 < softSkills.length){
        secondSkill = softSkills[i+1]
      }
      if(i+2 < softSkills.length){
        thirdSkill = softSkills[i+2]
      }
          addSoftSkills(firstSkill,secondSkill,thirdSkill)
    }
    //HardSkillsSet
    for(var i = 0; i<hardSkills.length;i+=3){
      console.log(JSON.stringify(hardSkills[i]))
      var firstSkill = hardSkills[i]
      var secondSkill=null
      var thirdSkill=null
      if(i+1 < hardSkills.length){
        secondSkill = hardSkills[i+1]
      }
      if(i+2 < hardSkills.length){
        thirdSkill = hardSkills[i+2]
      }
          addHardSkills(hardSkills[i],secondSkill,thirdSkill)
    }


    setExpertiseTitle(<b>Expertise & Skills</b> )
    setExpertiseTab(true)
    setKudosTab(false)
    setKudosTitle('Dexperts Kudos')
    setReviewTab(false)
    setReviewsTitle('Reviews')

    */
  }, []);

  function clickExpertise() {
    console.log("expertise clicked");
    setExpertiseTab(true);
    setExpertiseTitle(<b>Expertise & Skills</b>);
    setKudosTab(false);
    setKudosTitle("Badges Wall");
    setReviewTab(false);
    setReviewsTitle("Reviews");
  }
  function clickKudos() {
    console.log("kudos clicked");
    setExpertiseTab(false);
    setExpertiseTitle("Expertise & Skills");
    setKudosTab(true);
    setKudosTitle(<b>Badges Wall</b>);
    setReviewTab(false);
    setReviewsTitle("Reviews");
  }
  function clickReview() {
    console.log("review clicked");
    setExpertiseTab(false);
    setExpertiseTitle("Expertise & Skills");
    setKudosTab(false);
    setKudosTitle("Badges Wall");
    setReviewTab(true);
    setReviewsTitle(<b>Reviews</b>);
  }
  return (
    <>

      <header class="p-3 text-bg-dark fixed-top">
        <div class="container" style={{padding:"0px",margin:"0px"}}>
        <div class="row justify-content-between">
        <div class="col align-middle">
        <a
          href="/"
          class="d-flex  mb-lg-0 text-white text-decoration-none"
        >
          <img class="logo-small" src={badgersNamedLogo} alt="Logo" />

        </a>
        </div>
        <div class="col-md-6">
        <form role="search">
          <input
            type="search"
            class="form-control form-control-dark text-bg-light"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        </div>
        <div class="col" align="right">
          <button type="button" class="btn btn-outline-light me-2" onClick={connectWallet}>
            {connectedStatus}
          </button>
        </div>
        <div class="col-auto" align="right">
        <img
          src={profilepic}
          alt="mdo"
          width="32"
          height="32"
          class="rounded-circle"
        />
        </div>

        </div>

        </div>
      </header>
      {isConnected ? (
        <div>
      <img class="banner" src={banner} alt="Logo" />

      <div class="profile p3 m3">
        <img
          class="rounded mx-auto d-block shadow profilepic"
          src={profilepic}
          alt="Logo"
          style={{ height: "150px" }}
        />
      </div>

      <div class="medium-break"></div>
      <div class="d-flex justify-content-evenly">
        <p class="h5">
          @<b>tthw</b>
        </p>
      </div>
      <div class="small-break"></div>


      <div class="container">
        <div class="row text-center">
          <div class="col" onClick={clickExpertise}>
            {expertiseTitle}
            <hr />
          </div>
          <div class="col" onClick={clickKudos}>
            {kudosTitle}
            <hr />
          </div>
          <div class="col" onClick={clickReview}>
            {reviewTitle}
            <hr />
          </div>
        </div>
      </div>
      </div>
): (<div class="white-box"> Not Connected </div>)}
      <div class="small-break"></div>
      {(isExpertiseTab &&isConnected) ? (
        <div class="container">
          <div class="row">
            <h5> Expertise </h5>
          </div>

          {expertiseList}
        </div>
      ) : (
        <div></div>
      )}

      {isKudosTab&&isConnected ? (
        <div class="container">
          <div class="row align-self-end">
            <div class="col align-self-end">
              <button
                type="button"
                class="btn btn-primary float-end"
                onClick={toggleOpenKudo}
              >
                Send Badges
              </button>
            </div>
          </div>
          <div class="row">
            <h5> Hard Skills </h5>
          </div>

          {hardSkillsList}
          <div class="large-break"></div>
          <div class="row">
            <h5> Soft Skills </h5>
          </div>

          {softSkillsList}
        </div>
      ) : (
        <div></div>
      )}

      {(isReviewTab&&isConnected) ? (
        <div class="container">
          <div class="row">
            <h5> Testimonials </h5>
          </div>

          {testimonialList}
          <div class="medium-break"></div>
          <h5> Skills Score </h5>
          {skillsList}
          <div class="medium-break"></div>
          <h5> Analytics </h5>
          <img
            src={lockedContent}
            class="card-img-top"
            alt="..."
          />
        </div>
      ) : (
        <div></div>
      )}

      {isKudoOpen ? (
        <div class="container">
          <div class="lock-screen">
            <div class="box">
              <div class="row">
                <div class="col align-self-end">
                  <button
                    type="button"
                    class="btn-close float-end"
                    onClick={toggleOpenKudo}
                  ></button>
                </div>
              </div>

              <h5 class="modal-title"> Send Kudos</h5>
              <hr />
              <form>
                <div class="mb-3">
                  <label for="recipient" class="form-label">
                    Recipient
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="recipientValue"
                    aria-describedby="emailHelp"
                  />
                </div>

                <label for="exampleFormControlTextarea1" class="form-label">
                  Type of Skill
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option disabled selected>Select Skill Type</option>
                  <option value="hard">Hard</option>
                  <option value="soft">Soft</option>
                </select>
                <div class="medium-break"></div>
                <label for="exampleFormControlTextarea1" class="form-label">
                  Badges Type
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option disabled selected></option>
                  <option value="Ruby Development">Ruby Development</option>
                  <option value="Stakeholder Development">Stakeholder Development</option>
                  <option value="Software Engineering">Software Engineering</option>
                </select>
                <div class="medium-break"></div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Description
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="formFileSm" class="form-label">
                    Badge Image (Optional)
                  </label>
                  <input
                    class="form-control form-control-sm"
                    id="formFileSm"
                    type="file"
                  />
                </div>
                <button
                  type="buttom"
                  onClick={toggleOpenKudo}
                  class="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div class="container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div class="col-md-4 d-flex align-items-center">
            <a
              href="/"
              class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            >
              <svg class="bi" width="30" height="24"></svg>
            </a>
            <span class="mb-3 mb-md-0 text-muted">&copy; Badgers</span>
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
    </>
  );
};
