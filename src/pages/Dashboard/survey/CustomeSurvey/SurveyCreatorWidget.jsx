import React, { useEffect, useState } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import WebsiteButton from "../../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import { IoArrowBackOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/plugins/Loader";
import {  addUpdateCustomSurveyApi, getCustomSurveyByIdApi } from "../../../../Redux/slice/customSurveySlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const  SurveyCreatorWidget=()=> {
  const [creator, setCreator] = useState(null);

  const selectedSurveyId = window.localStorage.getItem("selectedSurveyId");
  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} =useParams();




  useEffect(() => {
    const initializeCreator = async () => {
      const creatorOptions = {
        showLogicTab: true,
        isAutoSave: true,
        showThemeTab: true, 
      };
      const creatorInstance = new SurveyCreator(creatorOptions);
      
        const localStorageJson =localStorage.getItem("survey-json") || '';
        const savedThemeJson = localStorage.getItem("survey-theme-json") || '';
      if (localStorageJson) {
        creatorInstance.JSON = JSON.parse(localStorageJson);
      }
      if (savedThemeJson) {
        try {
          const savedTheme = JSON.parse(savedThemeJson);
          creatorInstance.theme = savedTheme; 
          console.log("Applied saved theme:", savedTheme);
        } catch (error) {
          console.error("Error parsing theme JSON from localStorage:", error);
        }
      }
      creatorInstance.saveThemeFunc = (saveNo, callback) => {
        window.localStorage.setItem("survey-theme-json", JSON.stringify(creatorInstance.theme));
        callback(saveNo, true);
      };
      creatorInstance.saveSurveyFunc = (saveNo, callback) => {
        window.localStorage.setItem("survey-jsonkffkfdfgjknfdngdjmfjm", creatorInstance.text);
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


    const saveSurveyInServer = async () => {
      setisLoading(true)
    if (!creator) {
      isLoading(false)
      return ;
    }
    const surveyName = JSON.parse(creator?.text)
    const surveyJson = JSON.stringify(creator?.text)
const updateSurveyId = window.localStorage.getItem("updata-survey-id")
const surveyThemeJsonData= JSON.stringify(creator?.theme);

dispatch(addUpdateCustomSurveyApi({
  id:updateSurveyId?updateSurveyId:null,
  surveyName: surveyName.title || 'Untitled Survey',
  surveyJsonData: surveyJson,
  surveyThemeJsonData,
}))
.then((res)=>{
 
  
  if(res?.payload?.isSuccess === true){
   toast.success(res?.payload?.alertMessage)
   window.localStorage.setItem("survey-json", '');
    window.localStorage.setItem("updata-survey-id", '');
    window.localStorage.setItem("selectedSurveyId", '');
    window.localStorage.setItem("survey-theme-json", '');
   navigate('/startsurvey')
    setisLoading(false)

  }
  else{
    toast.error(res?.payload)
    setisLoading(false)
  }
})

  }
  const moveBackHandler=()=>{
    navigate('/startsurvey')
    window.localStorage.setItem("survey-json", '');
    window.localStorage.setItem("updata-survey-id", '');
    window.localStorage.setItem("selectedSurveyId", '');
    window.localStorage.setItem("survey-theme-json", '');
  }
  return (
    <div className="h-100">
<div className="d-flex my-3 ms-3">
  <div className="back-move d-flex align-items-center gap-1">
    <div className="icon-body p-2 rounded-circle d-flex align-items-center justify-content-center bg-white border shadow" style={{cursor:'pointer'}}>
        <IoArrowBackOutline  style={{fontSize:'25px'}} onClick={moveBackHandler}/>
    </div>
  <div className="">
     <p className="m-0 fs-5">Back</p>
  </div>
   
  </div>
</div>
      <SurveyCreatorComponent creator={creator} />

      <div className="d-flex gap-3 justify-content-end py-3 me-2">
        <WebsiteButton
          
          onClick={saveSurveyInServer}
        >
         {isLoading?'Loading...':'Save Survey'}
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