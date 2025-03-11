import React, { useEffect, useState } from 'react'
import SurveyTable from '../../../components/table/SurveyTable'
import { useDispatch, useSelector } from 'react-redux';
import { downloadColumnWiseReport,getDepartmentQuestionsReport, getGradeQuestionsReport, getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import { saveAs } from 'file-saver';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Navbarvalue} from '../../../context/NavbarValuesContext';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
import DesignationChart from './chats/gradeCharts/DesignationChart';

const GradeReport = () => {
  const dispatch = useDispatch()
  const [listofGrades, setlistofGrades] = useState([])
  const [isloading, setisloading] = useState(false)
  const {selectedDashboardValues,DashboardStateHandler}=Navbarvalue()

  const [getGradeQuesitonsSurveyData, setgetGradeQuesitonsSurveyData] = useState([])
  const { paymentStatus } = useSelector((state) => state.survey)

  const questionLabel = 'Questions';
    const questionDataKey = 'question';

    const showSelectedValues=(value)=>{ 
      if(value && value !='All'){
        setisloading(true)
      dispatch(getGradeQuestionsReport({ surveyId: selectedDashboardValues?.survey?.id, grade: value }))
         .then((res) => {
          setisloading(false)
           setgetGradeQuesitonsSurveyData(res?.payload)
         })
        }else if (!value || value ==='All'){
          setisloading(true)
     dispatch(getDepartmentQuestionsReport({ surveyId: selectedDashboardValues?.survey?.id}))
        .then((res) => {
          setisloading(false)
          setgetGradeQuesitonsSurveyData(res?.payload)
        })}
   }

  useEffect(()=>{
  if(selectedDashboardValues?.survey?.id && paymentStatus[selectedDashboardValues?.survey?.id].paymentStatus===true){
     dispatch(getListOfCoumnProperty({surveyId:selectedDashboardValues?.survey?.id,columnProperty:'grade'}))
    .then((res)=>{
      const Grades = [{ columnValue: "All" }, ...res?.payload];
      setlistofGrades(Grades)
      showSelectedValues(selectedDashboardValues?.grade? 
        selectedDashboardValues?.grade
        :
        
          res?.payload[0]?.columnValue
         
      )
    })


  }
   
  },[paymentStatus, selectedDashboardValues?.survey?.id])

  const handleSelect = (eventKey) => {

    DashboardStateHandler('grade',eventKey.columnValue);

  };


  useEffect(()=>{
    if(selectedDashboardValues?.grade){
    
      
showSelectedValues(selectedDashboardValues?.grade)
    }

  },[selectedDashboardValues?.grade])

            //get over all survey report data
       
       
           
                    
                     
                // Utility function to convert a label to camelCase dataKey
                const toCamelCase = str => {
                  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
                    index === 0 ? match.toLowerCase() : match.toUpperCase()
                  ).replace(/\s+/g, '');
                };
                
                
                
                
                
                let columns = [
                  { width: 300, label: questionLabel, dataKey: questionDataKey }
                ];
                
                // Extracting choices labels and creating columns dynamically
                if (getGradeQuesitonsSurveyData?.length > 0 && getGradeQuesitonsSurveyData[0]?.responsesReport) {
                  Object.keys(getGradeQuesitonsSurveyData[0].responsesReport).forEach(choice => {
                    columns.push({
                      width: 120,
                      label: choice,
                      dataKey: toCamelCase(choice),
                      numeric: true
                    });
                  });
                }
                else{
                  columns=null
                }
                
                // Map the API response to the required data structure for SurveyTable
                
                let data =Array.isArray(getGradeQuesitonsSurveyData)?
                getGradeQuesitonsSurveyData?.length>0?  
                getGradeQuesitonsSurveyData?.map(item => {
                  const rowData = {
                    [questionDataKey]: item.question.Text
                  };
                
                  // Assigning the choicesResult values to corresponding dataKeys
                  Object.keys(item?.responsesReport).forEach(choice => {
                    rowData[toCamelCase(choice)] = item.responsesReport[choice];
                  });
                
                  return rowData;
                })
                :
                null
                :
                null

                const downloadReport = ()=>{
                  if(getGradeQuesitonsSurveyData.length>0){
                     dispatch(downloadColumnWiseReport(getGradeQuesitonsSurveyData))
                     .then((res)=>{    
                       
                         const blob = new Blob([res?.payload], { type: 'text/csv;charset=utf-8;' });
                      saveAs(blob, `grade(${selectedDashboardValues?.grade ? selectedDashboardValues?.grade : listofGrades[0]?.columnValue})_survey_report.csv`);
                      
                       
                     })
                   
                  }
                  else{
 toast.error('data not Found')
                  }
                }

  return (

   <>
     <div className="row m-0 p-0 justify-content-between">
         <div className="deparment-table-data col-md-7 p-0" >
            <div className="mx-3 py-1 d-flex justify-content-between bg-white  shadow">

                <div className="d-flex align-items-center  px-3" style={{borderRadius:'5px 5px 0px 0px'}}>
    <div className="">
       <p className='ps-2 py-2 fs-6 fw-bold m-0 '>Grade Questions Report</p>
    </div>
    <div className="d-flex align-items-center">
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">Download report file</Tooltip>}
    >
            <small className='ps-2 py-2  fw-bold m-0 ' style={{color:'orange',cursor:'pointer'}} onClick={downloadReport}>Download</small>
    </OverlayTrigger>
    </div>
             
        </div> 
        <div className="col-md-3 col-sm-4">
                   <DropdownButton items={listofGrades} listKeyName={'columnValue'} onSelect={handleSelect} selectionName={'All'}/>

        </div>
       
            </div>
        
         <SurveyTable
  columns={
    columns?
    columns
    :
    [
      { width: 300, label: 'Questions', dataKey: 'Questions' },
      { width: 120, label: 'Actively Engaged', dataKey: 'activelyEngaged', numeric: true },
      { width: 120, label: 'Actively Disengaged', dataKey: 'activelyDisengaged', numeric: true },
      { width: 120, label: 'Not Engaged', dataKey: 'notEngaged', numeric: true },
      { width: 120, label: 'Engagemnent Score', dataKey: 'engagementScore', numeric: true },
    ]
}
  data={
    data?
    data:
    [
      { Questions: 'No Data', activelyEngaged: 0, activelyDisengaged: 0, notEngaged: 0, engagementScore: 0},
      { Questions: 'No Data', activelyEngaged: 0, activelyDisengaged: 0, notEngaged: 0, engagementScore: 0},
      
    ]
  }
  isLoading={isloading}
/>
         </div>
         <div className="department-card-data col-md-5 m-0 p-0">
            <DesignationChart
           
             />

         </div>
    </div>
   </>
  )
}

export default GradeReport