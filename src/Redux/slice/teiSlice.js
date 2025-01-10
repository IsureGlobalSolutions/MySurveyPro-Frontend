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


export const userSingleDimensionForSingleDepartmentReportApi = createAsyncThunk('survey/userSingleDimensionForSingleDepartmentReportApi', async ({surveyId,dimensionId,columnProperty ,pageSize , pageNumber}, thunkAPI) => {
  try {
    const res = await axiosPrivate.get('api/TEISurveyReport/GetDepartmentDimensionQuestionsTEISurveyReport',{
        params: { surveyId,dimensionId,columnProperty, pageSize , pageNumber }
    });
    return res?.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const userSingleDimensionForAllDepartmentReportApi = createAsyncThunk('survey/userSingleDimensionForAllDepartmentReportApi', async ({surveyId,dimensionId,columnProperty ,pageSize , pageNumber}, thunkAPI) => {
  try {
    const res = await axiosPrivate.get('api/TEISurveyReport/GetDepartmentDimensionQuestionsTEISurveyReport',{
        params: { surveyId,dimensionId,columnProperty, pageSize , pageNumber }
    });
    return res?.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDepartmentDimensionsTEISurveyReportApi = createAsyncThunk('survey/getDepartmentDimensionsTEISurveyReportApi', async ({surveyId,dimensionId,columnProperty,pageSize,pageNumber}, thunkAPI) => {
  try {
    const res = await axiosPrivate.get('api/TEISurveyReport/GetDepartmentDimensionsTEISurveyReport',{
        params: { surveyId,dimensionId,columnProperty, pageSize,pageNumber }
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
  userSingleDimensionForSingleDepartmentReportList:[],
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



      .addCase(userSingleDimensionForSingleDepartmentReportApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSingleDimensionForSingleDepartmentReportApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.userSingleDimensionForSingleDepartmentReportList = action.payload;
        state.error = null;
      })
      .addCase(userSingleDimensionForSingleDepartmentReportApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(userSingleDimensionForAllDepartmentReportApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSingleDimensionForAllDepartmentReportApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
       
        state.error = null;
      })
      .addCase(userSingleDimensionForAllDepartmentReportApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
     
  },
});

export const { updatePaymentStatus,emptyAllStatesLogout } = surveySlice.actions;
export default surveySlice.reducer;
