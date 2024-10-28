import React from 'react'
import ManagImage from '../../assets/resources/reporting-image.png'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
const ManagmentAndSimplification = () => {
  return (
    <>
    <div className="manage-main-background-image">
      <div className="container">
      <div className="row m-0 my-5">
        <div className="col-md-6">
          <img src={ManagImage} className='img-fluid' alt="" />
        </div>
        <div className="col-md-6 manage-content">
          <div className="">
          
          <p className="h3 fw-bold">
            Management, Simplified!
          </p>
          <p className="h5 fw-semibold my-4">Reporting</p>
          <p className="manage-content-description">
          Store, sort, retrieve your finances in one place. 
          Automate invoicing, accounting and get paid faster. 
          Get hundreds of real-time reports from tax preparation 
          to tenants' statements.

          </p>

          <p className="h5 fw-semibold my-4">Reporting</p>
          <p className="manage-content-description">
          Store, sort, retrieve your finances in one place. 
          Automate invoicing, accounting and get paid faster. 
          Get hundreds of real-time reports from tax preparation 
          to tenants' statements.

          </p>


          <p className="h5 fw-semibold my-4">Reporting</p>
          <p className="manage-content-description">
          Store, sort, retrieve your finances in one place. 
          Automate invoicing, accounting and get paid faster. 
          Get hundreds of real-time reports from tax preparation 
          to tenants' statements.

          </p>

          <div className="mt-4 row m-0">
            <div className="col-md-5">
              <WebsiteButton type='button' className='w-auto' onClick={()=>{}}>
              Read More?
            </WebsiteButton> 
            </div>
           
          </div>
        </div>
        </div>
        
        </div>  
      </div>

    </div>
    </>
  )
}

export default ManagmentAndSimplification