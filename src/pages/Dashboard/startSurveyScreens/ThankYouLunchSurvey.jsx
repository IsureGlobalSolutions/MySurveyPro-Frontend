import React, { useState } from 'react'
import ThanksInfo from '../../../assets/dashboredsvg/thanks-info.png';
import { useForm } from 'react-hook-form';
import { IoIosCopy } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import {  useSelector } from 'react-redux';
import { FRONTEND_URL } from '../../../consts/environments';
import Tooltip from '../../../components/Tooltip/Tooltip';
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { Navbarvalue } from '../../../context/NavbarValuesContext';

const ThankYouLunchSurvey = ({setstepper , surveyId}) => {
  console.log("🚀 ~ ThankYouLunchSurvey ~ surveyId:", surveyId)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [abbrTitle, setAbbrTitle] = useState('copy Link!');
  const {isLoading,userData} =useSelector((state)=>state.user)
  const decodedToken = jwtDecode(userData.accessToken);
 const id=decodedToken?.sid;
     const { selectedDashboardValues, DashboardStateHandler } = Navbarvalue()
 
 const [surveytext, setsurveytext] = useState('');
 console.log("🚀 ~ ThankYouLunchSurvey ~ surveytext:", surveytext)
 const q12text = `${FRONTEND_URL}/q12survey/${id}/${surveyId}`;
 const TEItext = `${FRONTEND_URL}/TeamEffectivenessSurvey/${id}/${surveyId}`;


  const copyToClipboard = () => {
    if (surveyId===2){ 
      navigator.clipboard.writeText(TEItext).then(
        () => {
         setAbbrTitle('copied!')
        },
        (err) => {
          console.error('Could not copy text: ', err);
        }
      );
    }else{         
      navigator.clipboard.writeText(q12text).then(

        () => {
         setAbbrTitle('copied!')
        },
        (err) => {
          console.error('Could not copy text: ', err);
        }
      );
    }
    
  
  };

  return (
   <>
         <div className="shadow rounded-4 bg-white w-100 m-2  d-flex justify-content-center py-5">
            <div className="">
              <div className="thanks-content   gap-md-5">
                <div className="thanks-icon text-center d-flex align-items-center gap-3">

<div className="">
  <p className='m-0 text-muted fs-4 fw-bold'>Survey Link : </p></div>
<div className="border px-4 py-3 m-0 rounded-4 bg-light d-flex gap-2">
  <p className='m-0'>{surveyId===2 ||selectedDashboardValues?.survey?.name==='TEI'?TEItext:q12text}</p>
  <Tooltip text={abbrTitle} style={{width:'150px'}}>
    <IoIosCopy style={{color:'#F97300'}} onClick={copyToClipboard}/>
 </Tooltip>
</div>
</div>
<div className="thanks-info">
    <img className='img-fluid' src={ThanksInfo} style={{width:'400px'}} alt="" />
</div>
              </div>

  <div className="d-flex justify-content-center">
              <WebsiteButton onClick={(()=>setstepper(6))}> Summary</WebsiteButton>
            </div>
            </div>
           
         </div> 
       
   </>
  )
}

export default ThankYouLunchSurvey