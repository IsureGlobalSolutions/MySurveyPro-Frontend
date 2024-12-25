import React, { useState, useEffect } from 'react';
import SurveyTable from '../../../components/table/SurveyTable';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import { getDepartmentDimensionsTEISurveyReportApi } from '../../../Redux/slice/teiSlice';

const DimensionsAsRowsComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null); // Track the selected department

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

  // Fetch data for the selected department
  useEffect(() => {
    if (selectedDepartment) {
      setIsLoading(true);
      dispatch(
        getDepartmentDimensionsTEISurveyReportApi({
          surveyId: selectedDashboardValues?.survey?.id,
          columnProperty: selectedDepartment,
        })
      )
        .then((res) => {
          setResponseDataInTable(res?.payload || {});
        })
        .catch((error) => console.error('Failed to fetch department data:', error))
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, selectedDashboardValues, selectedDepartment]);

  const handleSelectDepartment = (data) => {
    setSelectedDepartment(data?.columnValue); // Update selected department
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
    } else {
      setRows([]); // Clear rows if no data
    }
  };

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
          <SurveyTable columns={columns} data={rows} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default DimensionsAsRowsComponent;
