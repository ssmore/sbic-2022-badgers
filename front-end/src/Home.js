import banner from './dexperts-banner.png';
import profilepic from './mayc.png';
import './dexpert.css'
import expertiseData from "./expertise.json"
import reviewData from "./reviews.json"
import {useState,useEffect} from 'react'
export const Home = () =>{

  const[expertiseList,setExpertiseList] = useState([]);
  const[testimonialList, setTestimonialList] = useState([]);
  const[skillsList, setSkillsList] = useState([]);

  const [expertiseTitle, setExpertiseTitle] = useState('');
  const [kudosTitle, setKudosTitle] = useState([]);
  const [reviewTitle, setReviewsTitle] = useState([]);

  const [isExpertiseTab, setExpertiseTab] = useState();
  const [isKudosTab, setKudosTab] = useState();
  const [isReviewTab, setReviewTab] = useState();

  async function addTestimonial(testimonialRow){
    //console.log(JSON.stringify(testimonialRow))

    var element = <div class = "row align-items-center">
    <div class="col align-items-center">
        <img class="company-logo" src={testimonialRow.imageUrl}/>
        </div>
        <div class="col-10">
        <div class = "row">
        <div class="col-4">
        <h5> {testimonialRow.reviewer} </h5>
        </div>
        <div class="col-8 align-items-end" style={{textAlign:"right"}}>

        </div>
        </div>
        <div class="row">
        <span class="align-middle">
        {testimonialRow.description}
        </span>
        </div>
        </div>
        <div class="large-break"></div>
    </div>
    setTestimonialList((prevList) => [...prevList,element])
  }

  async function addSkills(firstSkill, secondSkill){
    console.log(JSON.stringify(firstSkill))
    console.log(JSON.stringify(secondSkill))
    if (secondSkill!=null){
    var element = <div class = "row">
        <div class = "col">
          <div class = "row align-items-center">
          <div class="col-sm-2 align-items-center">
              <img class="skills-logo" src={firstSkill.imageUrl}/>
              </div>
              <div class="col">
              <div class = "row">
              <div class="col">
              <h5 style={{textAlign:"left"}}> {firstSkill.type} </h5>
              </div>
              <div class="col align-items-end" style={{textAlign:"right"}}>
              {firstSkill.reviews}
              </div>
              </div>
              <div class="row">
              <span class="align-middle">
              <div class="progress">
                <div class="progress-bar w-50" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </span>
              </div>
              </div>
              <div class="large-break"></div>
          </div>

          </div>

          <div class = "col">
            <div class = "row align-items-center">
            <div class="col-sm-2 align-items-center">
                <img class="skills-logo" src={secondSkill.imageUrl}/>
                </div>
                <div class="col">
                <div class = "row">
                <div class="col">
                <h5> {secondSkill.type} </h5>
                </div>
                <div class="col align-items-end" style={{textAlign:"right"}}>
                {secondSkill.reviews}
                </div>
                </div>
                <div class="row">
                <span class="align-middle">
                <div class="progress">
                  <div class="progress-bar w-50" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                </span>
                </div>
                </div>
                <div class="large-break"></div>
            </div>

            </div>



        </div>
    setSkillsList((prevList) => [...prevList,element])
  }else{

    var element = <div class = "row">
        <div class = "col">
          <div class = "row align-items-center">
          <div class="col-sm-2 align-items-center">
              <img class="skills-logo" src={firstSkill.imageUrl}/>
              </div>
              <div class="col">
              <div class = "row">
              <div class="col">
              <h5 style={{textAlign:"left"}}> {firstSkill.type} </h5>
              </div>
              <div class="col align-items-end" style={{textAlign:"right"}}>
              {firstSkill.reviews}
              </div>
              </div>
              <div class="row">
              <span class="align-middle">
              <div class="progress">
                <div class="progress-bar w-50" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </span>
              </div>
              </div>
              <div class="large-break"></div>
          </div>

          </div>

          <div class = "col">


            </div>



        </div>

          setSkillsList((prevList) => [...prevList,element])
  }
  }

  async function addExpertise(expertiseRow){
    //console.log(JSON.stringify(expertiseRow))
    var element = <div class = "row align-items-center">
    <div class="col align-items-center">
        <img class="company-logo" src={expertiseRow.imageUrl}/>
        </div>
        <div class="col-10">
        <div class = "row">
        <div class="col-4">
        <h5> {expertiseRow.title} </h5>
        </div>
        <div class="col-8 align-items-end" style={{textAlign:"right"}}>
        {expertiseRow.duration}
        </div>
        </div>
        <div class="row">
        <span class="align-middle">
        {expertiseRow.description}
        </span>
        </div>
        </div>
        <div class="large-break"></div>
    </div>
    setExpertiseList((prevList) => [...prevList,element])
  }

  useEffect (()=>{
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


    setExpertiseTitle(<b>Expertise & Skills</b> )
    setExpertiseTab(true)
    setKudosTab(false)
    setKudosTitle('Dexperts Kudos')
    setReviewTab(false)
    setReviewsTitle('Reviews')
    clickReview()


  },[])

  function clickExpertise(){
    console.log('expertise clicked')
    setExpertiseTab(true)
    setExpertiseTitle(<b>Expertise & Skills</b>)
    setKudosTab(false)
    setKudosTitle('Dexperts Kudos')
    setReviewTab(false)
    setReviewsTitle('Reviews')

  }
  function clickKudos(){
    console.log('kudos clicked')
    setExpertiseTab(false)
    setExpertiseTitle('Expertise & Skills')
    setKudosTab(true)
    setKudosTitle(<b>Dexperts Kudos</b>)
    setReviewTab(false)
    setReviewsTitle('Reviews')
  }
  function clickReview(){
    console.log('review clicked')
    setExpertiseTab(false)
    setExpertiseTitle('Expertise & Skills')
    setKudosTab(false)
    setKudosTitle('Dexperts Kudos')
    setReviewTab(true)
    setReviewsTitle(<b>Reviews</b>)
  }
  return <>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
        </a>
        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/>
        </form>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2  d-flex flex-row-reverse justify-content-end mb-md-0">

        </ul>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2  d-flex flex-row-reverse justify-content-end mb-md-0">

        </ul>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2  d-flex flex-row-reverse justify-content-end mb-md-0">

        </ul>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2  d-flex flex-row-reverse justify-content-end mb-md-0">
          <li><a href="#" class="nav-link px-2 text-secondary">Marketplace</a></li>
          <li><a href="#" class="nav-link px-2 text-white">My Community</a></li>
        </ul>



        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2">Connected</button>
        </div>
        <div class="dropdown text-end">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle"/>
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
      </div>

  </header>

  <img class="banner" src={banner} alt="Logo" />

  <div class="profile p3 m3">


    <img class="rounded mx-auto d-block shadow profilepic" src={profilepic} alt="Logo"  style={{height:"150px"}}/>


  </div>

  <div class="medium-break"></div>
  <div class="d-flex justify-content-evenly">
  <button type="button" class="btn btn-primary">Product Manager</button>
  <button type="button" class="btn btn-dark">Software Developer</button>
  </div>

  <div class="medium-break"></div>
  <div class="container">

  <div class="row text-center">
    <div class="col" onClick={clickExpertise}>
    {expertiseTitle}
      <hr/>
    </div>
    <div class="col" onClick={clickKudos}>
      {kudosTitle}
      <hr/>
    </div>
    <div class="col" onClick={clickReview}>
      {reviewTitle}
      <hr/>
    </div>
  </div>
</div>

<div class="small-break"></div>
{isExpertiseTab ? (
<div class="container">
<div class = "row">
    <h5> Expertise </h5>
</div>


{expertiseList}





</div>



) : (
  <div></div>
)

}

{isKudosTab ? (
<div class="container">
<div class = "row">
    <h5> Kudos </h5>
</div>







</div>



) : (
  <div></div>
)

}

{isReviewTab ? (
<div class="container">
<div class = "row">
    <h5> Testimonials </h5>
</div>

{testimonialList}
<div class="medium-break"></div>
  <h5> Skills Score </h5>
  {skillsList}

  </div>









) : (
  <div></div>
)

}




  </>
}
