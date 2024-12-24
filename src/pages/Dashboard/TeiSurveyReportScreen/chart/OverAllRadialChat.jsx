import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-apexcharts';
import { RadialBarChart } from '../../../../components/cartsComponents/RadialBarChart';
import Loader from '../../../../components/plugins/Loader';


const OverAllRadialChat = () => {
const dispatch =useDispatch();
const [isLoading, setisLoading] = useState(false)
const [overAllScore, setoverAllScore] = useState(0)
console.log("🚀 ~ OverAllRadialChat ~ overAllScore:", overAllScore)
const chartRef = useRef(null); 
const{overAllTEISurveyReport}=useSelector((state)=>state.teiSurvey)


     let chartValues = RadialBarChart(overAllTEISurveyReport?.overallScore);

  return (
    <>
     <div className="age-card rounded-3 border p-3 shadow bg-white">
 <div className="d-flex justify-content-between">
        <div className="title d-flex align-items-center m-0">
            <div className=""><p className='m-0 pb-3'>Over All Report </p></div>
            
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