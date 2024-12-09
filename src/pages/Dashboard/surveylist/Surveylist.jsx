import React, { useEffect, useState } from 'react';
import './Surveylist.css';
import q12image from '../../../assets/Dashboredpng/Q12image.png';
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import form360img from '../../../assets/Dashboredpng/form360img.png'
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurveyList } from '../../../Redux/slice/surveySlice';
import { Stepper } from 'react-form-stepper';
const Surveylist = ({setstepper , sendIdToParent}) => {

  const dispatch = useDispatch()
  const [surveyListData, setsurveyListData] = useState([])
  //  const [planId, setplanId] = useState(null);
const {surveysList}=useSelector((state)=>state.survey)
   console.log("🚀 ~ Surveylist ~ surveysList:", surveyListData)
   
     
  const handleCheckboxClick = (data) => {
    console.log("🚀 ~ handleCheckboxClick ~ item:", data);
    sendIdToParent(data?.id)
    setstepper(2)
 
  };
      

      const ListOfSuveysHandler = async()=>{
        dispatch(getAllSurveyList())
        .then((res)=>{
        
        })
      }
      useEffect(()=>{
        ListOfSuveysHandler()
      },[])

      useEffect(()=>{
      if(surveysList){
        
        surveysList?.forEach(element => {
          setsurveyListData([{
            img:element.name==='Q12'? q12image:'',
            title:element?.name,
            id:element?.id,
            text:"Start your survey by clicking the 'View Survey'",
            buttontext: "View Survey",
      link: "/q12template",
          },
        {
          img: form360img,
          title: "TEI",
          text: "Start your survey by clicking the 'View Survey'",
          buttontext: "Coming soon",
        }])
        });
      }
     
      },[surveysList])



  return (
    <div className='surveylist-section m-4 p-4'>
      <div className='m-4'>
        <h1>Survey templates</h1>
      </div>
      <div className='d-flex justify-content-start flex-wrap gap-5 mb-4 p-4'>
        {surveyListData?.length>0 ?
        surveyListData?.map((content, index) => (
          <div
            className="watchsectioncard col-sm-6 col-md-6 col-lg-3 d-flex flex-column align-items-start"
            key={index}
          >
            <img type="button" src={content.img} className="card-img" alt={content.title} />
            <div className="card-body">
              <h5 className="card-title m-3">{content.title}</h5>
              <div className='ms-3 d-flex justify-content-center col-lg-11 col-9 mb-3'>
                <p className='titletext d-flex justify-content-start flex-column'>{content.text}</p>
              </div>
              <div className='d-flex justify-content-end mb-2 gap-2'>
  <Link to={content.link}  className='sidbar-item-link'>   
                 <WebsiteButton style={{padding:'2px 10px',fontSize:'14px'}} onClick={()=>{}}>
                {content.buttontext}
                </WebsiteButton>
                </Link>    {content?.id? 
                <WebsiteButton style={{padding:'2px 10px',fontSize:'14px'}} onClick={()=>handleCheckboxClick(content)}>
                User Survey
                </WebsiteButton>
                :''   
              }
                        
            
              </div>
            </div>
          </div>
        ))
      :
      'No Data'
      }
      </div>


    </div>
  );
};

export default Surveylist;
