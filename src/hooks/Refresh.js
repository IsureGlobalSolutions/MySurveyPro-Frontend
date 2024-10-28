// src/hooks/refreshToken.js
import { axiosPrivate, baseURL } from '../axios/axios';
import {store} from '../Redux/store';
import { updateAccessToken } from '../Redux/slice/auth'; 


const refresh = async () => {
  const state = store.getState();
  const Token = state.user?.userData;
  
  const response = await axiosPrivate.post(`${baseURL}api/RefreshTokensAPI/RefreshToken`, 
    {accessToken:Token?.accessToken,refreshToken:Token?.refreshToken}
  )

  const newAccessToken = response.data;
  store.dispatch(updateAccessToken(newAccessToken)); // Update the access token in the Redux store
  return newAccessToken;
};

export default refresh;
