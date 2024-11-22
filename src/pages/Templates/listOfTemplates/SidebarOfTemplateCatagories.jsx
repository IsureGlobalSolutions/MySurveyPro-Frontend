import React, { useState } from 'react'
// import { sidbarList } from './sidbarlist'
import './listoftemplate.css'
import Survey from '../../../assets/templates/survey.svg?react';
import LeadGeneratoin from '../../../assets/templates/LeadGeneration.svg?react';
import CustomerSupport from '../../../assets/templates/CustomerSupport.svg?react';
import Feedback from '../../../assets/templates/feedback.svg?react';
import Employee from '../../../assets/templates/employee.svg?react';
import BookingAndOrder from '../../../assets/templates/bookingAndOrder.svg?react';
import Marketing from '../../../assets/templates/marketing.svg?react';
import Registration from '../../../assets/templates/registratioin.svg?react';
import Education from '../../../assets/templates/education.svg?react';
import Event from '../../../assets/templates/event.svg?react';
import { FaListUl } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";
import SurveyTemplates from './SurveyTemplates';
const SidebarOfTemplateCatagories = () => {
const [viewValue, setviewValue] = useState('grid')
const [sidbarHighlighter, setsidbarHighlighter] = useState(1)
   const sidbarList= [
        {
            icon:<Survey />,
            title:'Survey',
            id:1
        },
        {
            icon:<LeadGeneratoin />,
            title:'Lead Generation',
            id:2
        },
        {
            icon:<CustomerSupport />,
            title:'Customer Support',
            id:3
        },
        {
            icon:<Feedback />,
            title:'Feedback',
            id:4
        },
        {
            icon:<Employee />,
            title:'Employee',
            id:5
        },
        {
            icon:<BookingAndOrder />,
            title:'Booking & Order',
            id:6
        },
        {
            icon:<Marketing />,
            title:'Marketing',
            id:7
        },
        {
            icon:<Registration />,
            title:'Resitration',
            id:8
        },
        {
            icon:<Education />,
            title:'Education',
            id:9
        },
        {
            icon:<Event />,
            title:'Event',
            id:10
        }
        
        ]
  return (
   <>
  
   <div className="template-catagories-main my-5">
    
    <div className="template-sidbar">
        <p className='fw-bold h3 ps-5 py-2 m-0'>Categories</p>
        <hr  className='my-1' style={{color:'#aeaeae'}}/>
        <ul>
            {sidbarList.map((item,i)=>{
                return(
                     <li className={`template-sidbar-items ${sidbarHighlighter===item.id? 'sidbar-highlighter':''}`} 
                     key={i}
                     onClick={()=>setsidbarHighlighter(item.id)}
                     >
                        {item.icon} <p className='m-0'>{item.title}</p> 
                        </li>
                )
            })}
       
        </ul>
    </div>
    <div className="template-sidbar-selected-screen border-0 shadow-none ms-4">
            <div className="template-selected-screen-topnavbar">
   
                    <div className="topnavbar-items">
                       
                    </div>
                    <div className="topnavbar-icons">
                        <FaListUl  className={`fs-4 ${viewValue==='list'? 'view-highlighter':''}`} onClick={()=>setviewValue('list')}/>
                        <BsGrid  className={`fs-4  ${viewValue==='grid'? 'view-highlighter':''}`} onClick={()=>setviewValue('grid')}/>
                    </div>
               
            </div>

            <div className="templage-screen">
                <p className="fs-4 px-3 py-4 fw-bold">Overview</p>
                <SurveyTemplates view={viewValue}/>
            </div>
    </div>
   </div>
   </>
  )
}

export default SidebarOfTemplateCatagories