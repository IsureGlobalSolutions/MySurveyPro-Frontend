import React, { useEffect , useState } from 'react';
import Header from "../../components/plugins/Header";
import Bluesection from "./Bluesection";
import PricingTable from "../../components/PricingTable";
import Footer from "../../components/plugins/Footer";
import "./index.css";
import heroImage from '../../assets/landingPage/hero-banner-image.png';
import brandList from '../../assets/landingPage/brandList.png';
import SurvySolution from "./SurvySolution";
import CustomizeFormSection from "./CustomizeFormSection";
import EffortlessSurveySection from "./EffortlessSurveySection";
import StartTodaySection from "./StartTodaySection";
import WhyChooseUs from "./WhyChooseUs";
import Community from "./Community";
import brandVideo from "../../assets/landingpagevedio/kl_1.webm"
const LandingPage = () => {
  const [count, setCount] = useState(0);
  const [countone, setcountone] = useState(0);
  const [counttwo, setcounttwo] = useState(0);
  const [text, setText] = useState("");
  const fullText = "MySurveyPro!";

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150); 

    return () => clearInterval(interval); 
  }, []);
  useEffect(() => {
    let interval = null;

    if (counttwo < 10) {
      interval = setInterval(() => {
        setcounttwo((prevcounttwo) => Math.min(prevcounttwo + 1, 85));
      }, 30); 
    } else if (counttwo === 10) {
      clearInterval(interval); 
    }

    return () => clearInterval(interval); 
  }, [counttwo]);
  useEffect(() => {
    let interval = null;

    if (countone < 35) {
      interval = setInterval(() => {
        setcountone((prevcountone) => Math.min(prevcountone + 1, 85));
      }, 30); 
    } else if (countone === 85) {
      clearInterval(interval); 
    }

    return () => clearInterval(interval); 
  }, [countone]);
  useEffect(() => {
    // Only run this effect once when the component mounts
    let interval = null;

    if (count < 85) {
      interval = setInterval(() => {
        setCount((prevCount) => Math.min(prevCount + 1, 85)); 
      }, 30);
    } else if (count === 85) {
      clearInterval(interval); 
    }

    return () => clearInterval(interval);
  }, [count]);
  
  return (
    <div className="my-survey-pro  mt-0 pt-0">
     <div className='topherosection  conatiner ps-4'>
<div className='d-flex  hero-section '>
     <div className='col-lg-5  col-md-4'>
   <div className='left-herosection d-flex flex-column gap-3'>
   <h1>Transform the way
you measure human
capital success with </h1>
<h2 aria-label="Hi! I'm a developer" className='ms-0'>
  <h2 class="typewriter"></h2>
</h2>
<span>Struggling to gather accurate insights on 
team performance and engagement?</span>
<div>  
  <button type="button" class="startbutton">Lets Get started</button>
</div>
<div>
<div className="work-eff w-100">
      <div className="work-eff-content ">
      <section className="trust-section d-flex  ">
  <div className="text-content col-lg-4 col-md-6 mt-4  ">
    <h3>We earn trust by working efficiently</h3>
  </div>
  <div className="stats col-lg-8 col-md-6 row text-center mt-4">
    <div className="col-12 col-md-4 d-flex flex-column align-items-center">
      <div className="stat-item">
        <span className="number display-4">{count}+</span>
        <span className="label">Subscriptions</span>
      </div>
    </div>
    {/* <div className="divider d-none d-md-block col-md-1"></div> */}
    <div className="col-12 col-md-4 d-flex flex-column align-items-center mt-3 mt-md-0">
      <div className="stat-item">
        <span className="number display-4">{countone}+</span>
        <span className="label" style={{ whiteSpace: "nowrap" }}>Daily Order</span>
      </div>
    </div>
    {/* <div className="divider d-none d-md-block col-md-1"></div> */}
    <div className="col-12 col-md-4 d-flex flex-column align-items-center mt-3 mt-md-0">
      <div className="stat-item">
        <span className="number display-4">{counttwo}+</span>
        <span className="label" style={{ whiteSpace: "nowrap" }}>Current Survey</span>
      </div>
    </div>
  </div>
</section>

    
      </div>
     </div>
    
</div>
   </div>

      {/* <section className="hero-banner pt-4">
        <h1 className="create-forms-that-container container">
     <div className="create-forms-that-container">
      <p className="create-forms-that first-line" id="first-line">
        Transform the way you measure human capital success with 
      </p>
    </div>
    <span className="engagements" id="mysurveypro">Mysurveypro!</span>
             <p className="hero-banner-tagline mt-3">Struggling to gather accurate insights on team performance and engagement?</p>
        </h1>
  
      </section>  */}
        </div> 
       <div className='col-lg-7 ms-5 '>
       <div className="contain ">
      <div className="video-container">
        <video 
          className="video-fluid" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={brandVideo}  />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
       </div> 
  </div>
     
     </div>
     <div className="container  my-5">
      <img src={brandList} className="img-fluid" alt="no Image of brands" />
     </div>
     
    
    

<SurvySolution/>
<CustomizeFormSection/>
<EffortlessSurveySection/>
<StartTodaySection/>
<WhyChooseUs/>
{/* <Community/>
      <Bluesection />
      <PricingTable /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;