import React, { useState } from "react";
import ThanksInfo from "../../../assets/dashboredsvg/thanks-info.png";
import { useForm } from "react-hook-form";
import { IoIosCopy } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { FRONTEND_URL } from "../../../consts/environments";
import Tooltip from "../../../components/Tooltip/Tooltip";
import WebsiteButton from "../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import { Navbarvalue } from "../../../context/NavbarValuesContext";
import "./startsurvey.css";
const ThankYouLunchSurvey = ({ setstepper, surveyId }) => {
  console.log("🚀 ~ ThankYouLunchSurvey ~ surveyId:", surveyId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [abbrTitle, setAbbrTitle] = useState("copy Link!");
  const { isLoading, userData } = useSelector((state) => state.user);
  const decodedToken = jwtDecode(userData.accessToken);
  const id = decodedToken?.sid;
  const { selectedDashboardValues, DashboardStateHandler } = Navbarvalue();

  const [surveytext, setsurveytext] = useState("");
  console.log("🚀 ~ ThankYouLunchSurvey ~ surveytext:", surveytext);
  const q12text = `${FRONTEND_URL}/MP12survey/${id}/${surveyId}`;
  const TEItext = `${FRONTEND_URL}/TeamEffectivenessSurvey/${id}/${surveyId}`;
  const Customsurveytext = `${FRONTEND_URL}/CustomSurvey/${id}/${surveyId}`;
  const EASurvey = `${FRONTEND_URL}/EAsurvey/${id}/${surveyId}`;
  const copyToClipboard = () => {
    if (surveyId === 2) {
      navigator.clipboard.writeText(TEItext).then(
        () => {
          setAbbrTitle("copied!");
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    } else if (surveyId === 1) {
      navigator.clipboard.writeText(q12text).then(
        () => {
          setAbbrTitle("copied!");
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    } 
    else if (surveyId === 3) {
      navigator.clipboard.writeText(EASurvey).then(
        () => {
          setAbbrTitle("copied!");
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    }
    else {
      navigator.clipboard.writeText(Customsurveytext).then(
        () => {
          setAbbrTitle("copied!");
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    }
  };
  

  return (
    <>
     <div className="shadow rounded-4 bg-white w-100 m-2 d-flex justify-content-center py-5">
  <div className="container">
    <div className="thanks-content row gap-4">
      <div className="thanks-icon text-center d-flex align-items-center gap-3 col-12 col-lg-7">
        <div className="text-survey-copy col-12 col-md-2">
          <p className="m-0 text-muted fs-4 fw-bold">Survey Link : </p>
        </div>
        <div className="copylink-container">
        <p className="copylink-text">
  {surveyId === 2 ?
     TEItext :
     surveyId === 1 ?
       q12text : surveyId === 3 ?EASurvey
      : Customsurveytext}
</p>
      <Tooltip text={abbrTitle} style={{width:"150px"}}>
        <IoIosCopy className="copy-icon" onClick={copyToClipboard} />
      </Tooltip>
    </div>

      </div>
      <div className="thanks-info col-12 col-lg-4  col-md-4">
        <img
          className="img-fluid"
          src={ThanksInfo}
          style={{ maxWidth: "100%", height: "auto" }}
          alt=""
        />
      </div>
    </div>
    <div className="d-flex justify-content-center mt-4">
      <WebsiteButton onClick={() => setstepper(6)}> Summary </WebsiteButton>
    </div>
  </div>
</div>
    </>
  );
};

export default ThankYouLunchSurvey;
