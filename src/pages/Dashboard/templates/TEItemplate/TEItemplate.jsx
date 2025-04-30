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
    <div className='Q12-section m-5 d-flex justify-content-center align-items-center p-5'>
      <div className='container'>
        <div className='stepper row '>
          <div className='col-md-4 p-5 mt-3'>
            <div className='text'>
              <h1>Preview team effectiveness survey</h1>
              <p>Please enter user id</p>
            </div>
            <div  className="g-4 mt-4 " >
            <div  className='mb-4'>
        <input
        className='mysurveypro-input-field'
        type="text"
        id="userid"
        name="userid"
        placeholder="UserId"
        readOnly
      />
            </div>
            <div className=" col-md-12 t-4">
          
              <WebsiteButton className='w-100' type='button' onClick={handleSubmit} loading={loading}>
                  {loading?" Loading" :'Next'}
                  </WebsiteButton>
              </div>
            </div>
          </div>
          <div className='col-md-8  mt-4 d-flex justify-content-end'>
            <img src={img1} style={{width:"500px"}} alt='image' className='img-fluid' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TEItemplate;

