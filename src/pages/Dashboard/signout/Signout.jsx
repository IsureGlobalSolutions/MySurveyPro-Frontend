import { useState } from "react";
import "./Signout.css";
import signoutimage from "../../../assets/signoutimage.png";
import WebsiteButton from "../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../../Redux/slice/authSlice";
import toast from "react-hot-toast";

import { updatePaymentStatus } from "../../../Redux/slice/teiSlice";
import { updateSurveyPaymentStatuses } from "../../../Redux/slice/surveySlice";
import { persistor } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";
import { Navbarvalue } from "../../../context/NavbarValuesContext";

const Signout = () => {
  const { isLoading, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetContext } = Navbarvalue();

  const handleSubmit = () => {
    try {
      dispatch(signout()).then(async (res) => {
        if (res?.payload.isSuccess === true) {
          toast.success(res?.payload.alertMessage);
          navigate("/login");
          window.localStorage.setItem("survey-json", "");
          window.localStorage.setItem("updata-survey-id", "");
          resetContext();
          persistor.purge();
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="logout-screen-main   p-4 ">
     <div className="logout-content">

    <p className="logout-title">Logout</p>
            <p className="logout-description">Are you sure you want to logout?</p>
        
       <div className="d-flex flex-column gap-2">  
           <div className="">
            <WebsiteButton
            style={{backgroundColor:'#DA3A3C', color:'#fff'}}
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Logout"}
            </WebsiteButton>
     </div>
        <div className="">
              <WebsiteButton
              type="button"
           onClick={()=>{navigate("/startsurvey")}}
              disabled={isLoading}
            >
              Cancel
            </WebsiteButton>
        </div>

     
           
       </div>
         
         
     </div>
        
          <div className="mb-4">
            <img src={signoutimage} className="img-fluid" alt="Signout" />
          </div>
          
      
    </div>
  );
};

export default Signout;
