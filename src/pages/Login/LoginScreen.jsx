import React, { useEffect, useLayoutEffect, useState  } from 'react'
import infographicImage from '../../assets/login-and-signup/login-infographic.png';
import SurveyLogo from '../../assets/svgs/logoWithTitle.svg?react';
import googleIcon from '../../assets/login-and-signup/google-icon.png'
import facebookIcon from '../../assets/login-and-signup/facebook-icon.png';
import appleIcon from '../../assets/login-and-signup/apple-icon.png';
import './login.css'
import { useForm } from 'react-hook-form';
import InputField from '../../components/mySurveyProInput/InputField'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser, updateAccessToken } from '../../Redux/slice/auth';

import toast from 'react-hot-toast';
import { store } from '../../Redux/store';
const LoginScreen = () => {  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {isLoading,userData} =useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

useLayoutEffect(() => {
  if(userData?.accessToken){
    navigate('/startsurvey')
  }

}, [])


  
    const onSubmit=(data)=>{

try {
  const finalData = {...data,rememberMe:true}

  dispatch(signInUser(finalData))
.then((res)=>{
if(res?.payload.isSuccess===true){
  console.log(res?.payload);
  
  store.dispatch(updateAccessToken(res?.payload))
  toast.success('Login Successfully!')
  navigate('/startsurvey')
}
})
} catch (error) {
  toast.error(error)
}


    }
  return (

    <>
    <div className="login-main-container">
        <div className="card-login">
            <div className="login-card-body row">
               <div className="visuals-login col-md-6">
               <div className="login-logo">
                {/* <img className='img-fluid ' src={surveyLogo} alt="" /> */}
                <Link to={'/'}>  <SurveyLogo/></Link>
              
                </div> <img className='info-image img-fluid' src={infographicImage}   alt="" />
                {/* <div className=""></div> */}
                
                </div> 
               <div className="login-content col-md-6">

                <p className='welcome-text text-center'>Welcome Back!</p>
                <p className="account-creation-suggestion text-center">New to MySurveyPro? <span onClick={()=>navigate('/signup')}>Create an account</span></p>
                <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-space">
                <InputField
                  type="email"
                  name="username"
                  register={register}
                  errors={errors}
                  placeholder="Email Address"
                  {...register('username', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                />
                </div>

<div className="input-space-2">
                <InputField
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 3, message: 'Password must be at least 6 characters' }
                  })}
                />
                </div>
   <p className="forget-pass-text text-end " onClick={()=>{navigate('/forgotpassword')}}>Forget Password?</p>

               <div className="login-button">
                <WebsiteButton className='w-100' type='submit'  onClick={()=>{} } disabled={isLoading}>
                    {isLoading? "Loading...":'Login'}
                </WebsiteButton>
               </div>
                </form>
              
            
               <p className="signin-border text-center">____________ Or sign up with ____________</p>
<div className="mt-3">
     <div className="socail-login ">
                  <img style={{width:'20px',margin:'0px 5px'}} src={googleIcon} alt="" /> 
                  <div className="">   <p className='text-center'>Continue With Google</p></div>
                
                </div>
                <div className="socail-login">
                <img style={{width:'20px',margin:'0px 5px'}} src={facebookIcon} alt="" /> 
                    <div className="">  <p className='text-center'>Continue With Facebook</p></div>

                  
                </div>
                <div className="socail-login">
                <img style={{width:'20px',margin:'0px 5px'}} src={appleIcon} alt="" /> 
                    <div className=""> <p className='text-center'>Continue With Apple</p></div>
                   
                </div>
</div>
               
               </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default LoginScreen