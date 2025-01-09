import React, { useEffect, useState } from "react";
import "./Surveylist.css";
import q12image from "../../../assets/Dashboredpng/Q12image.png";
import WebsiteButton from "../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import form360img from "../../../assets/Dashboredpng/form360img.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSurveyList } from "../../../Redux/slice/surveySlice";
import { Stepper } from "react-form-stepper";
import { setSelectedSurveyId } from "../../../Redux/slice/authSlice";
import { store } from "../../../Redux/store";
import { Navbarvalue } from "../../../context/NavbarValuesContext";

const Surveylist = ({ setstepper, sendIdToParent }) => {
    const {
      StapperHandler,
      DashboardStateHandler,
      startSurvey,
      startSurveyHandler,
    } = Navbarvalue();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [surveyListData, setsurveyListData] = useState([]);
  const { surveysList } = useSelector((state) => state.survey);
  const handleSurveyCheckboxClick = (content) => {
  if (content.title === "TEI" || content.title=== "Q12"){
    startSurveyHandler(true);
    DashboardStateHandler("survey", {
      id: content.id,
      name: content.title,
    });
    store.dispatch(setSelectedSurveyId(content.id))
    } else {
      console.error("Unknown survey type");
    }
    sendIdToParent(content.id);
    setstepper(2);
  };
const handlePreviewCheckboxClick =(content)=>{
  if (content.title === "TEI" || content.title=== "Q12"){
    store.dispatch(setSelectedSurveyId(content.id))
    navigate(content.PreviewSurveylink); 
    } else {
      console.error("Unknown survey type");
    }
}
  const ListOfSuveysHandler = async () => {
    dispatch(getAllSurveyList()).then((res) => {});
  };
  useEffect(() => {
    ListOfSuveysHandler();
  }, []);

  useEffect(() => {
    if (surveysList?.length > 0) {
      const formattedData = surveysList?.map((element) => {
        if (element.name === "Q12") {
          return {
            img: q12image,
            title: element.name,
            id: element.id, 
            text: "Start your survey by clicking the 'View Survey'",
            buttonviewsurvey: "View Survey",
            buttonusersurvey: "Use Survey",
            PreviewSurveylink:"/q12template",
            // Surveylink: "/q12survey",
          };
        } else if (element.name === "TEI") {
          return {
            img: form360img,
            title: element.name,
            id: element.id, 
            text: "Start your survey by clicking the 'View Survey'",
            buttonviewsurvey: "View Survey",
            buttonusersurvey: "Use Survey",
            PreviewSurveylink: "/TEITemplate",
            // Surveylink:"/TEIsurvey",
          };
        }
        return null; 
      });
      setsurveyListData(formattedData.filter(Boolean)); // Remove null entries
    }
  }, [surveysList]);

  return (
    <div className="surveylist-section m-4 p-4">
      <div className="m-2">
        <h1>Survey templates</h1>
      </div>
      <div className="d-flex justify-content-start flex-wrap gap-4">
        {surveyListData?.length > 0
          ? surveyListData?.map((content, index) => (
              <div
                className="watchsectioncard col-sm-6 col-md-6 col-lg-3 d-flex flex-column align-items-start"
                key={index}
              >
                <img
                  type="button"
                  src={content.img}
                  className="card-img"
                  style={{borderRadius:"20px"}}
                  alt={content.title}
                />
                <div className="card-body">
                  <h5 className="card-title m-3">{content.title}</h5>
                  <div className="ms-3 d-flex justify-content-center col-lg-11 col-9 mb-3">
                    <p className="titletext d-flex justify-content-start flex-column">
                      {content.text}
                    </p>
                  </div>
                  <div className="d-flex flex-column flex-md-row justify-content-center mb-2 gap-2 align-items-center">
                    <Link to={content.id} className="sidbar-item-link">
                      <WebsiteButton
                        style={{ padding: "2px 10px", fontSize: "13px" }}
                        onClick={() => handlePreviewCheckboxClick(content)}
                      >
                        {content.buttonviewsurvey}
                      </WebsiteButton>
                    </Link>
                    <Link to={content.id} className="sidbar-item-link">
                      {" "}
                      <WebsiteButton
                        style={{ padding: "2px 10px", fontSize: "14px" }}
                        onClick={() => handleSurveyCheckboxClick(content)}
                      >
                        {content.buttonusersurvey}
                      </WebsiteButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : "No Data"}
      </div>
    </div>
  );
};

export default Surveylist;
