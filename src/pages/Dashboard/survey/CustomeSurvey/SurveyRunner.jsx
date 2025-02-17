import React, { useEffect, useState } from "react";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { useParams } from "react-router-dom";
import { customsurveyresponse } from "../../../../Redux/slice/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function SurveyRunner({ onComplete , customdata , data , staffid}) {
  const [survey, setSurvey] = useState(null);
  const {  surveyId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedJson = data.surveyJsonData;

    if (storedJson) {
      const surveyJson = JSON.parse(storedJson);
      const surveyModel = new Model(surveyJson);
      surveyModel.onAfterRenderPage.add((sender, options) => {
        const completeButton = options.htmlElement.querySelector(".sv-action");
        if (completeButton) {
          completeButton.style.display = "none";
        }
      });
      if (data?.surveyThemeJsonData) {
        try {
          const savedTheme = JSON.parse(data?.surveyThemeJsonData);
          surveyModel.applyTheme(savedTheme);
          console.log("Applied saved theme:", savedTheme);
        } catch (error) {
          console.error("Error parsing theme JSON from localStorage:", error);
        }
      }
     
      setSurvey(surveyModel);
      console.log("Loaded survey JSON from localStorage:", surveyJson);
    } else {
      console.error("No survey JSON found in localStorage.");
    }
  }, [customdata,  ]);

  const handleComplete = (surveyInstance) => {
    console.log("🚀 ~ handleComplete ~ surveyInstance:", surveyInstance.data)
    if (!surveyInstance.data || Object.keys(surveyInstance.data).length === 0) {
      toast.error("Please fill all fields");
      return; 
    }
    const surveyPayload = {
      surveyId: surveyId,
      surveyResponseJsonData: JSON.stringify(surveyInstance.data),
      recepientId:staffid,
    };
    console.log("🚀 ~ handleComplete ~ surveyPayload:", surveyPayload);
    dispatch(customsurveyresponse(surveyPayload))
      .then((res) => {
        if (res?.payload?.isSuccess=== true) {
          toast.success(res?.payload?.alertMessage);
          console.log("🚀 ~ .then ~ res:", res?.payload)
          onComplete(surveyInstance.data);
        } 
  })
  };

  
  if (!survey) { 
    return <div>No survey data available to launch.</div>;
 }

  return <Survey model={survey} onComplete={handleComplete} />;
}
