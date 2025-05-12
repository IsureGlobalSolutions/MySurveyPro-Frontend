import React, { useEffect } from "react";

import TotalSurveyIcon from "../assets/dashboredsvg/totalSurvey.svg?react";
import CompleteSurveyIcon from "../assets/dashboredsvg/completeSurvey.svg?react";
import NotYetStartCompleteIcon from "../assets/dashboredsvg/notYetStartSurvey.svg?react";
import InprogressIcon from "../assets/dashboredsvg/inprogessSurvey.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalNumberOfRespondent } from "../Redux/slice/surveySlice";
import { Navbarvalue } from "../context/NavbarValuesContext";
import '../pages/Dashboard/q12SruveyReportsScreen/dash-screen.css'
const HeroCards = () => {
  const dispatch = useDispatch();
  const { getTotalNumberOfRespondentValue, isLoading } = useSelector(
    (state) => state.survey
  );
  const { selectedDashboardValues, DashboardStateHandler } = Navbarvalue();

  const { paymentStatus } = useSelector((state) => state.survey);

  useEffect(() => {
    if (
      selectedDashboardValues?.survey?.id &&
      paymentStatus[selectedDashboardValues?.survey?.id]?.paymentStatus === true
    ) {
      dispatch(getTotalNumberOfRespondent(selectedDashboardValues?.survey?.id));
    }
  }, [selectedDashboardValues?.survey?.id]);
  return (
    <>
     
    <div className=" py-3 px-2 my-3   me-0">
      <div className="d-flex gap-2 m-0">
        {/* Total Surveys Card */}
     
          <div className="total-survey-card">
            <div className="d-flex py-2 px-2  gap-2 flex-column flex-md-row">

                <div className="total-survey-icon d-flex  align-items-center">
                <TotalSurveyIcon />
              </div>
              <div className="total-suvrvey-content d-flex flex-column justify-content-center">
                <p
                  className="m-0 fw-semibold fs-5 text-nowrap"
                  style={{ color: "#9C9A9A",fontSize:"18px",fontWeight:'500' }}
                >
                  Total Respondents
                </p>
                <p
                  className="my-2 fs-3 fw-semibold"
                  style={{ color: "#443731" }}
                >
                  {getTotalNumberOfRespondentValue?.totalReceiver
                    ? getTotalNumberOfRespondentValue.totalReceiver
                    : 0}
                </p>
              </div>
            
            </div>
          </div>
       

        {/* Complete Survey Card */}
       
          <div className="response-card">
            <div className="d-flex py-2 px-2  gap-2 flex-column flex-md-row">
               <div className="total-survey-icon d-flex  align-items-center">
                <CompleteSurveyIcon />
              </div>
              <div className="total-suvrvey-content d-flex flex-column justify-content-center">
                <p
                  className="m-0 fw-semibold fs-5 text-nowrap"
                  style={{ color: "#9C9A9A",fontSize:"18px",fontWeight:'500' }}
                >
                  Completed Responses
                </p>
                <p
                  className="my-2 fs-3 fw-semibold"
                  style={{ color: "#443731" }}
                >
                  {getTotalNumberOfRespondentValue?.totalRespondents
                    ? getTotalNumberOfRespondentValue.totalRespondents
                    : 0}
                </p>
              </div>
             
            </div>
          </div>
       

        {/* Not Yet Started Card */}
     
          <div className="not-response-card">
            <div className="d-flex py-2 px-2  gap-2 flex-column flex-md-row">
<div className="total-survey-icon d-flex  align-items-center">
                <NotYetStartCompleteIcon />
              </div>

              <div className="total-suvrvey-content d-flex flex-column justify-content-center">
                <span
                  className="m-0 fw-semibold fs-5 text-nowrap"
                  style={{ color: "#9C9A9A",fontSize:"18px",fontWeight:'500' }}
                >
                  Not Yet Started
                </span>
                <p
                  className="my-2 fs-3 fw-semibold"
                  style={{ color: "#443731" }}
                >
                  {getTotalNumberOfRespondentValue?.pendingRespondents
                    ? getTotalNumberOfRespondentValue.pendingRespondents
                    : 0}
                </p>
              </div>
              
            </div>
          </div>
       

        {/* In Progress Card */}
       
          <div className="pending-card">
            <div className="d-flex py-2 px-2  gap-2 flex-column flex-md-row">
 <div className="total-survey-icon d-flex  align-items-center">
                <InprogressIcon />
              </div>

              <div className="total-suvrvey-content d-flex flex-column justify-content-center">
                <p
                  className="m-0 fw-semibold fs-5 text-nowrap"
                  style={{ color: "#9C9A9A",fontSize:"18px",fontWeight:'500' }}
                >
                  In Progress
                </p>
                <p
                  className="my-2 fs-3 fw-semibold"
                  style={{ color: "#443731" }}
                >
                  {getTotalNumberOfRespondentValue?.incompleteRespondents
                    ? getTotalNumberOfRespondentValue.incompleteRespondents
                    : 0}
                </p>
              </div>
             
            </div>
          </div>
       
      </div>
    </div>
    </>
  );
};

export default HeroCards;
