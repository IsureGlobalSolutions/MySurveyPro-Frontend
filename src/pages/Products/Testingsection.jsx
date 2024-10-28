import React from 'react'
import './products.css';
// import img2 from '../../assets/svgs/Ellipse 53 (1).svg'
// import img3 from '../../assets/svgs/Ellipse 53 (2).svg'
import Image1 from '../../assets/svgs/Testingsectionimg1.svg?react'
import Image2 from '../../assets/svgs/Testingsectionimg2.svg?react'
import Image3 from '../../assets/svgs/Testingsectionimg3.svg?react'
import Image4 from '../../assets/svgs/missionimage.svg?react'
import Image5 from '../../assets/svgs/dartmissiongoal.svg?react'
import Image6 from '../../assets/svgs/eyescans.svg?react'
import Image7 from '../../assets/svgs/eye.svg?react'






const Testingsection = () => {
    const cardData = [
        {
          img: <Image2/>,
          title: 'Get started',
          text: 'Add unlimited properties and tenants – manage invoicing, rents, leasings, documentation, and everything in between.'
        },

        {
            img: <Image1/>,
            title: 'Automate',
            text: 'Add unlimited properties and tenants – manage invoicing, rents, leasings, documentation, and everything in between.'
          },
          {
            img: <Image3/>,       
                 title: ' Monitor',
            text: 'Add unlimited properties and tenants – manage invoicing, rents, leasings, documentation, and everything in between.'
          },
    
    ]
   
  return (
   <>
 <div className="container d-flex flex-wrap justify-content-center align-items-center gap-4 testingsection">
  {cardData.map((card, index) => (
    <div className="cardstyle col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column align-items-center" key={index}>
      <div className="icon-wrapper rounded-circle p-2 circlestyle  mt-3 mb-0">
        {card.img}
      </div>
      <div className="cardtext text-center mt-2">
        <h3>{card.title}</h3>
        <p className="mt-3 mb-0">{card.text}</p>
      </div>
    </div>
  ))}
</div>

<div className='container solutionsection d-flex justify-content-start align-items-center gap-4'>
  <h1>Best solutions for your company</h1>
  <div className='line-divider'></div>
  <p>Our mission: to inspire curiosity, creativity, and authenticity. Our mission: to inspire curiosity, creativity, and authenticity. Our mission: to inspire curiosity, creativity, and authenticity.</p>
</div>
<div className=' d-flex  flex-wrap  justify-content-center align-items-start gap-2 '>
          <div className='cardsecoundstyle ' >
      <div className="  d-flex justify-content-between mb-0 w-75 pe-5 ">
      <div className=''>
        <Image4/>
      <h3 className='mt-2'>Automate</h3>
      </div>
      <div className='ms-5 ps-5 '>
        <Image5/>
      </div>
      </div>
        <p className='text-wraper'>Our mission: to inspire curiosity, creativity, and authenticity.Our mission: to inspire curiosity, creativity, and authenticity.Our mission: to inspire curiosity, creativity</p>
      
    </div>
          
    <div className='cardsecoundstyle ' >
    <div className="  d-flex justify-content-between mb-0 w-75 pe-5 ">
      <div className=''>
        <Image7/>
      <h3 className='mt-2'>Vision</h3>
      </div>
      <div className='ms-5 ps-5'>
        <Image6 className="ms-4 ps-1"/>
      </div>
      </div>
        <p className=' text-wraper '>Our mission: to inspire curiosity, creativity, and authenticity.Our mission: to inspire curiosity, creativity, and authenticity.Our mission: to inspire curiosity, creativity</p>
      
    </div>
    
  </div>
  <div className=' solutionsectiontext'>
        <h1>About Our Vision</h1>
        <div> <p>Software testing  & MPOS</p></div>
    </div>
   


   </>
  )
}

export default Testingsection