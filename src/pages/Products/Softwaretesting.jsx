import React from 'react'
import Tickicon from '../../assets/svgs/TrueTick.svg?react'
import image1 from '../../assets/softwaretesting.png'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
const Softwaretesting = () => {
  return (
    <div className='softwaretesting'>
    <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center'>
      <div className='col-lg-6 col-md-8  mt-5 d-flex justify-content-center'>
        <img src={image1} alt='Software Testing' className='img-fluid' />
      </div>
      <div className='col-lg-6 col-md-8  mt-5 pt-3 d-flex justify-content-center'>
        <div className='softwaretestingtext text-center text-lg-start'>
          <h1>Software Testing</h1>
          <p>Simply dummy text of the printing and typesetting industry.</p>
          <h2 className='mt-4 pt-4'>Features</h2>
          <div className='d-flex gap-2 mt-4 align-items-center'>
            <Tickicon />
            <p>some of the features</p>
          </div>
          <div className='d-flex gap-2 mt-2 align-items-center'>
            <Tickicon />
            <p>some of the features</p>
          </div>
          <div className='d-flex gap-2 mt-2 align-items-center'>
            <Tickicon />
            <p>some of the features</p>
          </div>
          <div className='col-lg-4 col-5 mt-4 pt-2 mx-auto mx-lg-0 ms-sm-0'>
            <WebsiteButton type='button' onClick={()=>{}}>
              Read More
            </WebsiteButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Softwaretesting