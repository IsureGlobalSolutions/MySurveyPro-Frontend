
    
    import React, { useState } from 'react';
    import '../TEISurvey/TEISurvey.css';
    import img1 from '../../../../assets/Q12survey/Q12surveystepperimg.png';
    import InputField from '../../../../components/mySurveyProInput/InputField';
    import { useForm } from 'react-hook-form';
    import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
    import { useNavigate, useParams } from 'react-router-dom';
    import { getstaffid } from '../../../../Redux/slice/authSlice';
    import toast from 'react-hot-toast';
    import { useDispatch, useSelector } from 'react-redux';
    const EASurvey = ({  sendIdParent,showOtpScreen}) => {
      // const surveyId= useSelector((state)=>state.user.selectedSurveyId)
        const dispatch =useDispatch();
        const { register , handleSubmit , formState: { errors } } = useForm();
        const { userId, surveyId } = useParams();
        const [loading, setloading] = useState(false)
         const params = useParams();
          const onSubmit = async (data) => {
            const id = data.userid;
            setloading(true)
            try {
             dispatch(getstaffid({surveyId:surveyId,employeeId:id, userId}))
            .then((res)=>{
              if(res.payload.isSuccess===true){
                toast.success(res.payload.alertMessage)
                setloading(false)
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
        <div className='Q12-section m-5 d-flex justify-content-center align-items-center p-5'>
          <div className='container'>
            <div className='stepper row '>
              <div className='col-md-4 p-5 mt-3'>
                <div className='text'>
                  <h1 >Employee Assessment survey</h1>
                  <p>Please enter user id</p>
                </div>
                <div  className="g-4 mt-4 " >
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
                <div className=" col-md-12 t-4">
                  <WebsiteButton className='w-100' type='submit' loading={loading}>
                  {loading?" Loading" :'Next'}
                  </WebsiteButton>
                  </div>

                  </form>
             
                </div>
              </div>
              <div className='col-md-8  mt-4 d-flex justify-content-end'>
                <img src={img1} alt='image' className='img-fluid' />
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default EASurvey;
    