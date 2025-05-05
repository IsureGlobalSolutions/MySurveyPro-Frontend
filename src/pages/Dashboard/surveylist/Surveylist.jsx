import React, { useEffect, useState } from "react";
import "./Surveylist.css";
import q12image from "../../../assets/Dashboredpng/Q12image.png";
import WebsiteButton from "../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import form360img from "../../../assets/Dashboredpng/form360img.png";
import templateImage3 from "../../../assets/Dashboredpng/surveryTemplateImage3.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSurveyList } from "../../../Redux/slice/surveySlice";
import { setSelectedSurveyId } from "../../../Redux/slice/authSlice";
import { store } from "../../../Redux/store";
import { Navbarvalue } from "../../../context/NavbarValuesContext";
import { FaRegEdit } from "react-icons/fa";
import Customizeicon from "../../../assets/dashboredsvg/gridicons_create.svg?react";
import {
  deleteCustomSurveyApi,
  getCustomSurveyByIdApi,
  ListOfCustomSurveyApi,
} from "../../../Redux/slice/customSurveySlice";
import toast from "react-hot-toast";
import PreviewModalOfCustomSurvey from "../survey/CustomeSurvey/PreviewModalOfCustomSurvey";
import { MdDeleteForever, MdErrorOutline } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import DeleteIcon from "../../../assets/dashboredsvg/deleteIcon.svg?react";
import ViewIcon from "../../../assets/dashboredsvg/viewIcon.svg?react";
import EditIcon from "../../../assets/dashboredsvg/editIcon.svg?react";
import DeleteModal from "../../../components/Modals/DeleteModal";

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
  const [customSurveyList, setcustomSurveyList] = useState([]);
  const { surveysList } = useSelector((state) => state.survey);
  const [isLoading, setisLoading] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const { listOfCustomSurvey } = useSelector((state) => state.customSurvey);
  const [show, setShow] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [deletedata, setdeletedata] = useState();
  const [customdata, setcustomdata] = useState();
  const [surveyJson, setSurveyJson] = useState(null);

  useEffect(() => {
    setisLoading(true);
    dispatch(ListOfCustomSurveyApi()).then((res) => {
      setisLoading(false);
    });
  }, []);
  useEffect(() => {
    if (listOfCustomSurvey) {
      setcustomSurveyList(listOfCustomSurvey);
    }
  }, [listOfCustomSurvey]);
  const handleSurveyCheckboxClick = (content) => {
    startSurveyHandler(true);
    DashboardStateHandler("survey", {
      id: content.id,
      name: content.title,
    });
    store.dispatch(setSelectedSurveyId(content.id));
    sendIdToParent(content.id);
    setstepper(2);
  };
  const handleCustomCheckboxClick = (item) => {
    startSurveyHandler(true);
    DashboardStateHandler("customsurvey", {
      id: item.id,
      name: item.surveyName,
    });
    store.dispatch(setSelectedSurveyId(item.id));
    sendIdToParent(item.id);
    setstepper(2);
  };

  const handlePreviewCheckboxClick = (content) => {
    store.dispatch(setSelectedSurveyId(content.id));
    navigate(content.PreviewSurveylink);
  };

  const ListOfSuveysHandler = async () => {
    dispatch(getAllSurveyList()).then((res) => {});
  };
  useEffect(() => {
    ListOfSuveysHandler();
  }, []);

  const cutomeSurevyHandler = () => {
    window.localStorage.setItem("survey-json", "");
    navigate("/addcustomsurvey");
  };

  useEffect(() => {
    if (surveysList?.length > 0) {
      const formattedData = surveysList?.map((element) => {
        if (element.name === "MP12") {
          return {
            img: templateImage3,
            title: element.name,
            id: element.id,
            text: "Start your survey by clicking the 'View Survey'",
            buttonviewsurvey: "View Survey",
            buttonusersurvey: "Use Survey",
            PreviewSurveylink: "/mp12template",
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
        } else if (element.name === "CA") {
          return {
            img: q12image,
            title: element.name,
            id: element.id,
            text: "Start your survey by clicking the 'View Survey'",
            buttonviewsurvey: "View Survey",
            buttonusersurvey: "Use Survey",
            PreviewSurveylink: "/EATemplate",
          };
        }

        return null;
      });
      setsurveyListData(formattedData.filter(Boolean)); // Remove null entries
    }
  }, [surveysList]);

  const deleteCustomSurvey = () => {
    const id = deletedata;
    setisLoading(true);
    if (isLoading) {
      return;
    }
    dispatch(deleteCustomSurveyApi(id)).then((res) => {
      if (res?.payload?.isSuccess) {
        toast.success(res?.payload?.alertMessage);
        dispatch(ListOfCustomSurveyApi());
        setisLoading(false);
        setShow(false);
      } else {
        toast.error(res?.payload);
        setisLoading(false);
      }
    });
  };
  const editCustomSurvey = (id) => {
    dispatch(getCustomSurveyByIdApi(id)).then((res) => {
      const parsedData = JSON.parse(res?.payload?.surveyJsonData);
      window.localStorage.setItem("updata-survey-id", res?.payload?.id);
      window.localStorage.setItem("survey-json", parsedData);
      window.localStorage.setItem(
        "survey-theme-json",
        res?.payload?.surveyThemeJsonData
      );
      navigate(`/customsurvey/${res?.payload?.id}`);
    });
  };
  const openModalHandler = (id) => {
    dispatch(getCustomSurveyByIdApi(id)).then((res) => {
      setopenModal(true);
      const parsedData1 = JSON.parse(res?.payload?.surveyJsonData);
      window.localStorage.setItem(
        "survey-theme-json",
        res?.payload?.surveyThemeJsonData
      );
      setSurveyJson(parsedData1);
    });
  };
  const closeModalHandler = (id) => {
    setopenModal(false);
    localStorage.setItem("survey-theme-json", "");
  };
  const handledelete = (item) => {
    setShow(true);
    setPopupMessage("Are you want to delete this survey ");
    setdeletedata(item.id);
  };
  const handleClosedata = () => {
    setShow(false);
  };
  return (
    <>
      {/* <Modal show={show} onHide={handleClosedata} centered>
        <Modal.Body style={{ position: "relative", margin: "10px" }}>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={handleClosedata}
          ></button>
          <div className="d-flex justify-content-center align-items-center flex-column gap-3 mt-5">
            <div className="mt-2">
              <MdErrorOutline style={{ color: "#dc3545", fontSize: "40px" }} />
            </div>
            <div severity="success ps-4" style={{ fontSize: "20px" }}>
              {popupMessage}
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "10px",
            }}
          >
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteCustomSurvey}
            >
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal> */}
      <div className="surveylist-section  p-4 pt-2 ">
        <div className="m-2 ps-3">
          <p className="survey-template-title">Survey templates</p>
        </div>
        <div className="d-flex  flex-wrap gap-2 mt-4 ms-4">
          {surveyListData?.length > 0
            ? surveyListData?.map((content, index) => (
                <div
                  className="watchsectioncard col-sm-6 col-md-6 col-lg-3 d-flex flex-column align-items-start text-start"
                  key={index}
                >
                  <img
                    type="button"
                    src={content.img}
                    className="card-img"
                    style={{ borderRadius: "20px", height: "215px" }}
                    alt={content.title}
                  />
                  <div className="card-body mb-2">
                    <p className="card-title m-3">{content.title}</p>

                    <p className="titletext ms-3">{content.text}</p>

                    <div className="d-flex  flex-md-row justify-content-end ms-3 me-3 mb-2 gap-2 align-items-center">
                      <Link to={content.id} className="sidbar-item-link">
                        <WebsiteButton
                          className="templatoutlinerbutton"
                          buttonDesign="outliner"
                          onClick={() => handlePreviewCheckboxClick(content)}
                        >
                          {content.buttonviewsurvey}
                        </WebsiteButton>
                      </Link>
                      <Link
                        //  to={content.id}

                        className="sidbar-item-link"
                      >
                        {" "}
                        <WebsiteButton
                          className="templatebutton"
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
      <div className="surveylist-section p-4 pt-2 pb-5">
        <div className="ms-2 ps-3 ">
          <p className="survey-template-title">Customize Survey</p>
        </div>
        <div className="d-flex flex-wrap justify-content-start mt-4">
          <div className="watchsectioncard col-sm-6 col-md-4 col-lg-3 d-flex flex-column align-items-center ms-4 mb-4">
            <div className="card-body mb-2 text-center">
              <div className="d-flex justify-content-start flex-column">
                <Customizeicon />
                <p className="start-from-scratch text-start">
                  Start from scratch
                </p>
              </div>
              <hr className="custom-line mt-0" />
              <div className=" col-lg-11 col-9 mb-3">
                <p className="custom-titletext text-start m-1">
                  Begin with a blank page, or copy and paste a survey you’ve
                  written.
                </p>
              </div>
              <div className="d-flex flex-md-row justify-content-center ms-3 me-3 mb-2 gap-2 align-items-center">
                <WebsiteButton
                  className="mt-1 w-100 "
                  style={{ backgroundColor: "#1F245E" }}
                  onClick={cutomeSurevyHandler}
                >
                  <span className="ms-2">click here</span>
                </WebsiteButton>
              </div>
            </div>
          </div>

          {customSurveyList?.length > 0
            ? customSurveyList?.map((item, index) => {
                return (
                  <>
                    <div
                      className="watchsectioncard col-sm-6 col-md-4 col-lg-3 d-flex flex-column align-items-center ms-4 mb-4"
                      key={index}
                    >
                      <div className="card-body mb-2 text-center">
                        <div className="d-flex justify-content-center flex-column">
                          <Customizeicon />
                          <p className="start-from-scratch text-start">
                            {item?.surveyName.length>15 ?
                          item?.surveyName.slice(0, 15)+"...":
                          item?.surveyName
                          }
                       
                          </p>
                        </div>
                        <hr className="custom-line mt-0" />
                        <div className=" col-lg-11 col-9 mb-3">
                          <p className="custom-titletext text-start m-1">
                            Begin with a blank page, or copy and paste a survey
                            you’ve written.
                          </p>
                        </div>
                        <div className="d-flex justify-content-center gap-3">
                            <div className="custom-sruvey-icon-main m-0 p-0">
                          <div className="custom-sruvey-icon custom-iconborder">
                            <DeleteIcon
                              size={20}
                              onClick={() => handledelete(item)}
                                style={{cursor:"pointer"}}
                             
                            />
                          </div>
                          <div className="custom-sruvey-icon custom-iconborder">
                            <ViewIcon
                              size={20}
                              onClick={() => openModalHandler(item?.id)}
                              style={{cursor:"pointer"}}
                            />
                          </div>
                          <div className="custom-sruvey-icon">
                            <EditIcon
                              size={20}
                              onClick={() => editCustomSurvey(item?.id)}
                              style={{cursor:"pointer"}}
                            />
                          </div>

                       
                        
                        </div>
                            <WebsiteButton
                              className="templatebutton"
                              title="use survey"
                              onClick={() => handleCustomCheckboxClick(item)}
                            >
                              use survey
                              {/* {content.buttonusersurvey} */}
                            </WebsiteButton>
                        </div>
                      
                      </div>
                    </div>
                  </>
                );
              })
            : []}
        </div>
      </div>
      {openModal ? (
        <PreviewModalOfCustomSurvey
          Viewshow={openModal}
          handleCloseViewdata={closeModalHandler}
          surveyJson={surveyJson}
        />
      ) : (
        ""
      )}
     {show &&(
        <DeleteModal
        show={show}
        handleClosedata={handleClosedata}
        deleteHandler={deleteCustomSurvey}
        />
      )

      }
    </>
  );
};

export default Surveylist;
