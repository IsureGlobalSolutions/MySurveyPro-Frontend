// src/Redux/slice/surveySlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance, axiosPrivate } from '../../axios/axios';
import toast from 'react-hot-toast';
import { PURGE } from 'redux-persist';



export const addUpdateCustomSurveyApi = createAsyncThunk('survey/addCustomSurveyApi', async (data, thunkAPI) => {
  try {
    const res = await axiosPrivate.post('api/Survey/AddUPdateCustomSurveyJson',data);
    return res?.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const ListOfCustomSurveyApi = createAsyncThunk('survey/addCustomSurveyApi', async (_, thunkAPI) => {
  try {
    const res = await axiosPrivate.get('api/Survey/GetAllCustomSurveysJson');
    return res?.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getCustomSurveyByIdApi = createAsyncThunk('survey/getCustomSurveyByIdApi', async (data, thunkAPI) => {
  console.log("🚀 ~ getCustomSurveyByIdApi ~ data:", data)
  try {
    const res = await axiosPrivate.get('api/Survey/GetCustomsurveyJson',{
        params: { id: data  }
    });
    return res?.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteCustomSurveyApi = createAsyncThunk('survey/deleteCustomSurveyApi', async (data, thunkAPI) => {
  try {
    const res = await axiosPrivate.delete('api/Survey/DeleteCustomSurveyJson',{
        params: { id: data  }
    });
    return res?.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});











const initialState = {
  isLoading: false,
  message: '',
listOfCustomSurvey:[],
  error: null,
};

const customsurveySlice = createSlice({
  name: 'customsurvey',
  initialState,
//   reducers: {
//     updatePaymentStatus: (state, action) => {
//       state.paymentStatus = action.payload;
//     },
    
//   },
  extraReducers: (builder) => {
    builder
        .addCase(PURGE, () => initialState) 
    
      .addCase(ListOfCustomSurveyApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ListOfCustomSurveyApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.listOfCustomSurvey = action.payload;
        state.error = null;
      })
      .addCase(ListOfCustomSurveyApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

     
  },
});


export default customsurveySlice.reducer;
