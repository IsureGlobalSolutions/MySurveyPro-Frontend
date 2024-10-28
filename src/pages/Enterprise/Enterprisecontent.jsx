import React from 'react'
import Image from '../../assets/Enterprise.svg/Enterpriseimg1.svg?react'
import Image1 from '../../assets/Enterprise.svg/Enterpriseimg2.svg?react'
import Image2 from '../../assets/Enterprise.svg/Enterpriseimg3.svg?react'
import "./Enterprise.css";

const Enterprisecontent = () => {
    const data = [
       {
        img : <Image/>,
        title: "Quickly build custom forms",
        text: "Customise your forms with specially formatted fields or get a jump-start with pre-built templates."
       },
       {
        img : <Image1/>,
        title: "Rely on AI",
        text: "Use to create better surveys, gather higher-quality responses and spot insights faster."
       },
       {
        img : <Image2/>,
        title: "Stay true to your brand",
        text: "Create branded surveys and forms with custom URLs, custom questions and shared brand assets."
       }
    ]
  return (
    <div className=" d-flex flex-wrap justify-content-center m-4 p-5  gap-5 ">
  {data.map((card, index) => (
    <div className="cardstyle  col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column align-items-center ms-5  justify-content-center" key={index} style={{border:'none' , boxShadow:'none'}}>
      <div className="icon-wrapper  p-2   mt-3 mb-0">
        {card.img}
      </div>
      <div className="cardtexts text-center mt-2">
        <h1>{card.title}</h1>
      <p className="">{card.text}</p>
          </div>
    </div>
  ))}
</div>
  )
}

export default Enterprisecontent