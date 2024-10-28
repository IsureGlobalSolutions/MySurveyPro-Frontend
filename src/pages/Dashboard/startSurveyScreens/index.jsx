import React, { useState } from 'react'
import HeroCards from '../dashboardScreen/HeroCards'
import UploadFile from './UploadFile'
import './startsurvey.css'
import LunchSurvey from './LunchSurvey'
import ThankYouLunchSurvey from './ThankYouLunchSurvey'
import SurveySelection from './SurveySelection'
import {Navbarvalue} from '../../../context/NavbarValuesContext'
const index = () => {
  const {startSurveyStepper,StapperHandler}=Navbarvalue()
  return (
   <>

   <HeroCards/>
   <div className="px-2">
    {startSurveyStepper===1?
<UploadFile setstepper={StapperHandler}/>
:
startSurveyStepper===2?
<SurveySelection setstepper={StapperHandler}/>
:
startSurveyStepper===3?
<LunchSurvey setstepper={StapperHandler}/>
:
<ThankYouLunchSurvey/>
}
   </div>

   
   </>
  )
}

export default index