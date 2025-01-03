import React, { useState, useEffect } from 'react';
import SurveyTable from '../../../components/table/SurveyTable';
import { useDispatch, useSelector } from 'react-redux';
import { TeiDimensionListApi, userSingleDimensionForSingleDepartmentReportApi } from '../../../Redux/slice/teiSlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
const DepartmentAndDimensionTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const { selectedDashboardValues } = Navbarvalue();
  const { listOfDimensions, userSingleDimensionForSingleDepartmentReportList } = useSelector((state) => state.teiSurvey);

  const [totalpages , settotalpages]=useState();
  const [selectedOption, setSelectedOption] = useState({
    dimensionId: null,
    columnProperty: null,
  });

  // Fetch dimensions and department list
  useEffect(() => {
    if (selectedDashboardValues?.survey?.id) {
      dispatch(TeiDimensionListApi(selectedDashboardValues?.survey?.id));
      dispatch(getListOfCoumnProperty({ surveyId: selectedDashboardValues?.survey?.id, columnProperty: 'department' }))
        .then((res) => {
          console.log(res , "resppppppppp");
          setDepartmentList(res?.payload || []);
        });
    }
  }, [dispatch, selectedDashboardValues]);

  // Set default selected option when data loads
  useEffect(() => {
    if (listOfDimensions?.length > 0 && departmentList?.length > 0) {
      const defaultDimensionId = listOfDimensions[0]?.id;
      const defaultColumnProperty = departmentList[0]?.columnValue;

      setSelectedOption({ dimensionId: defaultDimensionId, columnProperty: defaultColumnProperty });

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
        pageNumber:currentPage,
      })
    )
      .then((res) => {
        settotalpages(res?.payload.pagination.totalPages || [])
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
    setSelectedOption((prev) => ({ ...prev, dimensionId: updatedDimensionId }));
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
          Result: item?.teiDimensionResult[0]?.teiDimension?.Result,
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

  
  return (
    <>
      <div className="row m-0 p-0 justify-content-between mt-3">
        <div className="deparment-table-data col-md-12 p-0">
          <div className="mx-3 py-1 row justify-content-between bg-white shadow">
            <div className="col-md-5">
              <div className="d-flex align-items-center px-3" style={{ borderRadius: '5px 5px 0px 0px' }}>
                <p className="ps-2 py-2 fs-6 fw-bold m-0">Department Questions Report</p>
              </div>
            </div>
            <div className="col-md-5 d-flex gap-2">
              {departmentList?.length > 0 && (
                <DropdownButton
                  items={departmentList}
                  listKeyName={'columnValue'}
                  onSelect={handleSelectDepartment}
                  selectionName={selectedOption.columnProperty || departmentList[0]?.columnValue}
                />
              )}
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
          <SurveyTable columns={columns} data={rows} isLoading={isLoading}  dimensionId={selectedOption.dimensionId}
  columnProperty={selectedOption.columnProperty}   fetchData={fetchData} totalpages={totalpages}
/>
        </div>
      </div>
    </>
  );
};

export default DepartmentAndDimensionTable;
