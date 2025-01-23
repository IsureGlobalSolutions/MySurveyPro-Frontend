

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
          { label: "File Data" },
          { label: "Survey Confirmation" },
          { label: "Launch Survey" },
          { label: "Summary" },
        ]}
        activeStep={startSurveyStepper - 1} // Adjust index for 0-based Stepper
        styleConfig={{
          activeBgColor: "rgb(17, 24, 39)", // Red for active step
          completedBgColor: "#e4844c", // Blue for completed step
          inactiveBgColor: "#bdbdbd", // Orange for inactive step
          size: "2rem", // Adjust size of step circles
          circleFontSize: "1.2rem", // Font size for step numbers
          fontWeight: "bold",
          borderColor: '#eaeaf0',
          borderTopWidth: 3,         
        }}
        stepNumberComponent={(stepNumber) => `0${stepNumber}`} // Adds leading zero to step numbers
        connectorStyleConfig={{
          activeColor: "#000000", // Dark color for active connector line
          completedColor: "red", // Dark color for completed connector line
          inactiveColor: "#dcdcdc", // Light color for inactive connector line
          size: 3,
          // Line thickness
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
