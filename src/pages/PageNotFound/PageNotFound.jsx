import React from 'react'
import './pagenotfound.css'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import { useNavigate } from 'react-router-dom'
const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <>
    <div className="page-not-found-main-container">
      <div className="card-page-not-found">
    
            <div className="page-not-found-main-backgournd"> 
              <div className=" m-0 p-0 not-found-content ">
                <div className="text-center p-0">


  <p className='success-text mb-4'>404</p>
  <p className="not-found-text">Page not found</p>
 
  <div className="row m-0 justify-content-center">
    <div className=" ">
      <WebsiteButton type='button' onClick={()=>{navigate('/')}}>Back To Home</WebsiteButton>
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

export default PageNotFound