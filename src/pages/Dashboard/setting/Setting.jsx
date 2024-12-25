import {useState} from 'react';
import './Setting.css';
import settingimage from '../../../assets/Dashboredpng/settingimage.png'
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import InputField from '../../../components/mySurveyProInput/InputField'
import { useForm } from 'react-hook-form';
import { useSelector , useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { resetPasswordApi } from '../../../Redux/slice/authSlice';
import { Code } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateAccessToken } from '../../../Redux/slice/authSlice'; 
import {store} from '../../../Redux/store';


const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading,userData} =useSelector((state)=>state.user)
  const decodedToken = jwtDecode(userData?.accessToken);
  
  const email = decodedToken.unique_name;
    const { register, handleSubmit , formState: { errors } } = useForm();
   
    const onSubmit = (data) => {
    

        try {
        const finalData = {...data,email, code:""}
        dispatch(resetPasswordApi(finalData))
        .then((res)=>{
        if(res?.payload.isSuccess===true){
          toast.success(res?.payload.alertMessage)

        
          navigate('/login')  
           store.dispatch(updateAccessToken());
           toast.success('Please Login with new password')
        }
        else{
          toast.error(res?.payload?.alertMessage)
        }
        })
        } catch (error) {
          toast.error(error)
        }
      }
  return (
    <div className='setting-section d-flex  align-items-center '>
      <div className='container m-4'>
        <div className='row justify-content-cente align-items-center   '>
          <div className='col-md-6 d-flex  justify-content-center lign-items-center  mb-4'>
            <div className='d-flex justify-content-center align-items-center'>
              <div className='placeholder-img'>
                <img src={settingimage} alt='Image' style={{maxWidth:'500px'}} className='img-fluid' />
              </div>
            </div>
          </div>
          <div className=' col-md-6 row m-0 p-0  justify-content-center text-start'>
            <div className="col-md-10">
                <div className='content'>
              <h2>Reset Password</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="g-4 mt-4" >
      <div  className='mb-4'>
     {/* <label htmlFor="validationCustom01" className="form-label">First name</label> */}
      <InputField
                  type="password"
                  name="oldPassword"
        register={register}
        errors={errors}
        placeholder="old Password"
        {...register('oldPassword', { required: 'Old password is required' ,
          minLength: { value: 6, message: 'Password must be at least 6 characters' }

        })}
        />

     </div>
      <div  className='mb-4'>
     {/* <label htmlFor="validationCustom01" className="form-label">First name</label> */}
      <InputField
                  type="password"
                  name="newPassword"
        register={register}
        errors={errors}
        placeholder="New password"
        {...register('newPassword', { required: 'New password required ' , 
          minLength: { value: 6, message: 'Password must be at least 6 characters' }
         })}
        />

     </div>
  
     <div  className='mb-4'>
     {/* <label htmlFor="validationCustom01" className="form-label">First name</label> */}
      <InputField
                  type="password"
                  name="Confirm password"
        register={register}
        errors={errors}
        placeholder="Confirm password"
        {...register('confirmPassword', { required: 'Confirm password is required' ,
          minLength: { value: 6, message: 'Password must be at least 6 characters' }

         })}
        />

     </div>
    
          
     <div className="signup-button col-md-12 mt-4">
                <WebsiteButton className='w-100' type="submit"  >
                   {isLoading? 'loading...':'Submit'}
                   
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

export default Setting;
