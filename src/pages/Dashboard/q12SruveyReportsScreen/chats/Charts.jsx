import React from 'react'
import AgeChart from './AgeChart'
import DepartmentCharts from './departmentCharts/DepartmentCharts'
import GenderChart from './GenderChart'
import SurveysPerformanceChart from './SurveysPerformanceChart'
import DesignationChart from './gradeCharts/DesignationChart'

const Charts = () => {
  return (
    <>
    <div className="row  m-0">
        <div className="col-md-4 mb-3">
          <AgeChart/>   
        </div>
        <div className="col-md-4 mb-3">
            <DepartmentCharts/>
        </div>
        <div className="col-md-4 mb-3">
            <DesignationChart/>
        </div>
        <div className="col-md-5 mb-3">

        <GenderChart/>
        </div>
        <div className="col-md-7">
            <SurveysPerformanceChart/>
        </div>
    </div>
   
    </>
  )
}

export default Charts