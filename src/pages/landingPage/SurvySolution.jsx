import React from 'react'
import conversationGraph from '../../assets/landingPage/conversationGraphic.png';
import statistic from '../../assets/landingPage/statistic.png';
import './surveysolution.css';
const SurvySolution = () => {
  return (
    <>
    
    <div className="survey-solution-main py-5 w-100"  >
    <div className="survey-solution-content container">
        <div className="graph">
            <p className="text mb-4">
            Efficient
            survey solutions</p>
            <img src={conversationGraph} className='img-fluid' alt="" />
        </div>
        <div className="solution-content">
            <p className="text mb-4">Welcome to MySurveyPro, your ultimate 
                solution for simplifying survey processes while boosting 
                team productivity and collaboration. We offer seamless,
                 efficient survey solutions to help you assess team dynamics.</p>
            <img src={statistic} className='img-fluid' alt="" />
        </div>

    </div>
    </div>
    </>
  )
}

export default SurvySolution