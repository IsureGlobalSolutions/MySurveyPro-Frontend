import React from 'react'
import image1 from "../../assets/Enterprisesection-png/Viewingsurvey2.png";
import image2 from "../../assets/Enterprisesection-png/SurveyQuestions.png";
// import image3 from "../../assets/Enterprisesection-png/linksurvey.png";
import "./guidance.css";
import { FaCircleDot } from "react-icons/fa6";

const Viewsurveyquestions = () => {
    const secoundsteps = [
        {
          title: "Preview survey Questions",
          description:
            "Questions is prominently displayed, indicating the sequence in the survey.",
          iconSize: 20,
        },
        {
          description:
            "A list of multiple-choice responses is provided, with radio buttons for selection",
          iconSize: 20,
        }
     
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
      {/* <div className="d-flex mt-5" >
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
        <div className="d-flex justify-content-start flex-wrap col-lg-7 col-md-5 col-sm-7 gap-2 ms-2 p-4 pt-0 mt-2">
          <div className="watchsectioncard d-flex flex-column align-items-start">
            <img
              type="button"
              src={image}
              className="card-img"
              alt="Survey Step"
            />
          </div>
        </div>
      </div> */}
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
          <div className="watchsectioncard  d-flex flex-column align-items-start justify-content-center">
            <img
              type="button"
              src={image1}
              className="card-img"
              alt="Survey Step"
            />
          </div>
        </div>
      </div>
      <div className="d-flex mt-5" >
        <div className="col-lg-4 col-md-3  col-sm-4 m-5 mt-0">
          {secoundsteps.map((step, index) => (
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
          <div className="watchsectioncard  d-flex flex-column align-items-start justify-content-center">
            <img
              type="button"
              src={image2}
              className="card-img"
              alt="Survey Step"
            />
          </div>
        </div>
      </div>
      </div>

      </>  )
}

export default Viewsurveyquestions