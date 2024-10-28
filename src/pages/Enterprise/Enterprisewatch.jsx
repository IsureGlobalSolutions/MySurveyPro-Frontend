import React from 'react'
import Image from '../../assets/Enterprisesection-png/Enterprisewatchimg.png'
import "./Enterprise.css";
import image from "../../assets/Enterprisesection-png/watchsectionimage3.png"
import image2 from "../../assets/Enterprisesection-png/watchsectionimage2.png"
import image3 from "../../assets/Enterprisesection-png/watchsectionimage1.png"
import img1 from "../../assets/Enterprisesection-png/watchmanimage3.png"
import img2 from "../../assets/Enterprisesection-png/watchmanimage2png.png"
import img3 from "../../assets/Enterprisesection-png/watchmanimage1.png"

const Enterprisewatch = () => {
 
  return (
    <div  className='watchsection p-4 '>
        <div className='d-flex justify-content-center mt-2 '>
            <h1 className='headertext'>Can’t wait? Watch Now!</h1>
        </div>
        <div className='d-flex justify-content-center flex-wrap flex-lg-row flex-column mt-5'>
  <div className='col-lg-4 ms-5   col-12 enterprisewatchtext d-flex flex-column  justify-content-center text-center'>
     <div className=''>
     <div className="container mt-4 ps-0 ">
        <ul className="list-group">
        <h1>Highlights</h1>
        <div className="custom-linebreak mt-4 mb-4"></div>
    <p className="add-item"> - Customizing appearance</p>
    <p className="add-item"> - Survey bank options</p>
    <p className="add-item">- Top question types</p>
    <p className="add-item">- Account navigation</p>
    <p className="add-item">- Pubpshing</p>
    <p className="add-item">- Quick reports</p>
  </ul>
</div>
     </div>
          </div>
          <div className="col-md-6   ms-3 ps-4 ">
          <div className="shadow border rounded-3 p-3">
                  <iframe width="100%" height="490"
                    src="https://www.youtube.com/embed/LxpWWAdFSgs?si=Bsfc5QCTIKV-Bane" title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                </div>
     <div/>
 </div>
        </div>  
        <div className='d-flex justify-content-center flex-wrap  gap-5 m-4 p-5'>
        <div className="watchsectioncard  col-sm-6 col-md-6 col-lg-3 d-flex flex-column align-items-center ">
  <img type="button" src={image} className="card-img"  alt="..." />
  <div className="card-body">
    <h5 className="card-title m-3">Build custom reports in minutes</h5>
    <div className='mt-5 ms-3 d-flex justify-content-between col-lg-10 col-9 mb-3'>
              <p className='titletext  d-flex justify-content-center  flex-column '>Hotsed by</p>
            <div className='d-flex mainposition    '>
              <div className=''>
  <img type="button" src={img2}className="imgfluid"  alt="..." />
              </div>
              <div className='absouluteposition'>
  <img type="button" src={img3} className="imgfluid"  alt="..." />
              </div>
              <div className='absouluteposition3'>
  <img type="button" src={img1}  className="imgfluid"  alt="..." />
              </div>
            </div>
            </div>
  </div>
       </div>
<div className="watchsectioncard col-sm-6 col-md-6 col-lg-3 d-flex flex-column align-items-center  ">
  <img type="button" src={image2} className="card-img" alt="..." />
  <div className="card-body">
    <h5 className="card-title m-3">A deeper dive: advanced options</h5>
    <div className='mt-5  d-flex justify-content-between col-lg-11 col-12 '>
            <div className='titletext  ms-3 d-flex justify-content-center  flex-column '>  <p >Hotsed by</p>
            </div> 
            <div className='d-flex mainposition    '>
              <div className=''>
  <img type="button" src={img2} className="imgfluid"  alt="..." />
              </div>
              <div className='absouluteposition'>
              <img type="button" src={img3}  className="imgfluid"  alt="..." />
              </div>
              <div className='absouluteposition3'>
              <img type="button" src={img1}  className="imgfluid" alt="..." />
              </div>
            </div>
            </div>
  </div>
</div>
<div className="watchsectioncard  col-sm-6 col-md-6 col-lg-3 d-flex flex-column align-items-center">
  <img type="button" src={image3} className="card-img" alt="..." />
  <div className="card-body">
    <h5 className="card-title m-3">Best Practices: Design</h5>
    <div className='mt-5 ms-3 d-flex justify-content-between col-lg-10 col-9 mb-3 pt-4 '>
              <p className='titletext  d-flex justify-content-center  flex-column '>Hotsed by</p>
            <div className='mainposition  d-flex justify-content-center align-item-center   flex-column   '>
              <div className=''>
  <img type="button" src={img2} className="imgfluid"  alt="..." />
              </div>
              <div className='absouluteposition'>
  <img type="button" src={img3} className="imgfluid"  alt="..." />
              </div>
              <div className='absouluteposition3'>
  <img type="button" src={img1}  className="imgfluid" alt="..." />
              </div>
            </div>
            </div>
  </div>
</div>
        </div> 
    </div>
  )
}

export default Enterprisewatch