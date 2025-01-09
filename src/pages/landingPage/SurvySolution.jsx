import React from 'react'
import conversationGraph from '../../assets/landingPage/conversationGraphic.png';
import statistic from '../../assets/landingPage/statistic.png';
import './surveysolution.css';
const SurvySolution = () => {
  return (
    <>
    
    <div className="survey-solution-main py-5  w-100"  >
    <div className="survey-solution-content  container py-5 ">
  <div className="row align-items-start  justify-content-start">
    {/* Graph Section */}
    <div className="col-12 col-lg-6   align-items-center justify-content-center">
      <div className="graph">
        <p className="text ms-1  w-75">Efficient Survey Solutions</p>
        <div className="hover-container mt-5">
          <img src={conversationGraph} className="img-fluid rounded shadow" alt="Conversation Graph" />
        </div>
      </div> 
    </div>

    {/* Solution Content Section */}
    <div className="col-12 col-lg-6   ">
      <div className="solution-content">
        <p className="text mb-4 ms-2">
          Welcome to MySurveyPro, your ultimate solution for simplifying survey processes while boosting team productivity and collaboration. We offer seamless, efficient survey solutions to help you assess team dynamics.
        </p>
        <div className="hover-container">
          <img src={statistic} className="img-fluid rounded shadow" alt="Statistics" />
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
    </>
  )
}

export default SurvySolution