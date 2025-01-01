import React from 'react'
import './Q12template.css'
import img1 from '../../../../assets/Q12survey/congradulation.png'

   
const PreveiwCongratulationsurvey = () => {
  return (
    <div className="surveyQuestions">
    <div className="congratulations p-0 m-0">
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="row w-100">
          <div className="col-12">
            <div className="backgroundcolor d-flex flex-column align-items-center text-center">
              <h1 className="congratulations-heading">Congratulations!</h1>
              <div className="d-flex justify-content-center mb-3">
                <img src={img1} alt="Congratulations" className="img-fluid congratulations-img" />
              </div>
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
                


