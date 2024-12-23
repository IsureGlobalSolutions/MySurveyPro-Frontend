import React, { useEffect } from 'react';
import './Pricing.css';
import Tickicon from '../../assets/svgs/TrueTick.svg?react';
import pricingIcon from '../../assets/pricingIcon.png';
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurveyList, paymentSurvey } from '../../Redux/slice/surveySlice';
import toast from 'react-hot-toast';
import {store} from '../../Redux/store';

const Pricing = () => {
  const dispatch = useDispatch()
  const {surveysList,isLoading}=useSelector((state)=>state.survey)
  console.log("🚀 ~ Pricing ~ surveysList:", surveysList)
  const { paymentStatus } = useSelector((state) => state.survey)
  console.log("🚀 ~ Pricing ~ paymentStatus:", paymentStatus)



 

  useEffect(()=>{
    dispatch(getAllSurveyList())
  },[])
  const sendPyament = (value)=>{
    if(surveysList?.length>0){
      const selectedSurvey = surveysList.find(survey => survey.name === value);     
        dispatch(paymentSurvey({surveyId:selectedSurvey.id,surveyDescription:selectedSurvey.name}))
        .then((res)=>{
          window.location.replace(res?.payload?.url);
        })
    }
    else{
      toast.error('SomeThing Wrong Please try agian')
    }
  
  }
  return (
    <div className='pricing p-3'>
      <div className='container mt-4 mb-4'>
        <div className='row justify-content-center'>
          {surveysList?.map((item,index)=>{
            return(
              <>
                 <div className='col-lg-4 col-md-6 mb-4'key={index}>
            <div className='pricingcard'>
              <div className='text-start m-4 mt-0'>
                <div className='mb-3'>
                  <img src={pricingIcon} alt="Pricing Icon" className='img-fluid'/>
                </div>
                <div className='mb-3'>
                  <h1>{item?.name} </h1>
                </div>
                <div className='mb-3'>
                  <span>Unleash the Power of Your Business <br />with Pro Plan.</span>
                </div>
                <div className='d-flex justify-content-start mb-3'>
                  <h1>$10</h1>
                  <span className='m-3'>per Survey</span>
                </div>
                <div className='d-flex price-line mb-3'></div>
                
                <div className='d-flex pricingcard-text mb-2 justify-content-start align-items-center'>
                  <Tickicon />
                  <span className='ms-2'>Enhanced Analytics</span>
                </div>
                <div className='d-flex pricingcard-text mb-2 justify-content-start align-items-center'>
                  <Tickicon />
                  <span className='ms-2'>Enhanced Analytics</span>
                </div>
                <div className='d-flex pricingcard-text mb-2 justify-content-start align-items-center'>
                  <Tickicon />
                  <span className='ms-2'>Enhanced Analytics</span>
                </div>
                <div className='d-flex pricingcard-text mb-4 justify-content-start align-items-center'>
                  <Tickicon />
                  <span className='ms-2'>Enhanced Analytics</span>
                </div>
                <div className='text-center'>
               {
                paymentStatus[item?.id]?.paymentStatus===true?
                  <WebsiteButton type='button' buttonDesign='outliner' disabled={paymentStatus[item?.id].paymentStatus===true} >
                   paid
                  </WebsiteButton>
                 
                  :
 <WebsiteButton type='button' buttonDesign='outliner' disabled={isLoading} onClick={()=>sendPyament(item?.name)}>
                   {isLoading?'loading...':' Get Started'}
                  </WebsiteButton>
               }
                
                  
               
                </div>
              </div>
            </div>
          </div>
              </>
            )
          })}
       
       
         
        </div>
      </div>
    </div>
  );
}

export default Pricing;
