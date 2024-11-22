import React from 'react';
import image from "../../assets/Enterprisesection-png/Surveylist.png";
import image1 from "../../assets/Enterprisesection-png/Viewingsurvey2.png";
// import image2 from "../../assets/Enterprisesection-png/3 Launch Survey.png";
// import image3 from "../../assets/Enterprisesection-png/linksurvey.png";
import "./guidance.css";
import { FaCircleDot } from "react-icons/fa6";

const Viewsurvey = () => {
    const steps = [
        {
          title: "Viewing survey list",
          description:
            "This image displays a Survey Templates section featuring two cards that represent different survey options.",
          iconSize: 25,
        },
        {
          title: "Q12 survey",
          description:
            "Features two people analyzing a document with ratings and feedback icons, symbolizing survey reviews or assessments",
          iconSize: 25,
        },
        {
        //   title: "Drop Your CSV file:",
          description:
            "A vibrant orange button labeled View Survey, allowing users to access this survey",
          iconSize: 17,
        },
     
      ];
      const firststeps = [
        {
          title: "Preview survey",
          description:
            "Please enter user id,indicating that the user must provide their unique ID to proceed furthe",
          iconSize: 25,
        },
        {
            // title: "Preview survey",
            description:
              "This user id user provides durnig upload a csv file ",
            iconSize: 16,
          },
     
      ];
  return (
    <>
    <div  className='guidetemplate'>
      <div className="d-flex mt-5" >
        <div className="col-lg-4 col-md-3  col-sm-4 m-5 mt-0">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="startsurvey m-4 ms-0">
                <h1>{step.title}</h1>
              </div>
              <div style={{ color: '#F97300', display: 'flex' , alignItems:"start" }}>
                <FaCircleDot size={step.iconSize} />
                <p
                  style={{
                    color: 'black',
                    fontSize: '18px',
                    fontWeight: 500,
                    marginLeft: '8px',
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-start flex-wrap col-lg-6 col-md-5 col-sm-7 gap-2 ps-0 pe-0 p-4 pt-0 mt-2">
          <div className="watchsectioncard d-flex flex-column align-items-start">
            <img
              type="button"
              src={image}
              className="card-img"
              alt="Survey Step"
            />
          </div>
        </div>
      </div>
      <div className="d-flex mt-5" >
        <div className="col-lg-4 col-md-3  col-sm-4 m-5 mt-0">
          {firststeps.map((step, index) => (
            <div key={index}>
              <div className="startsurvey m-4 ms-0">
                <h1>{step.title}</h1>
              </div>
              <div style={{ color: '#F97300', display: 'flex' , alignItems:"start" }}>
                <FaCircleDot size={step.iconSize} />
                <p
                  style={{
                    color: 'black',
                    fontSize: '18px',
                    fontWeight: 500,
                    marginLeft: '8px',
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-start flex-wrap col-lg-6 col-md-5 col-sm-7 gap-2 ps-0 pe-0 p-4 pt-0 mt-2">
          <div className="watchsectioncard border-0 d-flex flex-column align-items-start justify-content-center">
            <img
              type="button"
              src={image1}
              className="card-img"
              alt="Survey Step"
            />
          </div>
        </div>
      </div>
      </div>

      </>
        )
}

export default Viewsurvey


