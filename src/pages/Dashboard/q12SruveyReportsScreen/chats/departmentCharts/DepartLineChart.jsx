
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts';

import { Navbarvalue } from '../../../../../context/NavbarValuesContext';
import { useDispatch, useSelector } from 'react-redux';
import { getOverAllDepartmentReport } from '../../../../../Redux/slice/surveySlice';
import DropdownButton from '../../../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { LineChartData } from '../../../../../components/cartsComponents/LineChartData';
import Loader from '../../../../../components/plugins/Loader';
import '../../../TeiSurveyReportScreen/Report.css';

const listOfResponseReport=[
  {name:'Actively Engaged'},
  {name:'Actively Disengaged'},
 { name:'Not Engaged'}
]
const DepartLineChart = () => {

const [reportValues, setreportValues] = useState()
const [selectedReport, setselectedReport] = useState('Actively Engaged')
  const [isLoading, setisLoading] = useState(false)

  const chartValues = LineChartData(reportValues);
  const [getAllReportData, setgetAllReportData] = useState()


const {selectedDashboardValues}=Navbarvalue()

const { paymentStatus } = useSelector((state) => state.survey)

const dispatch = useDispatch()

const showSelectedValues=()=>{
  setisLoading(true)

  dispatch(getOverAllDepartmentReport({surveyId:selectedDashboardValues?.survey?.id}))
.then((res) => {

SetReportValueHandler(res?.payload,selectedReport)
setgetAllReportData(res?.payload)
 
}) 

.finally(()=>{
  setisLoading(false)
 })

}

useEffect(() => {
if(selectedDashboardValues?.survey?.id && paymentStatus[selectedDashboardValues?.survey?.id].paymentStatus===true){


 showSelectedValues()

}


}, [paymentStatus, selectedDashboardValues?.survey?.id])


const SetReportValueHandler = (data,selectedReport) => {
if (Array.isArray(data) && data.length > 0) {
  // Initialize the structure for the series
  const transformedData = {
      name: selectedReport,
      data: [],
      group: "apexcharts-axis-0",
      zIndex: 0,
    }
   
  

  // Loop through the data to populate x and y values
  data.forEach((item) => {

    const department = item.department;
    const responsesReport = item.responsesReport;

    if (responsesReport) {
      transformedData.data.push({
        x: department,
        y: responsesReport[`${selectedReport}`] || 0,
      });

    
    }
  });

  // Return the transformed data
 setreportValues(transformedData)
 setisLoading(false)

}

return [];
};





const handleSelect=(data)=>{
setselectedReport(data?.name)
SetReportValueHandler(getAllReportData,data?.name)

}
  return (
    <>
    <div className="table-card-background">
 <div className="d-flex justify-content-between">
        <div className=" d-flex align-items-center m-0">
         <h6 className='m-0 pb-3 table-heading'>Department </h6>
            
        </div>
        <div className="d-flex align-items-center w-100 justify-content-end">
        <div className="">
              <DropdownButton 
              items={listOfResponseReport} 
              listKeyName={'name'} 
              onSelect={handleSelect} 
              selectionName='Actively Engaged'
              style={{width:'200px'}}
              />

        </div>
 
    </div>
    </div>
    <hr  className='m-1'/>
    <div className=""  >
    {
             isLoading?  
             <div className="loader-div d-flex justify-content-center align-items-center h-100">
              <Loader/>
               </div> 
               :
         <Chart 
            options={chartValues}
            series={chartValues?.series}
            type="line"
            height='320'
          /> 
    }
    </div>
     
    </div>
    
    </>
  )
 
}

export default DepartLineChart