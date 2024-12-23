import { useEffect, useState } from 'react';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import img2 from '../../../../assets/Q12survey/Q12cardimage1.png';
import './TEISurvey.css';
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from 'react-redux';
import { getSurveyById, surveyresponse } from '../../../../Redux/slice/authSlice';
import toast from 'react-hot-toast';
import Loader from '../../../../components/plugins/Loader';
import img1 from '../../../../assets/Q12survey/c2.png';
import img3 from "../../../../assets/Q12survey/Figon_Component.png";

import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';
import TEISurvey from './TEISurvey';
import TEICongratulation from './TEICongratulation';
const TEISurveyResponseQuestions = () => {
    const TEISurveyId = useSelector((state) => state.user.selectedSurveyId);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [staffid, setstaffid] = useState('');
    const {isLoading,userData} =useSelector((state)=>state.user)
    const {id}=useParams();
 
  const userid = id;
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(111);
    const [selectchoiseid, setselectchoiseid] = useState([]);

    useEffect(() => {
        fetchSurveyData(TEISurveyId);
        loadProgress();
        clearProgress();
    }, [dispatch]);

    const fetchSurveyData = async (TEISurveyId) => {
        try {
            const res = await dispatch(getSurveyById(TEISurveyId));
            setData(res?.payload);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const loadProgress = () => {
        const savedStep = localStorage.getItem('activeStep');
        const savedChoices = localStorage.getItem('selectchoiseid');
        if (savedStep ) setActiveStep(Number(savedStep));
        if (savedChoices) setselectchoiseid(JSON.parse(savedChoices));
    };

    const saveProgress = () => {
        localStorage.setItem('activeStep', activeStep+1);
        localStorage.setItem('selectchoiseid', JSON.stringify(selectchoiseid));
    };

    const handlechoiseID = (questionId, choiseid) => {
        setselectchoiseid((prevchoiceid) => ({
            ...prevchoiceid,
            [questionId]: choiseid,
        }));
    };

    const clearProgress = () => {
        localStorage.removeItem('activeStep');
        localStorage.removeItem('selectchoiseid');
    };

    const handleNext = async () => {
        const currentDimension = data.dimensions[activeStep];
    
        // Check if all questions in the current dimension are answered
        const allAnswered = currentDimension.questions.every(
            (question) => selectchoiseid[question.questionId] !== undefined
        );
    
        if (!allAnswered) {
            toast.error("Please answer all questions before proceeding.");
            return;
        }
    
        try {
            // Prepare API request data for all questions in the current dimension
            const responses = currentDimension.questions.map((question) => ({
                questionId: question.questionId,
                choiceId: selectchoiseid[question.questionId],
                recipientId: Number(staffid),
                userId: userid,
                surveyId: question.surveyId, // Assuming surveyId is part of the question object
            }));
    
            // Dispatch responses as a batch or individual calls
            for (const response of responses) {
                await dispatch(surveyresponse(response));
            }
    
            saveProgress();
    
            if (activeStep < data.dimensions.length - 1) {
                // Move to the next dimension
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else {
                // Final dimension - handle end of survey logic
                console.log("etyeyeyu");
                setActiveStep(data.dimensions.length);
                clearProgress();
                // Move to the summary or finish screen
            }
        } catch (error) {
            toast.error(error.message || "An error occurred. Please try again.");
        }
    };
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        saveProgress();
    };
    if (!Array.isArray(data.dimensions) || data.dimensions.length === 0) {
        return <Loader />;
    }
    const getValueFromIdComponent = (value) => {
        setActiveStep(value);
    };
     const sendIdParent=(value) => {
      
        setstaffid(value);
     }
    return (
        <>
            {activeStep === 111 ? (
                <TEISurvey setstaffid={setstaffid} stepUPSendValue={getValueFromIdComponent}  sendIdParent={sendIdParent} />
            ) : activeStep === data.dimensions.length ? (
                <div className=' '>
                    <div className='d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4'>
                        <div className="steppercard d-flex flex-column align-items-start w-100">
                            <img type="button" src={img1} className="card-img img-fluid mb-3" alt="Survey Stepper" />
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12 p-5'>
                                        <TEICongratulation/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" ">
          <div className="d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4">
            <div className="steppercard d-flex flex-column align-items-start w-100">
              <img
                type="button"
                src={img1}
                className="card-img img-fluid mb-5 "
                style={{ borderRadius: "20px 20px 0px 0px" }}
              />
              <div className="container">
                <div className="row">
                  <div className="col-12 p-5">
                    <div className="row">
                      <div className="col-12 col-md-7 surveyQuestion">
                       
                      </div>
                      <div className="tableheader m-0 p-0">
                        <div>
                          <div className="table-body  p-2  mb-1">
                            <div className="d-flex align-items-center ">
                              <img
                                src={img3}
                                alt="Image"
                                className="custom-img"
                              />
                              <span
                                className="ms-2 me-2"
                                style={{ fontSize: "18px", color: "white" }}
                              >
                                {" "}
                                {data.dimensions[activeStep].dimensionId}
                              </span>
                              <span
                                style={{ fontSize: "18px", color: "white" }}
                              >
                                {" "}
                                {data.dimensions[activeStep].dimension}
                              </span>
                            </div>
                          </div>
                          {data.dimensions[activeStep].questions.map(
                            (question, index) => (
                              <div className="p-2 pt-1 pb-1" key={index}>
                                <div className="Question-section mt-1">
                                  <div className="question-question-nmber p-2 ps-3">
                                    Question {index + 1}
                                  </div>
                                  <div className="m-3 d-flex question-text gap-2">
                                    <span>{index + 1}</span>
                                    <span>
                                      <span
                                        style={{
                                          border: "none",
                                          borderLeft: "3px solid #f97300",
                                          height: "100%",
                                          marginRight: "0px",
                                          display: "inline-block", 
                                          marginTop:"-2px"
                                        }}
                                      />
                                    </span>
                                    <h3>{question.questionText}</h3>
                                  </div>
                                  <div className="Question-options d-flex gap-5 p-2 mt-0 pt-0">
  {question.choices.map((choice) => (
    <Paper
      key={choice.choiceId}
      square
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "start",
      }}
      className="ms-2"
    >
      <input
        type="checkbox"
        className="form-check-input-TEI mt-1"
        id={`choice${choice.choiceId}`}
        checked={selectchoiseid[question.questionId] === choice.choiceId}
        onChange={() => handlechoiseID(question.questionId, choice.choiceId)}
      />
      <span className="ms-2 TEIcheckmark">
        {choice.text}
      </span>
    </Paper>
  ))}
</div>

                                </div>
                              </div>
                            )
                          )}
                        </div>
                        {/* )} */}
                        <MobileStepper
                          variant="text"
                          steps={data.dimensions.length}
                          position="static"
                          activeStep={activeStep}
                          style={{backgroundColor:"#d3d3d3" ,  justifyContent:"space-evenly"}}
                          nextButton={
                            <WebsiteButton
                              size="small"
                              onClick={handleNext}
                              disabled={
                                activeStep === data.dimensions.length - 1
                              }
                            >
                              Next
                              {theme.direction === "rtl" ? (
                                <KeyboardArrowLeft />
                              ) : (
                                <KeyboardArrowRight />
                              )}
                            </WebsiteButton>
                          }
                          backButton={
                            <WebsiteButton>
                              <Button
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                              >
                                {theme.direction === "rtl" ? (
                                  <KeyboardArrowRight />
                                ) : (
                                  <KeyboardArrowLeft />
                                )}
                                Back
                              </Button>
                            </WebsiteButton>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            )}
        </>
    );
};

export default TEISurveyResponseQuestions;


