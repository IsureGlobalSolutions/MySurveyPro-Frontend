import React, { useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import HeroCards from "../../../components/HeroCards";
import UploadFile from "./UploadFile";
import "./startsurvey.css";
import LunchSurvey from "./LunchSurvey";
import ThankYouLunchSurvey from "./ThankYouLunchSurvey";
import SurveySelection from "./SurveySelection";
import { Navbarvalue } from "../../../context/NavbarValuesContext";
import Filedata from "./Filedata";
import Surveylist from "../surveylist/Surveylist";
import Q12ReportScreen from "../../Dashboard/q12SruveyReportsScreen"
import TEIReportScreen from "../../Dashboard/TeiSurveyReportScreen"
import { useDispatch, useSelector } from "react-redux";


const Index = () => {
  const { startSurveyStepper, StapperHandler } = Navbarvalue();
  const Lunchsurveyid= useSelector((state)=>state.user.selectedSurveyId);
  const [uploadfilename, setuploadfilename] = useState();
  const [surveyId, setsurveyId] = useState();
  const [selectedFilesArray, setselectedFileName] = useState([])
    const { selectedDashboardValues, DashboardStateHandler } = Navbarvalue()
  


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
    <>
      <div className="px-2">
    
  <Stepper
    className="stepper-container"
          steps={[
            { label: "Select Survey" },
            { label: "Upload File" },
            { label: "File Data" },
            { label: "Survey Confirmation" },
            { label: "Launch Sarvey" },
            {label:"Summary"}
          ]}
          activeStep={startSurveyStepper - 1} // Adjust index for 0-based Stepper
          styleConfig={{
            activeBgColor: "#004E89",
            completedBgColor: "#1C98F7",
            inactiveBgColor: "#E0E0E0",
          }}
        />

        {startSurveyStepper === 1 ? (
      
          <Surveylist setstepper={StapperHandler} sendIdToParent={getSurveyIdHandle} />
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

          <LunchSurvey setstepper={StapperHandler}
           surveyId={surveyId} 
           selectedFilesArray={selectedFilesArray}/>

        ) : startSurveyStepper === 5 ? (

          <ThankYouLunchSurvey setstepper={StapperHandler} surveyId={Lunchsurveyid}/>
        ) : 
         ( 
         selectedDashboardValues?.survey?.name==='TEI'?
         <TEIReportScreen setstepper={StapperHandler} />
         :
         <Q12ReportScreen setstepper={StapperHandler} />
         
        )}
  
     
       
     
      </div>
    </>
  );
};

export default Index;
