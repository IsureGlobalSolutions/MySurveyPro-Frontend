import React, { useEffect, useState } from "react";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { useParams } from "react-router-dom";

export default function SurveyRunner({ onComplete , customdata , data}) {
  const [survey, setSurvey] = useState(null);
  const {  surveyId } = useParams();

  useEffect(() => {
    const storedJson = data;
    console.log("🚀 ~ useEffect ~ storedJson:", storedJson)
    if (storedJson) {
      const surveyJson = JSON.parse(storedJson);
      const surveyModel = new Model(surveyJson);
      const storedThemeJson = window.localStorage.getItem("survey-theme-json");
      surveyModel.onAfterRenderPage.add((sender, options) => {
        const completeButton = options.htmlElement.querySelector(".sv-action");
        if (completeButton) {
          completeButton.style.display = "none";
        }
      });
      if (storedThemeJson) {
        try {
          const savedTheme = JSON.parse(storedThemeJson);
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
  }, [customdata]);

  const handleComplete = (survey) => {
    console.log("🚀 ~ handleComplete ~ survey:", survey.data)
    const surveyPayload ={
      surveyId: surveyId,
      surveyResponseJsonData: survey.data,
    }
    dispatch(customsurveyresponse(surveyPayload));
    onComplete(survey.data); 

  };

  if (!survey) { 
    return <div>No survey data available to launch.</div>;
 }

  return <Survey model={survey} onComplete={handleComplete} />;
}
