import React, { useState } from 'react'
import HeroCards from '../dashboardScreen/HeroCards'
import UploadFile from './UploadFile'
import './startsurvey.css'
import LunchSurvey from './LunchSurvey'
import ThankYouLunchSurvey from './ThankYouLunchSurvey'
import SurveySelection from './SurveySelection'
import {Navbarvalue} from '../../../context/NavbarValuesContext'
import Filedata from './Filedata'
const index = () => {
  const {startSurveyStepper,StapperHandler}=Navbarvalue();
  const [uploadfilename, setuploadfilename] = useState()
  const [surveyId, setsurveyId] = useState()
  const getSurveyIdHandle=(data) => {
    console.log("🚀 ~ getSurveyIdHandle ~ data:", data)
    setsurveyId(data);
    
  }
const getUploadFile =(data) => {
  console.log("🚀 ~ getUploadFile ~ data:", data)
 
  setuploadfilename(data);
}
  return (
   <>

   <HeroCards/>
   <div className="px-2">
    {startSurveyStepper===1?
    <SurveySelection setstepper={StapperHandler} sendIdToParent={getSurveyIdHandle}/>
:
startSurveyStepper===2?
  <UploadFile setstepper={StapperHandler} sendFileNametoparent={getUploadFile}  surveyId={surveyId} />
:
startSurveyStepper===3?
<Filedata  setstepper={StapperHandler} surveyId={surveyId} uploadfilename={uploadfilename}/>
:
startSurveyStepper===4?
<LunchSurvey setstepper={StapperHandler}/>
:
<ThankYouLunchSurvey/>
}
   </div>

   
   </>
  )
}

export default index