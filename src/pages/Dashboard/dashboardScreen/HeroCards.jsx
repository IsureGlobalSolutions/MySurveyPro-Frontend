import React, { useEffect } from 'react'
import TotalSurvey from '../../../assets/dashboredsvg/total-survey.svg?react'
import ResponseSurvey from '../../../assets/dashboredsvg/response-survey.svg?react'
import NotResponseSurvey from '../../../assets/dashboredsvg/not-response-survey.svg?react'
import PendingSurvey from '../../../assets/dashboredsvg/pending-survey.svg?react'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalNumberOfRespondent } from '../../../Redux/slice/surveySlice'
import {Navbarvalue} from '../../../context/NavbarValuesContext';

const HeroCards = () => {

    const dispatch = useDispatch()
    const{getTotalNumberOfRespondentValue, isLoading}=useSelector((state)=>state.survey)
    const {selectedDashboardValues,DashboardStateHandler}=Navbarvalue()

    const { paymentStatus } = useSelector((state) => state.survey)


  useEffect(()=>{
    if(paymentStatus==='paid' && selectedDashboardValues?.survey?.id){
         dispatch(getTotalNumberOfRespondent(selectedDashboardValues?.survey?.id))
    }
   
  },[selectedDashboardValues?.survey?.id])
  return (
   <>
    <div className="border shadow py-3 px-2  my-3 mx-2 rounded-3 bg-white">
         <div className="row  m-0">
   
    <div className="col-md-3 mb-md-0 mb-3">
        <div className="total-survey-card ">
           <div className="d-flex py-4 px-3 justify-content-between">
            <div className="total-suvrvey-content">
                <p className='my-3 text-white fw-semibold'>{getTotalNumberOfRespondentValue?.totalReceiver? getTotalNumberOfRespondentValue.totalReceiver: 0}</p>
                <p className='text-white fw-semibold'>Total Surveys</p>
            </div>
            <div className="total-survey-icon d-flex justify-content-center align-items-center">
<TotalSurvey className='total-survey-icon'/>
            </div>
           </div>
        </div>
    </div>
    <div className="col-md-3 mb-md-0 mb-3">

    <div className="response-card">
           <div className="d-flex py-4 px-3 justify-content-between">
            <div className="response-content">
                <p className='my-3 text-white fw-semibold'>{getTotalNumberOfRespondentValue?.totalRespondents? getTotalNumberOfRespondentValue.totalRespondents: 0}</p>
                <p className='text-white fw-semibold'>Complete Survey</p>
            </div>
            <div className="response-icon d-flex justify-content-center align-items-center">
                  <ResponseSurvey className='response-survey-icon'/>
            </div>
           </div>
        </div>
    </div>
    <div className="col-md-3 mb-md-0 mb-3">
    <div className="not-response-card">
           <div className="d-flex py-4 px-3 justify-content-between">
            <div className="not-response-content">
                <p className='my-3 text-white fw-semibold'>{getTotalNumberOfRespondentValue?.pendingRespondents? getTotalNumberOfRespondentValue.pendingRespondents: 0}</p>
                <p className='text-white fw-semibold'>Not Yet Started </p>
            </div>
            <div className="not-response-icon d-flex justify-content-center align-items-center">
                <NotResponseSurvey className="not-response-survey-icon"/>
            </div>
           </div>
        </div>
    </div>
    <div className="col-md-3 mb-md-0 mb-3">
    <div className="pending-card">
           <div className="d-flex py-4 px-3 justify-content-between">
            <div className="pending-content">
                <p className='my-3 text-white fw-semibold'>{getTotalNumberOfRespondentValue?.incompleteRespondents? getTotalNumberOfRespondentValue.incompleteRespondents: 0}</p>
                <p className='text-white fw-semibold'>Inprogress</p>
            </div>
            <div className="pending-icon d-flex justify-content-center align-items-center">
                <PendingSurvey className="pending-survey-icon"/>
            </div>
           </div>
        </div>
    </div>
   </div>
    </div>
   </>
  )
}

export default HeroCards