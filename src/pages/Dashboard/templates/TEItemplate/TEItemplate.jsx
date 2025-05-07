import React, { useState } from 'react';
import './TEItemplate.css';
import img1 from '../../../../assets/Q12survey/Q12surveystepperimg.png';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useNavigate } from 'react-router-dom';
const TEItemplate = ({  stepUPSendValue}) => {
const [loading, setloading] = useState(false)
      const handleSubmit=() => {
        stepUPSendValue(0);
        setloading(true)
        
      }
  return (
    <div className='Q12-section d-flex justify-content-center align-items-center p-5'>
      <div className='container'>
        <div className='stepper row '>
          <div className='col-md-6 p-5 mt-3'>
            <div className='text'>
            <h1 className='survey-start-welcome '>Welcome</h1>
              <h1 className='survey-start-tagline'>Preview Team Effectivness Indicator(TEI) Survey</h1>
              <p className='survey-tage-text'>Provide your generted ID to access the MP12 Survey.</p>
            </div>
            <div  className="g-4 mt-4 " >
            <div  className='mb-4'> 
              <label className='' htmlFor="">Please Enter Your ID</label>
        <input
         
        className='mysurveypro-input-field'
        type="text"
        id="userid"
        name="userid"
        placeholder="Enter here"
        style={{maxWidth:'350px'}}
        readOnly
      />
            </div>
            <div className=" t-4">
          
              <WebsiteButton  type='button' onClick={handleSubmit} loading={loading} style={{maxWidth:"350px"}}>
                  {loading?" Loading" :'Next'}
                  </WebsiteButton>
              </div>
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

export default TEItemplate;

