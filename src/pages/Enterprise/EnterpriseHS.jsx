import React from 'react'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import "./Enterprise.css";
import heroimage from "../../assets/Enterprisesection-png/Enterpriseheroimg.png"
const EnterpriseHS = () => {
  return (
    <div className=' enterprise  p-5'>
           <div className="container-fluid">
           <div className="row    justify-content-center">
        <div className='col-lg-5 mt-4  d-flex flex-column justify-content-center col-12 '>
            <div><h2>ENTERPRISE</h2></div>
            <div className='mt-4 '><h1>Powerful, flexible and enterprise-ready</h1></div>
            <div className='mt-4 '><p>Discover how SurveyMonkey Enterprise can fuel fast decisions and company-wide impact. </p></div>
            <div className=' mt-4 pt-4 m-0 d-flex flew-wrap flex-lg-row  gap-4 flex-column'>
            <div className="startfreebutton  col-lg-6   mt-4  ps-0">
            <WebsiteButton type='button' onClick={()=>{}}>
            Request a Demo
            </WebsiteButton>
        </div>
        <div className="startfreebutton  mt-4  col-lg-6   ps-0"> 
            <WebsiteButton type='button' onClick={()=>{}}          
                buttonDesign='outliner'
            >
Take a video tour           

 </WebsiteButton>
        </div>
        </div>
        </div>
        <div className="col-lg-6 col-10  col-12 mt-5 ms-3 ps-4  d-flex  justify-content-end ">
          <img  src={heroimage} alt='image'  className="img-fluid"
            />
        </div>
        </div>
        </div>
        </div>


  )
}

export default EnterpriseHS