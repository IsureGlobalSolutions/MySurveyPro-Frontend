import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-apexcharts';
import Loader from '../../../../components/plugins/Loader';
import { SingleBarChartData } from '../../../../components/cartsComponents/SingleBarChartData';
import { getListOfCoumnProperty } from '../../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../../context/NavbarValuesContext';
import DropdownButton from '../../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { getDepartmentDimensionsTEISurveyReportApi } from '../../../../Redux/slice/teiSlice';

const DepartmentDimensionQuestionResult = () => {
const dispatch =useDispatch();
const [isLoading, setisLoading] = useState(false)
const [overAllScore, setoverAllScore] = useState(0)
const chartRef = useRef(null);
const { selectedDashboardValues } = Navbarvalue()
const [departmentList, setdepartmentList] = useState([])
const {listOfDepartments}=useSelector((state)=>state.survey)
  const { listOfDimensions, userSingleDimensionForSingleDepartmentReportList } = useSelector((state) => state.teiSurvey);



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


  

   let chartValues = SingleBarChartData(overAllScore);

   

  return (
    <>
     <div className="age-card rounded-3 border p-3 shadow bg-white">
 <div className="d-flex justify-content-between">
        <div className="title d-flex align-items-center m-0">
            <div className=""><p className='m-0 pb-3'>Department report for a dimension Chart</p></div>
            
        </div>
        {/* <div className="d-flex align-items-center">
        
                  {departmentList?.length>0? 
 <DropdownButton items={departmentList} listKeyName={'columnValue'} onSelect={handleSelectDepartment} selectionName={departmentList[0]?.columnValue}/>
 :''
}
         
  
 
    </div> */}
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

export default DepartmentDimensionQuestionResult