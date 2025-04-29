import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { Signinwithgoogle, updateAccessToken } from '../../Redux/slice/authSlice';
import { GoogleLogin } from "@react-oauth/google";


const GoogleLoginComponent = () => {

const [isLoading, setisLoading] = useState(false)
const handleError = () => {
    console.error("Login Failed");
    setisLoading(false);
  };

    const handleSuccess = (response) => {
        const idToken = response.credential;
        const decodedToken = jwtDecode(idToken);
      
        dispatch(Signinwithgoogle(idToken))
        .then((res) => {
          if (res.payload.isSuccess) {
            toast.success("Login successful!");
            store.dispatch(updateAccessToken(res?.payload));
            navigate("/startsurvey");
          }
        });
      };
  return (
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
  )
}

export default GoogleLoginComponent