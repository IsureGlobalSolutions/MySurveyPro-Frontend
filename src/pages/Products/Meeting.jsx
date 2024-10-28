import React from 'react'
import image1 from '../../assets/meetingimg1.png'
import image2 from '../../assets/meetingimg2.png'
import image3 from '../../assets/meetingimg3.png'

const Meeting = () => {
  return (
  <>
    <div className=' solutionsectiontext gap-4 '>
    <h1>Meet the Team</h1>
     <p style={{fontSize:'30px'}}>With over 10 years of experience, we’ve got a well-seasoned team at the company</p>
</div>
<div className='d-flex flew-wrap flex-lg-row  flex-column justify-content-center gap-5 mb-4 pb-4'>
<div className="d-flex justify-content-center align-items-center" >
    <div className="d-flex flex-column meetingtext align-items-center gap-3">
        <div> 
            <img src={image1} alt='Software Testing' className='img-fluid' />
        </div>
        <h1>John David</h1>
        <h2>CEO</h2>
    </div>
</div>
<div className="d-flex justify-content-center align-items-center" >
    <div className="d-flex flex-column meetingtext align-items-center gap-3">
        <div> 
            <img src={image2} alt='Software Testing' className='img-fluid' />
        </div>
        <h1>John David</h1>
        <h2>CTO</h2>
    </div>
</div>
<div className="d-flex justify-content-center align-items-center" >
    <div className="d-flex flex-column meetingtext align-items-center gap-3">
        <div> 
            <img src={image3} alt='Software Testing' className='img-fluid' />
        </div>
        <h1>John David</h1>
        <h2>Co-Founder</h2>
    </div>
</div>
</div>
</>
  )
}

export default Meeting