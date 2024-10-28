import React from 'react'
import './effortlessection.css';
import effortlessImage from '../../assets/landingPage/effortlessimage.png'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
const EffortlessSurveySection = () => {
  return (
   <>
   <div className="w-100" style={{background: '#D9D9D95C'}}>
  <div className="effortless_main container my-5">
    <div className="effortless_heading">
        <div className="e_heading my-3">
            <p>Effortless Surveys, Accurate Data,<span >Smarter Decisions</span></p>
        </div>
        <div className="effortless_meeting mb-3">
           <p className='my-3'>Wasting time creating surveys from scratch?</p>
           <WebsiteButton type='button' style={{backgroundColor:' #05467E'}}>
            Lets Get Started
            </WebsiteButton> 

        </div>
    </div>
    <div className="effortless_description mb-3">
        <p>
        With MySurveyPro, you don’t need to start from zero.
         Our expertly crafted templates like the SurveyPro 
         - Employee Engagement Survey and Team Effectiveness
          Indicator are ready to use and proven to deliver 
          results. Save time and focus on what truly matters.
           MySurveyPro is your all-in-one solution for 
           creating, distributing, and analyzing surveys 
           that deliver actionable insights.
        </p>
    </div>
    <div className="effortless_image">
        <img src={effortlessImage} className='img-fluid' alt="" />
    </div>
   </div>
   </div>
 
   </>
  )
}

export default EffortlessSurveySection