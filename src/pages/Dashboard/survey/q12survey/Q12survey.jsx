
    
    import React, { useState } from 'react';
    import './qsurvey.css';
    import img1 from '../../../../assets/Q12survey/Q12surveystepperimg.png';
    import InputField from '../../../../components/mySurveyProInput/InputField';
    import { useForm } from 'react-hook-form';
    import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
    import { useNavigate, useParams } from 'react-router-dom';
    import { getstaffid } from '../../../../Redux/slice/authSlice';
    import toast from 'react-hot-toast';
    import { useDispatch } from 'react-redux';
    const Q12survey = ({ sendIdParent,showOtpScreen}) => {
        const dispatch =useDispatch();
        const [loading, setloading] = useState(false)
        const { register , handleSubmit , formState: { errors } } = useForm();
         const { userId, surveyId } = useParams();

          const onSubmit = async (data) => {
            const id = data.userid;
            setloading(true)
            try {
              dispatch(getstaffid({surveyId:surveyId,employeeId:id, userId}))
              .then((res)=>{
              if(res.payload.isSuccess===true){
                setloading(false)
                toast.success(res.payload.alertMessage)
                showOtpScreen(true);
                sendIdParent(()=>res.payload.recipientId);
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
            <div className='stepper row p-5'>
              <div className='col-md-6 p-5 mt-3'>
                <div className='text'>
                <h1 className='survey-start-welcome '>Welcome</h1>
              <h1 className='survey-start-tagline'> MP12 Survey</h1>
              <p className='survey-tage-text'>Provide your generted ID to access the MP12 Survey.</p>
                </div>
                <div  className="g-4 mt-4 " >
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div  className='mb-4'>
                      <label className='' htmlFor="">Please Enter Your ID</label>
                <InputField
            type="text"
            name="user id"
            register={register}
            errors={errors}
            // onChange={(e) => setstaffid(e.target.value)}       
             placeholder="Enter here"
             style={{width:'350px'}}
            {...register('userid', { required: 'Employee id is required' })}
            readonly
            />
           
                </div>
                <div className=" col-md-12 t-4">
               
                  <WebsiteButton style={{width:'350px'}} type='submit' loading={loading}>
                  {loading?" Loading" :'Next'}
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
    
    export default Q12survey;
    