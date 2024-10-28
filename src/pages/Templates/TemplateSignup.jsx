import React from 'react'
import SearchIcon from '../../assets/templates/searchIcon.svg?react'
import templateSignup from '../../assets/templates/templateSignup.svg'
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton'
import { Link } from 'react-router-dom'

const TemplateSignup = () => {
    return (
        <>
            <div className="templateSignup-main">

                <div className="row m-0 mb-5">
                    <div className="col-md-3 col-sm-1"></div>
                    <div className="col-md-6 col-sm-8">
                        <div className="template-input-main">
                            <div className="search-main-input">
                                <SearchIcon />
                                <input type="text" placeholder='search' className='templateSignup-input' />
                            </div>


                        </div>
                    </div>
                    <div className="col-md-3 col-sm-1"></div>



                </div>


              <div className="row m-0">
                <div className="col-md-6">
<img src={templateSignup} className='img-fluid' alt="" />
                </div>
                <div className="col-md-6 templateSignup-content">
                    <div className="">
                         <p className='templateSignup-title'>Get started with ready-made templates</p>
                    <p className='templateSignup-description'>Build surveys and forms in minutes 
                        with pre-made templates you can easily 
                        customise for better response rates.</p>
                    <div className=" row m-0">
                        <div className="col-md-10 p-0 template-signup-button">
                            <Link to='/login' style={{textDecoration:'none'}}>  
                            <WebsiteButton type='button' onClick={()=>{}}>Signup with Email</WebsiteButton>
                            </Link>
                            <Link to='/login' style={{textDecoration:'none'}}>
                            <WebsiteButton type='button' buttonDesign='outliner' onClick={()=>{}}>Signup with Google</WebsiteButton>
                            </Link>
                            
                        
                        </div>
                      
                    </div>
                    </div>
                   
                </div>
              </div>
            </div>
        </>
    )
}

export default TemplateSignup