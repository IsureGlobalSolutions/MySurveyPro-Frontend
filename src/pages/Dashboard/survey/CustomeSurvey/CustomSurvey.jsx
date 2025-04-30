
import React from 'react';
import '../q12survey/qsurvey.css';
import img1 from '../../../../assets/Q12survey/g1.png';
import InputField from '../../../../components/mySurveyProInput/InputField';
import { useForm } from 'react-hook-form';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useNavigate, useParams } from 'react-router-dom';
import { getstaffid } from '../../../../Redux/slice/authSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
const CustomSurvey = ({ sendIdParent ,showOtpScreen}) => {
    const dispatch =useDispatch();
    const { register , handleSubmit , formState: { errors } } = useForm();
     const { userId, surveyId } = useParams();

      const onSubmit = async (data) => {
        const id = data.userid;
        try {
          dispatch(getstaffid({surveyId:surveyId,employeeId:id, userId}))
          .then((res)=>{
          if(res.payload.isSuccess===true){
            toast.success(res.payload.alertMessage)
            showOtpScreen(true);
            sendIdParent(()=>res.payload.recipientId);
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
              <h1>Custom Survey</h1>
              <p>Please enter user id</p>
            </div>
            <div  className="g-4 mt-4 col-md-10 " >
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div  className='mb-4'>
            <InputField
        type="text"
        name="user id"
        register={register}
        errors={errors}
        // onChange={(e) => setstaffid(e.target.value)}        
         placeholder="user id"
        {...register('userid', { required: 'Userid is required' })}
        readonly
        />
       
            </div>
            <div className=" col-md-5 t-4">
              <WebsiteButton className='w-100' type='submit'  
              //  style={{ backgroundColor: "#14A48B" }}
                >
              Next
              </WebsiteButton>
              </div>
              </form>
          
            </div>
          </div>
          <div className='col-md-6  mt-4 d-flex justify-content-end'>
            <img src={img1} style={{width:"500px"}} alt='image' className='img-fluid' />
          </div>
        </div>
      </div>
    </div>
  );
}


export default CustomSurvey