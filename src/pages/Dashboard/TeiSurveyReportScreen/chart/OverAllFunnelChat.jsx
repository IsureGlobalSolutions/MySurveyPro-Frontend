
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-apexcharts';
import Loader from '../../../../components/plugins/Loader';
import { FunnelChartData } from '../../../../components/cartsComponents/FunnelChartData';


const OverAllFunnelChat = () => {
  const dispatch = useDispatch();
  const [reportValues, setreportValues] = useState()
  const [isLoading, setisLoading] = useState(false)
  const chartRef = useRef(null);
  const { overAllTEISurveyReport } = useSelector((state) => state.teiSurvey)


  const chartValues = FunnelChartData(reportValues);

  useEffect(() => {

    if (Array.isArray(overAllTEISurveyReport?.overallTEIResults) && overAllTEISurveyReport?.overallTEIResults?.length > 0) {
  

      // Loop through the data to populate x and y values
      const transformedData = overAllTEISurveyReport?.overallTEIResults?.map((item) => ({

        y: item.score,
        x: item.name,

      }));


      // Create an array of colors based on AverageResult values
      const colors = overAllTEISurveyReport?.overallTEIResults?.map((recipient) => {
        const value = recipient.score;
        if (value >= 90) return "#045f03";
        if (value <= 90 && value >= 80) return "#62c109";
        if (value <= 80 && value >= 70) return "#8cc409";
        if (value <= 70 && value >= 60) return "#d8dc07";
        if (value <= 60 && value >= 50) return "#dc9207";
        if (value <= 50 && value >= 40) return "#dc7207";
        if (value <= 40) return "#FFFF00"; // Yellow
        return "#FF0000"; // Red
      });

      // Update state with both data and colors
      setreportValues({ name: 'Funnel', data: transformedData, colors });
      // Return the transformed data
      //  setreportValues(transformedData)
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
        <hr className='m-1' />
        <div className="" ref={chartRef} >
          {
            isLoading ?
              <div className="loader-div d-flex justify-content-center align-items-center h-100">
                <Loader />
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