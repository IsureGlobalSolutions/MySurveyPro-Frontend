import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import SurveyTable from '../../../components/table/SurveyTable';
import { useDispatch, useSelector } from 'react-redux';
import { use } from 'react';
import { TeiDimensionListApi, userSingleDimensionForSingleDepartmentReportApi } from '../../../Redux/slice/teiSlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';

const data = [
  {
    teiProperties: {
      RecipientId: '1',
      RecipientName: 'Aisha Arif',
      TeamsName: 'QA',
    },
    teiDimensionResult: [
      {
        teiDimension: {
          Id: '1',
          Text: 'MISSION DRIVEN',
          TeamsRating: '16',
          TEIReferenceScore: '20',
          Result: '80.0',
        },
        questionResultDto: [
          {
            question: {
              Id: '14',
              Text: 'Our team has an agreed set of common goals',
            },
            choicesResult: {
              Agree: 4,
            },
            percentage: 0.0,
          },
          {
            question: {
              Id: '15',
              Text: 'Our team has a clear vision, mission and purpose',
            },
            choicesResult: {
              Agree: 4,
            },
            percentage: 0.0,
          },
          {
            question: {
              Id: '16',
              Text: 'Our team understands the wider business context',
            },
            choicesResult: {
              Neutral: 3,
            },
            percentage: 0.0,
          },
          {
            question: {
              Id: '17',
              Text: 'Our team’s goals are aligned with the goals of the organization',
            },
            choicesResult: {
              StronglyAgree: 5,
            },
            percentage: 0.0,
          },
        ],
        averagePercentage: 0.0,
      },
    ],
  },
];

const DepartmentAndDimensionTable = () => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [departmentList, setdepartmentList] = useState([])
  const { paymentStatus } = useSelector((state) => state.survey)
  const { selectedDashboardValues } = Navbarvalue()
  const {listOfDimensions,userSingleDimensionForSingleDepartmentReportList}=useSelector((state)=>state.teiSurvey)

  useEffect(() => { 
  if (selectedDashboardValues?.survey?.id) {
      dispatch(TeiDimensionListApi(selectedDashboardValues?.survey?.id))
      dispatch(getListOfCoumnProperty({surveyId:selectedDashboardValues?.survey?.id,columnProperty:"department"}))
      .then((res)=>{
        console.log('department',res?.payload);
        setdepartmentList(res?.payload)
        
      })
  }

}, [])
useEffect(()=>{
if(listOfDimensions?.length>0 && departmentList?.length>0){

  dispatch(userSingleDimensionForSingleDepartmentReportApi(
    {surveyId:selectedDashboardValues?.survey?.id,
      dimensionId:listOfDimensions[0]?.id,
      columnValue:departmentList[0]?.columnValue

    }))
    .then((res)=>{
setResponseDataInTable(res?.payload)
    })
}

},[listOfDimensions?.length ,departmentList?.length])

useEffect(()=>{
  if(userSingleDimensionForSingleDepartmentReportList.length>0){
    setResponseDataInTable(userSingleDimensionForSingleDepartmentReportList)
  }
},[userSingleDimensionForSingleDepartmentReportList])



const setResponseDataInTable=(data)=>{
  if(data?.length>0){
       const generatedColumns = [
      { width: 300, label: 'Recipient Name', dataKey: 'RecipientName' },
       ...data[0]?.teiDimensionResult[0]?.questionResultDto?.map((q, index) => ({
        width: 200,
        label: q.question.Text,
        dataKey: `Question${index + 1}`,
      })),
      { width: 120, label: 'Team Rating', dataKey: 'TeamsRating', numeric: true },
      { width: 120, label: 'TEI Reference Score', dataKey: 'TEIReferenceScore', numeric: true },
      { width: 120, label: 'Result', dataKey: 'Result', numeric: true },
     
    ]
    setColumns(generatedColumns);


    // Generate rows dynamically
    const generatedRows = data?.map((item) => {
      const baseRow = {
        RecipientName: item?.teiProperties?.RecipientName,
        TeamsRating: item?.teiDimensionResult[0]?.teiDimension.TeamsRating,
        TEIReferenceScore: item?.teiDimensionResult[0]?.teiDimension?.TEIReferenceScore,
        Result: item?.teiDimensionResult[0]?.teiDimension?.Result,
      };
      item?.teiDimensionResult[0]?.questionResultDto?.forEach((q, index) => {
        baseRow[`Question${index + 1}`] = Object.values(q.choicesResult)[0];
      });
      return baseRow;
    })
    setRows(generatedRows);
  }
 
}

  const handleSelectDepartment=(data)=>{
console.log('department selection',data);
dispatch(userSingleDimensionForSingleDepartmentReportApi(
  {surveyId:selectedDashboardValues?.survey?.id,
    dimensionId:listOfDimensions[0]?.id,
    columnValue:data?.columnValue

  }))

  }
  const handleSelectDimension=(data)=>{

    dispatch(userSingleDimensionForSingleDepartmentReportApi(
      {surveyId:selectedDashboardValues?.survey?.id,
        dimensionId:data?.id,
        columnValue:departmentList[0]?.columnValue
  
      }))
  }
  return (
    <>
      <div className="row m-0 p-0 justify-content-between mt-3">
        <div className="deparment-table-data col-md-12 p-0">
          <div className="mx-3 d-flex justify-content-between bg-white shadow">
            <div className="d-flex align-items-center px-3" style={{ borderRadius: '5px 5px 0px 0px' }}>
              <div>
                <p className="ps-2 py-2 fs-6 fw-bold m-0">Department Questions Report</p>
              </div>
              <div className="d-flex align-items-center">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Download report file</Tooltip>}
                >
                  <small className="ps-2 py-2 fw-bold m-0" style={{ color: 'orange', cursor: 'pointer' }}>
                    Download
                  </small>
                </OverlayTrigger>
              </div>
            </div>

{departmentList?.length>0? 
 <DropdownButton items={departmentList} listKeyName={'columnValue'} onSelect={handleSelectDepartment} selectionName={departmentList[0]?.columnValue}/>
 :''
}
         {
          listOfDimensions?.length>0?
           <DropdownButton items={listOfDimensions} listKeyName={'dimension'} onSelect={handleSelectDimension} selectionName={listOfDimensions[0]?.dimension}/>
           :''
         }  
           
          </div>
          <SurveyTable columns={columns?.length>0 ?
              columns
              :
              [
                { width: 300, label: 'Name', dataKey: 'RecipientName' },
                { width: 120, label: 'Question1', dataKey: 'choicesResult', numeric: true },
                { width: 120, label: 'Question2', dataKey: 'choicesResult', numeric: true },
                { width: 120, label: 'Question3', dataKey: 'choicesResult', numeric: true },
                { width: 120, label: 'QA Team rating', dataKey: 'TeamsRating', numeric: true },
                { width: 120, label: 'TEI Refernce Score', dataKey: 'TEIReferenceScore', numeric: true },
                { width: 120, label: 'Result', dataKey: 'Result', numeric: true },
              ]

            } data={rows?.length>0 ?
              rows :
              [
                {  RecipientName: 0, choicesResult: 0, choicesResult: 0, choicesResult: 0, TeamsRating: 0, TEIReferenceScore: 0, Result: 0 },
                {  RecipientName: 0, choicesResult: 0, choicesResult: 0, choicesResult: 0, TeamsRating: 0, TEIReferenceScore: 0, Result: 0 },

              ]

            } isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default DepartmentAndDimensionTable;
