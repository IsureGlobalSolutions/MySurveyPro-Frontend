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
const LandingPage = () => {
  const [count, setCount] = useState(0);
  const [countone, setcountone] = useState(0);
  const [counttwo, setcounttwo] = useState(0);
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
        setCount((prevCount) => Math.min(prevCount + 1, 85)); // Increment count, but don't exceed 85
      }, 30); // Adjust the interval duration to control speed (30ms for smooth counting)
    } else if (count === 85) {
      clearInterval(interval); // Clear interval when count reaches 85
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [count]);
  useEffect(() => {
    const mysurveypro = document.getElementById('mysurveypro');
    const firstLine = document.getElementById('first-line');
    mysurveypro.style.opacity = '0';
    const timer = setTimeout(() => {
      mysurveypro.style.opacity = '1';
      mysurveypro.style.animation = 'typing-mysurveypro 4s steps(70, end), blink 0.95s step-end infinite';
      setTimeout(() => {
        mysurveypro.style.borderRight = 'none'; 
      }, 4000);
    }, 4000); 
    setTimeout(() => {
      firstLine.style.borderRight = 'none'; 
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="my-survey-pro">

      <section className="hero-banner pt-4">
        <h1 className="create-forms-that-container container">
 <div className="create-forms-that-container">
      <p className="create-forms-that first-line" id="first-line">
        Transform the Way You Measure Human Capital Success with 
      </p>
    </div>
    <span className="engagements" id="mysurveypro">MySurveyPro!</span>
             <p className="hero-banner-tagline mt-3">Struggling to gather accurate insights on team performance and engagement?</p>
        </h1>
  
      </section>  
      <div className="w-100 hover-container" style={{ background: "#D9D9D91F" }}>
  <img src={heroImage} alt="" className="img-fluid" />
</div>

    
     <div className="work-eff w-100">
      <div className="work-eff-content container">
 
        <section className="trust-section">
        <div className="text-content">
            <h2>We earn trust by working efficiently</h2>
        </div>
        <div className="stats">
        <div className="stat-item">
      <span className="number">{count}+</span>
      <span className="label">Subscriptions</span>
    </div>
            <div className="divider"></div>
            <div className="stat-item">
      <span className="number">{countone}+</span>
      <span className="label" style={{whiteSpace:"nowrap"}}>Daily Order</span>
    </div>
            <div className="divider"></div>
            <div className="stat-item">
      <span className="number">{counttwo}+</span>
      <span className="label" style={{whiteSpace:"nowrap"}}>Current Survey</span>
    </div>
        </div>
    </section>
    
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