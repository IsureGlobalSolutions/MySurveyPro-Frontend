import React from 'react';
import "./q12survey/qsurvey.css";
import img1 from '../../../assets/Q12survey/g1.png';
import InputField from '../../../components/mySurveyProInput/InputField';
import { useForm } from 'react-hook-form';
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { MuiOtpInput } from 'mui-one-time-password-input'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { ValidateRecipientOtpApi } from '../../../Redux/slice/authSlice';
import { useState } from 'react';
const OtpVerifyScreen = ({stepUPSendValue,
  showOtpScreen ,
  staffid,
  showAssessmentCheckScreen,
  surveyTypeId=null,

setoptscreendata
}) => {
    const dispatch =useDispatch();
    const { register , handleSubmit , formState: { errors } } = useForm();
const [loading, setloading] = useState(false)
const [otp, setOtp] = React.useState('')

const handleChange = (newValue) => {
  setOtp(newValue)
}
      const onSubmit = async (data) => {
       if(!otp){
        toast.error("Please Enter OTP!")
        return;
       }
        setloading(true)
      
        try {
          dispatch(ValidateRecipientOtpApi({recipientId:staffid,otp:otp}))
          .then((res)=>{
          if(res.payload.isSuccess===true){
            toast.success(res.payload.alertMessage)
            setloading(false)
            stepUPSendValue(0);

            //this condition is for CA survey
      if (res?.payload?.employees == null) {
            
              showOtpScreen(false);
              surveyTypeId(1);
          showOtpScreen(false)

            }else{
 showAssessmentCheckScreen(true)
              showOtpScreen(false)
            }
             
              setoptscreendata(res.payload)
         
          }else{
            toast.error(res.payload.alertMessage)
            setloading(false)
          }
        })
        } catch (error) {
          toast.error(error.alertMessage);
          setloading(false)
        }
      }
  return (
    <div className='Q12-section d-flex justify-content-center align-items-center p-5'>
      <div className='container'>
        <div className='stepper row justify-content-center  p-5 '>
          <div className='col-md-8 row justify-content-center align-items-center flex-column p-5 mt-4 text-center'>
            <div className='text'>
           
              <h1 className='survey-start-otp '>Please enter the One-Time Password to verify your account</h1>

              <p className='survey-otp-text'>A One-Time Password has been sent to your email youremail@gmail.com</p>
             
            </div>
       <div className="col-md-8 d-flex justify-content-center ">
         <form onSubmit={handleSubmit(onSubmit)}>
                     <div  className='my-5'>
   
                     <MuiOtpInput
  value={otp}
  onChange={handleChange}
  length={5} // Set OTP length to 5
  sx={{
    '& .MuiOtpInput-TextField': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius:'0px',
        borderBottom:"4px solid: #D9D9D9"

      },
    },
  }}
/>
       
            </div>
            <div className="d-flex justify-content-center t-4 ">
      
              <WebsiteButton style={{width:'340px'}} type='submit' loading={loading}>
                  {loading?" Loading" :'Validate'}
                  </WebsiteButton>
              </div>
                </form>
       </div>
               
           
        
          </div>
        
        </div>
      </div>
    </div>
  );
}


export default OtpVerifyScreen