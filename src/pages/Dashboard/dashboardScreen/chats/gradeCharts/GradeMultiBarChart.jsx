import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';

import { toPng } from 'html-to-image'; 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MultiBarChartData } from '../../../../../components/cartsComponents/MultiBarChartData';
import { Navbarvalue } from '../../../../../context/NavbarValuesContext';
import { useDispatch, useSelector } from 'react-redux';
import { getOverAllDepartmentReport, getOverAllGradeReport } from '../../../../../Redux/slice/surveySlice';
import Loader from '../../../../../components/plugins/Loader';
const GradeMultiBarChart = () => {
  const [reportValues, setreportValues] = useState()
  const [isLoading, setisLoading] = useState(false)

const chartValues = MultiBarChartData(reportValues?.xaxisValues,reportValues?.series);
const {selectedDashboardValues}=Navbarvalue()

const { paymentStatus } = useSelector((state) => state.survey)

const dispatch = useDispatch()

const showSelectedValues=()=>{
  setisLoading(true)

      dispatch(getOverAllGradeReport({surveyId:selectedDashboardValues?.survey?.id}))
 .then((res) => {
  console.log("🚀 ~ .then ~ res?.payload:", res?.payload)
    SetReportValueHandler(res?.payload)
     
 }) 
 .finally(()=>{
  setisLoading(false)
 })
   
 

}

useEffect(() => {
if(paymentStatus==='paid' && selectedDashboardValues?.survey?.id){


     showSelectedValues()
 
}


}, [paymentStatus, selectedDashboardValues?.survey?.id])



const SetReportValueHandler = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    // Initialize structure
    const chartData = {
      xaxisValues: [], // Holds department names
      series: [
        { name: "Actively Engaged", data: [] },
        { name: "Actively Disengaged", data: [] },
        { name: "Not Engaged", data: [] },
      ],
    };

    // Populate chartData
    data.forEach((item) => {
      // Add department name to xaxisValues
      chartData.xaxisValues.push(item.grade);

      // Add respective response values to series
      chartData.series[0].data.push(item.responsesReport["Actively Engaged"]);
      chartData.series[1].data.push(item.responsesReport["Actively Disengaged"]);
      chartData.series[2].data.push(item.responsesReport["Not Engaged"]);
    });

    // Set the transformed data to state
    setreportValues(chartData);
    setisLoading(false)

  } 
};




useEffect(()=>{
 if(selectedDashboardValues?.department){
  setisLoading(true)

   
showSelectedValues(selectedDashboardValues?.department)
 }

},[selectedDashboardValues?.department])



  return (
    <>
    <div className="age-card rounded-3 border p-3 shadow bg-white">
 <div className="d-flex justify-content-between">
        <div className="title d-flex align-items-center m-0">
            <div className=""><p className='m-0 pb-3'>Grades </p></div>
            
        </div>
        <div className="d-flex align-items-center">
  
 
    </div>
    </div>
    <hr  className='m-1'/>
    <div className=""  >
    {
             isLoading?  
             <div className="loader-div d-flex justify-content-center align-items-center h-100">
              <Loader/>
               </div> 
               :
         <Chart 
            options={chartValues}
            series={chartValues?.series}
            type="bar"
            height='320'

            // width="500"
          /> 
    }
    </div>
     
    </div>
    
    
    </>
  )
 
}

export default GradeMultiBarChart