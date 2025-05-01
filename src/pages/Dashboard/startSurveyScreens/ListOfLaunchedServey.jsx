import { TablePagination } from "@mui/material";
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
import AnalyzeIcon from "../../../assets/svgs/Analyze Icon.svg?react";
import Surveyurl from "../../../assets/svgs/Url Icon2.svg?react";
import Tooltip from "../../../components/Tooltip/Tooltip";
import CustomeButton from "../../../components/mySurveyProWebsiteBtn/CustomeButton";
import DownloadReportIcon from "../../../assets/dashboredsvg/downloadReportIcon.svg?react";
import { saveAs } from 'file-saver';
import toast from "react-hot-toast";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E0E3E9',
    color: theme.palette.common.black,
    fontWeight: 600, // Header font weight 600
    fontSize: '17px', // Font size 17px
    fontFamily: 'Poppins, sans-serif', // Poppins font family
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '17px', // Font size 17px for body
    fontWeight: 400, // Record font weight 400
    fontFamily: 'Poppins, sans-serif', // Poppins font family
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F3F7FF',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  fontFamily: 'Poppins, sans-serif', // Apply Poppins to rows as well
}));

const ITEM_HEIGHT = 48;

const ListOfLaunchedServey = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [responsesData, setresponsesData] = useState({});
  const [combinedSurveyData, setCombinedSurveyData] = useState([]);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);
  const [selectedSurveyForDownload, setSelectedSurveyForDownload] = useState(null)
  const [downloadLoading, setdownloadLoading] = useState(false)
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

        const surveyResponse = res?.payload?.surveyResponse || [];
        const customSurveyResponse = res?.payload?.customSurveyResponse || [];

        surveyResponse.forEach((element) => {
          paymentStatusUpdates[element?.surveyId] = {
            paymentStatus: element?.surveyPaymentStatus,
          };

          if (element?.surveyLaunchStatus) {
            combinedData.push({ ...element, type: 'survey' });
          }
        });

        customSurveyResponse.forEach((element) => {
          if (element?.surveyLaunchStatus) {
            combinedData.push({ ...element, type: 'customSurvey' });
          }
        });

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

        store.dispatch(updatePaymentStatus(paymentStatusUpdates));
        setCombinedSurveyData(combinedData);
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
    setPage(0);
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
      setdownloadLoading(true)
      const response = await dispatch(EAsurveyReportDownload({
        surveyId, 
        surveyTypeId: surveyTypeId, 
        format:'excel'
      }));
      
      if(response?.meta?.requestStatus === 'rejected'){
        toast.error('no data found');
        setdownloadLoading(false) 
        return
      }
      const url = window.URL.createObjectURL(new Blob([response.payload]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `competencyAssessment_report.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setdownloadLoading(false)
    } catch (error) {
      console.error('Download error:', error);
      setdownloadLoading(false)
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
          <div className="m-4">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Survey Status</StyledTableCell>
                    <StyledTableCell>Survey title</StyledTableCell>
                    <StyledTableCell>Selected files</StyledTableCell>
                    <StyledTableCell>Responses</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <StyledTableRow>
                      <StyledTableCell colSpan={5} align="center">
                        <Loader />
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : combinedSurveyData?.length === 0 ? (
                    <StyledTableRow>
                      <StyledTableCell colSpan={5} align="center" className="fw-bold fs-5">
                        No file
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    combinedSurveyData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item, index) => {
                        const surveyId = item.type === 'survey' ? item.surveyId : item.customSurveyId;
                        const responseData = responsesData[surveyId]?.response || {};
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <div className="d-flex ms-1">
                                <p
                                  className="p-1 fw-bold" 
                                  style={{ 
                                    backgroundColor: "#2AC116", 
                                    color: "white", 
                                    borderRadius: "3px"
                                  }}
                                >
                                  {item.surveyLaunchStatus === true ? "Active" : "InActive"}
                                </p>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>{item?.surveyName}</StyledTableCell>
                            <StyledTableCell>
                              {item.fileNames?.map((data, index) => (
                                <p key={index}>{data}</p>
                              ))}
                            </StyledTableCell>
                            <StyledTableCell>
                              {responseData?.totalRespondents || 0}/{responseData?.totalReceiver || 0} respondent
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="custom-sruvey-icon-main">
                                <div className="custom-sruvey-icon custom-iconborder">  
                                  <Tooltip text={"Analyse results"} style={{ width: "140px" }}>
                                    <AnalyzeIcon onClick={() => handleClose("Analyze results", item)} />
                                  </Tooltip>
                                </div>
                                {item?.surveyName === 'CA' && (
                                  downloadLoading ? (
                                    <i className="fa fa-circle-o-notch fa-spin text-primary"></i>
                                  ) : (
                                    <>
                                      <div className="custom-sruvey-icon custom-iconborder">
                                        <Tooltip text={"Download Report"} style={{ width: "140px" }}>
                                          <DownloadReportIcon 
                                            style={{ cursor: 'pointer' }}
                                            onClick={(e) => handleDownloadClick(e, item)}
                                          />
                                        </Tooltip>
                                      </div>
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
                                    </>
                                  )
                                )}
                                <div className="custom-sruvey-icon">
                                  <Tooltip text={"Survey Url"} style={{ width: "140px" }}>
                                    <Surveyurl onClick={() => handleClose("Survey Url", item)}/>
                                  </Tooltip> 
                                </div>
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={combinedSurveyData?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
        </>
      ) : (
        <NewSurvey />
      )}
    </>
  );
};

export default ListOfLaunchedServey;