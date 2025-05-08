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
import DimensionDataForAllDepartment from './DimensionDataForAllDepartment'
import DepartmentDimensionQuestionResult from './chart/DepartmentDimensionQuestionResult'
import './Report.css'
const index = () => {
  const { selectedDashboardValues, DashboardStateHandler } = Navbarvalue()
  const { listOfDepartments } = useSelector((state) => state.survey)

  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedDashboardValues?.survey?.id) {
      dispatch(overAllTeiSurveyReportApi(selectedDashboardValues?.survey?.id))
      dispatch(getListOfCoumnProperty({ surveyId: selectedDashboardValues?.survey?.id, columnProperty: "department" }))
    }
  }, [selectedDashboardValues, dispatch])

  return (
    <>
    <div className="report-background">
        <HeroCards />
      <div className="col-md-12 m-0">
     <div className="d-flex gap-2 m-0 p-0 ">
        <div className="w-50 p-0 m-0 "><OverAllRadialChat /></div>
        <div className="w-50 p-0 m-0"> <OverAllFunnelChat /></div>

      </div>

      </div>
 
      {listOfDepartments?.length > 0 &&
        (
          <>
            <DimensionDataForAllDepartment />

            <DepartmentAndDimensionTable />
            <DepartmentDimensionQuestionResult />
            <DimensionsAsRowsComponent />
            <TeiDimensionForAllDepartmentChart />
            <UserDimensionsDataForAllDeparments />


            <TeiUserDimensionForSingleDepartmentChart />
          </>
        )


      }
    </div>
    

    </>
  )
}

export default index