import { Paper, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/plugins/Loader";
import { useDispatch, useSelector } from "react-redux";
import './Listoflaunchscreen.css';
import {
  getTotalNumberOfRespondent,
  LaunchedSurveysStatusApi,
  updatePaymentStatus,
} from "../../../Redux/slice/surveySlice";
import NewSurvey from "../startSurveyScreens/index";
import Menu from "@mui/material/Menu";
import { Navbarvalue } from "../../../context/NavbarValuesContext";
import { jwtDecode } from "jwt-decode";
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

const ITEM_HEIGHT = 48;

const ListOfLaunchedServey = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [responsesData, setresponsesData] = useState({});
  const [launchSurveyData, setlaunchSurveyData] = useState([]);
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
        if (res?.payload) {
          const paymentStatusUpdates = {};
          const launch = [];

          res?.payload?.surveyResponse?.forEach((element) => {
            paymentStatusUpdates[element?.surveyId] = {
              paymentStatus: element?.surveyPaymentStatus,
            };

            if (element?.surveyLaunchStatus) {
              launch.push(element);

              // Fetch total number of respondents
              dispatch(getTotalNumberOfRespondent(element?.surveyId)).then(
                (res) => {
                  setresponsesData((prevState) => ({
                    ...prevState,
                    [element?.surveyId]: {
                      response: res?.payload,
                    },
                  }));
                }
              );
            }
          });

          // Dispatch the collected payment status updates to the store
          store.dispatch(updatePaymentStatus(paymentStatusUpdates));

          setlaunchSurveyData(launch);
          setisLoading(false);
        } else {
          store.dispatch(updatePaymentStatus([]));
          setisLoading(false);
        }
      }
    });
    // }
  }, []);

  useEffect(() => {
    if (surveyPaymentStatuses?.length > 0) {
      console.log("🚀 ~ useEffect ~ surveyPaymentStatuses:", surveyPaymentStatuses)
      setisLoading(true);
      const paymentStatusUpdates = {};
      const launch = [];
      surveyPaymentStatuses.forEach((element) => {
        paymentStatusUpdates[element?.surveyId] = {
          paymentStatus: element?.surveyPaymentStatus,
        };

        if (element?.surveyLaunchStatus) {
          launch.push(element);
          dispatch(getTotalNumberOfRespondent(element?.surveyId)).then(
            (res) => {
              setresponsesData((prevState) => ({
                ...prevState,
                [element?.surveyId]: {
                  response: res?.payload,
                },
              }));
            }
          );
        }
      });

      store.dispatch(updatePaymentStatus(paymentStatusUpdates));

      setlaunchSurveyData(launch);
      setisLoading(false);
    } else {
      store.dispatch(updatePaymentStatus([]));
      setisLoading(false);
    }
  }, [surveyPaymentStatuses?.length]);

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
      id: data?.surveyId,
      name: data?.surveyName,
    });
    store.dispatch(setSelectedSurveyId(data?.surveyId));
    if (option === "Analyze results") {
      StapperHandler(6);
      startSurveyHandler(true);
    } else if (option === "Survey Url") {
      StapperHandler(5);
      startSurveyHandler(true);
    }
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-between">
          <Loader />
        </div>
      ) : (launchSurveyData?.length > 0 && !startSurvey) ||
        (Array.isArray(surveyPaymentStatuses) && surveyPaymentStatuses[0]?.surveyLaunchStatus && !startSurvey) ? (
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
                  ) : launchSurveyData?.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <p className="fw-bold fs-5">No file</p>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {launchSurveyData?.map((item, index) => {
                        console.log("🚀 ~ {launchSurveyData?.map ~ launchSurveyData:", launchSurveyData)
                        const responseData =
                          responsesData[item?.surveyId]?.response || {};
                          console.log("🚀 ~ {launchSurveyData?.map ~ responsedata:", launchSurveyData)
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

                            <td className="pt-3">
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

                              <Menu
                                id="long-menu"
                                MenuListProps={{
                                  "aria-labelledby": "long-button",
                                }}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                slotProps={{
                                  paper: {
                                    style: {
                                      maxHeight: ITEM_HEIGHT * 4.5,
                                      width: "20ch",
                                    },
                                  },
                                }}
                              ></Menu>
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
                count={launchSurveyData?.length || 0}
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
