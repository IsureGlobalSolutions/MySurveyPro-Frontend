import React, { useEffect, useState } from 'react'
import SurveyTable from '../../../components/table/SurveyTable'
import DepartmentCharts from './chats/DepartmentCharts'
import { useDispatch, useSelector } from 'react-redux';
import { getListOfCoumnProperty, getDepartmentQuestionsReport, downloadColumnWiseReport } from '../../../Redux/slice/surveySlice';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Navbarvalue} from '../../../context/NavbarValuesContext';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';

const DepartmentReport = () => {
  const dispatch = useDispatch()
  const {selectedDashboardValues,DashboardStateHandler}=Navbarvalue()
  const [isLoading, setisLoading] = useState(false)
  const [listOfDepartment, setlistOfDepartment] = useState([])
  //useContext value for selected department
  const [getDepartmentQuestinsSurveyData, setgetDepartmentQuestinsSurveyData] = useState([])
  const { paymentStatus } = useSelector((state) => state.survey)

  const questionLabel = 'Questions';
  const questionDataKey = 'question';


 const showSelectedValues=(value) => {

  
  if(value && value !='All'){
      setisLoading(true)
     dispatch(getDepartmentQuestionsReport({ surveyId: selectedDashboardValues?.survey?.id, department: value }))
        .then((res) => {
          setisLoading(false)
          setgetDepartmentQuestinsSurveyData(res?.payload)
        })
    
  }else if (!value || value ==='All'){
    //get the report of all the departments
  setisLoading(true)
     dispatch(getDepartmentQuestionsReport({ surveyId: selectedDashboardValues?.survey?.id}))
        .then((res) => {
          setisLoading(false)
          setgetDepartmentQuestinsSurveyData(res?.payload)
        })
  }
  }


  useEffect(() => {
if(paymentStatus==='paid' && selectedDashboardValues?.survey?.id){
   dispatch(getListOfCoumnProperty({ surveyId: selectedDashboardValues?.survey?.id, columnProperty: 'department' }))
      .then((res) => {
     
        const departments = [{ columnValue: "All" }, ...res?.payload];
        setlistOfDepartment(departments); 
showSelectedValues(selectedDashboardValues?.department? 
  selectedDashboardValues?.department
  :
  departments[0].columnValue
)
    
      })

}
 
  }, [paymentStatus,selectedDashboardValues?.survey?.id])

 

  const handleSelect = (data) => {

    DashboardStateHandler('department',data?.columnValue);

  };

  useEffect(()=>{
    if(selectedDashboardValues?.department){
    
      
showSelectedValues(selectedDashboardValues?.department)
    }

  },[selectedDashboardValues?.department])




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
  if (getDepartmentQuestinsSurveyData?.length > 0 && getDepartmentQuestinsSurveyData[0]?.responsesReport) {
    Object.keys(getDepartmentQuestinsSurveyData[0].responsesReport).forEach(choice => {
      columns.push({
        width: 120,
        label: choice,
        dataKey: toCamelCase(choice),
        numeric: true
      });
    });
  }
  else {
    columns = null
  }

  // Map the API response to the required data structure for SurveyTable

  let data = Array.isArray(getDepartmentQuestinsSurveyData) ?
    getDepartmentQuestinsSurveyData?.length > 0 ?
      getDepartmentQuestinsSurveyData?.map(item => {
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
    null;


    const downloadReport = ()=>{
      if(getDepartmentQuestinsSurveyData?.length>0){
         dispatch(downloadColumnWiseReport(getDepartmentQuestinsSurveyData))
         .then((res)=>{    
          
             const blob = new Blob([res?.payload], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, `department(${selectedDashboardValues?.department? selectedDashboardValues?.department: 'All'})_survey_report.csv`);
          
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
          <div className="mx-3 d-flex justify-content-between bg-white  shadow">

            <div className="d-flex align-items-center  px-3" style={{ borderRadius: '5px 5px 0px 0px' }}>
              <div className="">
                <p className='ps-2 py-2 fs-6 fw-bold m-0 '>Department Questions Report</p>
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

           

            <DropdownButton items={listOfDepartment} onSelect={handleSelect} initialValue={'All'}/>
          </div>

          <SurveyTable
            columns={columns ?
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
            data={data ?
              data :
              [
                { Questions: 'No Data', activelyEngaged: 0, activelyDisengaged: 0, notEngaged: 0, engagementScore: 0 },
                { Questions: 'No Data', activelyEngaged: 0, activelyDisengaged: 0, notEngaged: 0, engagementScore: 0 },

              ]

            }
            isLoading={isLoading}
          />
        </div>
        <div className="department-card-data col-md-5 m-0 p-0">
          <DepartmentCharts  />

        </div>
      </div>
    </>
  )
}

export default DepartmentReport