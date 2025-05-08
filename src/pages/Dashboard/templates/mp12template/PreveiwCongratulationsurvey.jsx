import React from 'react'
import './mp12template.css'
import img1 from '../../../../assets/Q12survey/congradulation.png'
import ThanksInfo from "../../../../assets/dashboredsvg/thanks-info.png";

   
const PreveiwCongratulationsurvey = () => {
  return (
    <div className="surveyQuestions">
    <div className=" p-0 m-0">
      <div className="d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <div className="col-12">
            <div className=" d-flex flex-column align-items-center text-center">
             
              <div className="d-flex justify-content-center mb-3">
                <img src={ThanksInfo} alt="Congratulations" className="img-fluid" style={{width:'400px'}} />
              </div> 
              <h1 className="congratulations-heading">Congratulations!</h1>
              <h2 className="congratulations-subheading">Your Survey has been completed!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PreveiwCongratulationsurvey
                


