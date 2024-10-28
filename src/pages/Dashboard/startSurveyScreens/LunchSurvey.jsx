import React from 'react'
import LunchServey from '../../../assets/dashboredsvg/launch-servey.png'
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton'
const LunchSurvey = ({setstepper}) => {
  return (
   <>
      <div className="shadow rounded-4 bg-white m-2 w-100 d-flex justify-content-center py-5">
        <div className="launch-survey text-center">
            <p className='h3 fw-light my-4'>Are you agree with the detailed survey? 
            Launch Now.</p>
            <img className='img-fluid' src={LunchServey} alt="" />
            <div className="d-flex justify-content-center">
                 <WebsiteButton type='button' onClick={()=>{setstepper(4)}}>
                Lunch Survey
            </WebsiteButton>
            </div>
           

        </div>
      </div>
   </>
  )
}

export default LunchSurvey