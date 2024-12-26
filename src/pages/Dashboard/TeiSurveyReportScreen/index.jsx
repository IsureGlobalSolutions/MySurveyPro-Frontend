import React, { useEffect } from 'react'
import { Navbarvalue } from '../../../context/NavbarValuesContext'
import HeroCards from '../../../components/HeroCards'
import OverAllRadialChat from './chart/OverAllRadialChat'
import OverAllFunnelChat from './chart/OverAllFunnelChat'
import { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { overAllTeiSurveyReportApi } from '../../../Redux/slice/teiSlice'
import DepartmentAndDimensionTable from './DepartmentAndDimensionTable'
import UserDimensionsDataForAllDeparments from './UserDimensionsDataForAllDeparments'
import DimensionsAsRowsComponent from './DimensionsAsRowsComponent'
import TeiDimensionForAllDepartmentChart from './chart/TeiDimensionForAllDepartmentChart'
import TeiUserDimensionForSingleDepartmentChart from './chart/TeiUserDimensionForSingleDepartmentChart'
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice'
  
const index = () => {
      const { selectedDashboardValues, DashboardStateHandler } = Navbarvalue()
      const {listOfDepartments}=useSelector((state)=>state.survey)
      
      const dispatch = useDispatch();
useEffect(() => { 
  if(selectedDashboardValues?.survey?.id){
   dispatch(overAllTeiSurveyReportApi(selectedDashboardValues?.survey?.id))
    dispatch(getListOfCoumnProperty({surveyId:selectedDashboardValues?.survey?.id,columnProperty:"department"}))
  }
}, [selectedDashboardValues,dispatch]) 
  return (
   <>
   <HeroCards/>
   <div className="row m-0 p-0">

    <div className="col-md-6"> <OverAllFunnelChat/></div>
    <div className="col-md-6"><OverAllRadialChat/></div>
   
    
   </div>
   {listOfDepartments?.length>0 &&
   (
    <>
     <DepartmentAndDimensionTable/>

   <UserDimensionsDataForAllDeparments/>
   <TeiDimensionForAllDepartmentChart/>
   <DimensionsAsRowsComponent/>
   <TeiUserDimensionForSingleDepartmentChart/>
    </>
   )
  
   
   }
  
   </>
  )
}

export default index