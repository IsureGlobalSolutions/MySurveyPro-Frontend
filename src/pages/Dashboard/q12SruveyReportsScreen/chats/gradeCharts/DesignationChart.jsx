import React, { useEffect, useRef, useState } from 'react'
import Chart from 'react-apexcharts';

import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';

import { toPng } from 'html-to-image'; 
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../components/plugins/Loader';
import { getListOfCoumnProperty, getOverAllGradeReport} from '../../../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../../../context/NavbarValuesContext';
import { donutChartData } from '../../../../../components/cartsComponents/donutChartData';
import '../../../TeiSurveyReportScreen/Report.css';

const DesignationChart = () => {

    const {selectedDashboardValues}=Navbarvalue()

const [reportValues, setreportValues] = useState()
const { paymentStatus } = useSelector((state) => state.survey)
const [isLoading, setisLoading] = useState(false)
const chartRef = useRef(null);  
    const dispatch = useDispatch()

    const chartValues = donutChartData(reportValues);


    const showSelectedValues=(value)=>{
         setisLoading(true)
         if(value !='All')
            {
              
        dispatch(getOverAllGradeReport({surveyId:selectedDashboardValues?.survey?.id}))
            .then((res) => {
               SetReportValueHandler(value,res?.payload)
                
            })
            .finally(()=>{
                setisLoading(false)
               })
         
         }
         else{
            dispatch(getOverAllGradeReport({surveyId:selectedDashboardValues?.survey?.id,option:value}))
            .then((res) => {
               SetReportValueHandler(value,res?.payload)
                
            })
            .finally(()=>{
                setisLoading(false)
               }) 
         }
        }

    useEffect(() => {
if(selectedDashboardValues?.survey?.id && paymentStatus[selectedDashboardValues?.survey?.id].paymentStatus===true){
            dispatch(getListOfCoumnProperty({ surveyId: selectedDashboardValues?.survey?.id, columnProperty: 'grade' }))
          .then((res) => {
            showSelectedValues(selectedDashboardValues?.grade? 
                selectedDashboardValues?.grade:
                  res?.payload?.length>0?
                  res?.payload[0]?.columnValue
                  :
                  ''
              )
          })

     
}
   
      }, [paymentStatus, selectedDashboardValues?.survey?.id])


      const SetReportValueHandler = (value,data)=>{
         Array.isArray(data)?
        data?.length>0 ?
        data.map((item,index)=>{
            
                if(value===item?.grade ||value ===item?.report){
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
        if(selectedDashboardValues?.grade){
        
          setisLoading(true)
    showSelectedValues(selectedDashboardValues?.grade)
        }
    
      },[selectedDashboardValues?.grade])


   



  return (
    <>
    <div className="table-card-background ">
 <div className="d-flex justify-content-between">
        <div className=" d-flex align-items-center m-0">
<h6 className='m-0 pb-3 table-heading'>Grades </h6>
            
        </div>
        <div className="d-flex align-items-center">
           
    </div>
    </div>
    <hr  className='m-1'/>
    <div className="" style={{height:"330px"}} ref={chartRef} >
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

export default DesignationChart