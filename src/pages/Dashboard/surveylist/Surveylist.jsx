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
import { FiPlusCircle } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import Customizeicon from "../../../assets/svgs/gridicons_create.svg?react"
import { deleteCustomSurveyApi, getCustomSurveyByIdApi, ListOfCustomSurveyApi } from "../../../Redux/slice/customSurveySlice";
import toast from "react-hot-toast";
import PreviewModalOfCustomSurvey from "../survey/CustomeSurvey/PreviewModalOfCustomSurvey";
import { MdDeleteForever, MdErrorOutline } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { LiaEditSolid } from "react-icons/lia";
// import { GrFormView } from "react-icons/gr";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import SurveyRunner from "../survey/CustomeSurvey/SurveyRunner";
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
  const [customSurveyList, setcustomSurveyList] = useState([])
  const { surveysList } = useSelector((state) => state.survey);
  const [isLoading, setisLoading] = useState(false)
  const [openModal, setopenModal] = useState(false)
  const { listOfCustomSurvey } = useSelector((state) => state.customSurvey);
  const [show, setShow] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [deletedata, setdeletedata] = useState();
  const [customdata, setcustomdata] = useState();
  const [surveyJson, setSurveyJson] = useState(null);

useEffect(() => {
  setisLoading(true)
  dispatch(ListOfCustomSurveyApi())
  .then((res) => {
    setisLoading(false)
  })
}, []);
useEffect(() => {
  if (listOfCustomSurvey) {
setcustomSurveyList(listOfCustomSurvey)  }
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
const handleCustomCheckboxClick =(item) => {
 
    startSurveyHandler(true);
    DashboardStateHandler("customsurvey", {
      id: item.id,
      name: item.surveyName,
    });
    store.dispatch(setSelectedSurveyId(item.id));
  sendIdToParent(item.id);
  setstepper(2);
}

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

    window.localStorage.setItem("survey-json", ''); 
       navigate("/addcustomsurvey");
  };

  useEffect(() => {
    if (surveysList?.length > 0) {
      const formattedData = surveysList?.map((element) => {
        if (element.name === "MP12") {
          return {
            img: q12image,
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
        }
        return null;
      });
      setsurveyListData(formattedData.filter(Boolean)); // Remove null entries
    }
  }, [surveysList]);

const deleteCustomSurvey = () => { 
  const id = deletedata;
  setisLoading(true)
  if(isLoading){
    return
  }
dispatch(deleteCustomSurveyApi(id))
.then((res) => { 
  if(res?.payload?.isSuccess){
    toast.success(res?.payload?.alertMessage)
    dispatch(ListOfCustomSurveyApi())
      setisLoading(false)
      setShow(false);
  }
  else{
    toast.error(res?.payload)
    setisLoading(false)
  }
} )
}

const editCustomSurvey = (id) => {
 dispatch(getCustomSurveyByIdApi(id))
 .then((res) => {
  const parsedData = JSON.parse(res?.payload?.surveyJsonData)
  window.localStorage.setItem("updata-survey-id", res?.payload?.id);
  window.localStorage.setItem("survey-json", parsedData);
  navigate(`/customsurvey/${res?.payload?.id}`);
})
}

const openModalHandler = (id) => {
  setopenModal(!openModal)
  dispatch(getCustomSurveyByIdApi(id))
 .then((res) => {
  console.log("🚀 ~ .then ~ res:", res)
  const parsedData = JSON.parse(res?.payload?.surveyJsonData)
  window.localStorage.setItem("updata-survey-id", res?.payload?.id);
  window.localStorage.setItem("survey-json", JSON.stringify(parsedData));
  setSurveyJson(parsedData);

}) 
}
const handledelete = (item) => {
  console.log("🚀 ~ handledelete ~ item:", item)
  setShow(true);
  setPopupMessage("Are you want to delete this survey ");
  setdeletedata(item.id);
};

const handleClosedata = () => {
  setShow(false);
};
  return (
    <>
    <Modal show={show} onHide={handleClosedata} centered>
        <Modal.Body style={{ position: "relative", margin: "10px" }}>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={handleClosedata}
          ></button>
          <div className="d-flex justify-content-center align-items-center flex-column gap-3">
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
      </Modal>
      <div className="surveylist-section m-4 p-4 pt-2 pb-5">
        <div className="m-2 ps-3">
          <h1>Survey templates</h1>
        </div>
        <div className="d-flex  flex-wrap gap-5 mt-4 ms-4">
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
                    style={{ borderRadius: "20px" }}
                    alt={content.title}
                  />
                  <div className="card-body mb-2">
                    <h5 className="card-title m-3">{content.title}</h5>
                    <div className="ms-3 d-flex justify-content-center col-lg-11 col-9 mb-3">
                      <p className="titletext d-flex justify-content-start flex-column">
                        {content.text}
                      </p>
                    </div>
                    <div className="d-flex  flex-md-row justify-content-between ms-3 me-3 mb-2 gap-2 align-items-center">
                      <Link 
                      to={content.id}
                       className="sidbar-item-link">
                        <WebsiteButton
                          className="templatebutton"
                          onClick={() => handlePreviewCheckboxClick(content)}
                        >
                          {content.buttonviewsurvey}
                        </WebsiteButton>
                      </Link>
                      <Link
                      //  to={content.id}
                        
                        className="sidbar-item-link">
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
        
      </div >
      <div className="surveylist-section m-4 p-4 pt-2 pb-5">
  <div className="m-2 ps-3 text-center">
    <h1>Customize Survey</h1>
  </div>
  <div className="d-flex flex-wrap justify-content-start mt-4">
  <div className="watchsectioncard col-sm-6 col-md-4 col-lg-3 d-flex flex-column align-items-center ms-4 mb-4">
    <div className="card-body mb-2 text-center">
      <div className="d-flex justify-content-center">
        <Customizeicon />
        <h5 className="custom-card-title m-3 ms-1">Start from scratch</h5>
      </div>
      <hr className="custom-line mt-0" />
      <div className="ms-3 col-lg-11 col-9 mb-3">
        <p className="custom-titletext d-flex justify-content-center m-4">
          Begin with a blank page, or copy and paste a survey you’ve written.
        </p>
      </div>
      <div className="d-flex flex-md-row justify-content-center ms-3 me-3 mb-2 gap-2 align-items-center">
        <WebsiteButton
          className="mt-1 templatebutton"
          onClick={cutomeSurevyHandler}
        >
          <FiPlusCircle className="Fiplus" />
          <span className="ms-2">click here</span>
        </WebsiteButton>
      </div>
    </div>
  </div>


{customSurveyList?.length > 0 ? 

customSurveyList?.map((item, index) => {
  return(<>
    <div className="watchsectioncard col-sm-6 col-md-4 col-lg-3 d-flex flex-column align-items-center ms-4 mb-4" key={index}>
    <div className="card-body mb-2 text-center">
      <div className="d-flex justify-content-center">
        {/* <Customizeediticon  style={{cursor:'pointer'}}/> */}
        <h5 className="custom-card-title m-3 ms-1">{item?.surveyName}</h5>
      </div>
      <hr className="custom-line mt-0" />
      <div className="ms-3 col-lg-11 col-9 mb-3">
        <p className="custom-titletext d-flex justify-content-center m-4">
          Begin with a blank page, or copy and paste a survey you’ve written.
        </p>
      </div>
      <div className="d-flex flex-md-row justify-content-center ms-3 me-3 mb-2 gap-2 align-items-center">
        
        <button
                                        className="btn btn-sm btn-outline-danger col-xs-12 rounded-2"
                                        type="button"
                                        onClick={() => handledelete(item)}
                                      >
                                        <MdDeleteForever
                                          style={{ color: "#f97300" }}
                                          size={20}
                                        />
                                      </button>
                                      <button
                                        className="btn btn-sm btn-outline-warning col-xs-12 ms-1 rounded-1"
                                        title="View"
                                        onClick={()=>openModalHandler(item?.id)}
                                        >
                                        <HiMiniViewfinderCircle
                                          style={{ color: "#f97300" }}
                                          size={20}
                                        />
                                      </button>
                                      <button
                                        className="btn btn-sm btn-outline-warning col-xs-12 ms-1 rounded-1"
                                        title="Edit"
                                        onClick={()=>editCustomSurvey(item?.id)}                                      >
                                        <FaRegEdit
                                          style={{ color: "#f97300" }}
                                          size={20}
                                        />
                                      </button>
                                      {/* <button
                                        className="btn btn-sm btn-outline-warning col-xs-12 ms-1 rounded-1"
                                        title="View"
                                        // Use Survey                      
                                        >
                                        <MdOutlinePlaylistAddCheck 
                                          style={{ color: "#f97300" }}
                                          size={20}
                                        />
                                      </button> */}
                                      <Link 
                                      // to="/Getcustomsurvey" 
                                      className="sidbar-item-link">
                        {" "}
                        <WebsiteButton
                          className="templatebutton"
                          title="use survey"
                          onClick={() => handleCustomCheckboxClick(item)}
                        >
                          use survey
                          {/* {content.buttonusersurvey} */}
                        </WebsiteButton>
                      </Link>
      </div>
    </div>
  </div>
  </>)


})
:[]}

</div>

</div>
{/* <SurveyRunner customdata={customdata} /> */}
{
  openModal?
  <PreviewModalOfCustomSurvey Viewshow={openModal} handleCloseViewdata={openModalHandler}  surveyJson={surveyJson}/>
  :''
}
    </>
  );
};

export default Surveylist;
