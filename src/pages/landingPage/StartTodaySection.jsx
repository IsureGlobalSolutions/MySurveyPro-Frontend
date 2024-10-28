import React from 'react'
import './startToday.css';
import getstartImage from'../../assets/landingPage/startToday.png';
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
const StartTodaySection = () => {
  return (
   <>
   <div className="container">
    <div className="startToday_heading text-center mt-5">
        <p>Get Started <span>Today!</span></p>
       
    </div>
    <div className="startToday_description my-5">
        <p>Transform the way you understand your team's 
            engagement and effectiveness.</p>
    </div>
    <div className="startToday_content my-5">
        <div className="st_text">
            <h3>Experience The Future of Surveys with MySurveyPro</h3>
            <p>Sign up now and take the first step
towards a more connected and
productive workforce.</p>
<div className="">
    <WebsiteButton type='button' className='mt-3' style={{backgroundColor:' #05467E'}}>
    Sign Up
</WebsiteButton>
</div>


        </div>
        <div className="st_image">
            <img src={getstartImage} alt="" />
        </div>
    </div>
   </div>

   </>
  )
}

export default StartTodaySection