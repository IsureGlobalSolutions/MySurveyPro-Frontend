import React, { useEffect, useState } from "react";
import infographicImage from "../../assets/login-and-signup/login-infographic.png";
import SurveyLogo from "../../assets/svgs/logoWithTitle.svg?react";
import "./login.css";
import { useForm } from "react-hook-form";
import InputField from "../../components/mySurveyProInput/InputField";
import WebsiteButton from "../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EyeSlashIcon  from '../../assets/svgs/ic_EyeClosed_24px.svg?react';
import Eyeicon  from '../../assets/svgs/ic_EyeOpen_24px.svg?react';
import {
  signInUser,
  Signinwithgoogle,
  updateAccessToken,
} from "../../Redux/slice/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { store } from "../../Redux/store";
import { jwtDecode } from "jwt-decode";
const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.accessToken) {
      navigate("/startsurvey");
    }
  }, []);
  const onSubmit = (data) => {
    setisLoading(true);
    try {
      const finalData = { ...data, rememberMe: true };

      dispatch(signInUser(finalData)).then((res) => {
        if (res?.payload.isSuccess === true) {
          console.log(res?.payload);
          setisLoading(false);
          store.dispatch(updateAccessToken(res?.payload));
          toast.success("Login Successfully!");
          navigate("/startsurvey");
        } else {
          toast.error(res?.payload);
          setisLoading(false);
        }
      });
    } catch (error) {
      toast.error(error);
      setisLoading(false);
    }
  };
  const handleSuccess = (response) => {
    const idToken = response.credential;
    const decodedToken = jwtDecode(idToken);
    setisLoading(true);
    dispatch(Signinwithgoogle(idToken)).then((res) => {
      if (res.payload.isSuccess) {
        toast.success("Login successful!");
        setisLoading(false);
        store.dispatch(updateAccessToken(res?.payload));
        navigate("/startsurvey");
      }
    });
  };
  const handleError = () => {
    console.error("Login Failed");
    setisLoading(false);
  };
  return (
    <>
      <div className="login-main-container">
        <div className="">
          <div className="login-card-body row">
            <div className="visuals-login">
            <div className="login-logo flex justify-content-center align-items-center">
                <Link to={"/"}>
                  {" "}
                  <SurveyLogo />
                </Link>
              </div>
            </div>
            <div className="login-content">
              <p className="welcome-text text-center">Sign In</p>
              <p className="account-creation-suggestion text-center">
              Free access to {" "}
                <span  onClick={() => navigate("/")}>
                My SurveyPro
                </span>
                {" "}
                dashboard
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-space">
                  <label className="mb-2" htmlFor="username"> Email</label>
                  <InputField
                    type="email"
                    name="username"
                    id="username"
                    register={register}
                    errors={errors}
                    placeholder="Email Address"
                    {...register("username", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
  
                <div className="input-space-2 mb-3 mt-3">
                  <div className="d-flex justify-content-between">
                   <label htmlFor="password " className="mb-2">
                    Password
                  </label>  
                   <p
                  className="forget-pass-text text-end "
                  onClick={() => {
                    navigate("/forgotpassword");
                  }}
                >
                  Forget Password?
                </p>
                  </div>
                   <div className="position-relative">
                                   <InputField
                      type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    register={register}
                    errors={errors}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 3,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />

                  {/* <EyeSlashIcon/> */}
 
    <span
      onClick={() => setShowPassword(prev => !prev)}
      style={{
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#6c757d',
        fontSize: '20px',
        color:"#98A2B3"
      }}
    >
      {showPassword ? <Eyeicon /> : <EyeSlashIcon />}
    </span>
 
                 </div>
 
                </div>
             

                <div className="login-button ">
                  <WebsiteButton
                    className="w-100 mb-3"
                    type="submit"
                    onClick={() => {}}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </WebsiteButton>
                  <div className="d-flex justify-content-end">
                    <div>
                           <p className="account-creation-suggestion text-center">
           Don't have an Account? {" "}
                <span  onClick={() => navigate("/signup")}>
            Sign UP
                </span>
                {" "}
               
              </p> 
                    </div>
            
                  </div>
                </div>
              </form>

              <p className="signin-border text-center">
                _______ Or sign in with ______
              </p>
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
  );
};

export default LoginScreen;
