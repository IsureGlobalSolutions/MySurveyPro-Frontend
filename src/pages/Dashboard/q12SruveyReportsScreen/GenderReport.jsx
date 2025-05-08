import React, { useEffect, useState } from 'react'
import SurveyTable from '../../../components/table/SurveyTable'
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { downloadColumnWiseReport, downloadOverAllSurveyReport, getOverAllSurveyReport } from '../../../Redux/slice/surveySlice';
import { saveAs } from 'file-saver';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Navbarvalue} from '../../../context/NavbarValuesContext';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
import DownloadReportIcon from "../../../assets/dashboredsvg/download_report_icon.svg?react";
import "../TeiSurveyReportScreen/Report.css";
const GenderReport = () => {
    const [surveyOverAllData, setsurveyOverAllData] = useState([])
    const { paymentStatus } = useSelector((state) => state.survey)
    const [isloading, setisloading] = useState(false)
    const {selectedDashboardValues,DashboardStateHandler}=Navbarvalue()
const listOfGender=[
 { columnValue:'Male'},
 {columnValue:'Female'}
]
    const dispatch = useDispatch()
    const questionLabel = 'Questions';
    const questionDataKey = 'question';


    const showSelectedValues=(value)=>{ 
  setisloading(true)
      dispatch(getOverAllSurveyReport({ surveyId: selectedDashboardValues?.survey?.id, gender: value }))
         .then((res) => {
          setisloading(false)
           setsurveyOverAllData(res?.payload)
         })
   }

             //get over all survey report data
    useEffect(()=>{
      if(selectedDashboardValues?.survey?.id && paymentStatus[selectedDashboardValues?.survey?.id].paymentStatus===true ){

   showSelectedValues('Male')
}
      
      
       
      },[paymentStatus,selectedDashboardValues?.survey?.id])
  
  
  
  
  
  
  
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
  if (surveyOverAllData?.length > 0 && surveyOverAllData[0]?.choicesResult) {
    Object.keys(surveyOverAllData[0].choicesResult).forEach(choice => {
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
  
  const data =Array.isArray(surveyOverAllData)?
  surveyOverAllData?.length>0?  
  surveyOverAllData?.map(item => {
    const rowData = {
      [questionDataKey]: item.question.Text
    };
  
    // Assigning the choicesResult values to corresponding dataKeys
    Object.keys(item?.choicesResult).forEach(choice => {
      rowData[toCamelCase(choice)] = item.choicesResult[choice];
    });
  
    return rowData;
  })
  :
  null
  :
  null;


  const handleSelect = (value) => {

    DashboardStateHandler('gender',value?.columnValue);

  };
  
  useEffect(()=>{
    if(selectedDashboardValues?.gender){
    
      
showSelectedValues(selectedDashboardValues?.gender)
    }

  },[selectedDashboardValues?.gender])


  const downloadReport = ()=>{
    if(surveyOverAllData.length>0){
       dispatch(downloadOverAllSurveyReport(surveyOverAllData))
       .then((res)=>{    
         
           const blob = new Blob([res?.payload], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `gender(${selectedDashboardValues?.gender ? selectedDashboardValues?.gender :'male'})_survey_report.csv`);
        
          
       })
     
    }
    else{
toast.error('data not Found')
    }
  }

    return (
        <>
            <div className="table-card-background  justify-content-between">
                <div className="deparment-table-data  p-0" >
                    <div className=" py-1 d-flex justify-content-between ">

                        <div className="d-flex align-items-center   pe-0" style={{ borderRadius: '5px 5px 0px 0px' }}>
                            <div className="">
                                <p className='ps-2 py-2 table-heading m-0 '>Gender Questions Report</p>
                            </div>
                          

                        </div>
                        <div className="d-flex gap-3 px-2">
                        <div className="d-flex align-items-center justify-content-center">
                 <div className="downlaod-report-icon d-flex align-items-center">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      Download report file
                    </Tooltip>
                  }
                >
                  <DownloadReportIcon
                    style={{ cursor: "pointer" }}
                    onClick={downloadReport}
                  />
                </OverlayTrigger>
              </div>
              </div>
                            <div className=" py-2 pe-2">
                           <DropdownButton 
                           items={listOfGender} 
                           listKeyName={'columnValue'}
                            onSelect={handleSelect} 
                            selectionName={'Male'}
                            style={{width:'200px'}}
                            />

                        </div>
                        </div>
                      
                    </div>

                    <SurveyTable
                        columns={columns?.length>0?
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
                        data={data?.length>0?
                          data
                          :

                            [
                            { Questions: 'No Data', activelyEngaged: 0, activelyDisengaged: 0, notEngaged: 0, engagementScore: 0 },
                            { Questions: 'No Data', activelyEngaged: 0, activelyDisengaged: 0, notEngaged: 0, engagementScore: 0 },

                        ]
                    }
                    isLoading={isloading}
                    />
                </div>

            </div>
        </>
    )
}

export default GenderReport