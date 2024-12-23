// src/Redux/slice/surveySlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance, axiosPrivate } from '../../axios/axios';
import toast from 'react-hot-toast';

export const overAllTeiSurveyReportApi = createAsyncThunk('survey/overAllTeiSurveyReportApi', async (surveyId, thunkAPI) => {
  try {
    const res = await axiosPrivate.get('api/TEISurveyReport/GetOverAllTEISurveyReport',{
        params: { surveyId  }
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isLoading: false,
  message: '',
  overAllTEISurveyReport: [],
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
     
  },
});

export const { updatePaymentStatus,emptyAllStatesLogout } = surveySlice.actions;
export default surveySlice.reducer;
