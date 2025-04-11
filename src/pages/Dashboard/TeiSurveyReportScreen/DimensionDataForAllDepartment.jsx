import React, { useState, useEffect } from 'react';
import SurveyTable from '../../../components/table/SurveyTable';
import { useDispatch, useSelector } from 'react-redux';
import { DepartmentalDimensionAverageReportApi, TeiDimensionListApi, userSingleDimensionForAllDepartmentReportApi } from '../../../Redux/slice/teiSlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
import Tooltip from '../../../components/Tooltip/Tooltip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
const DimensionDataForAllDepartment = () => {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const { selectedDashboardValues } = Navbarvalue();
  const { listOfDimensions } = useSelector((state) => state.teiSurvey);
const [downloadData, setdownloadData] = useState([])
const [SelectedDimension, setSelectedDimension] = useState()
  // Selected options for department and dimension
  const [selectedOption, setSelectedOption] = useState({
    dimensionId: null,
   
  });

  // Fetch dimensions and department list
  useEffect(() => {
    if (selectedDashboardValues?.survey?.id) {
      dispatch(TeiDimensionListApi(selectedDashboardValues?.survey?.id));
     
    }
  }, [dispatch, selectedDashboardValues]);

  // Set default selected option when data loads
  useEffect(() => {
    if (listOfDimensions?.length > 0) {
      const defaultDimensionId = listOfDimensions[0]?.id;
     
setSelectedDimension(listOfDimensions[0]?.dimension)
      setSelectedOption({ dimensionId: defaultDimensionId });

      // Fetch initial data
      fetchData(defaultDimensionId);
    }
  }, [listOfDimensions]);

  // Fetch data based on selected options
  const fetchData = (dimensionId) => {
    setIsLoading(true);
    dispatch(
      userSingleDimensionForAllDepartmentReportApi({
        surveyId: selectedDashboardValues?.survey?.id,
        dimensionId,
       
      })
    )
    
    .then((res) => {
      const responseData = res?.payload?.data || [];
      setResponseDataInTable(responseData);

      // Properly update the downloadData state
      setdownloadData(() =>
        responseData.map((element) => ({
        
          'Recipient Name': element?.teiProperties?.RecipientName,
          Department: element?.teiProperties?.TeamsName,
         'Average Result %': element?.teiProperties?.AverageResult,
        }))
      );
    })
      .finally(() => setIsLoading(false));
  };

  

  const handleSelectDimension = (data) => {
    const updatedDimensionId = data?.id;
    setSelectedDimension(data?.dimension)
    setSelectedOption((prev) => ({ ...prev, dimensionId: updatedDimensionId }));
    fetchData(updatedDimensionId);
  };

  const setResponseDataInTable = (data) => {
    if (data?.length > 0) {
      const generatedColumns = [
        { width: 300, label: 'Recipient Name', dataKey: 'RecipientName' },
        { width: 120, label: 'Department', dataKey: 'TeamName', numeric: true },
        
        { width: 120, label: 'Average Result %', dataKey: 'ResultPercentage', numeric: true },
      ];
      setColumns(generatedColumns);
  
      // Generate rows dynamically
      const generatedRows = data.map((item) => {
        return {
          RecipientName: item?.teiProperties?.RecipientName,
          TeamName: item?.teiProperties?.TeamsName,
     
          ResultPercentage:`${item?.teiProperties?.AverageResult}%`,
        };
      });
  
      // Calculate the final row (sum and average percentage)
      const totalSum = data.reduce((sum, item) => {
        const value = parseFloat(item?.teiProperties?.AverageResult) || 0; 
        return sum + value;
      }, 0); 
      const averagePercentage = (totalSum / data.length).toFixed(2);
  
      const summaryRow = {
        RecipientName: 'Summary (All Departments)',
        TeamName: 'N/A',

        ResultPercentage:`${averagePercentage}%` , 
      };
  
      // Add summary row to the generated rows
      generatedRows.push(summaryRow);
  
      setRows(generatedRows);
    } else {
      setRows([]);
    }
  };

  const downloadTableReport = () => {
    if (downloadData?.length > 0) {
  
      // Create a new workbook and worksheet
      const worksheet = XLSX.utils.json_to_sheet(downloadData);


 // Calculate column widths dynamically
 const columnWidths = Object.keys(downloadData[0]).map((key) => {
  const maxWidth = downloadData.reduce(
    (max, row) => Math.max(max, (row[key]?.toString()?.length || 0)),
    key.length // Include header length as a minimum width
  );
  return { wch: maxWidth + 2 }; // Add some padding for readability
});

// Assign column widths
worksheet['!cols'] = columnWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  
      // Convert the workbook to a binary array
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
      // Trigger file download using FileSaver
      saveAs(
        new Blob([excelData], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
        `Dimension(${SelectedDimension}) report for all department.xlsx` // File name
      );
    } else {
      console.error('No data available for download');
    }
  };

  return (
    <>
      <div className="row m-0 p-0 justify-content-between mt-3">
        <div className="deparment-table-data col-md-12 p-0">
          <div className="mx-3 py-2 row justify-content-between bg-white shadow me-0 rounded-top-3">
            <div className="col-md-5 d-flex">
              <div className="d-flex align-items-center px-3" style={{ borderRadius: '5px 5px 0px 0px' }}>
                <p className="ps-2 py-2 fs-6 fw-bold m-0">Dimension report for all department</p>
              </div>
              <div className="d-flex align-items-center">

<Tooltip text={'Download report file'} style={{ width: '200px' }}>
  <small className='ps-1 py-2  fw-bold m-0 ' style={{ color: 'orange', cursor: 'pointer' }} onClick={downloadTableReport}>Download</small>
</Tooltip>
</div>
            </div>
            <div className="col-md-3 col-sm-4 d-flex gap-2">
         
              {listOfDimensions?.length > 0 && (
                <DropdownButton
                  items={listOfDimensions}
                  listKeyName={'dimension'}
                  onSelect={handleSelectDimension}
                  selectionName={selectedOption.dimensionId || listOfDimensions[0]?.dimension}
                />
              )}
            </div>
          </div>
          <SurveyTable columns={columns} data={rows} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default DimensionDataForAllDepartment;
