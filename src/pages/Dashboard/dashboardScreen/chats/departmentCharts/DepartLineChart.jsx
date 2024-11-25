


import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts';

import Tooltip from 'react-bootstrap/Tooltip';

import { FunnelChartData } from '../../../../../components/cartsComponents/FunnelChartData';
import { Navbarvalue } from '../../../../../context/NavbarValuesContext';
import { useDispatch, useSelector } from 'react-redux';
import { getOverAllDepartmentReport } from '../../../../../Redux/slice/surveySlice';
import DropdownButton from '../../../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { LineChartData } from '../../../../../components/cartsComponents/LineChartData';

const listOfResponseReport=[
  {name:'Actively Engaged'},
  {name:'Actively Disengaged'},
 { name:'Not Engaged'}
]
const DepartLineChart = () => {

const [reportValues, setreportValues] = useState()
console.log("🚀 ~ DepartFunnelChart ~ reportValues:", reportValues)
const [selectedReport, setselectedReport] = useState('Actively Engaged')
  console.log("🚀 ~ DepartFunnelChart ~ selectedReport:", selectedReport)
  const chartValues = LineChartData(reportValues);
  const [getAllReportData, setgetAllReportData] = useState()


const {selectedDashboardValues}=Navbarvalue()

const { paymentStatus } = useSelector((state) => state.survey)

const dispatch = useDispatch()

const showSelectedValues=()=>{

  dispatch(getOverAllDepartmentReport({surveyId:selectedDashboardValues?.survey?.id}))
.then((res) => {

SetReportValueHandler(res?.payload,selectedReport)
setgetAllReportData(res?.payload)
 
}) 



}

useEffect(() => {
if(paymentStatus==='paid' && selectedDashboardValues?.survey?.id){


 showSelectedValues()

}


}, [paymentStatus, selectedDashboardValues?.survey?.id])


const SetReportValueHandler = (data,selectedReport) => {
if (Array.isArray(data) && data.length > 0) {
  // Initialize the structure for the series
  const transformedData = {
      name: selectedReport,
      data: [],
      group: "apexcharts-axis-0",
      zIndex: 0,
    }
   
  

  // Loop through the data to populate x and y values
  data.forEach((item) => {

    const department = item.department;
    const responsesReport = item.responsesReport;

    if (responsesReport) {
      transformedData.data.push({
        x: department,
        y: responsesReport[`${selectedReport}`] || 0,
      });

    
    }
  });

  // Return the transformed data
 setreportValues(transformedData)
}

return [];
};




useEffect(()=>{
if(selectedDashboardValues?.department){


showSelectedValues(selectedDashboardValues?.department)
}

},[selectedDashboardValues?.department])


const handleSelect=(data)=>{
setselectedReport(data?.name)
SetReportValueHandler(getAllReportData,data?.name)

}
  return (
    <>
    <div className="age-card rounded-3 border p-3 shadow bg-white">
 <div className="d-flex justify-content-between">
        <div className="title d-flex align-items-center m-0">
            <div className=""><p className='m-0 pb-3'>Department </p></div>
            
        </div>
        <div className="d-flex align-items-center w-100 justify-content-end">
    
    <DropdownButton items={listOfResponseReport} onSelect={handleSelect} initialValue='Actively Engaged'/>
 
    </div>
    </div>
    <hr  className='m-1'/>
    <div className=""  >
         <Chart 
            options={chartValues}
            series={chartValues?.series}
            type="line"
            height='320'
          /> 
    </div>
     
    </div>
    
    </>
  )
 
}

export default DepartLineChart