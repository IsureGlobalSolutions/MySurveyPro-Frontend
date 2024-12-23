import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Chart from 'react-apexcharts';
import { RadialBarChart } from '../../../../components/cartsComponents/RadialBarChart';
import Loader from '../../../../components/plugins/Loader';


const OverAllRadialChat = () => {
const dispatch =useDispatch();
const [reportValues, setreportValues] = useState([82])
const [isLoading, setisLoading] = useState(false)
const chartRef = useRef(null); 

  const chartValues = RadialBarChart(reportValues);

// useEffect(() => {
//     dispatch()
// }, [])
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