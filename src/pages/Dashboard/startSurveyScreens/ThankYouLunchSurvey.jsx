import React, { useState } from 'react'
import thanksImage from '../../../assets/dashboredsvg/launch-thanks.png';
import ThanksInfo from '../../../assets/dashboredsvg/thanks-info.png';
import InputField from '../../../components/mySurveyProInput/InputField';
import { useForm } from 'react-hook-form';
import { IoIosCopy } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import {  useSelector } from 'react-redux';
import { FRONTEND_URL } from '../../../consts/environments';
import Tooltip from '../../../components/Tooltip/Tooltip';

const ThankYouLunchSurvey = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [abbrTitle, setAbbrTitle] = useState('copy Link!');
  const {isLoading,userData} =useSelector((state)=>state.user)
  const decodedToken = jwtDecode(userData.accessToken);
 const id=decodedToken?.sid;
 const [text, setText] = useState(`${FRONTEND_URL}/q12survey/${id}`);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(
      () => {
       setAbbrTitle('copied!')
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
   <>
         <div className="shadow rounded-4 bg-white w-100 m-2  d-flex justify-content-center py-5">
            <div className="thanks-content   gap-md-5">
<div className="thanks-icon text-center d-flex align-items-center gap-3">
    {/* <img className='img-fluid' src={thanksImage} alt="" />
    <p className='h3 fw-semibold'>Thank You</p>
    <p className='h3 fw-semibold'>Your Survey has been Launched</p> */}
<div className="">
  <p className='m-0 text-muted fs-4 fw-bold'>Survey Link : </p></div>
<div className="border px-4 py-3 m-0 rounded-4 bg-light d-flex gap-2">
  <p className='m-0'>{FRONTEND_URL}/q12survey/{id}</p>
  <Tooltip text={abbrTitle}>
    <IoIosCopy style={{color:'#F97300'}} onClick={copyToClipboard}/>
 </Tooltip>
</div>
</div>
<div className="thanks-info">
    <img className='img-fluid' src={ThanksInfo} style={{width:'400px'}} alt="" />
</div>
            </div>
         </div>
   </>
  )
}

export default ThankYouLunchSurvey