import React, { useEffect } from "react";

import TotalSurveyIcon from "../assets/dashboredsvg/totalSurvey.svg?react";
import CompleteSurveyIcon from "../assets/dashboredsvg/completeSurvey.svg?react";
import NotYetStartCompleteIcon from "../assets/dashboredsvg/notYetStartSurvey.svg?react";
import InprogressIcon from "../assets/dashboredsvg/inprogessSurvey.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalNumberOfRespondent } from "../Redux/slice/surveySlice";
import { Navbarvalue } from "../context/NavbarValuesContext";

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
     
    <div className="border shadow py-3 px-2 my-3 ms-3 rounded-3 bg-white me-0">
      <div className="row m-0">
        {/* Total Surveys Card */}
        <div className="col-12 col-sm-6 col-md-3 ">
          <div className="total-survey-card">
            <div className="d-flex py-2 px-2 justify-content-center gap-3 flex-column flex-md-row">
              <div className="total-suvrvey-content d-flex flex-column justify-content-center">
                <p
                  className="m-0 fw-semibold fs-5 text-nowrap"
                  style={{ color: "#9099A0" }}
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
              <div className="total-survey-icon d-flex justify-content-center align-items-center">
                <TotalSurveyIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Complete Survey Card */}
        <div className="col-12 col-sm-6 col-md-3 ">
          <div className="response-card">
            <div className="d-flex py-2 px-2 justify-content-center gap-3 flex-column flex-md-row">
              <div className="total-suvrvey-content d-flex flex-column justify-content-center">
                <p
                  className="m-0 fw-semibold fs-5 text-nowrap"
                  style={{ color: "#9099A0" }}
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
              <div className="total-survey-icon d-flex justify-content-center align-items-center">
                <CompleteSurveyIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Not Yet Started Card */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="not-response-card">
            <div className="d-flex py-2 px-2 justify-content-center gap-3 flex-column flex-md-row">
              <div className="total-suvrvey-content d-flex flex-column justify-content-center">
                <span
                  className="m-0 fw-semibold fs-5 text-nowrap"
                  style={{ color: "#9099A0" }}
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
              <div className="total-survey-icon d-flex justify-content-center align-items-center">
                <NotYetStartCompleteIcon />
              </div>
            </div>
          </div>
        </div>

        {/* In Progress Card */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="pending-card">
            <div className="d-flex py-2 px-2 justify-content-center gap-3 flex-column flex-md-row">
              <div className="total-suvrvey-content d-flex flex-column justify-content-center">
                <p
                  className="m-0 fw-semibold fs-5 text-nowrap"
                  style={{ color: "#9099A0" }}
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
              <div className="total-survey-icon d-flex justify-content-center align-items-center">
                <InprogressIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HeroCards;
