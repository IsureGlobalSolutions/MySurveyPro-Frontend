import React, { useEffect, useState } from "react";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Modal } from 'react-bootstrap'
import Loader from '../../../../components/plugins/Loader'

const PreviewModalOfCustomSurvey = ({Viewshow, handleCloseViewdata , surveyJson}) => {
      const [survey, setSurvey] = useState(null);

    useEffect(() => {
   
        if (surveyJson) {
          const surveyModel = new Model(surveyJson);
          console.log("🚀 ~ useEffect ~ surveyModel:", surveyModel)
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
          surveyModel.onAfterRenderPage.add((sender, options) => {
            const actionButtons = options.htmlElement.querySelectorAll(".sv-action");
            actionButtons.forEach((btn) => {
              btn.style.display = "none";
            });
          });
          setSurvey(surveyModel);
          console.log("Loaded survey JSON from localStorage:", surveyJson);
        } else {
          console.error("No survey JSON found in localStorage.");
        }
      }, [surveyJson]);
    
  return (
    <Modal
    show={Viewshow}
    onHide={handleCloseViewdata}
    size="xl"
    className=""
  >
    <button
      type="button"
      className="btn-close "
      aria-label="Close"
      style={{
        position: "absolute",
        top: "8px",
        right: "13px",
        zIndex: "1051",
      }}
      onClick={handleCloseViewdata}
    />


    <Modal.Body>
        <div className="my-2">
              {  !survey?   <div className="d-flex justify-content-center"><Loader/></div>
  
:  
  <Survey model={survey}  />
}
        </div>


 
  
      
    </Modal.Body>
  </Modal>
  )
}

export default PreviewModalOfCustomSurvey