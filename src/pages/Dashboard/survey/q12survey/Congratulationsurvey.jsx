import React from 'react'
import './qsurvey.css'
import img1 from '../../../../assets/Q12survey/congradulation.png'
const Congratulationsurvey = () => {
  return (
    <div className=' surveyQuestios'>
                    <div className='congratulations p-0 m-0s'>
                   <div className=' d-flex justify-content-center align-items-center'>
                    <div className='row  '>
                    <div>
                    <div className='backgroundcolor align-items-center d-flex flex-column'>
                        <h1>Congratulations!</h1>
                       <div className='d-flex justify-content-center'>
                       <img src={img1} alt='conh=gratulation'/>
                       </div>
                        <h2>Your Survey has been completed!</h2>
                    </div>
                    </div>
                    </div>
                   </div>
                    </div>
    </div>
                
  )
}

export default Congratulationsurvey