import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SurveyTable from '../../../components/table/SurveyTable';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import { getDepartmentDimensionsTEISurveyReportApi } from '../../../Redux/slice/teiSlice';
import { object } from 'prop-types';
import Tooltip from '../../../components/Tooltip/Tooltip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
const UserDimensionsDataForAllDepartments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [paginationData, setpaginationData] = useState({ newRowsPerPage:10,
    currentPage: 1
})
  const { selectedDashboardValues } = Navbarvalue();
  const { listOfDepartments } = useSelector((state) => state.survey); 
  const [selectedDepartment, setselectedDepartment] = useState('')
  // const [totalpages , settotalpages]=useState();

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch department list on initial load if survey ID exists
    if (selectedDashboardValues?.survey?.id) {
      setIsLoading(true);
      if (listOfDepartments?.length > 0) {
        setDepartmentList(listOfDepartments);
        setselectedDepartment(listOfDepartments[0]?.columnValue)
      } else {
        dispatch(getListOfCoumnProperty({ surveyId: selectedDashboardValues?.survey?.id, columnProperty: 'department' }))
          .then((res) => {
            setDepartmentList(res?.payload || []);
            setselectedDepartment(res?.payload[0]?.columnValue)
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [selectedDashboardValues, listOfDepartments, dispatch]);

  useEffect(() => {
    // Fetch data for the first department in the list
    if (departmentList?.length > 0 && selectedDashboardValues?.survey?.id) {
      fetchData(departmentList[0]?.columnValue,
        paginationData?.newRowsPerPage,
        paginationData?.currentPage);
    }
  }, [departmentList]);



  const handleSelectDepartment = (data) => {
    fetchData(data?.columnValue,paginationData?.newRowsPerPage,paginationData?.currentPage);
    setselectedDepartment(data?.columnValue)
  };

const getPaginationDataHandler=(...params)=>{

setpaginationData((prev)=>({
  ...prev,
  newRowsPerPage:params[2],
     currentPage: params[3]
}))

fetchData(selectedDepartment,params[2],params[3])

}


  const fetchData = (    
     department,
     newRowsPerPage, 
     currentPage, 


  ) => {


    setIsLoading(true);
    dispatch(
      getDepartmentDimensionsTEISurveyReportApi({
        surveyId: selectedDashboardValues?.survey?.id,
        columnProperty:department,
        pageSize: newRowsPerPage,
        pageNumber:currentPage,
      })
    )
      .then((res) => {

        setResponseDataInTable(res?.payload || {});
        console.log('users dimension data',res?.payload);
        
        // settotalpages(res?.payload.pagination.totalPages || []);


      })
      .finally(() => setIsLoading(false));
  };



  const setResponseDataInTable = (data) => {
    // Generate dynamic columns
    const generatedColumns = [
      { width: 200, label: 'Name', dataKey: 'RecipientName' },
      ...(data?.recipientTEIResults[0]?.teiDimensionResult || []).map((dimension) => ({
        width: 120,
        label: dimension.teiDimension.Text,
        dataKey: dimension.teiDimension.Text.replace(/\s+/g, ''), // Remove spaces for dataKey
        numeric: true,
      })),
      { width: 120, label: 'Team Average', dataKey: 'AverageResult', numeric: true },
    ];
    setColumns(generatedColumns);

    // Generate dynamic rows
    const generatedRows = (data?.recipientTEIResults || []).map((recipient) => {
      const baseRow = {
        RecipientName: recipient.teiProperties.RecipientName,
        AverageResult: `${recipient.teiProperties.AverageResult}%`,
      };
      recipient.teiDimensionResult.forEach((dimension) => {
        baseRow[dimension.teiDimension.Text.replace(/\s+/g, '')] =`${dimension.teiDimension.Result}%` ;
      });
      return baseRow;
    });

 // Generate the summary row


   const totalSum = data?.dimensionTeamAverages?.reduce((sum, item) => {
   
    const value = parseFloat(Object.values(item)[0]) || 0; // Extract the value from the object and parse as number
    return sum + value;
  }, 0);  
  const averagePercentage = (totalSum /  data?.dimensionTeamAverages?.length).toFixed(2);
   const summaryRow = { 
    RecipientName: 'Average',
    AverageResult:`${averagePercentage}%`
  };
  (data?.dimensionTeamAverages || []).forEach((average) => {
   const [key, value] = Object.entries(average)[0]; 
   summaryRow[key.replace(/\s+/g, '')] =`${value}%` ; 
  });

 // Add summary row to the generated rows
 generatedRows.push(summaryRow);
     

    setRows(generatedRows);
  };
  const downloadTableReport = () => {
    if (rows?.length > 0 && columns?.length > 0) {
      // Transform rows to match table display structure
      const formattedData = rows.map((row) => {
        const rowData = {};
        columns.forEach((col) => {
          rowData[col.label] = row[col.dataKey] || ''; // Use column label as key
        });
        return rowData;
      });
  
      // Create a new worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
  
      // Calculate column widths dynamically
      const columnWidths = columns.map((col) => {
        const maxWidth = formattedData.reduce(
          (max, row) => Math.max(max, (row[col.label]?.toString()?.length || 0)),
          col.label.length // Include header length as a minimum width
        );
        return { wch: maxWidth + 2 }; // Add padding for better readability
      });
  
      // Assign column widths
      worksheet['!cols'] = columnWidths;
  
      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Dimensions vs Recipients Report');
  
      // Convert workbook to binary array and trigger download
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAs(
        new Blob([excelData], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
        `Dimensions(${selectedDepartment}) For All Department Report` // File name
      );
    } else {
      console.error('No data available for download');
    }
  };
  
  
  return (
    <div className="row m-0 p-0 justify-content-between mt-4">
      <div className="deparment-table-data col-md-12 p-0">
        <div className="mx-3 py-1 row justify-content-between bg-white shadow">
          <div className="col-md-5 d-flex">
            <div className="d-flex align-items-center px-3" style={{ borderRadius: '5px 5px 0px 0px' }}>
              <p className="ps-2 py-2 fs-6 fw-bold m-0">User Dimensions For All Department Report</p>
            </div>
            <div className="d-flex align-items-center">

<Tooltip text={'Download report file'} style={{ width: '200px' }}>
  <small className='ps-1 py-2  fw-bold m-0 ' style={{ color: 'orange', cursor: 'pointer' }} onClick={downloadTableReport}>Download</small>
</Tooltip>
</div>
          </div>
          <div className="col-md-3 col-sm-4">
            {departmentList?.length > 0 ? (
              <DropdownButton
                items={departmentList}
                listKeyName={'columnValue'}
                onSelect={handleSelectDepartment}
                selectionName={departmentList[0]?.columnValue}
              />
            ) : (
              <p>No departments available</p>
            )}
          </div>
        </div>
        {rows?.length > 0 ? (
          <SurveyTable columns={columns} data={rows} isLoading={isLoading}   
           fetchData={getPaginationDataHandler}
            // totalpages={totalpages}
             />
        ) : (
          <div className="text-center py-3">No data available. Please select a department.</div>
        )}
      </div>
    </div>
  );
};

export default UserDimensionsDataForAllDepartments;
