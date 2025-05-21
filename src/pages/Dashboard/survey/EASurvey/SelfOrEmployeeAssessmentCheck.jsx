import React, { useState } from "react";
import "../TEISurvey/TEISurvey.css";
import img1 from "../../../../assets/Q12survey/Q12surveystepperimg.png";
import InputField from "../../../../components/mySurveyProInput/InputField";
import { set, useForm } from "react-hook-form";
import WebsiteButton from "../../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import { useNavigate, useParams } from "react-router-dom";
import { getstaffid } from "../../../../Redux/slice/authSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";
const SelfOrEmployeeAssessmentCheck = ({surveyTypeId}) => {
  // const surveyId= useSelector((state)=>state.user.selectedSurveyId)
  const dispatch = useDispatch();
const [assessmentValue, setassessmentValue] = useState(null)
const handleAssessmentCheck=()=>{
    if(!assessmentValue){
        toast.error("Please select any choice")
        return
    }
    surveyTypeId(assessmentValue)
}

  return (
    <div className="Q12-section d-flex justify-content-center align-items-center p-5">
      <div className="container">
        <div className="stepper row ">
          <div className="col-md-6 p-5 mt-3">
            <div className="text">
              <h1 className="survey-start-welcome ">Assessment Choices</h1>
              <h1 className="survey-start-tagline">
                {" "}
                Competency Assessment (CA) Survey
              </h1>
              <p className="survey-tage-text">
                What you want to assess
              </p>
            </div>
            <div className="g-4 mt-4 ">
           
                <div className="my-3">
               <FormControlLabel
  sx={{ backgroundColor: "transparent" }}
  required
  control={
    <Checkbox
      checked={assessmentValue === 1}
      onChange={(e) => setassessmentValue(e.target.checked ? 1 : null)}
    />
  }
  label="Want to assess my self"
/>
                </div>
                <div className="my-3">
                 <FormControlLabel
  sx={{ backgroundColor: "transparent" }}
  required
  control={
    <Checkbox
      checked={assessmentValue === 2}
      onChange={(e) => setassessmentValue(e.target.checked ? 2 : null)}
    />
  }
  label="Want to assess my employees"
/>
                </div>
                <div className=" col-md-12 t-4">
                  <WebsiteButton
                    style={{ width: "350px" }}
                type="button"
                onClick={handleAssessmentCheck}
                   
                  >
                    Next
                  </WebsiteButton>
                </div>
             
            </div>
          </div>
          <div className="col-md-6  mt-4 d-flex justify-content-end">
            <img
              src={img1}
              style={{ width: "500px" }}
              alt="image"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfOrEmployeeAssessmentCheck;
