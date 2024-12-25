import React, { useEffect } from 'react'
import { Navbarvalue } from '../../../context/NavbarValuesContext'
import HeroCards from '../../../components/HeroCards'
import OverAllRadialChat from './chart/OverAllRadialChat'
import OverAllFunnelChat from './chart/OverAllFunnelChat'
import { use } from 'react'
import { useDispatch } from 'react-redux'
import { overAllTeiSurveyReportApi } from '../../../Redux/slice/teiSlice'
import DepartmentAndDimensionTable from './DepartmentAndDimensionTable'
import UserDimensionsDataForAllDeparments from './UserDimensionsDataForAllDeparments'
import DimensionsAsRowsComponent from './DimensionsAsRowsComponent'
import TeiDimensionForAllDepartmentChart from './chart/TeiDimensionForAllDepartmentChart'
import TeiUserDimensionForSingleDepartmentChart from './chart/TeiUserDimensionForSingleDepartmentChart'

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
   <div className="row m-0 p-0">

    <div className="col-md-6"> <OverAllFunnelChat/></div>
    <div className="col-md-6"><OverAllRadialChat/></div>
   
    
   </div>
   
   <DepartmentAndDimensionTable/>

   <UserDimensionsDataForAllDeparments/>
   <TeiDimensionForAllDepartmentChart/>
   <DimensionsAsRowsComponent/>
   <TeiUserDimensionForSingleDepartmentChart/>
   </>
  )
}

export default index