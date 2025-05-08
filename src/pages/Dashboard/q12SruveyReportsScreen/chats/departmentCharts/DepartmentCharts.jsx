import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';

import { toPng } from 'html-to-image'; 
import { useDispatch, useSelector } from 'react-redux';
import {  getOverAllDepartmentReport } from '../../../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../../../context/NavbarValuesContext';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Loader from '../../../../../components/plugins/Loader';
import { donutChartData } from '../../../../../components/cartsComponents/donutChartData';
import '../../../TeiSurveyReportScreen/Report.css';


const DepartmentCharts = () => {

    const {selectedDashboardValues}=Navbarvalue()
    const [isLoading, setisLoading] = useState(false)

const [reportValues, setreportValues] = useState()
const { paymentStatus } = useSelector((state) => state.survey)
const chartRef = useRef(null); 
  const chartValues = donutChartData(reportValues);

    const dispatch = useDispatch()

    const showSelectedValues=(value)=>{
        setisLoading(true)

         if(value !='All')
         {
            dispatch(getOverAllDepartmentReport({surveyId:selectedDashboardValues?.survey?.id}))
        .then((res) => {
           SetReportValueHandler(value,res?.payload)
            
        }) 
           

        .finally(()=>{
            setisLoading(false)
           })

         }
         else{
             dispatch(getOverAllDepartmentReport({surveyId:selectedDashboardValues?.survey?.id,option:value}))
        .then((res) => {
           SetReportValueHandler(value,res?.payload)
            console.log(value, res?.payload);
            
        }) 
        .finally(()=>{
            setisLoading(false)
           })
         }
   
       
     }

    useEffect(() => {
if(selectedDashboardValues?.survey?.id && paymentStatus[selectedDashboardValues?.survey?.id].paymentStatus===true){


            showSelectedValues(selectedDashboardValues?.department? 
                selectedDashboardValues?.department
                :
                  'All'
              )

}
       
    
      }, [paymentStatus, selectedDashboardValues?.survey?.id])



      const SetReportValueHandler = (value,data)=>{
        
         Array.isArray(data)?
        data?.length>0 ?
        data.map((item,index)=>{
            
                if(value===item?.department){
                    let labels=Object.keys(item?.responsesReport) 
                    let series = Object.values(item?.responsesReport)
setreportValues({labels,series})
setisLoading(false)
                }else if(value=== item?.report){
                    let labels=Object.keys(item?.responsesReport) 
                    let series = Object.values(item?.responsesReport)
setreportValues({labels,series})
setisLoading(false)

                }
            
        })
        :
        null
        :
null
      }


  
      useEffect(()=>{
        if(selectedDashboardValues?.department){
        
            setisLoading(true)

    showSelectedValues(selectedDashboardValues?.department)
        }
    
      },[selectedDashboardValues?.department])



  

  return (
    <>
    <div className="table-card-background">
 <div className="d-flex justify-content-between">
        <div className=" d-flex align-items-center m-0">
        <h6 className='m-0 pb-3 table-heading'>Department </h6>
            
        </div>
        <div className="d-flex align-items-center">
          
 
    </div>
    </div>
    <hr  className='m-1'/>
    <div className="  " style={{height:"330px"}} ref={chartRef} >
    {
             isLoading?  
             <div className="loader-div d-flex justify-content-center align-items-center h-100">
              <Loader/>
               </div> 
               :

         <Chart 
            options={chartValues}
            series={chartValues.series}
            type="donut"
            height='320'

            // width="500"
          /> 
    }
    </div>
     
    </div>
    
    </>
  )
 
}

export default DepartmentCharts