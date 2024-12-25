


import React, { useState  } from 'react'
import infographicImage from '../../assets/login-and-signup/forgotPassword.png';
import SurveyLogo from '../../assets/svgs/logoWithTitle.svg?react';

import './forgetpassword.css'
import { useForm } from 'react-hook-form';
import InputField from '../../components/mySurveyProInput/InputField'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import toast from 'react-hot-toast';
import { forgotPasswordApi } from '../../Redux/slice/authSlice';
import { FRONTEND_URL } from '../../consts/environments';

const ForgotPassword = () => {  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()


  
    const onSubmit=(data)=>{
      setisLoading(true)
const finalData = {...data, clientBaseURL:`${FRONTEND_URL}/resetpassword/`}
  dispatch(forgotPasswordApi(finalData))
.then((res)=>{
if(res?.payload.isSuccess===true){
  toast.success(res?.payload?.alertMessage)
  
 setisLoading(false)
 navigate('/login')
}
})


    }
  return (

    <>
    <div className="forgot-main-container">
        <div className="card-forgot">
            <div className="forgot-card-body row">
               <div className="visuals-forgot col-md-6">
               <div className="forgot-logo">
               <SurveyLogo/>
               </div> <img className='info-image img-fluid' src={infographicImage}   alt="" />
                {/* <div className=""></div> */}
                
                </div> 
               <div className="forgot-content col-md-6">
<div className="" style={{width:'100%'}}>
          <p className='welcome-text text-center'>Forgot Password</p>
                <p className="account-creation-suggestion text-center">New to MySurveyPro? <span onClick={()=>navigate('/signup')}>Create an account</span></p>
                <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-space">
                <InputField
                  type="email"
                  name="email"
                  register={register}
                  errors={errors}
                  placeholder="Email Address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                />
                </div>



               <div className="forgot-button">
                <WebsiteButton className='w-100' type='submit' onClick={()=>{}} disabled = {isLoading}>
                   {isLoading?'Sending...':'Send Email'}
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

export default ForgotPassword