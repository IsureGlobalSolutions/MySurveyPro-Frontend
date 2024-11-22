
import React from 'react'
import image1 from "../../assets/Enterprisesection-png/dashborad1.png";
import image2 from "../../assets/Enterprisesection-png/dashboard2.png";
// import image3 from "../../assets/Enterprisesection-png/linksurvey.png";
import "./guidance.css";
import { FaCircleDot } from "react-icons/fa6";

 
const Viewdashboard = () => {
    const firststeps = [
        {
          title: "View Dashboard",
          description:
            "This dashboard provides a comprehensive view of survey responses and engagement.",
          iconSize: 16,
        },
        {
            // title: "Preview survey",
            description:
              "Click to download the report for the selected department.",
            iconSize: 11,
          },
          {
            // title: "Preview survey",
            description:
            "Indicates the level of engagement for each question (Actively Engaged, Actively Disengaged, Not Engaged).",
            iconSize: 20,
          },
          {
            // title: "Preview survey",
            description:
            "Shows the number of responses for each answer option (Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree).",
            iconSize: 20,
          },

      ];
      const secoundsteps = [
        {
          title: "Download the Report",
          description:
            "This dashboard provide  you to download the report of a selected survey",
          iconSize: 16,
        },
        {
            // title: "Preview survey",
            description:
              "Click to download the report for the selected department.",
            iconSize: 11,
          },
          {
            // title: "Preview survey",
            description:
            "Selectedsurvey dropdown show you to select a survey and view the data",
            iconSize: 16,
          },
         

      ];
  return (
<>
<div  className='guidetemplate'>

<div className="d-flex mt-5" >
        <div className="col-lg-4 col-md-3  col-sm-4 m-5 mt-0">
          {firststeps.map((step, index) => (
            <div key={index}>
              <div className="startsurvey m-4 ms-0">
                <h1>{step.title}</h1>
              </div>
              <div style={{ color: '#F97300', display: 'flex' , alignItems:"start" }}>
                <FaCircleDot size={step.iconSize} className='mt-1'/>
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
      <div className="d-flex mt-5" >
        <div className="col-lg-4 col-md-3  col-sm-4 m-5 mt-0">
          {secoundsteps.map((step, index) => (
            <div key={index}>
              <div className="startsurvey m-4 ms-0">
                <h1>{step.title}</h1>
              </div>
              <div style={{ color: '#F97300', display: 'flex' , alignItems:"start" }}>
                <FaCircleDot size={step.iconSize} className='mt-1'/>
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
          <div className="watchsectioncard border-0  d-flex flex-column align-items-start justify-content-center">
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

</>
)
}

export default Viewdashboard