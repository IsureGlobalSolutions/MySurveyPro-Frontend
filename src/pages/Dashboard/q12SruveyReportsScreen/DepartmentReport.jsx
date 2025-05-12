import React, { useEffect, useState } from "react";
import SurveyTable from "../../../components/table/SurveyTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getListOfCoumnProperty,
  getDepartmentQuestionsReport,
  downloadColumnWiseReport,
} from "../../../Redux/slice/surveySlice";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Navbarvalue } from "../../../context/NavbarValuesContext";
import DropdownButton from "../../../components/mySurveyProWebsiteBtn/DropdownButton";
import DepartmentCharts from "./chats/departmentCharts/DepartmentCharts";
import DownloadReportIcon from "../../../assets/dashboredsvg/download_report_icon.svg?react";
import "../TeiSurveyReportScreen/Report.css";
const DepartmentReport = () => {
  const dispatch = useDispatch();
  const { selectedDashboardValues, DashboardStateHandler } = Navbarvalue();
  const [isLoading, setisLoading] = useState(false);
  const [listOfDepartment, setlistOfDepartment] = useState([]);
  //useContext value for selected department
  const [getDepartmentQuestinsSurveyData, setgetDepartmentQuestinsSurveyData] =
    useState([]);
  const { paymentStatus } = useSelector((state) => state.survey);

  const questionLabel = "Questions";
  const questionDataKey = "question";

  const showSelectedValues = (value) => {
    if (value && value != "All") {
      setisLoading(true);
      dispatch(
        getDepartmentQuestionsReport({
          surveyId: selectedDashboardValues?.survey?.id,
          department: value,
        })
      ).then((res) => {
        setisLoading(false);
        setgetDepartmentQuestinsSurveyData(res?.payload);
      });
    } else if (!value || value === "All") {
      //get the report of all the departments
      setisLoading(true);
      dispatch(
        getDepartmentQuestionsReport({
          surveyId: selectedDashboardValues?.survey?.id,
        })
      ).then((res) => {
        setisLoading(false);
        setgetDepartmentQuestinsSurveyData(res?.payload);
      });
    }
  };

  useEffect(() => {
    if (
      selectedDashboardValues?.survey?.id &&
      paymentStatus[selectedDashboardValues?.survey?.id].paymentStatus === true
    ) {
      dispatch(
        getListOfCoumnProperty({
          surveyId: selectedDashboardValues?.survey?.id,
          columnProperty: "department",
        })
      ).then((res) => {
        const departments = [{ columnValue: "All" }, ...res?.payload];
        setlistOfDepartment(departments);
        showSelectedValues(
          selectedDashboardValues?.department
            ? selectedDashboardValues?.department
            : departments[0].columnValue
        );
      });
    }
  }, [paymentStatus, selectedDashboardValues?.survey?.id]);

  const handleSelect = (data) => {
    DashboardStateHandler("department", data?.columnValue);
  };

  useEffect(() => {
    if (selectedDashboardValues?.department) {
      showSelectedValues(selectedDashboardValues?.department);
    }
  }, [selectedDashboardValues?.department]);

  //get over all survey report data

  // Utility function to convert a label to camelCase dataKey
  const toCamelCase = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, "");
  };

  let columns = [
    { width: 300, label: questionLabel, dataKey: questionDataKey },
  ];

  // Extracting choices labels and creating columns dynamically
  if (
    getDepartmentQuestinsSurveyData?.length > 0 &&
    getDepartmentQuestinsSurveyData[0]?.responsesReport
  ) {
    Object.keys(getDepartmentQuestinsSurveyData[0].responsesReport).forEach(
      (choice) => {
        columns.push({
          width: 120,
          label: choice,
          dataKey: toCamelCase(choice),
          numeric: true,
        });
      }
    );
  } else {
    columns = null;
  }

  // Map the API response to the required data structure for SurveyTable

  let data = Array.isArray(getDepartmentQuestinsSurveyData)
    ? getDepartmentQuestinsSurveyData?.length > 0
      ? getDepartmentQuestinsSurveyData?.map((item) => {
          const rowData = {
            [questionDataKey]: item.question.Text,
          };

          // Assigning the choicesResult values to corresponding dataKeys
          Object.keys(item?.responsesReport).forEach((choice) => {
            rowData[toCamelCase(choice)] = item.responsesReport[choice];
          });

          return rowData;
        })
      : null
    : null;

  const downloadReport = () => {
    if (getDepartmentQuestinsSurveyData?.length > 0) {
      dispatch(downloadColumnWiseReport(getDepartmentQuestinsSurveyData)).then(
        (res) => {
          const blob = new Blob([res?.payload], {
            type: "text/csv;charset=utf-8;",
          });
          saveAs(
            blob,
            `department(${
              selectedDashboardValues?.department
                ? selectedDashboardValues?.department
                : "All"
            })_survey_report.csv`
          );
        }
      );
    } else {
      toast.error("data not Found");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="deparment-table-data table-card-background   w-50">
          <div className=" py-1 d-flex justify-content-between ">
            <div className="d-flex align-items-center  "
              style={{ borderRadius: "5px 5px 0px 0px" }}
            >
              <div className="">
                <p className="ps-2 py-2 table-heading m-0 ">
                  Department Questions Report
                </p>
              </div>
            </div>
<div className="d-flex gap-2">
<div className="d-flex align-items-center justify-content-center">
                 <div className="downlaod-report-icon d-flex align-items-center">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      Download report file
                    </Tooltip>
                  }
                >
                  <DownloadReportIcon
                    style={{ cursor: "pointer" }}
                    onClick={downloadReport}
                  />
                </OverlayTrigger>
              </div>
              </div> 
               <div className=" py-2 pe-2">
              <DropdownButton
                items={listOfDepartment}
                listKeyName={"columnValue"}
                onSelect={handleSelect}
                style={{width:'100px'}}
                selectionName={"All"}
              />
            </div>
</div>
          
          </div>

          <SurveyTable
            columns={
              columns
                ? columns
                : [
                    { width: 300, label: "Questions", dataKey: "Questions" },
                    {
                      width: 120,
                      label: "Actively Engaged",
                      dataKey: "activelyEngaged",
                      numeric: true,
                    },
                    {
                      width: 120,
                      label: "Actively Disengaged",
                      dataKey: "activelyDisengaged",
                      numeric: true,
                    },
                    {
                      width: 120,
                      label: "Not Engaged",
                      dataKey: "notEngaged",
                      numeric: true,
                    },
                    {
                      width: 120,
                      label: "Engagemnent Score",
                      dataKey: "engagementScore",
                      numeric: true,
                    },
                  ]
            }
            data={
              data
                ? data
                : [
                    {
                      Questions: "No Data",
                      activelyEngaged: 0,
                      activelyDisengaged: 0,
                      notEngaged: 0,
                      engagementScore: 0,
                    },
                    {
                      Questions: "No Data",
                      activelyEngaged: 0,
                      activelyDisengaged: 0,
                      notEngaged: 0,
                      engagementScore: 0,
                    },
                  ]
            }
            isLoading={isLoading}
          />
        </div>
        <div className="department-card-data w-50">
          <DepartmentCharts />
        </div>
      </div>
    </>
  );
};

export default DepartmentReport;
