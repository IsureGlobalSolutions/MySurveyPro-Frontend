import React, { useState } from "react";
import ThanksInfo from "../../../assets/dashboredsvg/thanks-info.png";
import { useForm } from "react-hook-form";
import { IoIosCopy } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { FRONTEND_URL } from "../../../consts/environments";
import Tooltip from "../../../components/Tooltip/Tooltip";
import WebsiteButton from "../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import CustomeButton from "../../../components/mySurveyProWebsiteBtn/CustomeButton";
import { Navbarvalue } from "../../../context/NavbarValuesContext";
import "./startsurvey.css";
import { IoIosArrowBack } from "react-icons/io";
const ThankYouLunchSurvey = ({ setstepper, surveyId }) => {
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
     <div className="shadow rounded-4 bg-white w-100 my-2 d-flex justify-content-center py-5">
  <div className="container thanks-content-main">
    <div className="thanks-content  ">
       <div className="thanks-info ">
        <img
          className="img-fluid"
          src={ThanksInfo}
         style={{ width: "300px" }}
          alt=""
        />
      </div>
      <p className="congrates-title">Congratulations!</p>
      <p className="congrates-title-2">You have launched survey</p>
      <div className="thanks-icon  ">
        <div className="text-survey-copy">
          <p className="m-0 text-muted text-nowrap">Survey Link </p>
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
     
    </div>
    <div className="d-flex justify-content-center mt-4 gap-2">
      <WebsiteButton buttonDesign="outliner" >
<IoIosArrowBack className="me-2" />
        Back to Dashboard
      </WebsiteButton>
      <WebsiteButton onClick={() => setstepper(6)}> Summary </WebsiteButton>
    </div>
  </div>
</div>
    </>
  );
};

export default ThankYouLunchSurvey;
