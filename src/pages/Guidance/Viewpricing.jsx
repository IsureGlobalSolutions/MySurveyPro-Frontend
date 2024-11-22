import React from 'react'
import image1 from "../../assets/Enterprisesection-png/Pricing.png";
import image2 from "../../assets/Enterprisesection-png/Pricingusingexternal.png";
// import image3 from "../../assets/Enterprisesection-png/linksurvey.png";
import "./guidance.css";
import { FaCircleDot } from "react-icons/fa6";

 
const Viewpricing = () => {
    const firststeps = [
        {
          title: "View survey Pricing",
          description:
            "Image likely represents a pricing plan or feature set for a specific product or service, possibly a survey tool or analytics platform.",
          iconSize: 25,
        },
        {
            // title: "Preview survey",
            description:
              "It aims to highlight the benefits of upgrading to a Pro Plan. ",
            iconSize: 13,
          },
      ];
      const secoundsteps = [
        {
          title: "View pay the card",
          description:
            "Image likely represents a how user come and fill the card using credit or vise card",
          iconSize: 20,
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

</>
)
}

export default Viewpricing