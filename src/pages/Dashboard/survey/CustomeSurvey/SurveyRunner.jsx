import React, { useEffect, useState } from "react";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";

export default function SurveyRunner({ onComplete }) {
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
   
    const storedJson = window.localStorage.getItem("survey-json");
    if (storedJson) {
      const surveyJson = JSON.parse(storedJson);
      const surveyModel = new Model(surveyJson);

     
      const storedThemeJson = window.localStorage.getItem("survey-theme-json");
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
  }, []);

  const handleComplete = (survey) => {
    console.log("User responses:", survey.data);
    onComplete(survey.data); // Send responses to parent or backend
  };

  if (!survey) { 
    return <div>No survey data available to launch.</div>;
 }

  return <Survey model={survey} onComplete={handleComplete} />;
}
