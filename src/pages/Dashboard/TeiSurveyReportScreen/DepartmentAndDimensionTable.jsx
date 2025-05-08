import React, { useState, useEffect } from 'react';
import SurveyTable from '../../../components/table/SurveyTable';
import { useDispatch, useSelector } from 'react-redux';
import { DownLoadDepartmentQuestionReportApi, TeiDimensionListApi, userSingleDimensionForSingleDepartmentReportApi } from '../../../Redux/slice/teiSlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
import Tooltip from '../../../components/Tooltip/Tooltip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './Report.css';
import DownloadReportIcon from '../../../assets/dashboredsvg/download_report_icon.svg?react';
const DepartmentAndDimensionTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const { selectedDashboardValues } = Navbarvalue();
  const { listOfDimensions, userSingleDimensionForSingleDepartmentReportList } = useSelector((state) => state.teiSurvey);

  // const [totalpages , settotalpages]=useState();
  const [selectedOption, setSelectedOption] = useState({
    dimensionId: null,
    columnProperty: null,
    dimension:null
  });

  // Fetch dimensions and department list
  useEffect(() => {
    if (selectedDashboardValues?.survey?.id) {
      dispatch(TeiDimensionListApi(selectedDashboardValues?.survey?.id));
      dispatch(getListOfCoumnProperty({ surveyId: selectedDashboardValues?.survey?.id, columnProperty: 'department' }))
        .then((res) => {

          setDepartmentList(res?.payload || []);
        });
    }
  }, [dispatch, selectedDashboardValues]);

  // Set default selected option when data loads
  useEffect(() => {
    if (listOfDimensions?.length > 0 && departmentList?.length > 0) {
      const defaultDimensionId = listOfDimensions[0]?.id;
      const defaultColumnProperty = departmentList[0]?.columnValue;
      const defaultDimension = listOfDimensions[0]?.dimension

      setSelectedOption({ dimensionId: defaultDimensionId,
         columnProperty: defaultColumnProperty, 
        dimension:defaultDimension
        });

      // Fetch initial data
      fetchData(defaultDimensionId, defaultColumnProperty);
    }
  }, [listOfDimensions, departmentList]);

  // Fetch data based on selected options
  const fetchData = (
    dimensionId,
    columnProperty,
    newRowsPerPage,
    currentPage
  ) => {
    setIsLoading(true);
    dispatch(
      userSingleDimensionForSingleDepartmentReportApi({
        surveyId: selectedDashboardValues?.survey?.id,
        dimensionId,
        columnProperty,
        pageSize: newRowsPerPage,
        pageNumber: currentPage,
      })
    )
      .then((res) => {
        // settotalpages(res?.payload.pagination.totalPages || [])
        setResponseDataInTable(res?.payload?.data || []);

      })
      .finally(() => setIsLoading(false));
  };

  const handleSelectDepartment = (data) => {
    const updatedColumnProperty = data?.columnValue;
    setSelectedOption((prev) => ({ ...prev, columnProperty: updatedColumnProperty }));
    fetchData(selectedOption.dimensionId, updatedColumnProperty);
  };

  const handleSelectDimension = (data) => {
    const updatedDimensionId = data?.id;
    setSelectedOption((prev) => ({ ...prev, dimensionId: updatedDimensionId,dimension:data?.dimension }));
    fetchData(updatedDimensionId, selectedOption.columnProperty);
  };

  const setResponseDataInTable = (data) => {
    if (data?.length > 0) {
      const generatedColumns = [
        { width: 300, label: 'Recipient Name', dataKey: 'RecipientName' },
        ...(data[0]?.teiDimensionResult[0]?.questionResultDto || []).map((q, index) => ({
          width: 200,
          label: q.question.Text,
          dataKey: `Question${index + 1}`,
        })),
        { width: 120, label: 'Team Rating', dataKey: 'TeamsRating', numeric: true },
        { width: 120, label: 'TEI Reference Score', dataKey: 'TEIReferenceScore', numeric: true },
        { width: 120, label: 'Result', dataKey: 'Result', numeric: true },
      ];
      setColumns(generatedColumns);

      const generatedRows = data.map((item) => {

        const baseRow = {
          RecipientName: item?.teiProperties?.RecipientName,
          TeamsRating: item?.teiDimensionResult[0]?.teiDimension?.TeamsRating,
          TEIReferenceScore: item?.teiDimensionResult[0]?.teiDimension?.TEIReferenceScore,
          Result: `${item?.teiDimensionResult[0]?.teiDimension?.Result}%`,
        };
        item?.teiDimensionResult[0]?.questionResultDto.forEach((q, index) => {
          baseRow[`Question${index + 1}`] = Object.values(q.choicesResult)[0];
        });
        return baseRow;
      });

      setRows(generatedRows);
    } else {
      setRows([]);
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
        `Department(${selectedOption?.columnProperty}) report for a dimension(${selectedOption?.dimension}).xlsx` // File name
      );
    } else {
      console.error('No data available for download');
    }
  };
  
  return (
    <>
      <div className="table-card-background  row  justify-content-between">
        <div className="deparment-table-data col-md-12 p-0">
          <div className="mx-0 py-2 d-flex justify-content-between ">
            <div className=" d-flex">
              <div className="d-flex align-items-center " style={{ borderRadius: '5px 5px 0px 0px' }}>
                <p className=" table-heading ps-2 py-2  m-0">Department report for a dimension</p>
              </div>
             
            </div>
            <div className="d-flex gap-3 px-2">
                <div className="d-flex gap-2">
                              <div className="downlaod-report-icon d-flex align-items-center">
                                <Tooltip
                                  text={"Download report file"}
                                  style={{ width: "200px" }}
                                >
                                 
                                  <DownloadReportIcon style={{cursor: "pointer" }}  onClick={downloadTableReport}/>
                                </Tooltip>
                              </div>
                            </div>
               <div className=" d-flex gap-2">
              {departmentList?.length > 0 && (
                <DropdownButton
                  items={departmentList}
                  listKeyName={'columnValue'}
                   style={{ width: "200px" }}
                  onSelect={handleSelectDepartment}
                  selectionName={selectedOption.columnProperty || departmentList[0]?.columnValue}
                />
              )}
              {listOfDimensions?.length > 0 && (
                <DropdownButton
                  items={listOfDimensions}
                  listKeyName={'dimension'}
                  style={{ width: "200px" }}
                  onSelect={handleSelectDimension}
                  selectionName={selectedOption.dimensionId || listOfDimensions[0]?.dimension}
                />
              )}
            </div>
            </div>
           
          </div>
          <SurveyTable columns={columns} data={rows} isLoading={isLoading}
            dimensionId={selectedOption.dimensionId}
            columnProperty={selectedOption.columnProperty}
            fetchData={fetchData}
          // totalpages={totalpages}
          />
        </div>
      </div>
    </>
  );
};

export default DepartmentAndDimensionTable;
