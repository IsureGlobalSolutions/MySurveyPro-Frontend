import React from 'react'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import heroImage from "../../assets/templates/templateHeroImage.png";
const HeroSection = () => {
  return (
   <>
   <div className="template-hero-main col-12 ">
    <div className="row m-0">
<div className="col-md-6 px-5 template-content">
    <div className="">

         <p className='template-hero-title'>Templates for all form and survey needs</p>

    <p className='template-hero-description'>
    Explore, pick, and customize from our extensive 
    collection of customizable templates
     designed to meet all your form and survey needs.
    </p>
    </div>
   
<div className="row m-0 w-100 p-0">
<div className="col-md-8 p-0">
        <div className="hero-button ">
        <WebsiteButton type='button' onClick={()=>{}}>
            Request a Demo
        </WebsiteButton>

        <WebsiteButton type='button' buttonDesign='outliner' onClick={()=>{}}>
            Take a video Tour
        </WebsiteButton>
       
    </div>
</div>
</div>

</div>
<div className="col-md-6">
    <div className="text-center">
<img src={heroImage} className='img-fluid' alt="" />
    </div>

</div>
    </div>

   </div>
   </>
  )
}

export default HeroSection