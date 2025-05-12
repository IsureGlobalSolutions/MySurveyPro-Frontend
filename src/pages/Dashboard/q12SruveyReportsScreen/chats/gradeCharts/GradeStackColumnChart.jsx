
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {StackChartData} from '../../../../../components/cartsComponents/StackChartData';
import { Navbarvalue } from '../../../../../context/NavbarValuesContext';
import { useDispatch, useSelector } from 'react-redux';
import { getOverAllGradeReport } from '../../../../../Redux/slice/surveySlice';
import Loader from '../../../../../components/plugins/Loader';
import '../../../TeiSurveyReportScreen/Report.css';

const GradeStackColumnChart = () => {
  const [reportValues, setreportValues] = useState()
  const [isLoading, setisLoading] = useState(false)

const chartValues = StackChartData(reportValues);
    



const {selectedDashboardValues}=Navbarvalue()

const { paymentStatus } = useSelector((state) => state.survey)
const chartRef = useRef(null);  

const dispatch = useDispatch()

const showSelectedValues=()=>{
  setisLoading(true)

    dispatch(getOverAllGradeReport({surveyId:selectedDashboardValues?.survey?.id}))
.then((res) => {

  SetReportValueHandler(res?.payload)
   
}) 
.finally(()=>{
  setisLoading(false)
 })



}

useEffect(() => {
if(selectedDashboardValues?.survey?.id && paymentStatus[selectedDashboardValues?.survey?.id].paymentStatus===true ){


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
      const department = item.grade;
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
   setisLoading(false)

  }

  return [];
};




// useEffect(()=>{
// if(selectedDashboardValues?.department){

//   setisLoading(true)

// showSelectedValues(selectedDashboardValues?.department)
// }

// },[selectedDashboardValues?.department])

  return (
    <>
    <div className="table-card-background">
 <div className="d-flex justify-content-between">
        <div className=" d-flex align-items-center m-0">
      <h6 className='m-0 pb-3 table-heading'>Grades </h6>
            
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

export default GradeStackColumnChart