
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {StackChartData} from '../../../../../components/cartsComponents/StackChartData';
import { Navbarvalue } from '../../../../../context/NavbarValuesContext';
import { useDispatch, useSelector } from 'react-redux';
import { getOverAllDepartmentReport } from '../../../../../Redux/slice/surveySlice';
const DepartStackColumnChart = () => {
  const [reportValues, setreportValues] = useState()
 
const chartValues = StackChartData(reportValues);
    



const {selectedDashboardValues}=Navbarvalue()

const { paymentStatus } = useSelector((state) => state.survey)
const chartRef = useRef(null);  

const dispatch = useDispatch()

const showSelectedValues=()=>{

    dispatch(getOverAllDepartmentReport({surveyId:selectedDashboardValues?.survey?.id}))
.then((res) => {

  SetReportValueHandler(res?.payload)
   
}) 



}

useEffect(() => {
if(paymentStatus==='paid' && selectedDashboardValues?.survey?.id){


   showSelectedValues()

}


}, [paymentStatus, selectedDashboardValues?.survey?.id])


const SetReportValueHandler = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    // Initialize the structure for the series
    const transformedData = [
      {
        name: "Actively Engaged",
        data: [],
        group: "apexcharts-axis-0",
        zIndex: 0,
      },
      {
        name: "Actively Disengaged",
        data: [],
        group: "apexcharts-axis-0",
        zIndex: 0,
      },
      {
        name: "Not Engaged",
        data: [],
        group: "apexcharts-axis-0",
        zIndex: 0,
      },
    ];

    // Loop through the data to populate x and y values
    data.forEach((item) => {
      const department = item.department;
      const responsesReport = item.responsesReport;

      if (responsesReport) {
        transformedData[0].data.push({
          x: department,
          y: responsesReport["Actively Engaged"] || 0,
        });

        transformedData[1].data.push({
          x: department,
          y: responsesReport["Actively Disengaged"] || 0,
        });

        transformedData[2].data.push({
          x: department,
          y: responsesReport["Not Engaged"] || 0,
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

  return (
    <>
    <div className="age-card rounded-3 border p-3 shadow bg-white">
 <div className="d-flex justify-content-between">
        <div className="title d-flex align-items-center m-0">
            <div className=""><p className='m-0 pb-3'>Department </p></div>
            
        </div>
        <div className="d-flex align-items-center">

 
    </div>
    </div>
    <hr  className='m-1'/>
    <div className=""  >
         <Chart 
            options={chartValues}
            series={chartValues?.series}
            type="bar"
            height='320'

            // width="500"
          /> 
    </div>
     
    </div>
    
    </>
  )
 
}

export default DepartStackColumnChart