
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-apexcharts';
import Loader from '../../../../components/plugins/Loader';
import { FunnelChartData } from '../../../../components/cartsComponents/FunnelChartData';

const data = [
    {
      recipientTEIResults: [
        {
          teiProperties: {
            RecipientId: '1',
            RecipientName: 'Aisha Arif',
            TeamsName: 'QA',
            AverageResult: '82.5',
          },
          teiDimensionResult: [
            {
              teiDimension: {
                Id: '1',
                Text: 'MISSION DRIVEN',
                TeamsRating: '16',
                TEIReferenceScore: '20',
                Result: '80.0',
              },
            },
            {
              teiDimension: {
                Id: '2',
                Text: 'ROLE CLARITY',
                TeamsRating: '21',
                TEIReferenceScore: '25',
                Result: '84.0',
              },
            },
            {
              teiDimension: {
                Id: '3',
                Text: 'LEADERSHIP',
                TeamsRating: '18',
                TEIReferenceScore: '20',
                Result: '90.0',
              },
            },
            {
              teiDimension: {
                Id: '4',
                Text: 'SOLIDARITY',
                TeamsRating: '21',
                TEIReferenceScore: '25',
                Result: '84.0',
              },
            },
            {
              teiDimension: {
                Id: '5',
                Text: 'FEEL GOOD CLIMATE',
                TeamsRating: '20',
                TEIReferenceScore: '25',
                Result: '80.0',
              },
            },
          ],
        },
        {
          teiProperties: {
            RecipientId: '2',
            RecipientName: 'John Doe',
            TeamsName: 'DevOps',
            AverageResult: '85.0',
          },
          teiDimensionResult: [
            {
              teiDimension: {
                Id: '1',
                Text: 'MISSION DRIVEN',
                TeamsRating: '18',
                TEIReferenceScore: '20',
                Result: '90.0',
              },
            },
            {
              teiDimension: {
                Id: '2',
                Text: 'ROLE CLARITY',
                TeamsRating: '20',
                TEIReferenceScore: '25',
                Result: '80.0',
              },
            },
            {
              teiDimension: {
                Id: '3',
                Text: 'LEADERSHIP',
                TeamsRating: '17',
                TEIReferenceScore: '20',
                Result: '85.0',
              },
            },
            {
              teiDimension: {
                Id: '4',
                Text: 'SOLIDARITY',
                TeamsRating: '23',
                TEIReferenceScore: '25',
                Result: '92.0',
              },
            },
            {
              teiDimension: {
                Id: '5',
                Text: 'FEEL GOOD CLIMATE',
                TeamsRating: '19',
                TEIReferenceScore: '25',
                Result: '76.0',
              },
            },
          ],
        },
      ],
    },
  ];
  
const TeiUserDimensionForSingleDepartmentChart = () => {
const dispatch =useDispatch();
const [isLoading, setisLoading] = useState(false)
const chartRef = useRef(null); 
const [reportValues, setreportValues] = useState()



    
 // Prepare chart data
 const prepareChartData = (data) => {
    const transformedData = data[0].recipientTEIResults.map((recipient) => ({
      y: recipient.teiProperties.AverageResult, 
      x: recipient.teiProperties.RecipientName, 
    }));

    return {
      name: "Funnel",
      data: transformedData,
    };
  };
  const datafinal = prepareChartData(data)
  console.log("🚀 ~ TeiUserDimensionForSingleDepartmentChart ~ datafinal:", datafinal)

  // Generate chart values
  const chartValues = FunnelChartData(prepareChartData(data));
  return (
    <>
     <div className="age-card rounded-3 border p-3 shadow bg-white">
 <div className="d-flex justify-content-between">
        <div className="title d-flex align-items-center m-0">
            <div className=""><p className='m-0 pb-3'>Team Dimension Average Score</p></div>
            
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

export default TeiUserDimensionForSingleDepartmentChart