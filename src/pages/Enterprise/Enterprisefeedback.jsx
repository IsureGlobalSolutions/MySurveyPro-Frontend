import React from 'react'
import "./Enterprise.css";
import heroimage from "../../assets/Enterprisesection-png/Enterpriseheroimg.png"
const Enterprisefeedback = () => {
  return (
    <div className=' enterprise  p-5' style={{backgroundColor:'white'}}>
    <div className="container-fluid">
    <div className="row  d-flex  gap-4 justify-content-center">
    <div className='col-lg-5 mt-4 d-flex flex-column justify-content-center col-12 '>
     <div><h2>SCALE</h2></div>
     <div className='mt-4 '><h1>Scale feedback programes with enhanced flexibility and control</h1></div>
     <div className='mt-4 '><p>Empower your organisation to work smarter, not harder. Assign specific roles and create groups to ensure that the right people have access to critical data. </p></div>
    
 </div>
    <div className="col-lg-6 col-10  col-12 mt-5 ms-4 ps-4  d-flex  justify-content-end ">
   <img  src={heroimage} alt='image'  className="img-fluid"
     />
 </div>

 
 </div>
 </div>
 </div>
  )
}

export default Enterprisefeedback