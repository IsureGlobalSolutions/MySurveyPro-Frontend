import React from 'react'
import './pagenotfound.css'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import { useNavigate } from 'react-router-dom';
import PageNotFoundImage from '../../assets/Dashboredpng/pageNotFoundImage.png'
const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <>
    <div className="page-not-found-main-container">
      <div className="card-page-not-found">
    
       
             
                <div className=" p-0">


  <p className='oop-text mb-4'>Oops...</p>
  <p className='notfound-text mb-4'>Page not found</p>
  <p className="not-found-description">This Page doesn`t exist or was removed!
  We suggest you  back to home.</p>
 
  <div className="row m-0 justify-content-center">
    <div className=" ">
      <WebsiteButton type='button' onClick={()=>{navigate('/')}}>Back To Home</WebsiteButton>
    </div>
  </div>

                </div>
              
                <img src={PageNotFoundImage} alt="" />
          
           
      </div>
    </div>

    </>
  )
}

export default PageNotFound