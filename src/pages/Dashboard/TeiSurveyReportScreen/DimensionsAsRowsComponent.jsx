import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import SurveyTable from '../../../components/table/SurveyTable';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';

const data = {
    recipientTEIResults: [
      {
        teiProperties: {
          RecipientId: '1',
          RecipientName: 'Aisha Arif',
          TeamsName: 'QA',
          AverageResult: '82.5',
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
          },
          {
            teiDimension: {
              Id: '2',
              Text: 'ROLE CLARITY',
              TeamsRating: '21',
              TEIReferenceScore: '25',
              Result: '84.0',
            },
          },
          {
            teiDimension: {
              Id: '3',
              Text: 'LEADERSHIP',
              TeamsRating: '18',
              TEIReferenceScore: '20',
              Result: '90.0',
            },
          },
          {
            teiDimension: {
              Id: '4',
              Text: 'SOLIDARITY',
              TeamsRating: '21',
              TEIReferenceScore: '25',
              Result: '84.0',
            },
          },
          {
            teiDimension: {
              Id: '5',
              Text: 'FEEL GOOD CLIMATE',
              TeamsRating: '20',
              TEIReferenceScore: '25',
              Result: '80.0',
            },
          },
        ],
      },
      {
        teiProperties: {
          RecipientId: '2',
          RecipientName: 'John Doe',
          TeamsName: 'DevOps',
          AverageResult: '85.0',
        },
        teiDimensionResult: [
          {
            teiDimension: {
              Id: '1',
              Text: 'MISSION DRIVEN',
              TeamsRating: '18',
              TEIReferenceScore: '20',
              Result: '90.0',
            },
          },
          {
            teiDimension: {
              Id: '2',
              Text: 'ROLE CLARITY',
              TeamsRating: '20',
              TEIReferenceScore: '25',
              Result: '80.0',
            },
          },
          {
            teiDimension: {
              Id: '3',
              Text: 'LEADERSHIP',
              TeamsRating: '17',
              TEIReferenceScore: '20',
              Result: '85.0',
            },
          },
          {
            teiDimension: {
              Id: '4',
              Text: 'SOLIDARITY',
              TeamsRating: '23',
              TEIReferenceScore: '25',
              Result: '92.0',
            },
          },
          {
            teiDimension: {
              Id: '5',
              Text: 'FEEL GOOD CLIMATE',
              TeamsRating: '19',
              TEIReferenceScore: '25',
              Result: '76.0',
            },
          },
        ],
      },
    ],
  }


const DimensionsAsRowsComponent = () => {
  const [isLoading, setisLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const { selectedDashboardValues } = Navbarvalue()
  const [departmentList, setdepartmentList] = useState([])
  const {listOfDepartments}=useSelector((state)=>state.survey)

const dispatch = useDispatch()


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
      { width: 300, label: 'Dimension', dataKey: 'Dimension' },
      ...data?.recipientTEIResults.map((recipient) => ({
        width: 120,
        label: recipient.teiProperties.RecipientName,
        dataKey: recipient.teiProperties.RecipientName.replace(/\s+/g, ''), // Remove spaces for dataKey
        numeric: true,
      })),
    ];
    setColumns(generatedColumns);

    // Generate dynamic rows
    const allDimensions = data.recipientTEIResults[0].teiDimensionResult.map(
      (dimension) => dimension.teiDimension.Text
    );

    const generatedRows = allDimensions.map((dimensionText) => {
      const row = { Dimension: dimensionText };
      data.recipientTEIResults.forEach((recipient) => {
        const matchingDimension = recipient.teiDimensionResult.find(
          (dim) => dim.teiDimension.Text === dimensionText
        );
        row[recipient.teiProperties.RecipientName.replace(/\s+/g, '')] = matchingDimension
          ? matchingDimension.teiDimension.Result
          : null;
      });
      return row;
    });

    // Add "Average" row
    const averageRow = { Dimension: 'Average' };
    data.recipientTEIResults.forEach((recipient) => {
      averageRow[recipient.teiProperties.RecipientName.replace(/\s+/g, '')] =
        recipient.teiProperties.AverageResult;
    });
    generatedRows.push(averageRow);

    setRows(generatedRows);
  }, []);


  const handleSelectDepartment=(data)=>{

  }
  return (
    <>
      <div className="row m-0 p-0 justify-content-between mt-4">
        <div className="deparment-table-data col-md-12 p-0">
          <div className="mx-3 py-1 row justify-content-between bg-white shadow">
            <div className="col-md-5">
                 <div className="d-flex align-items-center px-3" style={{ borderRadius: '5px 5px 0px 0px' }}>
              <div>
                <p className="ps-2 py-2 fs-6 fw-bold m-0">Dimensions vs Recipients Report</p>
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

export default DimensionsAsRowsComponent;
