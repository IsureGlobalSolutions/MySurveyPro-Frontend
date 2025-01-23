import React, { useEffect, useState } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import WebsiteButton from "../../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/plugins/Loader";
const  SurveyCreatorWidget=()=> {
  const [creator, setCreator] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const initializeCreator = async () => {
      const creatorOptions = {
        showLogicTab: true,
        isAutoSave: true,
        showThemeTab: true, // Enable the Theme tab
      };

      const creatorInstance = new SurveyCreator(creatorOptions);

      // Load survey JSON from localStorage
      const localStorageJson = window.localStorage.getItem("survey-json");
      if (localStorageJson) {
        creatorInstance.JSON = JSON.parse(localStorageJson);
      }

      // Retrieve and apply the saved theme
      const savedThemeJson = window.localStorage.getItem("survey-theme-json");
      if (savedThemeJson) {
        try {
          const savedTheme = JSON.parse(savedThemeJson);
          creatorInstance.theme = savedTheme; // Directly apply the saved theme
          console.log("Applied saved theme:", savedTheme);
        } catch (error) {
          console.error("Error parsing theme JSON from localStorage:", error);
        }
      }

      // Save theme changes to localStorage
      creatorInstance.saveThemeFunc = (saveNo, callback) => {
        window.localStorage.setItem("survey-theme-json", JSON.stringify(creatorInstance.theme));
        callback(saveNo, true);
      };

      // Save survey JSON to localStorage
      creatorInstance.saveSurveyFunc = (saveNo, callback) => {
        window.localStorage.setItem("survey-json", creatorInstance.text);
        callback(saveNo, true);
      };

      setCreator(creatorInstance);
    };

    initializeCreator();
  }, []);

  if (!creator) {

    return (
      <>
      <div className="d-flex h-100 justify-content-center align-items-center">
          <Loader/>
      </div>
    
      </>
    )
  }

  return (
    <div className="h-100">
<div className="d-flex my-3 ms-3">
  <div className="back-move d-flex align-items-center gap-1">
    <div className="icon-body p-2 rounded-circle d-flex align-items-center justify-content-center bg-white border shadow">
        <IoArrowBackOutline  style={{fontSize:'25px'}} onClick={()=>navigate('/startsurvey')}/>
    </div>
  <div className="">
     <p className="m-0 fs-5">Back</p>
  </div>
   
  </div>
</div>
      <SurveyCreatorComponent creator={creator} />

      <div className="d-flex gap-3 justify-content-end py-3 me-2">
        <WebsiteButton
          
          onClick={() => {
            creator.saveSurvey();
          }}
        >
          Save Survey
        </WebsiteButton>
        <WebsiteButton
         
          onClick={() => {
            creator.showTestSurvey();
          }}
        >
          preview
        </WebsiteButton>
      </div>
    </div>
  );
}
export default SurveyCreatorWidget;