import React, { useState, useEffect } from 'react';
import SurveyTable from '../../../components/table/SurveyTable';
import { useDispatch, useSelector } from 'react-redux';
import { TeiDimensionListApi, userSingleDimensionForSingleDepartmentReportApi } from '../../../Redux/slice/teiSlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';

const DimensionDataForAllDepartment = () => {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const { selectedDashboardValues } = Navbarvalue();
  const { listOfDimensions, userSingleDimensionForSingleDepartmentReportList } = useSelector((state) => state.teiSurvey);

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
     

      setSelectedOption({ dimensionId: defaultDimensionId });

      // Fetch initial data
      fetchData(defaultDimensionId);
    }
  }, [listOfDimensions]);

  // Fetch data based on selected options
  const fetchData = (dimensionId) => {
    setIsLoading(true);
    dispatch(
      userSingleDimensionForSingleDepartmentReportApi({
        surveyId: selectedDashboardValues?.survey?.id,
        dimensionId,
       
      })
    )
    
      .then((res) => {
        setResponseDataInTable(res?.payload?.data || []);
      })
      .finally(() => setIsLoading(false));
  };

  

  const handleSelectDimension = (data) => {
    const updatedDimensionId = data?.id;
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
     
          ResultPercentage:item?.teiProperties?.AverageResult,
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

        ResultPercentage: averagePercentage, 
      };
  
      // Add summary row to the generated rows
      generatedRows.push(summaryRow);
  
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
                <p className="ps-2 py-2 fs-6 fw-bold m-0">Dimension report for all department</p>
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
