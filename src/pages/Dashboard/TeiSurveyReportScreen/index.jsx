import React, { useEffect } from 'react'
import { Navbarvalue } from '../../../context/NavbarValuesContext'
import HeroCards from '../../../components/HeroCards'
import OverAllRadialChat from './chart/OverAllRadialChat'
import OverAllFunnelChat from './chart/OverAllFunnelChat'
import { use } from 'react'
import { useDispatch } from 'react-redux'
import { overAllTeiSurveyReportApi } from '../../../Redux/slice/teiSlice'

const index = () => {
      const { selectedDashboardValues, DashboardStateHandler } = Navbarvalue()

      const dispatch = useDispatch();
useEffect(() => { 
  if(selectedDashboardValues?.survey?.id){
   dispatch(overAllTeiSurveyReportApi(selectedDashboardValues?.survey?.id))
  }
}, [selectedDashboardValues,dispatch]) 
  return (
   <>
   <HeroCards/>
   <div className="row">

    <div className="col-md-6"> <OverAllFunnelChat/></div>
    <div className="col-md-6"><OverAllRadialChat/></div>
   
    
   </div>
   </>
  )
}

export default index