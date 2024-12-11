import React from 'react'
import LunchServey from '../../../assets/dashboredsvg/launch-servey.png'
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import { useDispatch } from 'react-redux'
import { LaunchSurveyApi } from '../../../Redux/slice/surveySlice'
import toast from 'react-hot-toast'
const LunchSurvey = ({setstepper,selectedFilesArray,surveyId}) => {
  const dispatch = useDispatch();

  const launchSurvey= ()=>{
    if(selectedFilesArray.length>0 && surveyId){
    dispatch(LaunchSurveyApi({surveyId, uniqueFileNames:selectedFilesArray})).then((res)=>{
if(res?.payload?.isSuccess===true){
  toast.success(res?.payload?.message)
  setstepper(5)
}
else{
  toast.error("some thing went wrong please try agian!")
}
    })
     
    }

  }
  return (
   <>
      <div className="shadow rounded-4 bg-white m-2 w-100 d-flex justify-content-center py-5">
        <div className="launch-survey text-center">
            <p className='h3 fw-light my-4'>Are you agree with the detailed survey? 
            Launch Now.</p>
            <img className='img-fluid' src={LunchServey} alt="" />
            <div className="d-flex justify-content-center">
                 <WebsiteButton type='button' onClick={launchSurvey}>
                Lunch Survey
            </WebsiteButton>
            </div>
           

        </div>
      </div>
   </>
  )
}

export default LunchSurvey