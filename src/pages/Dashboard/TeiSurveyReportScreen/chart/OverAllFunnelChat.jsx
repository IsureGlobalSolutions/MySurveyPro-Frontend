
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Chart from 'react-apexcharts';
import Loader from '../../../../components/plugins/Loader';
import { FunnelChartData } from '../../../../components/cartsComponents/FunnelChartData';

const payload={
    "overallScore": 78,
    "overallTEIResults": [
        {
            "name": "MISSION DRIVEN",
            "score": 76
        },
        {
            "name": "ROLE CLARITY",
            "score": 81
        },
        {
            "name": "LEADERSHIP",
            "score": 82
        },
        {
            "name": "SOLIDARITY",
            "score": 80
        },
        {
            "name": "FEEL GOOD CLIMATE",
            "score": 83
        },
        {
            "name": "COLLABORATION",
            "score": 75
        },
        {
            "name": "WORKING OUT LOUD",
            "score": 77
        },
        {
            "name": "TENSION PROCESSING",
            "score": 71
        },
        {
            "name": "TEAM MUSCLE",
            "score": 78
        },
        {
            "name": "INFRASTRUCTURE",
            "score": 75
        }
    ]
}
const OverAllFunnelChat = () => {
const dispatch =useDispatch();
const [reportValues, setreportValues] = useState()
const [isLoading, setisLoading] = useState(false)
const chartRef = useRef(null); 

  const chartValues = FunnelChartData(reportValues);

useEffect(() => {

    if (Array.isArray(payload?.overallTEIResults) && payload?.overallTEIResults?.length > 0) {
      // Initialize the structure for the series
      const transformedData = {
          name: 'overallTEResults',
          data: [],
          group: "apexcharts-axis-0",
          zIndex: 0,
        }
       
      
    
      // Loop through the data to populate x and y values
      payload?.overallTEIResults?.forEach((item) => {
    
        const name = item.name;
        const score = item.score;
    
        // if () {
          transformedData.data.push({
            x: name,
            y: score || 0,
          });
    
        
        // }
      });
    
      // Return the transformed data
     setreportValues(transformedData)
     setisLoading(false)
    
    }
    
  
   
}, [])





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
            series={chartValues.series}
            type="bar"
            // height={320}
            // width={400}

           
          /> 
    }
    </div>
     
    </div>
    </>
  )
}

export default OverAllFunnelChat