import React from 'react';
import './mp12template.css';
import img1 from '../../../../assets/Q12survey/tb3.png';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MP12template = ({  stepUPSendValue}) => {
  const [loading, setloading] = useState(false)
      const handleSubmit=() => {
        stepUPSendValue(0);
        setloading(true)
      }
  return (
    <div className='Q12-section d-flex justify-content-center align-items-center p-5'>
      <div className='container'>
        <div className='stepper gap-5 container row ' >
          <div className='col-md-6   d-flex flex-column justify-content-start p-5 mt-3'>
            <div className='text'>
              <h1 className='survey-start-welcome '>Welcome</h1>
              <h1 className='survey-start-tagline'>Preview MP12 Survey</h1>
              <p className='survey-tage-text'>Provide your generted ID to access the MP12 Survey.</p>
            </div>
            <div  className="g-4 mt-4 " >
            <div  className='mb-4 col-md-8'>
              <label className='' htmlFor="">Please Enter Your ID</label>
        <input
        className='mysurveypro-input-field'
        type="text"
        id="userid"
        name="userid"
        placeholder="Enter here"
        readOnly
      />
            </div>
            <div className=" col-md-5 t-4">
            
              <WebsiteButton className='w-100' type='button' onClick={handleSubmit} loading={loading}>
                  {loading?" Loading" :'Next'}
                  </WebsiteButton>
              </div>
            </div>
          </div>
          <div className='col-md-5   mt-4 d-flex justify-content-end'>
            <img src={img1} style={{width:"500px"}} alt='image' className='img-fluid' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MP12template;
