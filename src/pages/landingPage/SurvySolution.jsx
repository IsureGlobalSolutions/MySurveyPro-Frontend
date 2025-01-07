import React from 'react'
import conversationGraph from '../../assets/landingPage/conversationGraphic.png';
import statistic from '../../assets/landingPage/statistic.png';
import './surveysolution.css';
const SurvySolution = () => {
  return (
    <>
    
    <div className="survey-solution-main py-5 w-100"  >
    <div className="survey-solution-content containe py-5">
  <div className="row align-items-center gap-4 justify-content-center">
    {/* Graph Section */}
    <div className="col-12 col-lg-4 text-center align-items-start justify-content-start">
      <div className="graph">
        <p className="text">Efficient Survey Solutions</p>
        <div className="hover-container">
          <img src={conversationGraph} className="img-fluid rounded shadow" alt="Conversation Graph" />
        </div>
      </div> 
    </div>

    {/* Solution Content Section */}
    <div className="col-12 col-lg-6 text-center  text-lg-start">
      <div className="solution-content">
        <p className="text mb-4">
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