import React from 'react';
import image from "../../assets/Enterprisesection-png/1.png";
import image1 from "../../assets/Enterprisesection-png/2ListofSurveys.png";
import image2 from "../../assets/Enterprisesection-png/3 Launch Survey.png";
import image3 from "../../assets/Enterprisesection-png/linksurvey.png";


import "./guidance.css";
import { FaCircleDot } from "react-icons/fa6";

const Guidetemplate = () => {
  const steps = [
    {
      title: "Uploading a CSV file:",
      description:
        "Button provides an alternative method for uploading the CSV file by selecting it from the user's system.",
      iconSize: 25,
    },
    {
      title: "Downloading a CSV file:",
      description:
        "Button allows the user to obtain the template for their CSV file.",
      iconSize: 16,
    },
    {
      title: "Drop Your CSV file:",
      description:
        "The specific area where the user can drag and drop their CSV file.",
      iconSize: 17,
    },
 
  ];
  const secoundsteps = [
    {
      title: "Viewing survey details:",
      description:
        "The columns provide key information about each survey, including its name, description, and creation date.",
      iconSize: 25,
    },
    {
      title: "Selecting surveys:",
      description:
        "The checkbox allows users to select specific surveys for further actions, such as editing, deleting, or proceeding to the next step.",
      iconSize: 30,
    },
    {
      title: "Pagination:",
      description:
        "The Next  button indicates that there are additional surveys or actions available, allowing users to navigate through the list.",
      iconSize: 30,
    },
 
  ];
  const thirdsteps = [
    {
      title: "Viewing survey details:",
      description:
        "The columns provide key information about each survey, including its name, description, and creation date.",
      iconSize: 25,
    },
    {
      title: "Selecting surveys:",
      description:
        "The checkbox allows users to select specific surveys for further actions, such as editing, deleting, or proceeding to the next step.",
      iconSize: 30,
    },
    {
      title: "Pagination:",
      description:
        "The Next  button indicates that there are additional surveys or actions available, allowing users to navigate through the list.",
      iconSize: 30,
    },
 
  ];
  const forthsteps = [
    {
      title: "Viewing survey link:",
      description:
        "A text box labeled Survey Link contains a URL",
      iconSize: 18,
    },
    {
        // title: "Viewing survey link:",
        description:
          "A small copy icon (clipboard) is provided, allowing users to quickly copy the link for sharing purposes",
        iconSize: 23,
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
      <div className="d-flex mt-5">
        <div className="col-lg-4 m-5 mt-0">
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
          <div className="watchsectioncard d-flex flex-column align-items-start ">
            <img
              type="button"
              src={image1}
              className="card-img"
              alt="Survey Step"
            />
          </div>
        </div>
      </div>
      <div className="d-flex mt-5">
        <div className="col-lg-4 m-5 mt-0">
          {thirdsteps.map((step, index) => (
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
          <div className="watchsectioncard d-flex flex-column align-items-start ">
            <img
              type="button"
              src={image2}
              className="card-img"
              alt="Survey Step"
            />
          </div>
        </div>
      </div>
      <div className="d-flex mt-5">
        <div className="col-lg-4 m-5 mt-0">
          {forthsteps.map((step, index) => (
            <div key={index}>
              <div className="startsurvey m-4 ms-0">
                <h1>{step.title}</h1>
              </div>
              <div style={{ color: '#F97300', display: 'flex' , alignItems:"start", }}>
                <FaCircleDot size={step.iconSize} className='pt-1' />
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
          <div className="watchsectioncard d-flex flex-column align-items-center justify-content-center ">
            <img
              type="button"
              src={image3}
              className="card-img"
              alt="Survey Step"
            />
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Guidetemplate;
