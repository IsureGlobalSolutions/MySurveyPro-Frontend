import { useEffect, useState } from "react";
import WebsiteButton from "../../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import img2 from "../../../../assets/Q12survey/Q12cardimage1.png";
import "../TEISurvey/TEISurvey.css";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import {
  getSurveyById,
  surveyresponse,
  
} from "../../../../Redux/slice/authSlice";
import toast from "react-hot-toast";
import Loader from "../../../../components/plugins/Loader";
import img1 from "../../../../assets/Q12survey/c2.png";
import img3 from "../../../../assets/Q12survey/Figon_Component.png";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import TEICongratulation from "../TEISurvey/TEICongratulation";
import OtpVerifyScreen from "../OtpVerifyScreen";
import EASurvey from "./EASurvey";
import EADepartmentSelection from "./EADepartmentSelection";
import { EASurveyResponseApi } from "../../../../Redux/slice/surveySlice";
import { set } from "lodash";

const EASurveyResponseQuestions = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  console.log("🚀 ~ EASurveyResponseQuestions ~ data:", data)
  const theme = useTheme();
  const [surveyTypeId, setSurveyTypeId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showIdVerification, setShowIdVerification] = useState(true);
  const [recipentId, setrecipentId] = useState("");
  const [showOtpScreen, setshowOtpScreen] = useState(false);
  const [showDepartmentSelection, setShowDepartmentSelection] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [otpScreenData, setOtpScreenData] = useState(null);
  const [responses, setResponses] = useState({}); // Store all responses
  const [currentCompetencyResponses, setCurrentCompetencyResponses] = useState({}); // Store current competency responses
  const { userId, surveyId } = useParams();
const [loading, setloading] = useState(false)
  const fetchSurveyData = async (surveyTypeId, designationId) => {
    setloading(true)
    try {
      const res = await dispatch(
        getSurveyById(surveyTypeId===1 ?{
          surveyId: surveyId,
          surveyTypeId: surveyTypeId,
          designationId: designationId,
        }:
        
      {
        surveyId: surveyId,
        surveyTypeId: surveyTypeId,
        designationId: designationId,
        employeeRecipientId: selectedEmployee?.id,
        respondentRecipientId: parseInt(recipentId),
      })
      )
      .then((response) => {
        if(response?.payload?.isSuccess && surveyTypeId===2){
          setloading(false)
         console.log("enter successfully" ,response?.payload);
         setData(response?.payload);
          setShowDepartmentSelection(false);
          setShowIdVerification(false);
          
        }
        else if(response?.payload?.isSuccess && surveyTypeId===1){
          setloading(false)
           setData(response?.payload);
           setShowIdVerification(false);
        }
      })
     
    } catch (error) {
      setloading(false)
      toast.error(error.message);
    }
  };

  const getRecipentId = (value) => {
    setrecipentId(value);
  };

  const handleNext = async () => {
    setloading(true)  
    // Check if all questions in current competency are answered
    const currentCompetency = data.competencies[activeStep];
    const unansweredQuestions = currentCompetency.questions.filter(
      (question) => !currentCompetencyResponses[question.questionId]
    );

    if (unansweredQuestions.length > 0) {
      toast.error("Please answer all questions before proceeding");
      setloading(false)
      return;
    }

    // Prepare payload for current competency
    const payload = currentCompetency.questions.map((question) => ({
      userId: userId,
      questionId: question.questionId,
      choiceId: currentCompetencyResponses[question.questionId],
      respondentRecipientId:  parseInt(recipentId),
      surveyId: parseInt(surveyId),
      competencyId: currentCompetency.competencyId,
      surveyTypeId: surveyTypeId,
      ...(surveyTypeId === 2 && selectedEmployee && {
        employeeRecipientId: selectedEmployee.id
      })
    }));

    try {
      // Send responses for current competency
      await dispatch(EASurveyResponseApi(payload)).unwrap();
      
      // Save responses to overall state
      setResponses(prev => ({
        ...prev,
        [currentCompetency.competencyId]: currentCompetencyResponses
      }));

      // Clear current competency responses
      setCurrentCompetencyResponses({});

      // Move to next step
      if (activeStep < data.competencies.length - 1) {
        setloading(false)
        setActiveStep(activeStep + 1);
      } else {
        setloading(false)
        setActiveStep(data.competencies.length);
      }
    } catch (error) {
      setloading(false)
      toast.error("Failed to submit responses. Please try again.");
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      // Save current responses before going back
      const currentCompetency = data.competencies[activeStep];
      setResponses(prev => ({
        ...prev,
        [currentCompetency.competencyId]: currentCompetencyResponses
      }));
      
      // Load responses for previous competency if they exist
      const prevCompetency = data.competencies[activeStep - 1];
      setCurrentCompetencyResponses(responses[prevCompetency.competencyId] || {});
      
      setActiveStep(activeStep - 1);
    }
  };

  const handleIdVerified = () => {
    setShowIdVerification(false);
    setActiveStep(0);
  };

  const getSurveyTypeIdHandler = (surveyTypeId) => {
    setSurveyTypeId(surveyTypeId);
  };

  const getOtpScreenData = (data) => {
    setOtpScreenData(data);
    setSurveyTypeId(data.surveyTypeId);
    if (data.surveyTypeId === 1) {
      fetchSurveyData(data.surveyTypeId, data.designationId);
      
    } else if (data.surveyTypeId === 2) {
      setShowDepartmentSelection(true);
    }
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEmployeeSubmit = () => {
    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }
  
      fetchSurveyData(otpScreenData.surveyTypeId, selectedEmployee.designationId)

           
 
  };

  const handleResponseChange = (questionId, choiceId) => {
    setCurrentCompetencyResponses(prev => ({
      ...prev,
      [questionId]: choiceId
    }));
  };

  // Load responses for current competency when step changes
  useEffect(() => {
    if (data?.competencies && activeStep < data.competencies.length) {
      const currentCompetency = data.competencies[activeStep];
      setCurrentCompetencyResponses(responses[currentCompetency.competencyId] || {});
    }
  }, [activeStep, data, responses]);

  if (showIdVerification) {
    return !showOtpScreen ? (
      <EASurvey
        showOtpScreen={setshowOtpScreen}
        sendIdParent={getRecipentId}
      />
    ) : showOtpScreen ? (
      <OtpVerifyScreen
        stepUPSendValue={handleIdVerified}
        getEAsurveydata={getOtpScreenData}
        staffid={recipentId}
      />
    ) : (
      ""
    );
  }

  if (showDepartmentSelection && otpScreenData) {
    return (
      <EADepartmentSelection
        departments={otpScreenData.departments}
        employees={otpScreenData.employees}
        onDepartmentSelect={handleDepartmentSelect}
        onEmployeeSelect={handleEmployeeSelect}
        onSubmit={handleEmployeeSubmit}
        selectedDepartment={selectedDepartment}
        selectedEmployee={selectedEmployee}
      />
    );
  }

  if (!data) {
    return <Loader />;
  }

  if (activeStep === data.competencies.length) {
    return (
      <div className=" ">
        <div className="d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4">
          <div className="steppercard d-flex flex-column align-items-start w-100">
            <img src={img1} className="card-img img-fluid mb-3" />
            <div className="container">
              <div className="row">
                <div className="col-12 p-5">
                  <div className="row">
                    <TEICongratulation />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentCompetency = data.competencies[activeStep];

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
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Loader /> {/* Your loader component */}
        </div>
      )}
      <div className={`d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4 ${loading ? 'opacity-50' : ''}`}>
  
           <div className="steppercard d-flex flex-column align-items-start w-100">
          <img
            src={img1}
            className="card-img img-fluid mb-5 "
            style={{ borderRadius: "20px 20px 0px 0px" }}
          />
          <div className="container">
            <div className="row">
              <div className="col-12 p-5">
                <div className="row">
                  <div className="col-12 col-md-7 surveyQuestion"></div>
                  <div className="tableheader m-0 p-0">
                    <div>
                      <div className="table-body p-2 mb-1">
                        <div className="d-flex align-items-center">
                          <img src={img3} alt="Image" className="custom-img" />
                          <span
                            className="ms-2 me-2 dimension-text"
                            style={{ fontSize: "18px", color: "white" }}
                          >
                            {currentCompetency.competencyId}
                          </span>
                          <span
                            className="dimension-text"
                            style={{ fontSize: "18px", color: "white" }}
                          >
                            {currentCompetency.competency}
                          </span>
                        </div>
                      </div>
                      {currentCompetency.questions.map((question, index) => (
                        <div
                          className="p-2 pt-1 pb-1"
                          key={question.questionId}
                        >
                          <div className="Question-section mt-1">
                            <div className="question-question-nmber p-2 ps-3 dimension-text">
                              Question {index + 1}
                            </div>
                            <div className="m-3 d-flex question-text gap-2">
                              <span className="dimension-text">
                                {index + 1}
                              </span>
                              <span>
                                <span
                                  className="line-width"
                                  style={{
                                    border: "none",
                                    borderLeft: "3px solid #f97300",
                                    height: "100%",
                                    marginRight: "0px",
                                    display: "inline-block",
                                    marginTop: "-2px",
                                  }}
                                />
                              </span>
                              <h3 className="dimension-text">
                                {question.questionText}
                              </h3>
                            </div>
                            <div className="Question-options d-flex flex-wrap gap-5 p-2 mt-0 pt-0">
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
                                    type="radio"
                                    name={`question-${question.questionId}`}
                                    className="form-check-input-TEI mt-1"
                                    id={`choice-${choice.choiceId}`}
                                    checked={currentCompetencyResponses[question.questionId] === choice.choiceId}
                                    onChange={() => handleResponseChange(question.questionId, choice.choiceId)}
                                  />
                                  <span className="ms-2 TEIcheckmark dimension-text">
                                    {choice.text}
                                  </span>
                                </Paper>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 mui-button-resp">
                          <MobileStepper
                            variant="text"
                            steps={data.competencies.length + 1}
                            position="static"
                            activeStep={activeStep}
                            style={{ backgroundColor: "#d3d3d3" }}
                            nextButton={
                              <WebsiteButton
                                size="small"
                                onClick={handleNext}
                                disabled={
                                  activeStep === data.competencies.length
                                }
                              >
                                {activeStep === data.competencies.length - 1 ? "Submit" : "Next"}
                                {theme.direction === "rtl" ? (
                                  <KeyboardArrowLeft />
                                ) : (
                                  <KeyboardArrowRight />
                                )}
                              </WebsiteButton>
                            }
                            backButton={
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
        </div>
        
       
      </div>
    </div>
  );
};

export default EASurveyResponseQuestions;