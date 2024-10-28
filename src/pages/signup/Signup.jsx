// src/screens/SignupScreen.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import infographicImage from '../../assets/login-and-signup/signup-infographic.png';
import SurveyLogo from '../../assets/svgs/logoWithTitle.svg?react';
import Gooogle from '../../assets/login-and-signup/google.svg?react';
import Facebook from '../../assets/login-and-signup/facbook.svg?react';
import Apple from '../../assets/login-and-signup/apple.svg?react';
import './signup.css';
import { Link } from "react-router-dom";

import InputField from '../../components/mySurveyProInput/InputField';
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../Redux/slice/auth';
import toast from 'react-hot-toast';

const SignupScreen = () => {
  const navigate = useNavigate();
  const { register, handleSubmit,watch, formState: { errors } } = useForm();
const dispatch = useDispatch()
const {isLoading}= useSelector((state)=>state.user)
const onSubmit = async (data) => {
  try {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);
    formData.append('clientBaseURL', 'http://isureglobals-001-site4.gtempurl.com/');

    const response = await dispatch(signUpUser(formData));
    if (response?.payload?.isSuccess) {
      toast.success(response.payload.alertMessage);
      navigate('/login');
    } else {
      toast.error(response.payload.alertMessage);
    }
  } catch (error) {
    toast.error('An error occurred. Please try again.');
  }
};

  return (
    <div className="signup-main-container">
      <div className="card-signup">
        <div className="signup-card-body row">
          <div className="visuals-signup col-md-6">
            <div className="signup-logo">
           
            <Link to={'/'}>  <SurveyLogo/> </Link>

            </div>
            <img className='info-image img-fluid' src={infographicImage} alt="" />
          </div>
          <div className="signup-content col-md-6">
            <p className='welcome-text text-center'>Welcome to Mysurveypro!</p>
            <p className="account-creation-suggestion text-center">Join Us Today – Your Journey Starts Here!</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-space">
                <InputField
                  type="text"
                  name="firstName"
                  register={register}
                  errors={errors}
                  placeholder="First Name"
                  {...register('firstName', { required: 'First name is required' })}
                /> 
              </div>

              <div className="input-space">
                <InputField
                  type="text"
                  name="lastName"
                  register={register}
                  errors={errors}
                  placeholder="Last Name"
                  {...register('lastName', { required: 'Last name is required' })}
                />
              </div>

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

              <div className="input-space">
                <InputField
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                />
              </div>

              <div className="input-space-2">
                <InputField
                  type="password"
                  name="confirmPassword"
                  register={register}
                  errors={errors}
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                />
              </div>

              <p className="login-text text-end">
                If you already have an account, please <span onClick={() => navigate('/login')}>Login</span>
              </p>

              <div className="signup-button">
                <WebsiteButton className='w-100' type="submit" onClick={()=>{}} disabled={isLoading}>
                   {isLoading? 'loading...':'Signup'}
                </WebsiteButton>
              </div>
            </form>

            <p className="signin-border text-center">____________ Or sign up with ____________</p>
            <div className="mt-3 social-signup">
              <div className="social-logo">
                <Gooogle style={{ cursor: 'pointer' }} />
              </div>
              <div className="social-logo">
                <Facebook style={{ cursor: 'pointer' }} />
              </div>
              <div className="social-logo">
                <Apple style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
