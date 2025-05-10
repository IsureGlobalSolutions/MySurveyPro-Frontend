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
import { getOverAllDepartmentReport } from '../../../../../Redux/slice/surveySlice';
import Loader from '../../../../../components/plugins/Loader';
import '../../../TeiSurveyReportScreen/Report.css';

const DepartMultiBarChart = () => {
  const [reportValues, setreportValues] = useState()
  const [isLoading, setisLoading] = useState(false)

const chartValues = MultiBarChartData(reportValues?.xaxisValues,reportValues?.series);
const {selectedDashboardValues}=Navbarvalue()

const { paymentStatus } = useSelector((state) => state.survey)
const chartRef = useRef(null);  

const dispatch = useDispatch()

const showSelectedValues=()=>{
  setisLoading(true)

      dispatch(getOverAllDepartmentReport({surveyId:selectedDashboardValues?.survey?.id}))
 .then((res) => {
 
    SetReportValueHandler(res?.payload)
     
 }) 
 
 .finally(()=>{
  setisLoading(false)
 })

}

useEffect(() => {
if(selectedDashboardValues?.survey?.id && paymentStatus[selectedDashboardValues?.survey?.id].paymentStatus===true){


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
      chartData.xaxisValues.push(item.department);

      // Add respective response values to series
      chartData.series[0].data.push(item.responsesReport["Actively Engaged"]);
      chartData.series[1].data.push(item.responsesReport["Actively Disengaged"]);
      chartData.series[2].data.push(item.responsesReport["Not Engaged"]);
    });

    // Set the transformed data to state
    setreportValues(chartData);
    setisLoading(false)

  } else {
    console.error("Invalid data or empty array passed to SetReportValueHandler");
    setisLoading(false)
  }
};






  return (
    <>
    <div className="table-card-background">
 <div className="d-flex justify-content-between">
        <div className=" d-flex align-items-center m-0">
      <h6 className='m-0 pb-3 table-heading'>Department </h6>
            
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

export default DepartMultiBarChart