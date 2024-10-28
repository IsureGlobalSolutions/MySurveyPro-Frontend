import React, { useEffect, useState } from 'react'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import img1 from '../../assets/Q12survey/trueicon.png'
import './Pricing.css';
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { checkPaymentStatus } from '../../Redux/slice/surveySlice';
import toast from 'react-hot-toast';
import {store} from '../../Redux/store';
import { updatePaymentStatus } from '../../Redux/slice/surveySlice'; 
const Success = () => {
  const params = useParams()
  const dispatch = useDispatch()




  useEffect(()=>{
if(params.id){
dispatch(checkPaymentStatus(params.id))
.then((res)=>{
if(res?.payload?.paymentStatus==='paid') 
  store.dispatch(updatePaymentStatus(res?.payload?.paymentStatus));
 
  toast.success('payment has been successfully paid') 
})
}
  },[params])

  
  return (
    
    <div className="container-fluid d-flex justify-content-center align-items-center ">
    <div className="paymentsuccess col-md-7 col-lg-6  m-4 p-4">
      <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center m-4 p-4 pe-0 pt-0 mt-0">
        <h1>Success</h1>
        <span>
          <img src={img1} className="img-fluid" alt="Success Image" />
        </span>
        <h2>Payment Received!</h2>
        
        <Link to="/Dashboard" className="sidbar-item-link">
          <WebsiteButton>Back to Dashboard</WebsiteButton>
        </Link>
      </div>
    </div>
  </div>
  
      
        

  )
}

export default Success