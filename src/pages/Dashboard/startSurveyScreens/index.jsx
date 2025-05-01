

import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import UploadFile from "./UploadFile";
import "./startsurvey.css";
import LunchSurvey from "./LunchSurvey";
import ThankYouLunchSurvey from "./ThankYouLunchSurvey";
import Surveylist from "../surveylist/Surveylist";
import { Navbarvalue } from "../../../context/NavbarValuesContext";
import Filedata from "./Filedata";
import Q12ReportScreen from "../../Dashboard/q12SruveyReportsScreen";
import TEIReportScreen from "../../Dashboard/TeiSurveyReportScreen";
import { useSelector } from "react-redux";

const Index = () => {
  const { startSurveyStepper, StapperHandler } = Navbarvalue();
  const Lunchsurveyid = useSelector((state) => state.user.selectedSurveyId);
  const [uploadfilename, setuploadfilename] = useState();
  const [surveyId, setsurveyId] = useState();
  const [selectedFilesArray, setselectedFileName] = useState([]);
  const { selectedDashboardValues } = Navbarvalue();

  const getSurveyIdHandle = (data) => {
    setsurveyId(data);
  };
  const getSelectedFiles = (data) => {
    setselectedFileName(data);
  };

  const getUploadFile = (data) => {
    setuploadfilename(data);
  };

  return (
    <div className="px-2">
   <Stepper
  className="stepper-container"
  steps={[
    { label: "Select Survey" },
    { label: "Upload File" },
    { label: "File Selection" },
    { label: "Survey Confirmation" },
    { label: "Launch Survey" },
    { label: "Summary" },
  ]}
  activeStep={startSurveyStepper - 1}
  styleConfig={{
    activeBgColor: "#0162DD",
    completedBgColor: "#0162DD", 
    inactiveBgColor: "#E9ECF0", 
    activeTextColor: "white",
    completedTextColor: "#242E39",
    inactiveTextColor: "#242E39",
    size: "45px",
    fontWeight: "bold",
    borderRadius: "50%", // Ensure circles are perfectly round
  }}
  connectorStyleConfig={{
    disabledColor:'#A1AEBE',
    activeColor: "blue", // Color when next step is active
    completedColor: "red", // Color when next step is completed
    borderColor: "black", // Color when next step is inactive
    size: 2, // Thickness of the connector line

  }}

/>



      {startSurveyStepper === 1 ? (
        <Surveylist
          setstepper={StapperHandler}
          sendIdToParent={getSurveyIdHandle}
        />
      ) : startSurveyStepper === 2 ? (
        <UploadFile
          setstepper={StapperHandler}
          sendFileNametoparent={getUploadFile}
          surveyId={surveyId}
        />
      ) : startSurveyStepper === 3 ? (
        <Filedata
          setstepper={StapperHandler}
          surveyId={surveyId}
          uploadfilename={uploadfilename}
          sendSelectedFilesToParent={getSelectedFiles}
        />
      ) : startSurveyStepper === 4 ? (
        <LunchSurvey
          setstepper={StapperHandler}
          surveyId={surveyId}
          selectedFilesArray={selectedFilesArray}
        />
      ) : startSurveyStepper === 5 ? (
        <ThankYouLunchSurvey
          setstepper={StapperHandler}
          surveyId={Lunchsurveyid}
        />
      ) : selectedDashboardValues?.survey?.name === "TEI" ? (
        <TEIReportScreen setstepper={StapperHandler} />
      ) : (
        <Q12ReportScreen setstepper={StapperHandler} />
      )}
    </div>
  );
};

export default Index;
