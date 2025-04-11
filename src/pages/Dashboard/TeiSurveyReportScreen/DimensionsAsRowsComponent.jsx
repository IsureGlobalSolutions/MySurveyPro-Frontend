import React, { useState, useEffect } from 'react';
import SurveyTable from '../../../components/table/SurveyTable';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import { getDepartmentDimensionsTEISurveyReportApi } from '../../../Redux/slice/teiSlice';
import Tooltip from '../../../components/Tooltip/Tooltip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
const DimensionsAsRowsComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null); // Track the selected department
  // const [totalpages , settotalpages]=useState();

  const { selectedDashboardValues } = Navbarvalue();
  const { listOfDepartments } = useSelector((state) => state.survey);

  const dispatch = useDispatch();

  // Fetch department list on component mount
  useEffect(() => {
    if (selectedDashboardValues?.survey?.id) {
      dispatch(
        getListOfCoumnProperty({
          surveyId: selectedDashboardValues?.survey?.id,
          columnProperty: 'department',
        })
      )
        .then((res) => {
          const departments = res?.payload || [];
          setDepartmentList(departments);
          if (departments.length > 0) {
            setSelectedDepartment(departments[0].columnValue); // Set default selected department
          }
        })
        .catch((error) => console.error('Failed to fetch departments:', error));
    }
  }, [dispatch, selectedDashboardValues]);
  const fetchData = (
    dimensionId,
    columnProperty, newRowsPerPage, currentPage
  ) => {

    if (selectedDepartment) {
      setIsLoading(true);
      dispatch(
        getDepartmentDimensionsTEISurveyReportApi({
          surveyId: selectedDashboardValues?.survey?.id,
          columnProperty: selectedDepartment,
          pageSize: newRowsPerPage,
          pageNumber: currentPage,
        })
      )
        .then((res) => {
          setResponseDataInTable(res?.payload || {});
 
         
        })
        .catch((error) => console.error('Failed to fetch department data:', error))
        .finally(() => setIsLoading(false));
    }
  }
  useEffect(() => {
    fetchData();
  }, [dispatch, selectedDashboardValues, selectedDepartment]);

  const handleSelectDepartment = (data) => {
    setSelectedDepartment(data?.columnValue);
  };

  const setResponseDataInTable = (data) => {
    if (data?.recipientTEIResults?.length > 0) {
      // Generate dynamic columns
      const generatedColumns = [
        { width: 300, label: 'Dimension', dataKey: 'Dimension' },
        ...data.recipientTEIResults.map((recipient) => ({
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
          row[recipient.teiProperties.RecipientName.replace(/\s+/g, '')] = `${matchingDimension}%`
            ? `${matchingDimension.teiDimension.Result}%`
            : null;
        });
        return row;
      });

      // Add "Average" row
      const averageRow = { Dimension: 'Average' };
      data.recipientTEIResults.forEach((recipient) => {
        averageRow[recipient.teiProperties.RecipientName.replace(/\s+/g, '')] = `${recipient.teiProperties.AverageResult}%`

      });
      generatedRows.push(averageRow);

      setRows(generatedRows);
    } else {
      setRows([]); // Clear rows if no data
    }
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
        `Dimensions_vs_Recipients_Report.xlsx` // File name
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
                <div>
                  <p className="ps-2 py-2 fs-6 fw-bold m-0">Dimensions vs Recipients Report</p>
                </div>
              </div>
              <div className="d-flex align-items-center">

                <Tooltip text={'Download report file'} style={{ width: '200px' }}>
                  <small className='ps-1 py-2  fw-bold m-0 ' style={{ color: 'orange', cursor: 'pointer' }} onClick={downloadTableReport}>Download</small>
                </Tooltip>
              </div>
            </div>
            <div className="col-md-3 col-sm-4">
              {departmentList?.length > 0 && (
                <DropdownButton
                  items={departmentList}
                  listKeyName={'columnValue'}
                  onSelect={handleSelectDepartment}
                  selectionName={selectedDepartment || departmentList[0]?.columnValue}
                />
              )}
            </div>
          </div>
          <SurveyTable columns={columns} data={rows} isLoading={isLoading}
            fetchData={fetchData}
          //  totalpages={totalpages}
          />
        </div>
      </div>
    </>
  );
};

export default DimensionsAsRowsComponent;
