import React from 'react';
import './Surveylist.css';
import q12image from '../../../assets/Dashboredpng/Q12image.png';
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import form360img from '../../../assets/Dashboredpng/form360img.png'
import { Link } from 'react-router-dom'; 

const Surveylist = () => {
  const surveydata = [
    {
      img: q12image,
      title: "Q12",
      text: "Start your survey by clicking the 'View Survey'",
      buttontext: "View Survey",
      link: "/q12template",
    },
    {
      img: form360img,
      title: "Form 360",
      text: "Start your survey by clicking the 'View Survey'",
      buttontext: "Coming soon",
    //   link: "/form360",
    }
  ];

  return (
    <div className='surveylist-section m-4 p-4'>
      <div className='m-4'>
        <h1>Survey templates</h1>
      </div>
      <div className='d-flex justify-content-start flex-wrap gap-5 mb-4 p-4'>
        {surveydata.map((content, index) => (
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
              <div className='d-flex justify-content-end mb-3 '>
  <Link to={content.link}  className='sidbar-item-link'>   
                 <WebsiteButton>
                {content.buttontext}
                </WebsiteButton>
                </Link>              
            
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Surveylist;
