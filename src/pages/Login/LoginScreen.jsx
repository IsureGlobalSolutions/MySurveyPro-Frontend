import React, { useEffect, useLayoutEffect, useState  } from 'react'
import infographicImage from '../../assets/login-and-signup/login-infographic.png';
import SurveyLogo from '../../assets/svgs/logoWithTitle.svg?react';
import './login.css'
import { useForm } from 'react-hook-form';
import InputField from '../../components/mySurveyProInput/InputField'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser, Signinwithgoogle, updateAccessToken } from '../../Redux/slice/authSlice';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { store } from '../../Redux/store';
import { jwtDecode } from 'jwt-decode';
const LoginScreen = () => {  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {userData} =useSelector((state)=>state.user)
  const dispatch = useDispatch();
   const [isLoading, setisLoading] = useState(false)
   console.log("🚀 ~ LoginScreen ~ isLoading:", isLoading)
  const navigate = useNavigate()

useLayoutEffect(() => {
  if(userData?.accessToken){
    navigate('/startsurvey')
  }

}, [])
    const onSubmit=(data)=>{
setisLoading(true)
try {
  const finalData = {...data,rememberMe:true}

  dispatch(signInUser(finalData))
.then((res)=>{
if(res?.payload.isSuccess===true){
  console.log(res?.payload);
setisLoading(false)
  store.dispatch(updateAccessToken(res?.payload))
  toast.success('Login Successfully!')
  navigate('/startsurvey')
}else{
  toast.error(res?.payload);
  setisLoading(false);
}
})
} catch (error) {
  toast.error(error)
  setisLoading(false)
}


    }
    const handleSuccess = (response) => {
        const idToken = response.credential; 
        const decodedToken = jwtDecode(idToken);
     setisLoading(true)
     dispatch(Signinwithgoogle(idToken)).then((res) => {
      if (res.payload.isSuccess) { 
        toast.success("Login successful!"); 
        setisLoading(false)
        store.dispatch(updateAccessToken(res?.payload))
        navigate('/startsurvey')
      }
    
    })
  }
    const handleError = () => {
      console.error('Login Failed');
      setisLoading(false)
    };
  return (

    <>
    <div className="login-main-container">
        <div className="card-login">
            <div className="login-card-body row">
               <div className="visuals-login col-md-6">
               <div className="login-logo">
                <Link to={'/'}>  <SurveyLogo/></Link>
                </div> <img className='info-image img-fluid' src={infographicImage}   alt="" />                
                </div> 
               <div className="login-content col-md-6 d-flex justify-c0ntent-center flex-column">

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
                <WebsiteButton className='w-100' type='submit'   onClick={()=>{} } disabled={isLoading}>
                    {isLoading? "Loading...":'Login'}
                </WebsiteButton>
               </div>
                </form>
              
            
               <p className="signin-border text-center">____________ Or sign in with ____________</p>
<div className="mt-3">
<div className="social-login d-flex alignn-items-center justify-content-center">
  <GoogleLogin
    onSuccess={handleSuccess}
    onError={handleError}
    text="Continue with Google"
    shape="rectangular"
    width="190%"
    useOneTap
    render={(renderProps) => (
      <button
        className="custom-google-button"
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
      >
        Continue with Google
      </button>
    )}
  />
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




