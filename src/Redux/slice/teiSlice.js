// src/Redux/slice/surveySlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance, axiosPrivate } from '../../axios/axios';
import toast from 'react-hot-toast';
import { PURGE } from 'redux-persist';

export const overAllTeiSurveyReportApi = createAsyncThunk('survey/overAllTeiSurveyReportApi', async (surveyId, thunkAPI) => {
  try {
    const res = await axiosPrivate.get('api/TEISurveyReport/GetOverAllTEISurveyReport',{
        params: { surveyId  }
    });
    return res?.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const TeiDimensionListApi = createAsyncThunk('survey/TeiDimensionListApi', async (surveyId, thunkAPI) => {
  try {
    const res = await axiosPrivate.get('api/Survey/GetDimensionsBySurveyId',{
        params: { surveyId  }
    });
    return res?.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const userSingleDimensionForSingleDepartmentReportApi = createAsyncThunk('survey/TeiDimensionListApi', async (surveyId, thunkAPI) => {
  try {
    const res = await axiosPrivate.get('api/TEISurveyReport/GetDepartmentTEISurveyReport',{
        params: { surveyId  }
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
  overAllTEISurveyReport: {},
  listOfDimensions:[],
  error: null,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
//   reducers: {
//     updatePaymentStatus: (state, action) => {
//       state.paymentStatus = action.payload;
//     },
    
//   },
  extraReducers: (builder) => {
    builder
        .addCase(PURGE, () => initialState) 
    
      .addCase(overAllTeiSurveyReportApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(overAllTeiSurveyReportApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.overAllTEISurveyReport = action.payload;
        state.error = null;
      })
      .addCase(overAllTeiSurveyReportApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })



      .addCase(TeiDimensionListApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(TeiDimensionListApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.listOfDimensions = action.payload;
        state.error = null;
      })
      .addCase(TeiDimensionListApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
     
  },
});

export const { updatePaymentStatus,emptyAllStatesLogout } = surveySlice.actions;
export default surveySlice.reducer;
