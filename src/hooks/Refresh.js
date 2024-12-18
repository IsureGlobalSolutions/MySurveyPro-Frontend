// src/hooks/refreshToken.js
import { axiosPrivate, baseURL, instance } from '../axios/axios';
import {store} from '../Redux/store';
import { updateAccessToken } from '../Redux/slice/authSlice'; 
import toast from 'react-hot-toast';
import { FRONTEND_URL } from '../consts/environments';


const refresh = async () => {
  const state = store.getState();
  const Token = state.user?.userData;
  
  try {
    const response = await axiosPrivate.post(`${baseURL}api/RefreshTokensAPI/RefreshToken`, 
    {accessToken:Token?.accessToken,refreshToken:Token?.refreshToken}
  )  
  const newAccessToken = response.data;
  store.dispatch(updateAccessToken(newAccessToken)); // Update the access token in the Redux store
  return newAccessToken;

  } catch (error) {
    toast.error('Login Session has been expired!, please login again');
    const res = await instance.post('api/Authentication/UserSignOut', {});    
     store.dispatch(updateAccessToken({}))   
    window.location.href = `${FRONTEND_URL}/login`; 

     toast.success(res?.payload.alertMessage)

  }
  


};

export default refresh;
