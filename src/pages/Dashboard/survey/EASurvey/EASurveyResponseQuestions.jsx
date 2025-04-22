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

const EASurveyResponseQuestions = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const theme = useTheme();
  const [surveyTypeId, setSurveyTypeId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showIdVerification, setShowIdVerification] = useState(true);
  const [staffid, setstaffid] = useState("");
  const [showOtpScreen, setshowOtpScreen] = useState(false);
  const [showDepartmentSelection, setShowDepartmentSelection] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [otpScreenData, setOtpScreenData] = useState(null);
  const { userId, surveyId } = useParams();


  const fetchSurveyData = async (surveyTypeId,designationId) => {
    
    try {
      const res = await dispatch(
        getSurveyById({
          surveyId: surveyId,
          surveyTypeId: surveyTypeId,
          // designationId: desginationAndSurveyTypeId.designationId,
          designationId: 1,
        })
      );
      setData(res?.payload);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendIdParent = (value) => {
    setstaffid(value);
  };



  const handleNext = () => {
    if (activeStep < data?.competencies?.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(data.competencies.length);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
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
    if (data.surveyTypeId === 1) {
      // For surveyTypeId 1, directly set the designation and surveyTypeId
    
      fetchSurveyData(data.surveyTypeId, data.designationId);
      setShowIdVerification(false);
    } else if (data.surveyTypeId === 2) {
      // For surveyTypeId 2, show department selection screen
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

    
    fetchSurveyData( otpScreenData.surveyTypeId,selectedEmployee.designationId);
    setShowDepartmentSelection(false);
    setShowIdVerification(false);
  };

  // if (!data) {
  //   return <Loader />;
  // }

  if (showIdVerification) {
    return !showOtpScreen ? (
      <EASurvey
        setstaffid={setstaffid}
        showOtpScreen={setshowOtpScreen}
        sendIdParent={sendIdParent}
      />
    ) : showOtpScreen ? (
      <OtpVerifyScreen
        stepUPSendValue={handleIdVerified}
        getEAsurveydata={getOtpScreenData}
        staffid={staffid}
      />
    ) : (
      ""
    );
  }

  if (showDepartmentSelection && otpScreenData) {
    return (
      <div className="department-selection-screen">
        <h2>Select Department</h2>
        <div className="department-list">
          {otpScreenData.departments.map((dept) => (
            <button
              key={dept}
              onClick={() => handleDepartmentSelect(dept)}
              className={selectedDepartment === dept ? "selected" : ""}
            >
              {dept}
            </button>
          ))}
        </div>

        {selectedDepartment && (
          <>
            <h3>Select Employee from {selectedDepartment}</h3>
            <div className="employee-list">
              {otpScreenData.employees
                .filter((emp) => emp.department === selectedDepartment)
                .map((emp) => (
                  <div
                    key={emp.id}
                    className={`employee-card ${
                      selectedEmployee?.id === emp.id ? "selected" : ""
                    }`}
                    onClick={() => handleEmployeeSelect(emp)}
                  >
                    <h4>{emp.name}</h4>
                    <p>Department: {emp.department}</p>
                  </div>
                ))}
            </div>
            <button onClick={handleEmployeeSubmit} disabled={!selectedEmployee}>
              Submit Selection
            </button>
          </>
        )}
      </div>
    );
  }

  if (activeStep === data?.competencies?.length) {
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

  const currentCompetency = data?.competencies[activeStep];
    if (!data) {
    return <Loader />;
  }
  return (
    <div className="">
      <div className="d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4">
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
        </div>
      </div>
    </div>
  );
};

export default EASurveyResponseQuestions;
