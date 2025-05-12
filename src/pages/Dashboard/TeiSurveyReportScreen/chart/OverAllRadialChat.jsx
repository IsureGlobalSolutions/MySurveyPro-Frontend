import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-apexcharts';
import { RadialBarChart } from '../../../../components/cartsComponents/RadialBarChart';
import Loader from '../../../../components/plugins/Loader';
import '../Report.css'

const OverAllRadialChat = () => {
const dispatch =useDispatch();
const [isLoading, setisLoading] = useState(false)
const [overAllScore, setoverAllScore] = useState(0)
const chartRef = useRef(null); 
const{overAllTEISurveyReport}=useSelector((state)=>state.teiSurvey)

const getColor = () => {
  if (overAllTEISurveyReport?.overallScore >= 90) return "#045f03"; // Dark green
  if (overAllTEISurveyReport?.overallScore >= 80) return "#62c109"; // Light green
  if (overAllTEISurveyReport?.overallScore >= 70) return "#8cc409"; // Yellow-green
  if (overAllTEISurveyReport?.overallScore >= 60) return "#d8dc07"; // Yellow
  if (overAllTEISurveyReport?.overallScore >= 50) return "#dc9207"; // Orange
  if (overAllTEISurveyReport?.overallScoreore >= 40) return "#dc7207"; // Dark orange
  if (overAllTEISurveyReport?.overallScore < 40) return "#FF0000"; // Red
  return "#FF0000"; // Default to red for undefined scores
};
const color = getColor();

     let chartValues = RadialBarChart(overAllTEISurveyReport?.overallScore, color);

  return (
    <>
     <div className="table-card-background ">
 <div className="d-flex justify-content-between">
        <div className=" d-flex align-items-center m-0">
           <p className='table-heading m-0 pb-3'>Over All Report </p>
            
        </div>
        <div className="d-flex align-items-center">
          
 
    </div>
    </div>
    <hr  className='m-1'/>
    <div className="" ref={chartRef} >
    {
             isLoading?  
             <div className="loader-div d-flex justify-content-center align-items-center h-100">
              <Loader/>
               </div> 
               :
         <Chart 
            options={chartValues}
            series={chartValues?.series}
            type="radialBar"
            // height='320'

           
          /> 
    }
    </div>
     
    </div>
    </>
  )
}

export default OverAllRadialChat