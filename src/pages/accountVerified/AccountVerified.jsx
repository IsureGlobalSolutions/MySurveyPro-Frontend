import React from 'react'
import './accountverified.css'
import Checkmark from '../../assets/svgs/check-mark-verifiedEmail.svg?react'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import { useNavigate } from 'react-router-dom'
const AccountVerified = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="account-verified-main-container">
      <div className="card-account-verified">
    
            <div className="account-verified-main-backgournd"> 
              <div className=" m-0 p-0 verified-content ">
                <div className="text-center p-0">
  <Checkmark className="check-mark"/>
  <p className='success-text mb-4'>Success</p>
  <p className="verified-text">Your Account has been varified</p>
  <div className="row m-0 justify-content-center">
    <div className="col-md-8 col-sm-10 ">
      <WebsiteButton type='button' onClick={()=>{navigate('/login')}}>Login Please!</WebsiteButton>
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

export default AccountVerified