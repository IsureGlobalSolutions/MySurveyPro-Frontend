import React from 'react'
import LunchServey from '../../../assets/dashboredsvg/launch-servey.png'
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import { useDispatch } from 'react-redux'
import { LaunchedSurveysStatusApi, LaunchSurveyApi } from '../../../Redux/slice/surveySlice'
import toast from 'react-hot-toast'
import { useState } from 'react'
import './startsurvey.css'
const LunchSurvey = ({setstepper,selectedFilesArray,surveyId}) => {
  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch();

  const launchSurvey= ()=>{
    setisLoading(true)
    if(selectedFilesArray.length>0 && surveyId){
      let params = { uniqueFileNames: selectedFilesArray };

      if (surveyId === 1 || surveyId === 2 || surveyId === 3) {
        params.surveyId = surveyId;
      } else {
        params.customSurveyId = surveyId;
      }
    dispatch(LaunchSurveyApi(params)).then((res)=>{
if(res?.payload?.isSuccess===true){
  toast.success(res?.payload?.alertMessage)
  setstepper(5)
  setisLoading(false)
  // dispatch(LaunchedSurveysStatusApi())
}
else{
  toast.error("some thing went wrong please try agian!")
  setisLoading(false)
}
    })
     
    }

  }
  return (
   <>
      <div className="shadow rounded-4 bg-white m-2 w-100 d-flex justify-content-center py-5">
        <div className="launch-survey text-center">
          <img className='img-fluid 'style={{width:"400px"}} src={LunchServey} alt="" />
            <h3 className='launch-survey-text'>Are you agree with the detailed survey? 
            Launch Now.</h3>
            
            <div className="d-flex justify-content-center">
                <WebsiteButton className='mt-3' type='button' disabled={isLoading} onClick={launchSurvey}>
                {isLoading? 'please Wait':'Launch Survey'}
            </WebsiteButton>
            </div>
           

        </div>
      </div>
   </>
  )
}

export default LunchSurvey