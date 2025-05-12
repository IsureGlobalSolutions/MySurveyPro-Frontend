import { useEffect, useState } from 'react';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from 'react-redux';
import { getSurveyById, surveyresponse } from '../../../../Redux/slice/authSlice';
import toast from 'react-hot-toast';
import Loader from '../../../../components/plugins/Loader';
import img1 from '../../../../assets/Q12survey/c2.png';
import Congratulationsurvey from './Congratulationsurvey';
import Q12survey from './Q12survey.jsx';
import OtpVerifyScreen from '../OtpVerifyScreen.jsx';
import { useParams } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from "@mui/material/Paper";
import '../TEISurvey/TEISurvey.css'
const SurveyResponseQuestion = () => {
    const dispatch = useDispatch();
    const { userId, surveyId } = useParams();
    const [data, setData] = useState([]);
    const [staffid, setstaffid] = useState('');
    const { isLoading } = useSelector((state) => state.user);
    const [showOtpScreen, setshowOtpScreen] = useState(false);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(111);
    const [selectchoiseid, setselectchoiseid] = useState([]);
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const fetchSurveyData = async (surveyId) => {
        setLoading(true);
        try {
            const res = await dispatch(getSurveyById({ surveyId }));
            setData(res?.payload?.questions || []);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSurveyData(surveyId);
        loadProgress();
        clearProgress();
    }, [dispatch, surveyId]);

    const loadProgress = () => {
        const savedStep = localStorage.getItem('activeStep');
        const savedChoices = localStorage.getItem('selectchoiseid');
        if (savedStep) setActiveStep(Number(savedStep));
        if (savedChoices) setselectchoiseid(JSON.parse(savedChoices));
    };

    const saveProgress = () => {
        localStorage.setItem('activeStep', activeStep + 1);
        localStorage.setItem('selectchoiseid', JSON.stringify(selectchoiseid));
    };

    const handlechoiseID = (choiseid) => {
        setselectchoiseid(prevchoiceid => ({
            ...prevchoiceid,
            [activeStep]: choiseid,
        }));
        
        // Clear validation error when user selects an option
        if (validationErrors[activeStep]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[activeStep];
                return newErrors;
            });
        }
    };

    const clearProgress = () => {
        localStorage.removeItem('activeStep');
        localStorage.removeItem('selectchoiseid');
    };

    const handleNext = async () => {
        if (!selectchoiseid[activeStep]) {
            setValidationErrors({
                [activeStep]: "Please select an answer before proceeding"
            });
            toast.error("Please select an answer before proceeding");
            return;
        }

        const choiceId = selectchoiseid[activeStep];
        const questionId = data[activeStep].questionId;
        const recipientId = Number(staffid);

        try {
            setLoading(true);
            const requestData = { 
                choiceId, 
                respondentRecipientId:recipientId, 
                userId, 
                surveyId, 
                questionId 
            };
            
            await dispatch(surveyresponse([requestData]))
            .then((res)=>{
if(res.payload.isSuccess){
       saveProgress(); 
       if (activeStep < data.length - 1) {
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            } else {
                clearProgress();
                setActiveStep(data.length);
            }
}
            })
         

           
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        saveProgress();
    };

    const getValueFromIdComponent = (value) => {
        setActiveStep(value);
    };

    const sendIdParent = (value) => {
        setstaffid(value);
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <Loader />;
    }

    if (activeStep === 111) {
        return !showOtpScreen ? (
            <Q12survey 
                setstaffid={setstaffid} 
                showOtpScreen={setshowOtpScreen} 
                sendIdParent={sendIdParent} 
            />
        ) : showOtpScreen ? (
            <OtpVerifyScreen 
                stepUPSendValue={getValueFromIdComponent} 
                staffid={staffid} 
            />
        ) : null;
    }

    if (activeStep === data.length) {
        return (
            <div className="position-relative">
                <div className="d-flex justify-content-start flex-wrap ">
                    <div className="congratulations-main d-flex flex-column align-items-start w-100">
                  
                        <div className="container">
                            <div className="row">
                                <div className="col-12 p-5">
                                    <Congratulationsurvey />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = data[activeStep];

    return (
        <div className="position-relative">
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader />
                </div>
            )}
            <div className={`d-flex justify-content-start flex-wrap gap-5 m-0  ${loading ? 'opacity-50' : ''}`}>
                <div className="steppercard mp12-height">
                    <div className="stepper-card-gradiant">
                        <div className="stepper-card-opecity">
                            <div className="">
                                <div className="col-12 p-5">
                                    <div className="">
                                        <div className="col-12 col-md-7 surveyQuestion"></div>
                                        <div className="tableheader m-0 p-0">
                                            <div className="set-question-portion-main">
                                                <div className="set-question-counter">
                                                    <div className="">
                                                        <p className="m-0 fw-semibold fs-md-5">Questions</p>
                                                        <small className="text-center" style={{color:'#999999'}}>
                                                            {activeStep + 1}/{data.length}
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="set-question-list-portion">
                                                    <div 
                                                        className={`Question-section ${validationErrors[activeStep] ? 'question-section-validation' : ''}`}
                                                    >
                                                        <div className="question-question-nmber dimension-text">
                                                            Question {currentQuestion.questionId}
                                                        </div>
                                                        <div className="question-text question-text-top">
                                                            <h3 className="question-text">
                                                                {currentQuestion.questionText}
                                                            </h3>
                                                        </div>
                                                      
                                                        <div className="Question-options d-flex flex-wrap gap-1 mt-0 pt-0">
                                                            {currentQuestion.choices.map((choice) => (
                                                                <Paper
                                                                    key={choice.choiceId}
                                                                    square
                                                                    elevation={0}
                                                                    className="ms-2"
                                                                >
                                                                    <FormControlLabel 
                                                                        sx={{backgroundColor:"transparent"}} 
                                                                        value="other" 
                                                                        control={
                                                                            <Radio
                                                                                id={`choice-${choice.choiceId}`}
                                                                                checked={selectchoiseid[activeStep] === choice.choiceId}
                                                                                onChange={() => handlechoiseID(choice.choiceId)}
                                                                            />
                                                                        } 
                                                                        label={choice.text} 
                                                                    />
                                                                </Paper>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="container">
                                                        <div className="row justify-content-center">
                                                            <div className="col-12 col-md-8 col-lg-6 d-flex gap-4">
                                                                <WebsiteButton
                                                                    buttonDesign="outliner"
                                                                    onClick={handleBack}
                                                                    disabled={activeStep === 0}
                                                                >
                                                                    {theme.direction === "rtl" ? (
                                                                        <KeyboardArrowRight />
                                                                    ) : (
                                                                        <KeyboardArrowLeft />
                                                                    )}
                                                                    Back
                                                                </WebsiteButton>
                                                                <WebsiteButton
                                                                    size="small"
                                                                    onClick={handleNext}
                                                                    disabled={activeStep === data.length || isLoading}
                                                                >
                                                                    {isLoading ? 'Loading...' : 
                                                                     (activeStep === data.length - 1 ? "Submit" : "Next")}
                                                                    {theme.direction === "rtl" ? (
                                                                        <KeyboardArrowLeft />
                                                                    ) : (
                                                                        <KeyboardArrowRight />
                                                                    )}
                                                                </WebsiteButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyResponseQuestion;