import React from 'react';
import './customizeform.css';
import '../../assets/landingPage/fromsectionshade.png';
import '../../assets/landingPage/formsectionimage.png';
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { colors } from '@mui/material';
const CustomizeFormSection = () => {
  return (
    <>
    <div className="customize-form-parent-image">
        <div className="customize-form-shade-image">
            <div className="customize-form-content container ">
                <p className='custm-heading '>
                Customize Your Forms in Minutes: Choose from Our Wide Range of Templates
                </p>
                <p className="custm-description my-5 w-50">Create professional, customized forms in minutes using our wide range
                     of pre-designed templates and drag-and-drop components. Whether
                     you're gathering feedback or streamlining internal processes, our intuitive
                      platform makes building forms simple, fast, and flexible to meet your needs.
                      </p>
                      <div className="my-3">
                         <WebsiteButton type='button' to="/login"  className="startbutton mt-2">
                        Let's Get Started
                      </WebsiteButton>
                      </div>
                     
            </div>
        </div>
    </div>
    </>
  )
}

export default CustomizeFormSection