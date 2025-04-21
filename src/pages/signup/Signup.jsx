// src/screens/SignupScreen.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import infographicImage from "../../assets/login-and-signup/signup-infographic.png";
import SurveyLogo from "../../assets/svgs/logoWithTitle.svg?react";
import Gooogle from "../../assets/login-and-signup/google.svg?react";
import Facebook from "../../assets/login-and-signup/facbook.svg?react";
import Apple from "../../assets/login-and-signup/apple.svg?react";
import "./signup.css";
import { Link } from "react-router-dom";
import EyeSlashIcon from '../../assets/svgs/ic_EyeClosed_24px.svg?react';
import Eyeicon from '../../assets/svgs/ic_EyeOpen_24px.svg?react';
import InputField from "../../components/mySurveyProInput/InputField";
import WebsiteButton from "../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import { useDispatch, useSelector } from "react-redux";
import {
  Signinwithgoogle,
  signUpUser,
  updateAccessToken,
} from "../../Redux/slice/authSlice";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { Country, State, City } from 'country-state-city';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const SignupScreen = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading } = useSelector((state) => state.user);
  
  // Country, State, City selection states
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Get all countries
  const countries = Country.getAllCountries();

  // Get states based on selected country
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];

  // Get cities based on selected state
  const cities = selectedState ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode) : [];

  // Handle country change
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const country = countries.find(country => country.isoCode === countryCode);
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setValue('country', country?.name || '');
    setValue('state', '');
    setValue('city', '');
  };

  // Handle state change
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const state = states.find(state => state.isoCode === stateCode);
    setSelectedState(state);
    setSelectedCity(null);
    setValue('state', state?.name || '');
    setValue('city', '');
  };

  // Handle city change
  const handleCityChange = (e) => {
    const cityName = e.target.value;
    const city = cities.find(city => city.name === cityName);
    setSelectedCity(city);
    setValue('city', city?.name || '');
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("country", data.country);
      formData.append("state", data.state);
      formData.append("city", data.city);
      formData.append("address", data.address);
      formData.append("phoneNumber", phoneNumber);
      formData.append(
        "clientBaseURL",
        "http://isureglobals-001-site4.gtempurl.com/"
      );

      const response = await dispatch(signUpUser(formData));
      if (response?.payload?.isSuccess) {
        toast.success(response.payload.alertMessage);
        navigate("/login");
      } else {
        toast.error(response.payload.alertMessage);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSuccess = (response) => {
    console.log("🚀 ~ handleSuccess ~ response:", response);
    const idToken = response.credential;
    const decodedToken = jwtDecode(idToken);
    console.log("Decoded Token:", decodedToken);
    console.log("ID Token:", idToken);
    dispatch(Signinwithgoogle(idToken)).then((res) => {
      if (res.payload.isSuccess) {
        toast.success("Login successful!");
        store.dispatch(updateAccessToken(res?.payload));
        navigate("/startsurvey");
      }
    });
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <div className="signup-main-container">
      <div className="">
        <div className="signup-card-body row">
          <div className="visuals-signup">
            <div className="signup-logo flex justify-content-center align-items-center">
              <Link to={"/"}>
                <SurveyLogo />
              </Link>
            </div>
          </div>
          <div className="signup-content">
            <p className="welcome-text text-center">Sign Up</p>
            <p className="account-creation-suggestion text-center">
              Create a single account for <span onClick={() => navigate('/')}>MySurveypro</span> 
            </p>
  
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
              <div className="input-field-group">
                <div className="input-space">
                  <label className="mb-2" htmlFor="firstName">First Name</label>
                  <InputField
                    type="text"
                    name="firstName"
                    register={register}
                    errors={errors}
                    placeholder="First Name"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                </div>
  
                <div className="input-space">
                  <label className="mb-2" htmlFor="lastName">Last Name</label>
                  <InputField
                    type="text"
                    name="lastName"
                    register={register}
                    errors={errors}
                    placeholder="Last Name"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                </div>
  
                <div className="input-space">
                  <label className="mb-2" htmlFor="Email">Email</label>
                  <InputField
                    type="email"
                    name="email"
                    register={register}
                    errors={errors}
                    placeholder="Email Address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
  
                <div className="input-space">
                  <label className="mb-2" htmlFor="country">Country</label>
                  <select
                    className="form-select"
                    onChange={handleCountryChange}
                    value={selectedCountry?.isoCode || ''}
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <input type="hidden" {...register("country", { required: true })} />
                  {errors.country && <span className="text-danger">Country is required</span>}
                </div>
  
                {selectedCountry && (
                  <div className="input-space">
                    <label className="mb-2" htmlFor="state">State/Region</label>
                    <select
                      className="form-select"
                      onChange={handleStateChange}
                      value={selectedState?.isoCode || ''}
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <input type="hidden" {...register("state", { required: true })} />
                    {errors.state && <span className="text-danger">State is required</span>}
                  </div>
                )}
  
                {selectedState && (
                  <div className="input-space">
                    <label className="mb-2" htmlFor="city">City</label>
                    <select
                      className="form-select"
                      onChange={handleCityChange}
                      value={selectedCity?.name || ''}
                      required
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <input type="hidden" {...register("city", { required: true })} />
                    {errors.city && <span className="text-danger">City is required</span>}
                  </div>
                )}
  
                <div className="input-space">
                  <label className="mb-2" htmlFor="address">Address</label>
                  <InputField
                    type="text"
                    name="address"
                    register={register}
                    errors={errors}
                    placeholder="Street Address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                </div>
  
                <div className="input-space">
                  <label className="mb-2" htmlFor="phoneNumber">Phone Number</label>
                  <PhoneInput
                    international
                    defaultCountry={selectedCountry?.isoCode || 'US'}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    className="form-control phone-input"
                    required
                  />
                  {!phoneNumber && <span className="text-danger">Phone number is required</span>}
                </div>
  
                <div className="input-space">
                  <label className="mb-2" htmlFor="password">Password</label>
                  <div className="position-relative">
                    <InputField
                      type={showPassword ? "text" : "password"}
                      name="password"
                      register={register}
                      errors={errors}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <span
                      onClick={() => setShowPassword(prev => !prev)}
                      className="password-toggle-icon"
                    >
                      {showPassword ? <Eyeicon /> : <EyeSlashIcon />}
                    </span>
                  </div>
                </div>
  
                <div className="input-space-2">
                  <label className="mb-2" htmlFor="confirmPassword">Confirm Password</label>
                  <div className="position-relative">
                    <InputField
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      register={register}
                      errors={errors}
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === watch("password") || "Passwords do not match",
                      })}
                    />
                    <span
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                      className="password-toggle-icon"
                    >
                      {showConfirmPassword ? <Eyeicon /> : <EyeSlashIcon />}
                    </span>
                  </div>
                </div>
  
                <div className="d-flex justify-content-end mb-3">
                  <p className="account-creation-suggestion">
                    Already a User? <span onClick={() => navigate('/login')} className="login-link">Login</span>
                  </p>
                </div>
  
                <div className="signup-button">
                  <WebsiteButton
                    className="w-100"
                    type="submit"
                    onClick={() => {}}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Signup"}
                  </WebsiteButton>
                </div>
              </div>
            </form>
  
            <p className="signin-border text-center">
              ___ Or sign in with ___
            </p>
            <div className="social-login d-flex align-items-center justify-content-center">
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
  );
};

export default SignupScreen;