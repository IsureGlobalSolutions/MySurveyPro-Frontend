import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import SurveyTable from '../../../components/table/SurveyTable';
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { useDispatch, useSelector } from 'react-redux';

const data = {
   
        "recipientTEIResults": [
            {
                "teiProperties": {
                    "RecipientId": "1",
                    "RecipientName": "Aisha Arif",
                    "TeamsName": "QA",
                    "AverageResult": "82.5"
                },
                "teiDimensionResult": [
                    {
                        "teiDimension": {
                            "Id": "1",
                            "Text": "MISSION DRIVEN",
                            "TeamsRating": "16",
                            "TEIReferenceScore": "20",
                            "Result": "80.0"
                        }
                    },
                    {
                        "teiDimension": {
                            "Id": "2",
                            "Text": "ROLE CLARITY",
                            "TeamsRating": "21",
                            "TEIReferenceScore": "25",
                            "Result": "84.0"
                        }
                    },
                    {
                        "teiDimension": {
                            "Id": "3",
                            "Text": "LEADERSHIP",
                            "TeamsRating": "18",
                            "TEIReferenceScore": "20",
                            "Result": "90.0"
                        }
                    },
                    {
                        "teiDimension": {
                            "Id": "4",
                            "Text": "SOLIDARITY",
                            "TeamsRating": "21",
                            "TEIReferenceScore": "25",
                            "Result": "84.0"
                        }
                    },
                    {
                        "teiDimension": {
                            "Id": "5",
                            "Text": "FEEL GOOD CLIMATE",
                            "TeamsRating": "20",
                            "TEIReferenceScore": "25",
                            "Result": "80.0"
                        }
                    },
                    {
                        "teiDimension": {
                            "Id": "6",
                            "Text": "COLLABORATION",
                            "TeamsRating": "19",
                            "TEIReferenceScore": "25",
                            "Result": "76.0"
                        }
                    },
                    {
                        "teiDimension": {
                            "Id": "7",
                            "Text": "WORKING OUT LOUD",
                            "TeamsRating": "13",
                            "TEIReferenceScore": "15",
                            "Result": "86.7"
                        }
                    },
                    {
                        "teiDimension": {
                            "Id": "8",
                            "Text": "TENSION PROCESSING",
                            "TeamsRating": "16",
                            "TEIReferenceScore": "20",
                            "Result": "80.0"
                        }
                    },
                    {
                        "teiDimension": {
                            "Id": "9",
                            "Text": "TEAM MUSCLE",
                            "TeamsRating": "24",
                            "TEIReferenceScore": "30",
                            "Result": "80.0"
                        }
                    },
                    {
                        "teiDimension": {
                            "Id": "10",
                            "Text": "INFRASTRUCTURE",
                            "TeamsRating": "42",
                            "TEIReferenceScore": "50",
                            "Result": "84.0"
                        }
                    }
                ]
               }
    ]
    }


const UserDimensionsDataForAllDeparments = () => {
  const [isLoading, setisLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [departmentList, setdepartmentList] = useState([])
  const { selectedDashboardValues } = Navbarvalue()
  const {listOfDepartments}=useSelector((state)=>state.survey)

const dispatch =useDispatch()
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

  useEffect(() => {
    // Generate dynamic columns
    const generatedColumns = [
      { width: 200, label: 'Name', dataKey: 'RecipientName' },
      ...data?.recipientTEIResults[0]?.teiDimensionResult?.map((dimension) => ({
        width: 120,
        label: dimension.teiDimension.Text,
        dataKey: dimension.teiDimension.Text.replace(/\s+/g, ''), // Remove spaces for dataKey
        numeric: true,
      })),
      { width: 120, label: 'Team Average', dataKey: 'AverageResult', numeric: true },
    ];
    setColumns(generatedColumns);

    // Generate dynamic rows
    const generatedRows = data?.recipientTEIResults?.map((recipient) => {
        const baseRow = {
          RecipientName: recipient.teiProperties.RecipientName,
          AverageResult: recipient.teiProperties.AverageResult,
        };
        recipient.teiDimensionResult.forEach((dimension) => {
          baseRow[dimension.teiDimension.Text.replace(/\s+/g, '')] = dimension.teiDimension.Result;
        });
        return baseRow;
      });
   
    
   
    
    
    setRows(generatedRows);
  }, []);
  const handleSelectDepartment=(data)=>{

  }

  return (
    <>
      <div className="row m-0 p-0 justify-content-between mt-4">
        <div className="deparment-table-data col-md-12 p-0">
          <div className="mx-3  py-1 row justify-content-between bg-white shadow">
            <div className="col-md-5">
               <div className="d-flex align-items-center px-3" style={{ borderRadius: '5px 5px 0px 0px' }}>
              <div>
                <p className="ps-2 py-2 fs-6 fw-bold m-0">User Dimensions For All Department Report</p>
              </div>
              {/* <div className="d-flex align-items-center">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Download report file</Tooltip>}
                >
                  <small className="ps-2 py-2 fw-bold m-0" style={{ color: 'orange', cursor: 'pointer' }}>
                    Download
                  </small>
                </OverlayTrigger>
              </div> */}
            </div>
            </div>
            <div className="col-md-3 col-sm-4">
                          {departmentList?.length>0? 
 <DropdownButton items={departmentList} listKeyName={'columnValue'} onSelect={handleSelectDepartment} selectionName={departmentList[0]?.columnValue}/>
 :''
}
            </div>
           

          </div>
          <SurveyTable columns={columns} data={rows} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default UserDimensionsDataForAllDeparments;
