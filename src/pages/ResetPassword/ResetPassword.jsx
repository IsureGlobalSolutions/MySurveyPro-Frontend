


import React, { useState  } from 'react'
import infographicImage from '../../assets/login-and-signup/resetpassword.png';
import SurveyLogo from '../../assets/svgs/logoWithTitle.svg?react';

import './resetpassword.css'
import { useForm } from 'react-hook-form';
import InputField from '../../components/mySurveyProInput/InputField'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import toast from 'react-hot-toast';
import { resetForgetPasswordApi } from '../../Redux/slice/auth';
const RestPassword = () => {  
  const { register, handleSubmit,watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isLoading}=useSelector((state)=>state.user)
const params= useParams()
const applicationUserId= params['id']


    const onSubmit=(data)=>{
      const finalData = {...data,applicationUserId}
  dispatch(resetForgetPasswordApi(finalData))
.then((res)=>{
if(res?.payload.isSuccess===true){
  toast.success(res?.payload?.alertMessage)
 navigate('/login')
}
else if(res?.payload.isSuccess===false){
  toast.error(res?.payload?.alertMessage)

}
else{
  toast.error('Something went wrong try agaim later ')
}
})


    }
  return (

    <>
    <div className="reset-main-container">
        <div className="card-reset">
            <div className="reset-card-body row">
               <div className="visuals-reset col-md-6">
               <div className="reset-logo">
               <SurveyLogo/>
               </div> <img className='info-image img-fluid' src={infographicImage}   alt="" />
                {/* <div className=""></div> */}
                
                </div> 
               <div className="reset-content col-md-6">
<div className="" style={{width:'100%'}}>
    <p className='welcome-text text-center'>Reset Password</p>
                <p className="account-creation-suggestion text-center">New to MySurveyPro? <span onClick={()=>navigate('/signup')}>Create an account</span></p>
                <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-space">
                <InputField
                  type="password"
                  name="newPassword"
                  register={register}
                  errors={errors}
                  placeholder="New Password"
                  {...register('newPassword', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                />
              </div>

              <div className="input-space">
                <InputField
                  type="password"
                  name="confirmPassword"
                  register={register}
                  errors={errors}
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === watch('newPassword') || 'Passwords do not match'
                  })}
                />
              </div>



               <div className="reset-button">
                <WebsiteButton className='w-100' type='submit' onClick={()=>{}} disabled={isLoading}>
                   {isLoading? 'Updating...':'Reset Password'}
                </WebsiteButton>
               </div>
                
              </form>
</div>
                
              
            
  
               
               </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default RestPassword