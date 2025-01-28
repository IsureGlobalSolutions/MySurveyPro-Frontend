// src/Redux/slice/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance, axiosPrivate } from '../../axios/axios';
import toast from 'react-hot-toast';
import { PURGE } from 'redux-persist';

export const signUpUser = createAsyncThunk('authentication/signUpUser', async (data, thunkAPI) => {
  try {
    const res = await instance.post('api/Authentication/Register', data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const signInUser = createAsyncThunk('authentication/signInUser', async (data, thunkAPI) => {
  try {
    const res = await instance.post('api/Authentication/login', data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const contactus = createAsyncThunk('authentication/contactus', async (data, thunkAPI) => {
  console.log("🚀 ~ contactus ~ data:", data)
  try {
    const res = await axiosPrivate.post('api/Authentication/AddContactUs', data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
export const forgotPasswordApi = createAsyncThunk('authentication/forgotPasswordApi', async (data, thunkAPI) => {
  try {
    const res = await instance.post('api/Authentication/ForgotPassword', data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const resetPasswordApi = createAsyncThunk('authentication/resetPasswordApi', async (data, thunkAPI) => {
  try {
    const res = await axiosPrivate.post('api/Authentication/ResetPassword', data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const resetForgetPasswordApi = createAsyncThunk('authentication/resetForgetPasswordApi', async (data, thunkAPI) => {
  try {
    const res = await instance.post('api/Authentication/ResetForgotPassword', data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const uploadFileOfEmployeesData = createAsyncThunk('authentication/uploadFileOfEmployeesData', async (data, thunkAPI) => {
  try {
    const res = await axiosPrivate.post('api/Recipient/AddRecipientFromFile', data, {
      headers: {
        'content-type': 'application/form-data',
      },
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    // toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const uploadEditFileOfEmployeesData = createAsyncThunk('authentication/uploadEditFileOfEmployeesData', async (data, thunkAPI) => {
  try {
    const res = await axiosPrivate.post('api/Recipient/EditRecipientInFile', data, {
      headers: {
        'content-type': 'application/form-data',
      },
    });
    return res.data;
  } catch (error) {
    
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    // toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteFile = createAsyncThunk('authentication/deleteuniqueFileName', async ({surveyId, uniqueFileName },  thunkAPI) => {
  try {
    const res = await axiosPrivate.delete('api/Recipient/DeleteRecipientsByUniqueFileName',  {
      params : {
        surveyId , uniqueFileName
      },
      headers: {
        'content-type': 'application/form-data',
      },
      
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    // toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const signout = createAsyncThunk('authentication/signout', async (_, thunkAPI) => {
  try {
    const res = await instance.post('api/Authentication/UserSignOut', {});
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
export const getSurveyById = createAsyncThunk('Survey/getSurveyById', async (surveyid, thunkAPI) => {
  try {
    const res = await instance.get(`api/Survey/GetCompleteSurveyById/${surveyid}`);
    return res.data;

  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const surveyresponse = createAsyncThunk('Survey/surveyresponse', async ( data, thunkAPI) => {
  try {
    const res = await instance.post('api/SurveyResponse/AddSurveyResponse' , [data]);
    return res.data;

  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
export const getstaffid = createAsyncThunk('Survey/getstaffid', async ({surveyId,employeeId,userId}, thunkAPI) => {
  try {
    const res = await instance.get(`api/Recipient/VerifyRecipient`,{
    params:{surveyId,employeeId,userId}
    } );
    return res.data;

  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
export const profileapi = createAsyncThunk('survey/addprofile', async ( formData, thunkAPI) => {
  try {
    const res = await axiosPrivate.patch('api/Authentication/UpdateUserProfile' , formData,{
       headers: {
        'content-type': 'application/form-data',
      },
    }
     
    );
    return res.data;

  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
export const GetUserDetail= createAsyncThunk('Survey/GetUserDetail', async (userid, thunkAPI) => {
  try {
    const res = await axiosPrivate.get(`api/Authentication/ViewUserDetail?userId=${userid}`);
    return res.data;

  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
export const Signinwithgoogle= createAsyncThunk('Survey/Signinwithgoogle', async (Idtoken, thunkAPI) => {
  try {
    const res = await axiosPrivate.post(`api/Authentication/GoogleLogin` ,  { IdToken: Idtoken });
    return res.data;

  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
const initialState = {
  isLoading: false,
  userData: {},
  Profiledata:{},
  message: '',
  error: null,
  selectedSurveyId:null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,

  reducers: {
    updateAccessToken: (state, action) => {
      state.userData = action.payload;
    },
    setSelectedSurveyId: (state, action) => {
      
      state.selectedSurveyId = action.payload;
      console.log("Setting surveysId:", state.surveysId);
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(PURGE, () => initialState) 
    
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })


      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.userData = action.payload;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.userData = {};
        state.error = action.payload || action.error.message;
      })


      .addCase(signout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = {};

        state.error = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.isLoading = false;
        state.userData = {};
        state.Profiledata={};
        state.error = action.payload || action.error.message;
      })
      .addCase(forgotPasswordApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPasswordApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })



      .addCase(uploadFileOfEmployeesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFileOfEmployeesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(uploadFileOfEmployeesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })


      .addCase(resetPasswordApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPasswordApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })


      .addCase(resetForgetPasswordApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetForgetPasswordApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetForgetPasswordApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })



      .addCase(getSurveyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSurveyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getSurveyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      


      .addCase(surveyresponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(surveyresponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(surveyresponse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })


      .addCase(getstaffid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getstaffid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getstaffid.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })


      .addCase(GetUserDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUserDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Profiledata = action.payload;
        state.error = null;
      })
      .addCase(GetUserDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })


      .addCase(profileapi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileapi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(profileapi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
  },
});
export const { updateAccessToken,setSelectedSurveyId } = authSlice.actions;
export default authSlice.reducer;
