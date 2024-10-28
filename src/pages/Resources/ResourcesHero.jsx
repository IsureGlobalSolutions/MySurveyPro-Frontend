import React from 'react'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
const ResourcesHero = () => {
  return (
    <>
    <div className="resource-hero-main">
        <div className="row m-0 h-100">
            <div className="col-md-6 h-100">
               
                <div className="resource-hero-content">
                    <div className="px-5">
                                       <p className="fs-1 fw-bold mb-4">Resources</p>
                <p className="mb-4 hero-decription">Effortlessly create your survey questions,
                     distribute your survey, and view real-time results with 
                     ease. It's that easy!</p>
                     <div className="row">
                        <div className="col-lg-8 col-md-12 col-12 p-0">
                            <div className="resource-hero-button">
    <WebsiteButton type='button' onClick={()=>{}}>
        Request a Demo
    </WebsiteButton>

    <WebsiteButton type='button' onClick={()=>{}} buttonDesign='outliner'>
        Take a video tour
    </WebsiteButton>
</div> 
                        </div>
                     </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default ResourcesHero