
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-apexcharts';
import Loader from '../../../../components/plugins/Loader';
import { FunnelChartData } from '../../../../components/cartsComponents/FunnelChartData';


const OverAllFunnelChat = () => {
const dispatch =useDispatch();
const [reportValues, setreportValues] = useState()
const [isLoading, setisLoading] = useState(false)
const chartRef = useRef(null); 
const{overAllTEISurveyReport}=useSelector((state)=>state.teiSurvey)
console.log("🚀 ~ OverAllFunnelChat ~ overAllTEISurveyReport:", overAllTEISurveyReport)


  const chartValues = FunnelChartData(reportValues);

useEffect(() => {

    if (Array.isArray(overAllTEISurveyReport?.overallTEIResults) && overAllTEISurveyReport?.overallTEIResults?.length > 0) {
      // Initialize the structure for the series
      const transformedData = {
          name: 'overallTEResults',
          data: [],
          group: "apexcharts-axis-0",
          zIndex: 0,
        }
       
      
    
      // Loop through the data to populate x and y values
      overAllTEISurveyReport?.overallTEIResults?.forEach((item) => {
    
        const name = item.name;
        const score = item.score;
    
        // if () {
          transformedData?.data?.push({
            x: name,
            y: score || 0,
          });
    
        
        // }
      });
    
      // Return the transformed data
     setreportValues(transformedData)
     setisLoading(false)
    
    }
    
  
   
}, [overAllTEISurveyReport?.overallTEIResults?.length])





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