
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-apexcharts';
import Loader from '../../../../components/plugins/Loader';
import { SingleBarChartData } from '../../../../components/cartsComponents/SingleBarChartData';
import { getListOfCoumnProperty } from '../../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../../context/NavbarValuesContext';
import DropdownButton from '../../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { getDepartmentDimensionsTEISurveyReportApi } from '../../../../Redux/slice/teiSlice';


  
  
const TeiDimensionForAllDepartmentChart = () => {
const dispatch =useDispatch();
const [isLoading, setisLoading] = useState(false)
const [overAllScore, setoverAllScore] = useState(0)
const chartRef = useRef(null);
const { selectedDashboardValues } = Navbarvalue()
const [departmentList, setdepartmentList] = useState([])
const {listOfDepartments}=useSelector((state)=>state.survey)


// const{overAllTEISurveyReport}=useSelector((state)=>state.teiSurvey)


useEffect(() => { 
  if (selectedDashboardValues?.survey?.id) {
    if(listOfDepartments?.length>0){
         dispatch(getListOfCoumnProperty({surveyId:selectedDashboardValues?.survey?.id,columnProperty:"department"}))
    .then((res)=>{
      console.log('department',res?.payload);
      setdepartmentList(res?.payload)
      
    })
    }
    else{
        setdepartmentList(listOfDepartments)
    }

   
}

}, [])
  useEffect(()=>{
 
    setisLoading(true)
    dispatch(getDepartmentDimensionsTEISurveyReportApi(
      {surveyId:selectedDashboardValues?.survey?.id,
        columnProperty:departmentList[0]?.columnValue
  
      }))
      .then((res)=>{
  setResponseDataInTable(res?.payload)
      })

  
  },[])

    const handleSelectDepartment=(data)=>{
      setisLoading(true)
dispatch(getDepartmentDimensionsTEISurveyReportApi(
  {surveyId:selectedDashboardValues?.survey?.id,
    columnProperty:data?.columnValue

  }))
  .then((res)=>{
    setResponseDataInTable(res?.payload)
        })

  }
  const setResponseDataInTable=(data)=>{
    setisLoading(true)
    const chartData = data?.dimensionTeamAverages.map((dimension) => {
    
    const [key, value] = Object.entries(dimension)[0];
    
    return {
      x: key.replace(/([A-Z])/g, ' $1').replace(/\s+/g, ' ').trim(), // Format key into readable labels
      y: value, // Use the value directly as the score
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
            <div className=""><p className='m-0 pb-3'>Team's TEI Dimension Score</p></div>
            
        </div>
        <div className="d-flex align-items-center">
        
                  {departmentList?.length>0? 
 <DropdownButton items={departmentList} listKeyName={'columnValue'} onSelect={handleSelectDepartment} selectionName={departmentList[0]?.columnValue}/>
 :''
}
         
  
 
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