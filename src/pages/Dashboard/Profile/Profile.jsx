import React, { useState , useEffect , useRef } from 'react';
import './Profilesetting.css'
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import InputField from '../../../components/mySurveyProInput/InputField'
import { useForm } from 'react-hook-form';
import {  GetUserDetail, profileapi } from '../../../Redux/slice/authSlice';
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import profileAvatar from '../../../assets/svgs/profile-avatar.svg'
const Profile = () => {
  const dispatch = useDispatch();
    const { register, handleSubmit , formState: { errors } } = useForm();
    const [selectedImage , setselectedImage ] = useState(null);
    const [profiledata, setprofiledata] = useState({
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      imagePath: '',
      country:'',

    });
    const {isLoading,userData} =useSelector((state)=>state.user)

  const decodedToken = jwtDecode(userData.accessToken);
  const userid = decodedToken.sid || decodedToken?.nameid;
  const fileInputRef = useRef(null);
    const onSubmit = (data) => {
      const values = Object.values(data)
        try {
          const formData = new FormData();
            formData.append('FirstName', data.firstName);
            formData.append('LastName' , data.lastName);
            if (selectedImage){
              formData.append('profilePicture' , selectedImage)
            }else{
              formData.append('profilePicture' , "")
            }
           
            formData.append('PhoneNumber', data.phoneNumber)
            formData.append('Address' , data.address)
            formData.append('Country', data.country)
           dispatch(profileapi(formData))
        .then((res)=>{
          if(res?.payload.isSuccess===true){
            toast.success(res?.payload?.alertMessage)
           setTimeout(() => {
            fetchdata();
           }, 3000);
          }
          else if(res?.payload.isSuccess===false){
            toast.error(res?.payload?.alertMessage)
          }
        })
      } catch (error) {
        // setisLoading(false)
      }
      };
const fetchdata=()=>{
  
  try {
    dispatch(GetUserDetail(userid))
    .then((res) => {
      setprofiledata(res.payload)  
      })
  } catch (error) {
  }
}
useEffect(() => {
  fetchdata();
}, [])

const handleImageChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    setselectedImage(file);
    
  }
};

const handleClickChangePicture = () => {
  fileInputRef.current.click(); // Simulate click on hidden file input
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setprofiledata(prevState => ({
    ...prevState,
    [name]: value
  }));

};
  return (
    <>
        <div className="profile " >
        <div className=" mb-0 ">
      
        <div className="row m-0 p-0">
          <div className="col-md-6 col-10 mx-auto m-5 p-2 ">
            <div className="d-flex flex-column justify-content-between align-items-center">
              <div className="mb-4 ms-2 mb-md-0">
              


    <img 
      src={selectedImage ? URL.createObjectURL(selectedImage)
         :
          profiledata.imagePath ?
        profiledata.imagePath
        :
profileAvatar
        } 
      className="img-fluid profile-img" 
      alt="Profile" 
    />
  


              
              </div>
              <div className="">
                <p style={{color:'#4379EE',cursor:'pointer'}} onClick={handleClickChangePicture} > Upload Photo</p>
          
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  
                  {/* <WebsiteButton buttonDesign='outliner' onClick={handleDeleteImage}>
                    Delete Picture
                  </WebsiteButton> */}
              </div>
            </div>
          </div>
         
        </div>
      </div>
      <div className='ms-5 mb-4'>
      <form onSubmit={handleSubmit(onSubmit )}   className="g-4 " >
    	<div className='row g-4 container'>
    	<div className='col-md-4'>
     	<label htmlFor="validationCustom01" className="form-label">firstName</label>
      	<InputField
        	type="text"
        	name="firstName"
        	register={register}
        	errors={errors}
          placeholder="firstName"
          value={profiledata.firstName}
          onChange={handleInputChange}
          // {...register('firstName')}
        	/>
     	</div>
     	<div className='col-md-4'>
     	<label htmlFor="validationCustom01" className="form-label">Last name</label>
      	<InputField
        	type="text"
        	name="lastName"
        	register={register}
        	errors={errors}
          placeholder="lastName"
          value={profiledata.lastName}
          onChange={handleInputChange}
          // {...register('lastName')}

        	/>
	
     	</div>
       <div className='col-md-4'>
     	<label htmlFor="validationCustom01" className="form-label">email</label>
      	<InputField
        	type="text"
        	name="email"
        	register={register}
        	errors={errors}
          placeholder="email"
          value={profiledata.email}
          onChange={handleInputChange}
          {...register('email')}

        	/>
	
     	</div>
       <div className='col-md-4'>
     	<label htmlFor="validationCustom01" className="form-label">Phone Number</label>
      	<InputField
        	type="text"
        	name="phoneNumber"
        	register={register}
        	errors={errors}
          placeholder="phoneNumber"
          value={profiledata.phoneNumber}
          onChange={handleInputChange}
          // {...register('lastName')}

        	/>
	
     	</div>
       <div className='col-md-4'>
     	<label htmlFor="validationCustom01" className="form-label">Address</label>
      	<InputField
        	type="text"
        	name="address"
        	register={register}
        	errors={errors}
          placeholder="address"
          value={profiledata.address}
          onChange={handleInputChange}
          // {...register('lastName')}

        	/>
	
     	</div>
       <div className='col-md-4'>
     	<label htmlFor="validationCustom01" className="form-label">Country</label>
      	<InputField
        	type="text"
        	name="country"
        	register={register}
        	errors={errors}
          placeholder="country"
          value={profiledata.country}
          onChange={handleInputChange}
          // {...register('lastName')}

        	/>
	
     	</div>
    	</div>
          	
     	<div className="d-flex justify-content-center align-items-center mt-4">
        <div className="">
          <WebsiteButton className='w-100 save-text' type="submit" onClick={()=>{}}  disabled={isLoading}>
                   	{isLoading? 'loading...':'Save Changes'}
                	</WebsiteButton>
        </div>
                	
              	</div>
        	</form>
      
    </div>
    </div>
      
    </>
     
  
  )
}

export default Profile