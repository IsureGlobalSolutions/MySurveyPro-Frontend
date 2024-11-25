// src/Redux/slice/surveySlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance, axiosPrivate } from '../../axios/axios';
import toast from 'react-hot-toast';

export const getAllSurveyList = createAsyncThunk('survey/getAllSurvey', async (data, thunkAPI) => {
  try {
    const res = await axiosPrivate.get('api/Survey/getAllSurveys?page=0&pageSize=10');
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const paymentSurvey = createAsyncThunk('survey/CreateSurveyChargeAsync', async (data, thunkAPI) => {
  try {
    const res = await axiosPrivate.post('api/Survey/CreateSurveyChargeAsync', data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const checkPaymentStatus = createAsyncThunk('survey/CheckSubscriptionPaymentStatus', async (id, thunkAPI) => {
  try {
    const res = await axiosPrivate.post(`api/Survey/CheckSubscriptionPaymentStatus/${id}`, {});
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const getOverAllSurveyReport = createAsyncThunk('survey/getOverAllSurveyReport', async ({ surveyId, gender }, thunkAPI) => {
  try {
    const res = await axiosPrivate.get(`api/SurveyReport/GetOverAllSurveyOrGenderReport`,{
      params: { surveyId, gender } // Correctly passing query parameters
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDepartmentQuestionsReport = createAsyncThunk('survey/getDepartmentQuestionsReport', async ({surveyId,department}, thunkAPI) => {
  try {
    const res = await axiosPrivate.get(`api/SurveyReport/GetDepartmentQuestionsReport`, {
      params:{surveyId,department}
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getOverAllDepartmentsQuestionsReport = createAsyncThunk('survey/getOverAllDepartmentsQuestionsReport', async (surveyId, thunkAPI) => {
  try {
    const res = await axiosPrivate.get(`api/SurveyReport/GetOverAllDepartmentsQuestionsReport`, {
      params:{surveyId}
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getOverAllDepartmentReport = createAsyncThunk('survey/getOverAllDepartmentReport', async ({surveyId,option}, thunkAPI) => {
  try {
    const res = await axiosPrivate.get(`api/SurveyReport/GetOverAllDepartmentalReport`, {
      params:{surveyId,option}
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getGradeQuestionsReport = createAsyncThunk('survey/getGradeQuestionsReport', async ({surveyId,grade}, thunkAPI) => {
  try {
    const res = await axiosPrivate.get(`api/SurveyReport/GetGradeQuestionsReport`, {
      params:{surveyId,grade}
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getOverAllGradesQuestionsReport = createAsyncThunk('survey/getOverAllGradesQuestionsReport', async (surveyId, thunkAPI) => {
  try {
    const res = await axiosPrivate.get(`api/SurveyReport/GetOverAllGradesQuestionsReport`, {
      params:{surveyId}
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getOverAllGradeReport = createAsyncThunk('survey/getOverAllGradeReport', async ({surveyId,option}, thunkAPI) => {
  try {
    const res = await axiosPrivate.get(`api/SurveyReport/GetOverAllGradesReport`, {
      params:{surveyId,option}
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getTotalNumberOfRespondent = createAsyncThunk('survey/getTotalNumberOfRespondent', async (surveyId, thunkAPI) => {
  try {
    const res = await axiosPrivate.get(`api/Recipient/GetTotalNumberOfRespondents`, {
      params:{surveyId}
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getListOfCoumnProperty = createAsyncThunk('survey/getListOfCoumnProperty', async ({surveyId,columnProperty}, thunkAPI) => {
  try {
    const res = await axiosPrivate.get(`api/Recipient/GetListOfColumnProperty`, {
      params:{surveyId,columnProperty}
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const downloadOverAllSurveyReport = createAsyncThunk('survey/downloadOverAllSurveyReport', async (data, thunkAPI) => {
  try {
    const res = await axiosPrivate.post(`api/ReportFileDownload/DownloadOverallSurveyReport`, data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const downloadColumnWiseReport = createAsyncThunk('survey/downloadColumnWiseReport', async (data, thunkAPI) => {
  try {
    const res = await axiosPrivate.post(`api/ReportFileDownload/DownloadColumnWiseReport`, data);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.alertMessage || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});




const initialState = {
  isLoading: false,
  surveysList: {},
  getTotalNumberOfRespondentValue:{},
  getOverAllDepartmentReportValue:{},

  message: '',
  paymentStatus:'',
  error: null,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    updatePaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSurveyList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSurveyList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.surveysList = action.payload;
        state.error = null;
      })
      .addCase(getAllSurveyList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })


      .addCase(paymentSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymentSurvey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(paymentSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })



      .addCase(checkPaymentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkPaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(checkPaymentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      
      .addCase(getOverAllSurveyReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOverAllSurveyReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.getOverAllSurveyReportValues = action.payload;
        state.error = null;
      })
      .addCase(getOverAllSurveyReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })


      .addCase(getListOfCoumnProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListOfCoumnProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(getListOfCoumnProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
     
      

      
      .addCase(getTotalNumberOfRespondent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalNumberOfRespondent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.getTotalNumberOfRespondentValue=action.payload
        state.error = null;
      })
      .addCase(getTotalNumberOfRespondent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })



      .addCase(getOverAllDepartmentReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOverAllDepartmentReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.getOverAllDepartmentReportValue=action.payload
        state.error = null;
      })
      .addCase(getOverAllDepartmentReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
  },
});

export const { updatePaymentStatus } = surveySlice.actions;
export default surveySlice.reducer;
