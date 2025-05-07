import { useEffect, useState } from 'react';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import './TEISurvey.css';
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from 'react-redux';
import { getSurveyById, surveyresponse } from '../../../../Redux/slice/authSlice';
import toast from 'react-hot-toast';
import Loader from '../../../../components/plugins/Loader';
import img1 from '../../../../assets/Q12survey/c2.png';
import CompetencyIcon from '../../../../assets/Q12survey/competencyIcon.svg?react'
import { useParams } from 'react-router-dom';
import TEISurvey from './TEISurvey';
import TEICongratulation from './TEICongratulation';
import OtpVerifyScreen from '../OtpVerifyScreen';
import { FormControlLabel, Paper, Radio } from '@mui/material';

const TEISurveyResponseQuestions = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [staffid, setstaffid] = useState('');
    const { userData } = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const { userId, surveyId } = useParams();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(111);
    const [selectchoiseid, setSelectchoiseid] = useState([]);
    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        fetchSurveyData(surveyId);
        loadProgress();
        clearProgress();
    }, [dispatch]);

    const fetchSurveyData = async (surveyId) => {
        try {
            const res = await dispatch(getSurveyById({ surveyId }));
            setData(res?.payload);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const loadProgress = () => {
        const savedStep = localStorage.getItem('activeStep');
        const savedChoices = localStorage.getItem('selectchoiseid');
        if (savedStep) setActiveStep(Number(savedStep));
        if (savedChoices) setSelectchoiseid(JSON.parse(savedChoices));
    };

    const saveProgress = () => {
        localStorage.setItem('activeStep', activeStep + 1);
        localStorage.setItem('selectchoiseid', JSON.stringify(selectchoiseid));
    };

    const handlechoiseID = (questionId, choiseid) => {
        setSelectchoiseid((prevchoiceid) => ({
            ...prevchoiceid,
            [questionId]: choiseid,
        }));

        // Clear validation error when user selects an option
        if (validationErrors[questionId]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[questionId];
                return newErrors;
            });
        }
    };

    const clearProgress = () => {
        localStorage.removeItem('activeStep');
        localStorage.removeItem('selectchoiseid');
    };

    const handleNext = async () => {
      const currentDimension = data.dimensions[activeStep];
      const newValidationErrors = {};
      let hasErrors = false;
  
      // Check if all questions in current dimension are answered
      currentDimension.questions.forEach((question) => {
          if (!selectchoiseid[question.questionId]) {
              newValidationErrors[question.questionId] = `Please select an answer for Question ${currentDimension.questions.indexOf(question) + 1}`;
              hasErrors = true;
          }
      });
  
      setValidationErrors(newValidationErrors);
  
      if (hasErrors) {
          // Scroll to the first unanswered question
          const firstUnansweredQuestionId = Object.keys(newValidationErrors)[0];
          if (firstUnansweredQuestionId) {
              const element = document.getElementById(`question-${firstUnansweredQuestionId}`);
              if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  element.classList.add('highlight-validation');
                  setTimeout(() => {
                      element.classList.remove('highlight-validation');
                  }, 2000);
              }
          }
  
          toast.error("Please answer all questions before proceeding");
          return;
      }
  
      try {
          setIsLoading(true);
          // Prepare all responses in a single array
          const responses = currentDimension.questions.map((question) => ({
              questionId: question.questionId,
              choiceId: selectchoiseid[question.questionId],
              recipientId: Number(staffid),
              userId,
              surveyId: question.surveyId,
          }));
  
          // Send all responses in a single API call
          await dispatch(surveyresponse(responses));
  
          saveProgress();
  
          if (activeStep < data.dimensions.length - 1) {
              // Move to the next dimension
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
              setIsLoading(false);
          } else {
              // Final dimension - handle end of survey logic
              setActiveStep(data.dimensions.length);
              clearProgress();
              setIsLoading(false);
          }
      } catch (error) {
          toast.error(error.message || "An error occurred. Please try again.");
          setIsLoading(false);
      }
  };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        saveProgress();
        setValidationErrors({}); // Clear validation errors when going back
    };

    const getValueFromIdComponent = (value) => {
        setActiveStep(value);
    };

    const sendIdParent = (value) => {
        setstaffid(value);
    }

    if (!Array.isArray(data.dimensions) || data.dimensions.length === 0) {
        return <Loader />;
    }

    if (activeStep === 111) {
        return !showOtpScreen ? (
            <TEISurvey setstaffid={setstaffid} showOtpScreen={setShowOtpScreen} sendIdParent={sendIdParent} />
        ) : showOtpScreen ? (
            <OtpVerifyScreen stepUPSendValue={getValueFromIdComponent} staffid={staffid} />
        ) : null;
    }

    if (activeStep === data.dimensions.length) {
        return (
            <div className=" ">
                <div className="d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4">
                    <div className="steppercard d-flex flex-column align-items-start w-100">
                        <img src={img1} className="card-img img-fluid mb-3" alt="Survey Complete" />
                        <div className="container">
                            <div className="row">
                                <div className="col-12 p-5">
                                    <TEICongratulation />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentDimension = data.dimensions[activeStep];

    return (
        <div className="position-relative">
            {isLoading && (
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
            <div className={`d-flex justify-content-start flex-wrap gap-5  ${isLoading ? 'opacity-50' : ''}`}>
                <div className="steppercard">
                    <div className="stepper-card-gradiant">
                        <div className="stepper-card-opecity">
                            <div className="">
                                <div className="col-12 p-5">
                                    <div className="">
                                        <div className="col-12 col-md-7 surveyQuestion"></div>
                                        <div className="tableheader m-0 p-0">
                                            <div className="table-body p-2 mb-1">
                                                <div className="d-flex align-items-center">
                                                    <CompetencyIcon />
                                                    <span className="ms-2 me-2 dimension-text">
                                                        {currentDimension.dimensionId}
                                                    </span>
                                                    <span className="dimension-text">
                                                        {currentDimension.dimension}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="set-question-portion-main">
                                                <div className="set-question-counter">
                                                    <div className="">
                                                        <p className="m-0 fw-semibold fs-md-5">Questions</p>
                                                        <small className="text-center" style={{ color: '#999999' }}>
                                                            {activeStep + 1}/{data.dimensions.length}
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="set-question-list-portion">
                                                    {currentDimension.questions.map((question, index) => (
                                                        <div
                                                            key={question.questionId}
                                                            id={`question-${question.questionId}`}
                                                            className={validationErrors[question.questionId] ? 'question-highlight' : ''}
                                                        >
                                                            <div className={`Question-section ${validationErrors[question.questionId] ? 'question-section-validation' : ''}`}>
                                                                <div className="question-question-nmber dimension-text">
                                                                    Question {index + 1}
                                                                </div>
                                                                <div className="question-text question-text-top">
                                                                    <h3 className="question-text">
                                                                        {question.questionText}
                                                                    </h3>
                                                                </div>
                                                               
                                                                <div className="Question-options d-flex flex-wrap gap-1 mt-0 pt-0">
                                                                    {question.choices.map((choice) => (
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
                                                                                    name={`question-${question.questionId}`}
                                                                                    checked={selectchoiseid[question.questionId] === choice.choiceId}
                                                                                    onChange={() => handlechoiseID(question.questionId, choice.choiceId)}
                                          />
                                        } 
                                        label={choice.text} 
                                      />

                                                                        </Paper>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
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
                                                                    disabled={activeStep === data.dimensions.length}
                                                                >
                                                                    {activeStep === data.dimensions.length - 1 ? "Submit" : "Next"}
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

export default TEISurveyResponseQuestions;