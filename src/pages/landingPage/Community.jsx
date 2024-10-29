import React from 'react'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import './community.css'
const Community = () => {
  return (
    
    <>
    <div className="container my-4  ">
        <div className="community_title text-center my-5  ">
           <p>Join a community of 
            businesses that are leading the way in<span>
            employee engagement  </span></p> 
        </div>
        <div className="community_content pt-4  pb-4 mb-4 ">
            <div className="community_text">
                <h4>
                Experience the difference MySurveyPro can gauge your team's satisfaction
                </h4>
                <p>Gain valuable insights into your team's 
                    engagement and effectiveness with ease.
                Sign up today and watch your workforce become more 
                connected and productive!</p>
                <WebsiteButton className='mt-4' style={{background:'#05467E'}}>
                    Sign Up
                </WebsiteButton>
            </div>
            <div className="community_figures ms-5 gap-5">
                <div className="satisfaction_card m-0 pt-4 ps-4">
              <div className='  d-flex justify-content-center flex-column mt-'>
              <div className="satisfaction_top mb-3 ">
                        <div className="sat_circle"></div>
                        <p>Satisfaction</p>

                    </div>
                   
                 <div className='mt-4'>
                 <p className="sat_percent">80%<span>of users</span></p>
                 </div>
                 <div className='mt-4'>
                 <p className="sat_desc mt-3">
improved their savings within the
first three months.
</p>
                 </div>

                
              </div>
                </div>
                <div className="satisfaction_card m-0 pt-4 ps-4">
              <div className='  d-flex justify-content-center flex-column mt-'>
              <div className="satisfaction_top mb-3 ">
                        <div className="sat_circle"></div>
                        <p>feedback</p>

                    </div>
                   
                 <div className='mt-4'>
                 <p className="sat_percent">500k<span>reviews</span></p>
                 </div>
                 <div className='mt-4'>
                 <p className="sat_desc mt-3">
                 highlight our survey’s
                 effectiveness and ease of use.
</p>
                 </div>

                
              </div>
                </div>
                
            </div>
        </div>
    </div>
    </>
  )
}

export default Community