import React, { useEffect, useState } from 'react'
import './dash-screen.css'


import HeroCards from '../../../components/HeroCards';
import { useDispatch, useSelector } from 'react-redux';
import {  downloadOverAllSurveyReport, getAllSurveyList, getOverAllSurveyReport } from '../../../Redux/slice/surveySlice';
import SurveyTable from '../../../components/table/SurveyTable';
import DepartmentReport from './DepartmentReport';
import GradeReport from './GradeReport';
import GenderReport from './GenderReport';
import { jwtDecode } from "jwt-decode";
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Navbarvalue } from '../../../context/NavbarValuesContext';


import DepartFunnelChart from './chats/departmentCharts/DepartFunnelChart';
import DepartLineChart from './chats/departmentCharts/DepartLineChart';
import DepartStackColumnChart from './chats/departmentCharts/DepartStackColumnChart';
import DepartMultiBarChart from './chats/departmentCharts/DepartMultiBarChart';
import GradeMultiBarChart from './chats/gradeCharts/GradeMultiBarChart';
import GradeStackColumnChart from './chats/gradeCharts/GradeStackColumnChart';
import GradetLineChart from './chats/gradeCharts/GradetLineChart';
import GradeFunnelChart from './chats/gradeCharts/GradeFunnelChart';


const index = () => {
  const dispatch = useDispatch()
  const [listOfSurvey, setlistOfSurvey] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [surveyOverAllData, setsurveyOverAllData] = useState([])
  console.log("🚀 ~ index ~ surveyOverAllData:", surveyOverAllData)
  const { paymentStatus } = useSelector((state) => state.survey)
  const { selectedDashboardValues, DashboardStateHandler } = Navbarvalue()



  const questionLabel = 'Questions';
  const questionDataKey = 'question';

  const { surveysList } = useSelector((state) => state.survey)

  const { userData } = useSelector((state) => state.user)

  const tokenValues = jwtDecode(userData?.accessToken)


  const getSurveyList = async () => {
    await dispatch(getAllSurveyList())
  }



  useEffect(() => {

    getSurveyList()

  }, [])


  useEffect(() => {

    setlistOfSurvey(surveysList)

  }, [surveysList])

  //get over all survey report data
  useEffect(() => {
    if (selectedDashboardValues?.survey?.id && paymentStatus[selectedDashboardValues?.survey?.id].paymentStatus===true) {

      setisLoading(true)
      dispatch(getOverAllSurveyReport({ surveyId: selectedDashboardValues?.survey?.id }))
        .then((res) => {
          setisLoading(false)
          setsurveyOverAllData(res?.payload)
        })
    }


  }, [paymentStatus, selectedDashboardValues?.survey?.id,])







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
  else {
    columns = null
  }

  // Map the API response to the required data structure for SurveyTable

  const data = Array.isArray(surveyOverAllData) ?
  
    surveyOverAllData?.length > 0 ?
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
    null

  console.log("🚀 ~ index ~ data:", data)
  const downloadReport = () => {
    if (surveyOverAllData.length > 0) {
      dispatch(downloadOverAllSurveyReport(surveyOverAllData))
        .then((res) => {

          const blob = new Blob([res?.payload], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, 'Over-All_survey.csv');
        })

    }
    else {
      toast.error('data not Found')
    }
  }






  return (
    <>
      <HeroCards />
      {/* dashboard screen  */}
 
      <div className="">
        <div className="px-3">
          <div className="bg-white d-flex   shadow  px-3" style={{ borderRadius: '5px 5px 0px 0px' }}>
            <div className="">
              <p className='ps-2 py-2 fs-6 fw-bold m-0 '>OverAll Survey Report</p>
            </div>
            <div className="d-flex align-items-center">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">Download report file</Tooltip>}
              >
                <small className='ps-2 py-2  fw-bold m-0 ' style={{ color: 'orange', cursor: 'pointer' }} onClick={downloadReport}>Download</small>
              </OverlayTrigger>

            </div>


          </div>
        </div>

        <SurveyTable
          columns={columns ?
            columns
            :

            [
              { width: 300, label: 'Questions', dataKey: 'Questions' },
              { width: 120, label: 'Strongly Disagree', dataKey: 'stronglyDisagree', numeric: true },
              { width: 120, label: 'Disagree', dataKey: 'Disagree', numeric: true },
              { width: 120, label: 'Neutral', dataKey: 'Neutral', numeric: true },
              { width: 120, label: 'Agree', dataKey: 'Agree', numeric: true },
              { width: 120, label: 'Strongly Agree', dataKey: 'stronglyAgree', numeric: true },
            ]
          }
          data={data ?
            data
            :
            [
              { Questions: 'No Data', stronglyDisagree: 0, Disagree: 0, Neutral: 0, Agree: 0, stronglyAgree: 0 },
              { Questions: 'No Data', stronglyDisagree: 0, Disagree: 0, Neutral: 0, Agree: 0, stronglyAgree: 0 },

            ]
          }
          isLoading={isLoading}
        />

      </div>

      <DepartmentReport />  
      <div className="row m-0 p-0 mb-4">
        <div className="col-md-6">  
            <DepartMultiBarChart/>
          
        </div>
        <div className="col-md-6">
        <DepartStackColumnChart/>
        </div>
      </div>
      <div className="row m-0 p-0 mb-4">
        <div className="col-md-6">
         
 <DepartLineChart/> 
        </div>
        <div className="col-md-6">
        <DepartFunnelChart/>

        </div>
      </div>
      
      <GradeReport />

      <div className="row m-0 p-0 mb-4">
        <div className="col-md-6">  
            <GradeMultiBarChart/>
          
        </div>
        <div className="col-md-6">
        <GradeStackColumnChart/>
        </div>
      </div>
      <div className="row m-0 p-0 mb-4">
        <div className="col-md-6">
         
 <GradetLineChart/> 
        </div>
        <div className="col-md-6">
        <GradeFunnelChart/>

        </div>
      </div>
      <GenderReport />
    
      
     
      
      {/* <Charts/> */}
    </>
  )
}



export default index