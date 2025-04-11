import React from 'react';
import "./q12survey/qsurvey.css";
import img1 from '../../../assets/Q12survey/g1.png';
import InputField from '../../../components/mySurveyProInput/InputField';
import { useForm } from 'react-hook-form';
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';

import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { ValidateRecipientOtpApi } from '../../../Redux/slice/authSlice';
const OtpVerifyScreen = ({stepUPSendValue ,staffid}) => {
    const dispatch =useDispatch();
    const { register , handleSubmit , formState: { errors } } = useForm();

      const onSubmit = async (data) => {
        console.log("otp data", data);
        
        const id = data.otp;
        try {
          dispatch(ValidateRecipientOtpApi({recipientId:staffid,otp:id}))
          .then((res)=>{
          if(res.payload.isSuccess===true){
            toast.success(res.payload.alertMessage)
            stepUPSendValue(0);
         
          }else{
            toast.error(res.payload.alertMessage)
          }
        })
        } catch (error) {
          toast.error(error.alertMessage);
        }
      }
  return (
    <div className='Q12-section m-5 d-flex justify-content-center align-items-center p-5'>
      <div className='container'>
        <div className='stepper row p-5'>
          <div className='col-md-6 p-5 mt-4'>
            <div className='text'>
              <h1>OTP Verification</h1>
              <p>Please Check Email and enter OTP</p>
            </div>
            <div  className="g-4 mt-4 col-md-10 " >
                <form onSubmit={handleSubmit(onSubmit)}>
                     <div  className='mb-4'>
            <InputField
        type="text"
        name="otp"
        register={register}
        errors={errors}
        // onChange={(e) => setstaffid(e.target.value)}       
         placeholder="otp"
        {...register('otp', { required: 'otp is required' })}
        readonly
        />
       
            </div>
            <div className=" col-md-5 t-4">
              <WebsiteButton className='w-100' type='submit'   style={{ backgroundColor: "#14A48B" }} >
              Next
              </WebsiteButton>
              </div>
                </form>
           
            </div>
          </div>
          <div className='col-md-6  mt-4 d-flex justify-content-end'>
            <img src={img1} alt='image' className='img-fluid' />
          </div>
        </div>
      </div>
    </div>
  );
}


export default OtpVerifyScreen