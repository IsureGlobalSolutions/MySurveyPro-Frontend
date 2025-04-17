import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import Loader from '../../../../components/plugins/Loader';
import { FunnelChartData } from '../../../../components/cartsComponents/FunnelChartData';
import DropdownButton from '../../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { getListOfCoumnProperty } from '../../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../../context/NavbarValuesContext';
import { getDepartmentDimensionsTEISurveyReportApi } from '../../../../Redux/slice/teiSlice';

const TeiUserDimensionForSingleDepartmentChart = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef(null);
  const [reportValues, setReportValues] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const { selectedDashboardValues } = Navbarvalue();
  const { listOfDepartments } = useSelector((state) => state.survey);

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
            setSelectedDepartment(departments[0]?.columnValue); // Default to the first department
          }
        })
        .catch((error) => console.error('Failed to fetch departments:', error));
    }
  }, [dispatch, selectedDashboardValues]);

  // Fetch data for the selected department
  useEffect(() => {
    if (selectedDepartment) {
      fetchDepartmentData(selectedDepartment);
    }
  }, [selectedDepartment]);

  const fetchDepartmentData = (department) => {
    setIsLoading(true);
    dispatch(
      getDepartmentDimensionsTEISurveyReportApi({
        surveyId: selectedDashboardValues?.survey?.id,
        columnProperty: department,
      })
    )
      .then((res) => {
        setResponseDataInTable(res?.payload || {});
      })
      .catch((error) => console.error('Failed to fetch department data:', error))
      .finally(() => setIsLoading(false));
  };

  const handleSelectDepartment = (data) => {
    setSelectedDepartment(data?.columnValue); // Update the selected department
  };

  // Prepare chart data
  const setResponseDataInTable = (data) => {
    if (data?.recipientTEIResults?.length > 0) {
      const transformedData = data.recipientTEIResults.map((recipient) => ({
        y: recipient.teiProperties.AverageResult,
        x: recipient.teiProperties.RecipientName,
      }));


     // Create an array of colors based on AverageResult values
    const colors = data.recipientTEIResults.map((recipient) => {
      const value = recipient.teiProperties.AverageResult;
      if (value >= 90) return "#045f03"; 
      if (value <= 90 && value>=80) return "#62c109"; 
      if (value <= 80 && value>=70) return "#8cc409"; 
      if (value <= 70 && value>=60) return "#d8dc07"; 
      if (value <= 60 && value>=50) return "#dc9207"; 
      if (value <= 50 && value>=40) return "#dc7207"; 
      if (value <= 40) return "#FFFF00"; // Yellow
      return "#FF0000"; // Red
    });

    // Update state with both data and colors
    setReportValues({ name: 'Funnel', data: transformedData, colors });
    } else {
      setReportValues(null); // Reset chart data if no data is available
    }
  };

  // Generate chart values
  const chartValues = FunnelChartData(reportValues);

  return (
   
<div className='ps-3'>
   <div className="age-card rounded-3 border p-3 shadow bg-white">
      <div className="d-flex justify-content-between">
        <div className="title d-flex align-items-center m-0">
          <p className="m-0 pb-3">Team Dimension Average Score</p>
        </div>
        <div className="d-flex align-items-center">
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
      <hr className="m-1" />
      <div className="" ref={chartRef}>
        {isLoading ? (
          <div className="loader-div d-flex justify-content-center align-items-center h-100">
            <Loader />
          </div>
        ) : reportValues ? (
          <Chart options={chartValues} series={chartValues?.series} type="bar" height={350} />
        ) : (
          <div className="text-center py-3">No data available. Please select a department.</div>
        )}
      </div>
    </div>
</div>
    
   
  );
};

export default TeiUserDimensionForSingleDepartmentChart;
