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
  return (
    <div className="my-survey-pro">

      <section className="hero-banner">
        <h1 className="create-forms-that-container container">
          <p className="create-forms-that">Transform the Way You Measure Human Capital Success with  <span className="engagements">MySurveyPro!</span></p>
             <p className="hero-banner-tagline mt-3">Struggling to gather accurate insights on team performance and engagement?</p>
        </h1>
  
      </section>  
      <img src={heroImage} alt="" />
    
     <div className="work-eff w-100">
      <div className="work-eff-content container">
 
        <section className="trust-section">
        <div className="text-content">
            <h2>We earn trust by working efficiently</h2>
        </div>
        <div className="stats">
            <div className="stat-item">
                <span className="number">85+</span>
                <span className="label">Subscriptions</span>
            </div>
            <div className="divider"></div>
            <div className="stat-item">
                <span className="number">35+</span>
                <span className="label">Daily Order</span>
            </div>
            <div className="divider"></div>
            <div className="stat-item">
                <span className="number">10+</span>
                <span className="label">Current Survey</span>
            </div>
        </div>
    </section>
    
      </div>
     </div>
     <div className="container my-3">
      <img src={brandList} className="img-fluid" alt="no Image of brands" />
     </div>

<SurvySolution/>
<CustomizeFormSection/>
<EffortlessSurveySection/>
<StartTodaySection/>
<WhyChooseUs/>
<Community/>
      <Bluesection />
      <PricingTable />
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;