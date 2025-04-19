import { useEffect, useState } from "react";
import WebsiteButton from "../../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import img2 from "../../../../assets/Q12survey/Q12cardimage1.png";
import Box from "@mui/material/Box";
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
import "./TEItemplate.css";
import PreveiwCongratulationsurvey from "../mp12template/PreveiwCongratulationsurvey";
import TEItemplate from "./TEItemplate";
import img3 from "../../../../assets/Q12survey/Figon_Component.png";
const TEIPreviewQuestion = () => {
  const dispatch = useDispatch();
  const TEISurveyId = useSelector((state) => state.user.selectedSurveyId);
  const [data, setData] = useState([]);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(111);
  const fetchSurveyData = async (TEISurveyId) => {
    try {
      const res = await dispatch(getSurveyById({surveyId:TEISurveyId}));
      setData(res?.payload);
      console.log("res.payload", res.payload);
    } catch (error) {
      toast.error(error);
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
  if (!Array.isArray(data.dimensions) || data.dimensions.length === 0) {
    return <Loader />;
}
  const handleactivestep = (value) => {
    setActiveStep(value);
  };
  return (
    <>
      {activeStep === 111 ? (
        <TEItemplate stepUPSendValue={handleactivestep} />
      ) : activeStep === data?.dimensions.length ?  (
        <div className=" ">
          <div className="d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4">
            <div className="steppercard d-flex flex-column align-items-start w-100">
              <img
                type="button"
                src={img1}
                className="card-img img-fluid mb-3"
              />
              <div className="container">
                <div className="row">
                  <div className="col-12 p-5">
                    <div className="row">
                      <PreveiwCongratulationsurvey />
                    </div>
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
                                className="ms-2 me-2 dimension-text"
                                style={{ fontSize: "18px", color: "white" }}
                              >
                                {" "}
                                {data.dimensions[activeStep].dimensionId}
                              </span>
                              <span
                              className="dimension-text"
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
                                  <div className="question-question-nmber p-2 ps-3 dimension-text">
                                    Question {index + 1}
                                  </div>
                                  <div className="m-3 d-flex question-text gap-2">
                                    <span className="dimension-text">{index + 1}</span>
                                    <span>
                                      <span
                                      className="line-width"
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
                                    <h3 className="dimension-text">{question.questionText}</h3>
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
                                          type="checkbox"
                                          className="form-check-input-TEI mt-1"
                                          id={`choice${choice.choiceId}`}
                                        />
                                        <span className="ms-2 TEIcheckmark dimension-text">
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
                        <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 mui-button-resp">
          <MobileStepper
            variant="text"
            steps={data.dimensions.length}
            position="static"
            activeStep={activeStep}
            style={{ backgroundColor: "#d3d3d3" }}
            nextButton={
              <WebsiteButton
                size="small"
                onClick={handleNext}
                disabled={activeStep === data.dimensions.length - 1}
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
      )}
    </>
  );
};

export default TEIPreviewQuestion;
