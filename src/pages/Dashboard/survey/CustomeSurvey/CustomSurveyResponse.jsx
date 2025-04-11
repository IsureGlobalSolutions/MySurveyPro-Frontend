
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { GetCustomSurveyJson,  surveyresponse } from '../../../../Redux/slice/authSlice';
import toast from 'react-hot-toast';
import Loader from '../../../../components/plugins/Loader';

import { useParams } from 'react-router-dom';
import SurveyRunner from './SurveyRunner.jsx';
import CustomSurvey from './CustomSurvey.jsx';
import OtpVerifyScreen from '../OtpVerifyScreen.jsx';

const CustomSurveyResponse = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});   
       const [staffid, setstaffid] = useState('');
    const { userId, surveyId } = useParams();
    console.log( userId, 'params');
const [showOtpScreen, setshowOtpScreen] = useState(false)
    console.log("🚀 ~ CustomSurveyResponse ~ showOtpScreen:", showOtpScreen)
    const [activeStep, setActiveStep] = useState(111);
    const [selectchoiseid, setselectchoiseid] = useState([]);

    useEffect(() => {
        fetchSurveyData(surveyId);
     
    }, [dispatch]);

    const fetchSurveyData = async (surveyId) => {
        try {
            const res = await dispatch(GetCustomSurveyJson(surveyId));
            setData(res?.payload);
        } catch (error) {
            toast.error(error.message);
        }
    };

  



    const getValueFromIdComponent = (value) => {
        setActiveStep(value);
    };
     const sendIdParent=(value) => {
      
        setstaffid(value);
    
        
     }
   
    return (
        <>
            {activeStep === 111 ? (
                
               
                !showOtpScreen ? (
            <CustomSurvey  showOtpScreen={setshowOtpScreen}  sendIdParent={sendIdParent} />
                    )
                    : showOtpScreen ? (
                    <OtpVerifyScreen stepUPSendValue={getValueFromIdComponent}  staffid={staffid} />
                    )  :''
            )
    
            : (
  
                <SurveyRunner data={data} setData={setData} staffid={staffid}/>
            )}
        </>
    );
};


export default CustomSurveyResponse