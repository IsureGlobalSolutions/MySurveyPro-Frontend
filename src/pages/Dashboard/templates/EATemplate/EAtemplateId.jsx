import React, { useState } from 'react';
import '../TEItemplate/TEItemplate.css';
import img1 from '../../../../assets/Q12survey/Q12surveystepperimg.png';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { set } from 'lodash';
const EAtemplateId = ({  stepUPSendValue,sendSurveyTypeId}) => {
  const [surveyTypeId, setsurveyTypeId] = useState(1)
  console.log("🚀 ~ EAtemplateId ~ surveyTypeId:", surveyTypeId)
  const [checkToggle, setcheckToggle] = useState(false)
      const handleSubmit=() => {
        stepUPSendValue();
        sendSurveyTypeId(surveyTypeId)

      }

  return (
    <div className='Q12-section m-5 d-flex justify-content-center align-items-center p-5'>
      <div className='container'>
        <div className='stepper row '>
          <div className='col-md-4 p-5 mt-3'>
            <div className='text'>
              <h1>Preview Employee Assessment survey</h1>
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
      <div className="flex my-3">
        <input type="checkbox"
        className='checkbox'
        id="checkbox"
        checked={!checkToggle}  
        value={1}
        onChange={(e) =>{ 
          setcheckToggle(!checkToggle)
          setsurveyTypeId(e.target.value)

        } }
        />
        <label htmlFor="checkbox" className='ms-2'>See Employee questions</label>
      </div>
      <div className="flex">
        <input type="checkbox"
        className='checkbox'
        id="checkbox"
        checked={checkToggle}
        value={2}
        onChange={(e) => {
          setcheckToggle(!checkToggle)
          setsurveyTypeId(e.target.value)
         }}
        />
        <label htmlFor="checkbox" className='ms-2'>See Supervisor questions</label>
      </div>
            </div>
            <div className=" col-md-12 t-4">
            <WebsiteButton className='w-100' type='button' onClick={handleSubmit}  >
              Next
              </WebsiteButton>
              </div>
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

export default EAtemplateId;

