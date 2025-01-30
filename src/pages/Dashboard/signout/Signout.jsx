import {useState} from 'react'
import './Signout.css'
import Signoutimg from '../../../assets/dashboredsvg/signoutimg.svg?react';
import signoutimage from '../../../assets/signoutimage.png'
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useDispatch, useSelector } from 'react-redux';
import {  signout } from '../../../Redux/slice/authSlice';
import toast from 'react-hot-toast';

import { updatePaymentStatus } from '../../../Redux/slice/teiSlice';
import { updateSurveyPaymentStatuses } from '../../../Redux/slice/surveySlice';
import { persistor } from '../../../Redux/store';
import { useNavigate } from 'react-router-dom';
import { Navbarvalue } from '../../../context/NavbarValuesContext';


const Signout =()=> {
  const {isLoading,userData} =useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetContext } = Navbarvalue();

  const handleSubmit=()=>{
    try {
    dispatch(signout())
    .then(async(res)=>{

    if(res?.payload.isSuccess===true){
      toast.success(res?.payload.alertMessage)
      navigate('/login')
      window.localStorage.setItem("survey-json", '');
      window.localStorage.setItem("updata-survey-id", '');
  resetContext()
      persistor.purge()
 
    }
    })
    } catch (error) {
      toast.error(error)
    }
  }
  return (
  
    <div className="  mt-5 mb-4 p-4 d-flex  justify-content-center ">
     <div className='col-md-8 signout p-4'>
     <div className="text-center">
        <div className="mb-4 ps-0 ms-0">
          <Signoutimg />
        </div>
        <div className="mb-4">
          <h1>Are you sure you want to logout?</h1>
        </div>
        <div className="mb-4">
          <img src={signoutimage} className="img-fluid" alt="Signout" />
        </div>
        <div className='d-flex justify-content-center mb-4' >
        <WebsiteButton  type='button'  onClick={handleSubmit} disabled={isLoading}>
                    {isLoading? "Loading...":'Logout'}
        </WebsiteButton>
        </div>
      </div>
     </div>
    </div>

        
  )
}

export default Signout