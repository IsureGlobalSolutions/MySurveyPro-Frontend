import React from 'react'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import bannerImage from '../../assets/resources/survey-solutions-image.png';
import SurveySolutionIcon from '../../assets/resources/survey-solution-icon.svg?react'
import { Link } from 'react-router-dom';
const SurveySolutions = () => {
  return (
    <>
      <div className="survery-solution-top-banner">
        <div className="survey-solution-banner-image">
          <img src={bannerImage} style={{ width: '800px' }} className='img-fluid' alt="" />
        </div>

        <div className="survey-solution-banner-content">
          <div className="row m-0">
            <div className="col-md-8">

              <p className='fw-semibold my-4 text-white '> Survey Pro</p>
              <p className="fs-4 text-white  mb-3 survey-banner-title">The Complete Survey Solution</p>
              <p className="my-3 text-white survey-banner-description">

                Store, sort, retrieve your finances in one place.
                Automate invoicing, accounting and get paid faster.
                Get hundreds of real-time reports from tax preparation
                to tenants' statements.

              </p>
              <div className="row m-0 mb-3">
                <div className="col-md-5 p-0 col-sm-6">
                  <WebsiteButton type='button' onClick={() => { }}>
                    Read More
                  </WebsiteButton>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>


      <div className="my-5 text-center">
        <p className="fw-bold h3 my-3">The Complete Survey Solution</p>
        <p className="lh-lg">Store, sort, retrieve your finances in one place.
          Automate invoicing, accounting and get paid faster.
        </p>

        <div className="container">
          <div className="survey-solution-video-section my-5">
            <div className="row m-0">
              <div className="col-md-6">
                <p className="fw-bold fs-3">The Complete Survey Solution</p>
                <div className="row m-0">
                  <div className="col-md-6 text-start my-3">
                    <div className="d-flex gap-2">
                      <SurveySolutionIcon />
                      <div className="d-flex align-items-center" >
                        <div className="fw-semibold "><p className='m-0'>
                          Flexible Business
                        </p></div>
                      </div>

                    </div>
                    <div className="d-flex">
                      <p className='lh-lg'>Store, sort, retrieve your finances in one place.</p>

                    </div>
                  </div>
                  <div className="col-md-6 text-start my-3">
                    <div className="d-flex gap-2">
                      <SurveySolutionIcon />
                      <div className="d-flex align-items-center" >
                        <div className="fw-semibold "><p className='m-0'>
                          Flexible Business
                        </p></div>
                      </div>

                    </div>
                    <div className="d-flex">
                      <p className='lh-lg'>Store, sort, retrieve your finances in one place.</p>

                    </div>
                  </div>
                  <div className="col-md-6 text-start my-3">
                    <div className="d-flex gap-2">
                      <SurveySolutionIcon />
                      <div className="d-flex align-items-center" >
                        <div className="fw-semibold "><p className='m-0'>
                          Flexible Business
                        </p></div>
                      </div>

                    </div>
                    <div className="d-flex">
                      <p className='lh-lg'>Store, sort, retrieve your finances in one place.</p>

                    </div>
                  </div>
                  <div className="col-md-6 text-start my-3">
                    <div className="d-flex gap-2">
                      <SurveySolutionIcon />
                      <div className="d-flex align-items-center" >
                        <div className="fw-semibold "><p className='m-0'>
                          Flexible Business
                        </p></div>
                      </div>

                    </div>
                    <div className="d-flex">
                      <p className='lh-lg'>Store, sort, retrieve your finances in one place.</p>

                    </div>
                  </div>


                </div>
              </div>
              <div className="col-md-6">
                <div className="shadow border rounded-3 p-3">
                  <iframe width="100%" height="315"
                    src="https://www.youtube.com/embed/LxpWWAdFSgs?si=Bsfc5QCTIKV-Bane" title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                </div>

              </div>
            </div>
          </div>
        </div>


<div className="container">
  <div className="launch-survey-main text-center">
    <div className="row m-0 w-100 justify-content-center">
      <div className="col-md-6">
  <p className='text-white fs-bold fs-3 py-4'>Launch Your Survey</p>
    <p className="text-white lunch-survey-text">
    Don’t just stop at beautiful surveys. SurveyPro offers interactive features,
     powerful analytics, and versatile reporting to help you make the most of your feedback!
    </p>
    <div className="row m-0 justify-content-center py-3 w-100">
      <div className="col-md-4 col-sm-6">
        <Link to='/signup' style={{textDecoration:'none'}}> <WebsiteButton type='button' onClick={()=>{}}> 
          Start Now
        </WebsiteButton></Link>
       
      </div>
    </div>
      </div>
    </div>
  
  </div>
</div>



<div className="book-consultation-banner mt-5">
  <div className="row m-0 my-5 justify-content-center w-100">
    <div className="col-md-6 d-flex m-0 gap-4">
      <div className="w-100  text-white fw-bold book-consultation-title "><p>BOOK YOUR FREE CONSULTATION NOW!</p></div>
      <Link to='/signup' style={{textDecoration:'none'}}>   
         <WebsiteButton type='button' onClick={()=>{}}>Signup</WebsiteButton>
      </Link>

    </div>
  </div>
</div>
      </div>
    </>
  )
}

export default SurveySolutions