import React, { useState } from 'react'
// import { sidbarList } from './sidbarlist'
import './guidance.css'
import Survey from '../../assets/templates/survey.svg?react';
import LeadGeneratoin from '../../assets/templates/LeadGeneration.svg?react';
import CustomerSupport from '../../assets/templates/CustomerSupport.svg?react';
import Feedback from '../../assets/templates/feedback.svg?react';
import Employee from '../../assets/templates/employee.svg?react';
import BookingAndOrder from '../../assets/templates/bookingAndOrder.svg?react';
import Marketing from '../../assets/templates/marketing.svg?react';
import Registration from '../../assets/templates/registratioin.svg?react';
import Education from '../../assets/templates/education.svg?react';
import Event from '../../assets/templates/event.svg?react';
import Guidetemplate from './Guidetemplate';
import Viewsurvey from './Viewsurvey';
import Viewsurveyquestions from './Viewsurveyquestions';
import Viewpricing from './Viewpricing';
import Viewprofile from './Viewprofile';
import Viewdashboard from './Viewdashboard';

const Guidancecategary = () => {
    const [viewValue, setviewValue] = useState('grid')
const [sidbarHighlighter, setsidbarHighlighter] = useState(1)
const sidbarList= [
    {
        icon:<BookingAndOrder />,
        title:'Dashboard Guidance',
        id:1
    },
        {
            icon:<Survey />,
            title:'Start Survey Guidance',
            id:2
        },
        {
            icon:<LeadGeneratoin />,
            title:'View Survey Guidance',
            id:3
        },
        {
            icon:<Registration />,
            title:'Look Survey Questions View',
            id:4
        },
        {
            icon:<Marketing />,
            title:'  Pricing Guidance',
            id:5
        },
        {
            icon:<Education />,
            title:' Profile Guidance',
            id:6
        },
        
        // {
        //     icon:<Marketing />,
        //     title:'Marketing',
        //     id:7
        // },
        // {
        //     icon:<Registration />,
        //     title:'Resitration',
        //     id:8
        // },
        // {
        //     icon:<Education />,
        //     title:'Education',
        //     id:9
        // },
        // {
        //     icon:<Event />,
        //     title:'Event',
        //     id:10
        // }
        
        ]
        const renderSelectedScreen = () => {
            if (sidbarHighlighter === 1) {
                return  <Viewdashboard /> ;
        }else  if (sidbarHighlighter === 2) {
             return <Guidetemplate view={viewValue} /> ;
            } else if (sidbarHighlighter === 3) {
                return <Viewsurvey /> ;
            } else if (sidbarHighlighter === 4) {
                return <Viewsurveyquestions /> ;
            }else if (sidbarHighlighter === 5) {
                return <Viewpricing /> ;
        }else if (sidbarHighlighter === 6) {
            return <Viewprofile/> ;
    }
    }
  return (
    <>
    <div className="templage-header mt-4">
             <p className='fw-bold h3 ps-5 py-2 m-0 d-flex justify-content-center'>User Guidance Hub</p>
             {/* <hr  className='my-1' style={{color:'#aeaeae'}}/> */}
             </div>
    <div className="template-catagories-main my-1">
   
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
     <div className="template-sidbar-selected-screen border ms-2 ">
             <div className="template-selected-screen-topnavbar">
    
                   
             </div>
 
             <div className="templage-scree">
             <p className='fw-bold h3 ps-5 py-2 m-0 d-flex justify-content-center'>Overveiw</p>
             <hr  className='my-1' style={{color:'#aeaeae'}}/>
                 {renderSelectedScreen()}
             </div>
     </div>

    </div>
    </>
  )
}


export default Guidancecategary