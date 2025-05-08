import { useEffect, useState } from 'react';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from 'react-redux';
import { getSurveyById } from '../../../../Redux/slice/authSlice';
import toast from 'react-hot-toast';
import Loader from '../../../../components/plugins/Loader';
import img1 from '../../../../assets/Q12survey/c2.png';
import PreveiwCongratulationsurvey from './PreveiwCongratulationsurvey';
import Q12template from './MP12template';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from "@mui/material/Paper";
import '../TEItemplate/TEItemplate.css'
const PreviewQuestion = () => {
    const dispatch = useDispatch();
    const q12SurveyId = useSelector((state) => state.user.selectedSurveyId);
    const [data, setData] = useState([]);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(111);
    const [loading, setLoading] = useState(false);

    const fetchSurveyData = async (surveyid) => {
        setLoading(true);
        try {
            const res = await dispatch(getSurveyById({surveyId: surveyid}));
            setData(res?.payload?.questions || []);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSurveyData(q12SurveyId);
    }, [dispatch, q12SurveyId]);

    const handleNext = () => {
        if (activeStep < data.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setActiveStep(data.length);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleactivestep = (value) => {
        setActiveStep(value);
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <Loader />;
    }

    if (activeStep === 111) {
        return <Q12template stepUPSendValue={handleactivestep} />;
    }

    if (activeStep === data.length) {
        return (
            <div className="position-relative">
                <div className="d-flex justify-content-start flex-wrap gap-5  ">
                    <div className="congratulations-main d-flex flex-column align-items-start w-100">
                      
                        <div className="container">
                            <div className="row">
                                <div className="col-12 p-5">
                                    <PreveiwCongratulationsurvey />
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
            <div className={`d-flex justify-content-start flex-wrap gap-5 m-0 ${loading ? 'opacity-50' : ''}`}>
                <div className="steppercard mp12-height">
                    <div className="stepper-card-gradiant">
                        <div className="stepper-card-opecity">
                            <div className="">
                                <div className="col-12 p-5">
                                    <div className="">
                                        <div className="col-12 col-md-7 surveyQuestion"></div>
                                        <div className="tableheader m-0 p-0">
                                                 <div className="table-body p-2 mb-1">
                                                                 
                                                                  </div>
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
                                                    <div className="Question-section">
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
                                                                    disabled={activeStep === data.length}
                                                                >
                                                                    {activeStep === data.length - 1 ? "Submit" : "Next"}
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

export default PreviewQuestion;