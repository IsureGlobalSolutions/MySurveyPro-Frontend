import React from 'react'
import Image from '../../assets/Enterprise.svg/Enterprisequestionimg1.svg?react'
const Enterprisequestion = () => {
  return (
    <div className='enterprise'>
        <div className='d-flex justify-content-center flwx-wrap flex-lg-row flex-column  p-4 gap-5'>
            <div className='col-lg-5 col-12  p-4 ps-3 m-5 enterprisetext'>
                <h1>Over <span>374,784,323</span> questions answered!</h1>
                <p className='mt-4  '>SurveyPro offers a tremendous set of free tools for designing your survey, sharing your survey online</p>
            </div>
            <div className='col-lg-5  p-4  ms-5 ps-5  m-5  d-flex flex-column  gap-4  col-12'>
             <div className='Questions ms-5 p-2 ps-3   gap-3 align-items-center d-flex '>
                <div c>
                <Image/>
                </div>
                <div > <h2>When to initiate the Survey?</h2></div>
             </div>
             <div className='Questions ms-5 p-2 ps-3   gap-3 align-items-center d-flex '>
                <div >
                <Image/>
                </div>
                <div > <h2>When to initiate the Survey?</h2></div>
             </div>
             <div className='Questions ms-5 p-2 ps-3   gap-3 align-items-center d-flex '>
                <div c>
                <Image/>
                </div>
                <div > <h2>When to initiate the Survey?</h2></div>
             </div>
            </div>
        </div>

    </div>
  )
}

export default Enterprisequestion