import { useEffect, useState } from "react";
import WebsiteButton from "../../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import "./TEItemplate.css";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { getSurveyById } from "../../../../Redux/slice/authSlice";
import toast from "react-hot-toast";
import Loader from "../../../../components/plugins/Loader";
import img1 from "../../../../assets/Q12survey/c2.png";
import CompetencyIcon from '../../../../assets/Q12survey/competencyIcon.svg?react'
import TEItemplate from "./TEItemplate";
import PreveiwCongratulationsurvey from "../mp12template/PreveiwCongratulationsurvey";
import { Paper } from "@mui/material";

const TEIPreviewQuestion = () => {
  const dispatch = useDispatch();
  const TEISurveyId = useSelector((state) => state.user.selectedSurveyId);
  const [data, setData] = useState(null);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(111);
  const [loading, setLoading] = useState(false);

  const fetchSurveyData = async (TEISurveyId) => {
    setLoading(true);
    try {
      const res = await dispatch(getSurveyById({ surveyId: TEISurveyId }));
      setData(res?.payload);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (TEISurveyId) {
      fetchSurveyData(TEISurveyId);
    } else {
      toast.error("Survey ID not found");
    }
  }, [TEISurveyId, dispatch]);

  const handleNext = () => {
    if (activeStep < data.dimensions.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep(data.dimensions.length);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleactivestep = (value) => {
    setActiveStep(value);
  };

  if (!Array.isArray(data?.dimensions) || data.dimensions.length === 0) {
    return <Loader />;
  }

  if (activeStep === 111) {
    return <TEItemplate stepUPSendValue={handleactivestep} />;
  }

  if (activeStep === data.dimensions.length) {
    return (
      <div className="position-relative">
        <div className="d-flex justify-content-start flex-wrap  ">
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

  const currentDimension = data.dimensions[activeStep];

  return (
    <div className="position-relative"> 
      {loading && (
        <div 
          style={{
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
          }}
        >
          <Loader />
        </div>
      )}
      <div className={`d-flex justify-content-start flex-wrap gap-5 m-0 ${loading ? 'opacity-50' : ''}`}>
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
                          <CompetencyIcon/>
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
                            <small className="text-center" style={{color:'#999999'}}>
                              {activeStep+1}/{data?.dimensions?.length}
                            </small>
                          </div>
                        </div>
                        <div className="set-question-list-portion">
                          {currentDimension.questions.map((question, index) => (
                            <div 
                              key={question.questionId} 
                              id={`question-${question.questionId}`}
                            >
                              <div className="Question-section">
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

export default TEIPreviewQuestion;