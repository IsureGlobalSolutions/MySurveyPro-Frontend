import { useEffect, useState } from "react";
import WebsiteButton from "../../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import "../TEISurvey/TEISurvey.css";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { getSurveyById } from "../../../../Redux/slice/authSlice";
import toast from "react-hot-toast";
import Loader from "../../../../components/plugins/Loader";
import img1 from "../../../../assets/Q12survey/c2.png";
import CompetencyIcon from '../../../../assets/Q12survey/competencyIcon.svg?react'
import { useParams } from "react-router-dom";
import TEICongratulation from "../TEISurvey/TEICongratulation";
import OtpVerifyScreen from "../OtpVerifyScreen";
import EASurvey from "./EASurvey";
import EADepartmentSelection from "./EADepartmentSelection";
import { EASurveyResponseApi } from "../../../../Redux/slice/surveySlice";
import SelfOrEmployeeAssessmentCheck from "./SelfOrEmployeeAssessmentCheck";

const EASurveyResponseQuestions = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const theme = useTheme();
  const [surveyTypeId, setSurveyTypeId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showAssessmentCheck, setshowAssessmentCheck] = useState(false)
  const [showIdVerification, setShowIdVerification] = useState(true);
  const [recipentId, setrecipentId] = useState("");
  const [showOtpScreen, setshowOtpScreen] = useState(false);
  const [showDepartmentSelection, setShowDepartmentSelection] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [survareData, setsurvareData] = useState(null);
  const [responses, setResponses] = useState({});
  const [currentCompetencyResponses, setCurrentCompetencyResponses] = useState({});
  const { userId, surveyId } = useParams();
  const [loading, setloading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const fetchSurveyData = async (surveyTypeId, designationId) => {
    setloading(true);
    try {
      const res = await dispatch(
        getSurveyById(surveyTypeId === 1 ? {
          surveyId: surveyId,
          surveyTypeId: surveyTypeId,
          designationId: designationId,
           respondentRecipientId: parseInt(recipentId),
        } : {
          surveyId: surveyId,
          surveyTypeId: surveyTypeId,
          designationId: designationId,
          employeeRecipientId: selectedEmployee?.id,
          respondentRecipientId: parseInt(recipentId),
        })
      ).then((response) => {
        if (response?.payload?.isSuccess && surveyTypeId === 2) {
          setloading(false);
          setData(response?.payload);
          setShowDepartmentSelection(false);
          setShowIdVerification(false);
        }
        else if (response?.payload?.isSuccess && surveyTypeId === 1) {
          setloading(false);
          setData(response?.payload);
          setShowIdVerification(false);
        }
        else if(!response?.payload?.isSuccess){
          setloading(false)
       window.location.reload();
          setshowAssessmentCheck(false)
          setshowOtpScreen(false)
          setShowIdVerification(true)

        }
      });
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };



  const handleNext = async () => {
    setloading(true);
    const currentCompetency = data.competencies[activeStep];
    const newValidationErrors = {};
    let hasErrors = false;

    currentCompetency.questions.forEach((question) => {
      if (!currentCompetencyResponses[question.questionId]) {
        newValidationErrors[question.questionId] = `Please select an answer for Question ${currentCompetency.questions.indexOf(question) + 1}`;
        hasErrors = true;
      }
    });

    setValidationErrors(newValidationErrors);

    if (hasErrors) {
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
      
     
      setloading(false);
      return;
    }

    const payload = currentCompetency.questions.map((question) => ({
      userId: userId,
      questionId: question.questionId,
      choiceId: currentCompetencyResponses[question.questionId],
      respondentRecipientId: parseInt(recipentId),
      surveyId: parseInt(surveyId),
      competencyId: currentCompetency.competencyId,
      surveyTypeId: surveyTypeId,
      ...(surveyTypeId === 2 && selectedEmployee && {
        employeeRecipientId: selectedEmployee.id
      })
    }));

    try {
      await dispatch(EASurveyResponseApi(payload))
      .then((res)=>{
        if(res?.payload?.isSuccess){
          setloading(false);
            setResponses(prev => ({
        ...prev,
        [currentCompetency.competencyId]: currentCompetencyResponses
      }));

      setCurrentCompetencyResponses({});
      setValidationErrors({});

      if (activeStep < data.competencies.length - 1) {
        setloading(false);
        setActiveStep(activeStep + 1);
      } else {
        setloading(false);
        setActiveStep(data.competencies.length);
      }
        }
      })
      
    
    } catch (error) {
      setloading(false);
      toast.error("Failed to submit responses. Please try again.");
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      const currentCompetency = data.competencies[activeStep];
      setResponses(prev => ({
        ...prev,
        [currentCompetency.competencyId]: currentCompetencyResponses
      }));
      
      const prevCompetency = data.competencies[activeStep - 1];
      setCurrentCompetencyResponses(responses[prevCompetency.competencyId] || {});
      setValidationErrors({});
      
      setActiveStep(activeStep - 1);
    }
  };

  const handleIdVerified = () => {
 
    setActiveStep(0);
  };



  useEffect(()=>{
if(surveyTypeId){
  
if (surveyTypeId === 1) {
      fetchSurveyData(surveyTypeId, survareData.designationId);
    } else if (surveyTypeId === 2) {
      setShowDepartmentSelection(true);
      
    }
    setShowIdVerification(false)
    setshowAssessmentCheck(false)
}
  },[surveyTypeId])

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
    fetchSurveyData(surveyTypeId, selectedEmployee.designationId);
  };

  const handleResponseChange = (questionId, choiceId) => {
    setCurrentCompetencyResponses(prev => ({
      ...prev,
      [questionId]: choiceId
    }));
    
    if (validationErrors[questionId]) {
      setValidationErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const idHandler=(data)=>{
    if(data){
    setsurvareData(data)  
    }

  }
  
  const getOtpScreenData = (data) => {
   setsurvareData(data)  
   

    
  };


  useEffect(() => {
    if (data?.competencies && activeStep < data.competencies.length) {
      const currentCompetency = data.competencies[activeStep];
      setCurrentCompetencyResponses(responses[currentCompetency.competencyId] || {});
      setValidationErrors({});
    }
  }, [activeStep, data, responses]);

 if (showIdVerification) {
    if (showOtpScreen) {
      return (
        <OtpVerifyScreen
          stepUPSendValue={handleIdVerified}
          showOtpScreen={setshowOtpScreen}
          showAssessmentCheckScreen={setshowAssessmentCheck}
          staffid={recipentId}
            surveyTypeId={setSurveyTypeId}
          setoptscreendata={getOtpScreenData}
        />
      );
    } else if (showAssessmentCheck) {
      return (
        <SelfOrEmployeeAssessmentCheck
          surveyTypeId={setSurveyTypeId}
        />
      );
    } else {
      return (
        <EASurvey
          showOtpScreen={setshowOtpScreen}
          sendDataToParent={idHandler}
          recipientId={setrecipentId}
      surveyTypeId={setSurveyTypeId}
          showDepartmentSelection={setShowDepartmentSelection}
          showAssessmentCheckScreen={setshowAssessmentCheck}
        />
      );
    }
  }
  if (showDepartmentSelection && surveyTypeId==2) {
    return (
      <EADepartmentSelection
        departments={survareData?.departments}
        employees={survareData?.employees}
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
      <div className="">
        <div className="d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4">
          <div className="steppercard d-flex flex-column align-items-start w-100">
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
                            {activeStep+1}
                          </span>
                          <span className="dimension-text">
                            {currentCompetency.competency}
                          </span>
                        </div>
                      </div>
                      <div className="set-question-portion-main">
                        <div className="set-question-counter">
                          <div className="">
                            <p className="m-0 fw-semibold fs-md-5">Questions</p>
                            <small className="text-center" style={{color:'#999999'}}>
                              {activeStep+1}/{data?.competencies?.length}
                            </small>
                          </div>
                        </div>
                        <div className="set-question-list-portion">
                          {currentCompetency.questions.map((question, index) => (
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
                                            checked={currentCompetencyResponses[question.questionId] === choice.choiceId}
                                            onChange={() => handleResponseChange(question.questionId, choice.choiceId)}
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
                                  disabled={activeStep === data.competencies.length}
                                >
                                  {activeStep === data.competencies.length - 1 ? "Submit" : "Next"}
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

export default EASurveyResponseQuestions;