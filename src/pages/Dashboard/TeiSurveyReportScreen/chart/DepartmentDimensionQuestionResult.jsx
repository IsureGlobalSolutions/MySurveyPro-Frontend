import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-apexcharts';
import Loader from '../../../../components/plugins/Loader';
import { SingleBarChartData } from '../../../../components/cartsComponents/SingleBarChartData';
import { Navbarvalue } from '../../../../context/NavbarValuesContext';

import '../Report.css'
const DepartmentDimensionQuestionResult = () => {
const dispatch =useDispatch();
const [isLoading, setisLoading] = useState(false)
const [overAllScore, setoverAllScore] = useState(0)
const chartRef = useRef(null);
const { selectedDashboardValues } = Navbarvalue()
const [departmentList, setdepartmentList] = useState([])
const {listOfDepartments}=useSelector((state)=>state.survey)
  const {  userSingleDimensionForSingleDepartmentReportList } = useSelector((state) => state.teiSurvey);



  useEffect(()=>{
    
 
   if(userSingleDimensionForSingleDepartmentReportList?.data?.length>0){
 setResponseDataInTable(userSingleDimensionForSingleDepartmentReportList?.data)
   }
 
    

  
  },[userSingleDimensionForSingleDepartmentReportList])


  const setResponseDataInTable=(data)=>{
    setisLoading(true)
    const chartData = data?.map((item) => {
    
    // const [key, value] = Object.entries(dimension)[0];
    
    return {
      x: item?.teiProperties?.RecipientName,
      y: item?.teiDimensionResult[0]?.teiDimension?.Result
    };
  });
  setoverAllScore(chartData)
  setisLoading(false)
  }

  const colors = userSingleDimensionForSingleDepartmentReportList?.data?.recipientTEIResults?.map((recipient) => {
    
    const value = recipient.teiDimensionResult[0]?.teiDimension?.Result;
    if (value >= 90) return "#045f03"; 
    if (value <= 90 && value>=80) return "#62c109"; 
    if (value <= 80 && value>=70) return "#8cc409"; 
    if (value <= 70 && value>=60) return "#d8dc07"; 
    if (value <= 60 && value>=50) return "#dc9207"; 
    if (value <= 50 && value>=40) return "#dc7207"; 
    if (value <= 40) return "#FFFF00"; // Yellow
    return "#FF0000"; // Red
  });
  

   let chartValues = SingleBarChartData(overAllScore);

   

  return (
    <>
    <div className="table-card-background  ">
     <div className="age-card ">
 <div className="d-flex justify-content-between">
        <div className=" d-flex align-items-center m-0">
        <p className='m-0 pb-3 table-heading'>Department report for a dimension Chart</p>
            
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
    </div>
    
    </>
  )
}

export default DepartmentDimensionQuestionResult