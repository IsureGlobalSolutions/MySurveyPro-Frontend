import React, { useEffect, useRef, useState } from 'react'
import Chart from 'react-apexcharts';
import { PieChart } from '@mui/x-charts/PieChart';



import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../components/plugins/Loader';
import { getListOfCoumnProperty, getOverAllGradeReport} from '../../../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../../../context/NavbarValuesContext';
import { donutChartData } from '../../../../../components/cartsComponents/donutChartData';
import '../../../TeiSurveyReportScreen/Report.css';
const desktopOS = [
  {
    label: 'noData',
    value: 25,
  },
  {
    label: 'noData',
    value: 25,
  },
  {
    label: 'noData',
    value: 50,
  },
  
];
const DesignationChart = () => {

    const {selectedDashboardValues}=Navbarvalue()

const [reportValues, setreportValues] = useState()
const colorPalette = ['#7DCCB7', '#1F245E', '#3B5BE4'] 

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


  const SetReportValueHandler = (value, data) => {
   
        
        if (!Array.isArray(data) || data?.length === 0) {
            setisLoading(false);
            return;
        }

        data.forEach((item) => {
            if ((value === 'All' && item.report === 'All') || 
                (value === item.department)) {
                
                const responses = item?.responsesReport || {};
                const transformedData = Object.entries(responses).map(([label, value], index) => ({
                    label,
                    value,
                    color: colorPalette[index % colorPalette.length] // Assign colors from palette
                }));
                
                setreportValues({
                    labels: transformedData.map(item => item.label),
                    value: transformedData.map(item => item.value),
                    chartData: transformedData
                });
                
                setisLoading(false);
            }
        });
    };

  
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
<h6 className='m-0 pb-3 table-heading'>Grades1 </h6>
            
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
         <PieChart
              series={[
                {
                 data: reportValues?.chartData? reportValues?.chartData:desktopOS,
                 innerRadius: 30,
                 highlightScope: { fade: 'global', highlight: 'item' },
                 faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
               
               },
             ]}
             height={400}
             width={300}
           />
        }
            
    </div>
 
    </div>
    
    </>
  )
 
}

export default DesignationChart