import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SurveyTable from '../../../components/table/SurveyTable';
import DropdownButton from '../../../components/mySurveyProWebsiteBtn/DropdownButton';
import { getListOfCoumnProperty } from '../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import { getDepartmentDimensionsTEISurveyReportApi } from '../../../Redux/slice/teiSlice';

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
  const [totalpages , settotalpages]=useState();

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
      fetchData(departmentList[0]?.columnValue,paginationData?.newRowsPerPage,paginationData?.currentPage);
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

    console.log("🚀 ~ UserDimensionsDataForAllDepartments ~ currentPage:", currentPage)
    console.log("🚀 ~ UserDimensionsDataForAllDepartments ~ newRowsPerPage:", newRowsPerPage)
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
        settotalpages(res?.payload.pagination.totalPages || []);


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
        AverageResult: recipient.teiProperties.AverageResult,
      };
      recipient.teiDimensionResult.forEach((dimension) => {
        baseRow[dimension.teiDimension.Text.replace(/\s+/g, '')] = dimension.teiDimension.Result;
      });
      return baseRow;
    });

    setRows(generatedRows);
  };

  return (
    <div className="row m-0 p-0 justify-content-between mt-4">
      <div className="deparment-table-data col-md-12 p-0">
        <div className="mx-3 py-1 row justify-content-between bg-white shadow">
          <div className="col-md-5">
            <div className="d-flex align-items-center px-3" style={{ borderRadius: '5px 5px 0px 0px' }}>
              <p className="ps-2 py-2 fs-6 fw-bold m-0">User Dimensions For All Department Report</p>
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
          <SurveyTable columns={columns} data={rows} isLoading={isLoading}    fetchData={getPaginationDataHandler} totalpages={totalpages} />
        ) : (
          <div className="text-center py-3">No data available. Please select a department.</div>
        )}
      </div>
    </div>
  );
};

export default UserDimensionsDataForAllDepartments;
