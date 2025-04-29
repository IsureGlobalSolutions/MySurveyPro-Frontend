import {  TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/plugins/Loader";
import { useDispatch, useSelector } from "react-redux";
import './Listoflaunchscreen.css';
import {
  EAsurveyReportDownload,
  getTotalNumberOfRespondent,
  LaunchedSurveysStatusApi,
  updatePaymentStatus,
} from "../../../Redux/slice/surveySlice";
import NewSurvey from "../startSurveyScreens/index";

import { Navbarvalue } from "../../../context/NavbarValuesContext";
import { jwtDecode } from "jwt-decode";
import { Paper, Menu, MenuItem } from "@mui/material";
import {
  GetUserDetail,
  setSelectedSurveyId,
} from "../../../Redux/slice/authSlice";
import { store } from "../../../Redux/store";
import { PiPlusBold } from "react-icons/pi";
import Analyze from "../../../assets/svgs/Analyze Icon.svg";
import Surveyurl from "../../../assets/svgs/Url Icon2.svg";
import Tooltip from "../../../components/Tooltip/Tooltip";
import CustomeButton from "../../../components/mySurveyProWebsiteBtn/CustomeButton";
import DownloadReportIcon from "../../../assets/dashboredsvg/downloadReportIcon.svg?react";
import { saveAs } from 'file-saver';
import toast from "react-hot-toast";

const ITEM_HEIGHT = 48;

const ListOfLaunchedServey = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [responsesData, setresponsesData] = useState({});
  const [combinedSurveyData, setCombinedSurveyData] = useState([]); // Combined array for surveyResponse and customSurveyResponse
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);
  const [selectedSurveyForDownload, setSelectedSurveyForDownload] = useState(null)
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    StapperHandler,
    DashboardStateHandler,
    startSurvey,
    startSurveyHandler,
  } = Navbarvalue();

  const { surveyPaymentStatuses } = useSelector((state) => state.survey);

  const { userData } = useSelector((state) => state.user);

  const tokenValues = jwtDecode(userData?.accessToken);

  useEffect(() => {
    if (tokenValues?.sid) {
      dispatch(GetUserDetail(tokenValues?.sid));
    }
  }, [tokenValues?.sid]);

  useEffect(() => {
    setisLoading(true);
    dispatch(LaunchedSurveysStatusApi()).then((res) => {
      if (res?.payload) {
        const paymentStatusUpdates = {};
        const combinedData = [];

        // Combine surveyResponse and customSurveyResponse
        const surveyResponse = res?.payload?.surveyResponse || [];
        const customSurveyResponse = res?.payload?.customSurveyResponse || [];

        // Process surveyResponse
        surveyResponse.forEach((element) => {
          paymentStatusUpdates[element?.surveyId] = {
            paymentStatus: element?.surveyPaymentStatus,
          };

          if (element?.surveyLaunchStatus) {
            combinedData.push({ ...element, type: 'survey' }); // Add type to distinguish between survey and custom survey
          }
        });

        // Process customSurveyResponse
        customSurveyResponse.forEach((element) => {
          if (element?.surveyLaunchStatus) {
            combinedData.push({ ...element, type: 'customSurvey' }); // Add type to distinguish between survey and custom survey
          }
        });

        // Fetch total number of respondents for each survey
        combinedData.forEach((item) => {
          const surveyId = item.type === 'survey' ? item.surveyId : item.customSurveyId;
          dispatch(getTotalNumberOfRespondent(surveyId)).then((res) => {
            setresponsesData((prevState) => ({
              ...prevState,
              [surveyId]: {
                response: res?.payload,
              },
            }));
          });
        });

        // Dispatch the collected payment status updates to the store
        store.dispatch(updatePaymentStatus(paymentStatusUpdates));

        setCombinedSurveyData(combinedData); // Set combined survey data
        setisLoading(false);
      } else {
        store.dispatch(updatePaymentStatus([]));
        setisLoading(false);
      }
    });
  }, []);

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to the first page when rows per page changes
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option, data) => {
    DashboardStateHandler("survey", {
      id: data?.surveyId || data?.customSurveyId,
      name: data?.surveyName,
    });
    store.dispatch(setSelectedSurveyId(data?.surveyId || data?.customSurveyId));
    if (option === "Analyze results") {
      StapperHandler(6);
      startSurveyHandler(true);
    } else if (option === "Survey Url") {
      StapperHandler(5);
      startSurveyHandler(true);
    }
    setAnchorEl(null);
  };

  // const downloadReportHandler = () => {
  //   dispatch(EAsurveyReportDownload({surveyId:3,surveyTypeId:2,format:'excel'}))
  //   .then((res) => {

  //     const blob = new Blob([res?.payload], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     saveAs(blob, 'cAsurvey_supervisor_report.xlsx');
  //   })
  // }

  const handleDownloadClick = (event, survey) => {
    setDownloadAnchorEl(event.currentTarget);
    setSelectedSurveyForDownload(survey);
  };

  const handleDownloadClose = () => {
    setDownloadAnchorEl(null);
  };


  const downloadReportHandler = async (surveyTypeId) => {
    if (!selectedSurveyForDownload) return;
         handleDownloadClose();

         const surveyId = selectedSurveyForDownload.type === 'survey' 
         ? selectedSurveyForDownload.surveyId 
                : selectedSurveyForDownload.customSurveyId;
    try {
      const response = await dispatch(EAsurveyReportDownload({
        surveyId, 
        surveyTypeId: surveyTypeId, 
        format:'excel'
      }));
      
  if(response?.meta?.requestStatus === 'rejected'){
   toast.error('no data found');
   return
 }
      const url = window.URL.createObjectURL(new Blob([response.payload]));
      const link = document.createElement('a');
      link.href = url;
    
      link.setAttribute('download', `competencyAssessment_report.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
    }
  }
  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-between">
          <Loader />
        </div>
      ) : (combinedSurveyData?.length > 0 && !startSurvey) ||
        (Array.isArray(surveyPaymentStatuses) &&
          surveyPaymentStatuses[0]?.surveyLaunchStatus &&
          !startSurvey) ? (
        <>
          <div className="top-section my-5 mx-2 d-flex justify-content-between">
            <h2 className="ps-3 welcome">Welcome</h2>
            <CustomeButton
              className="me-3 mt-1"
              style={{ padding: "2px 10px", fontSize: "15px" }}
              onClick={() => {
                startSurveyHandler(true);
              }}
            >
              <PiPlusBold className="me-1  mt-0 pt-0  plusicon" />  
              <span className="mt-4 mt-4">
                Create New Survey
              </span>
            </CustomeButton>
          </div>
          <div className="table-responsive m-4  bg-red ">
            <Paper sx={{ width: "100%" }}>
              <table className="table table-borderless ">
                <thead className="p-4">
                  <tr
                    className="fw-semobold shadow-lg "
                    style={{ backgroundColor: "#00003A" }}
                  >
                    <th className="py-4 text-list ps-4">Survey Status</th>
                    <th className="py-4 text-list">Survey title</th>
                    <th className="py-4 text-list">Selected files</th>
                    <th className="py-4 text-list">Responses</th>
                    <th className="py-4 text-list">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <div className="d-flex justify-content-center p-5">
                      <div className="w-100 d-flex justify-content-center">
                        <Loader />
                      </div>
                    </div>
                  ) : combinedSurveyData?.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <p className="fw-bold fs-5">No file</p>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {combinedSurveyData?.map((item, index) => {
                        const surveyId = item.type === 'survey' ? item.surveyId : item.customSurveyId;
                        const responseData = responsesData[surveyId]?.response || {};
                        return (
                          <tr
                            key={index}
                            style={{ borderBottom: "1px solid #D9D5EC" }}
                            className="shadow-sm rounded-4 fw-semibold"
                          >
                            <td className="pt-2 ps-4">
                              <div className="d-flex ms-1">
                                <p
                                  className="p-2"
                                  style={{ backgroundColor: "#F97300" , color:"white" , borderRadius:"8px"}}
                                >
                                  {item.surveyLaunchStatus === true
                                    ? "Active"
                                    : "InActive"}
                                </p>
                              </div>
                            </td>
                            <td className="pt-3 ms-2 text-listitem">{item?.surveyName}</td>
                            <td className="pt-3  ms-2 text-listitem">
                              {item.fileNames?.map((data, index) => (
                                <p key={index}>{data}</p>
                              ))}
                            </td>
                            <td className="pt-3 text-listitem  ms-2">
                              {responseData?.totalRespondents || 0}/
                              {responseData?.totalReceiver || 0} respondent
                            </td>

                            <td className="pt-3 g-2">
                              <Tooltip
                                text={"Analyse results"}
                                style={{ width: "140px" }}
                              >
                                <img
                                  src={Analyze}
                                  alt="analyze result"
                                  width="30"
                                  height="30"
                                  className="vsgraph"
                                  size={28}
                                  style={{
                                    cursor: "pointer",
                                    border: "2px solid #dee2e6",
                                    padding: "2px",
                                    color: "#F97300",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() =>
                                    handleClose("Analyze results", item)
                                  }
                                />
                              </Tooltip>
                              <Tooltip
                                text={"Survey Url"}
                                style={{ width: "140px" }}
                              >
                                <img
                                  src={Surveyurl}
                                  alt="survey url"
                                  width="30"
                                  height="30"
                                  className="ms-1 vsgraph-design"
                                  size={28}
                                  style={{
                                    cursor: "pointer",
                                    border: "2px solid #dee2e6",
                                    padding: "2px",
                                    color: "#F97300",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() =>
                                    handleClose("Survey Url", item)
                                  }
                                />
                              </Tooltip> 
                              {
                                item?.surveyName==='CA' &&
                                (
                                  <>
                                     <Tooltip text={"Download Report"} style={{ width: "140px" }}>
                                <DownloadReportIcon style={{cursor:'pointer',marginBottom:'2px' }}
                               onClick={(e) => handleDownloadClick(e, item)}
                                 />
                              </Tooltip>
                                 {/* Download Menu */}
      <Menu
        anchorEl={downloadAnchorEl}
        open={Boolean(downloadAnchorEl)}
        onClose={handleDownloadClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '250px',
          },
        }}
      >
        <MenuItem 
          onClick={() => downloadReportHandler(2)}
          sx={{ fontSize: '14px', padding: '10px 20px' }}
        >
          Supervisor Assessment Report
        </MenuItem>
        <MenuItem 
          onClick={() => downloadReportHandler(1)}
          sx={{ fontSize: '14px', padding: '10px 20px' }}
        >
          Employee Assessment Report
        </MenuItem>
      </Menu>
      {/* ... (rest of your JSX) */}
                                  </>
                                )
                              

                              
                              }
                             

                             
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={combinedSurveyData?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </>
      ) : (
        <NewSurvey />
      )}
    </>
  );
};

export default ListOfLaunchedServey;