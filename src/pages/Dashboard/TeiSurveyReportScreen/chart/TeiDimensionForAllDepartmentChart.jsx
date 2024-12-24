
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-apexcharts';
import Loader from '../../../../components/plugins/Loader';
import { SingleBarChartData } from '../../../../components/cartsComponents/SingleBarChartData';

const data = [
    {
      dimensionTeamAverages: [
        { MissonDriven: 76 },
        { RoleClarity: 81 },
        { Leadership: 82 },
        { Solidarity: 80 },
        { FeelGoodClimate: 83 },
        { Collaboration: 75 },
        { WowrdingOutLoud: 77 },
        { TensionProcessing: 71 },
        { TeamMuscle: 78 },
        { Infrastructure: 75 },
      ],
      overallTeamAverage: "78.0",
    },
  ];
  
const TeiDimensionForAllDepartmentChart = () => {
const dispatch =useDispatch();
const [isLoading, setisLoading] = useState(false)
const [overAllScore, setoverAllScore] = useState(0)
console.log("🚀 ~ OverAllRadialChat ~ overAllScore:", overAllScore)
const chartRef = useRef(null); 
// const{overAllTEISurveyReport}=useSelector((state)=>state.teiSurvey)


    


const chartData = data[0].dimensionTeamAverages.map((dimension) => {
    
    const [key, value] = Object.entries(dimension)[0];
    
    return {
      x: key.replace(/([A-Z])/g, ' $1').replace(/\s+/g, ' ').trim(), // Format key into readable labels
      y: value, // Use the value directly as the score
    };
  });
  
  console.log('chart data',chartData);
   let chartValues = SingleBarChartData(chartData);
  return (
    <>
     <div className="age-card rounded-3 border p-3 shadow bg-white">
 <div className="d-flex justify-content-between">
        <div className="title d-flex align-items-center m-0">
            <div className=""><p className='m-0 pb-3'>Team's TEI Dimension Score</p></div>
            
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
            type="bar"
            height={350}
            // height='320'

           
          /> 
    }
    </div>
     
    </div>
    </>
  )
}

export default TeiDimensionForAllDepartmentChart