import React from 'react'
import './products.css';
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import heroimage from '../../assets/Group76.png'
const Herosection = () => {
  return (
    <div className="herosection">
    <div className="container-fluid">
      <div className="row d-flex   justify-content-center">
        <div className="col-lg-5 col-md-10  col-sm-10 col-8 herosectioncontent">
          <h1>Your Premier Survey Solution</h1>
          <p className="mission-text">
            Our mission: to inspire curiosity, creativity, and authenticity.
            Our mission: to inspire curiosity, creativity, and authenticity.
            Our mission: to inspire curiosity, creativity, and authenticity.
            Our mission: to inspire curiosity, creativity, and authenticity.
          </p>
         <div className='row'>
         <div className="startfreebutton    ps-0">
         <WebsiteButton type='button' onClick={()=>{}}>
         Start your free trial today
            </WebsiteButton>
          </div>
         </div>
        </div>
        <div className="col-lg-6  col-10 mt-5 d-flex justify-content-end additional-content">
          <img  src={heroimage} alt='image'/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Herosection