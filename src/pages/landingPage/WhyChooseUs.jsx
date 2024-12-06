import React from 'react'
import './whychooseus.css';

const WhyChooseUs = () => {
  return (
   <>
   <div className="w-100 mb-5 pb-3" style={{background: 'rgb(57 190 201 / 7%)'}}>
    <div className="container">
        <div className="choose_title my-5 text-center">  
            <p>Why Choose<span> Us?</span></p>
             </div>
            <div className="effortless_survey text-start row ">
            <div className="col-md-5 col-sm-8">
                    <h3>Effortless Surveys</h3>
                <p>Choose from our expertly crafted 
                    survey templates like the Employee
                     Engagement Survey and Team Effectiveness 
                     Indicator. No need to start from scratch—our 
                    templates are ready to use and proven effective.</p>
            </div>
            
            </div>
            <div className="seamless_sharing  row justify-content-end">
                <div className="col-md-5 col-sm-8">
                     <h3>Seamless Sharing</h3>
            <p>Share your surveys with any number of participants 
                effortlessly. Whether it's a small team or a large 
                organization, our platform handles it all without 
                breaking a sweat.</p>
                </div>
           
            </div>
            <div className="automated_data row">
                <div className="col-md-5 col-sm-8">
                   <h3>Automated Data Collection</h3>
            <p>No more manual data handling.
                 Our platform automates the 
                 collection and analysis of survey responses, 
                giving you accurate insights
                 with zero hassle.</p>   
                </div>
          
            </div>
            <div className="cost_effective row justify-content-end">
                <div className="col-md-5 col-sm-8">
                       <h3>Cost-Effective</h3>
            <p>Designed for businesses of all sizes, MySurveyPro
            provides high-quality survey solutions at a fraction of the cost. 
            Get the insights you need without breaking the bank.</p> 
                </div>
        
            </div>
     
    </div>
   </div>
   </>
  )
}

export default WhyChooseUs