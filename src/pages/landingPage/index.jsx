import React, { useEffect, useState } from "react";
import Header from "../../components/plugins/Header";
import Bluesection from "./Bluesection";
import PricingTable from "../../components/PricingTable";
import Footer from "../../components/plugins/Footer";
import "./index.css";
import heroImage from "../../assets/landingPage/hero-banner-image.png";
import brandList from "../../assets/landingPage/brandList.png";
import SurvySolution from "./SurvySolution";
import CustomizeFormSection from "./CustomizeFormSection";
import EffortlessSurveySection from "./EffortlessSurveySection";
import StartTodaySection from "./StartTodaySection";
import WhyChooseUs from "./WhyChooseUs";
import Community from "./Community";
import brandVideo from "../../assets/landingpagevedio/Web Video.webm";
import WebsiteButton from "../../components/mySurveyProWebsiteBtn/WebsiteButtton";
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
    <div className="topherosection ps-4">
  <div className="d-flex align-items-center flex-lg-row hero-section">
    <div className="col-lg-6 col-md-5 hero-text-section">
      <div className="left-herosection d-flex flex-column  gap-3">
        <h1>Transform the way you measure human capital success with </h1>
        <h2 aria-label="Hi! I'm a developer" className="ms-0">
          <h2 className="typewriter"></h2>
        </h2>
        <span>
          Struggling to gather accurate insights on team performance and
          engagement?
        </span>
        <div>
         
          <WebsiteButton type='button'  className="startbutton mt-2"
        to="/login"
        >
            Lets Get Started
            </WebsiteButton> 
        </div>
        <div>
          <div className="work-eff w-100">
            <div className="work-eff-content">
              <section className="trust-section d-flex flex-column flex-md-row align-items-center">
                <div className="text-content col-lg-4 col-md-6 text-center text-md-start mt-2">
                  <h3>We earn trust by working efficiently</h3>
                </div>
                <div className="stats row justify-content-center text-center mt-4">
                  {/* Stat 1 */}
                  <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-3 mb-md-0">
                    <div className="stat-item">
                      <span className="number display-4 fw-bold">{count}+</span>
                      <span className="label mt-2">Subscriptions</span>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-3 mb-md-0">
                    <div className="stat-item">
                      <span className="number display-4 fw-bold">{countone}+</span>
                      <span className="label mt-2" style={{ whiteSpace: "nowrap" }}>
                        Daily Orders
                      </span>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="col-12 col-md-4 d-flex flex-column align-items-center">
                    <div className="stat-item">
                      <span className="number display-4 fw-bold">{counttwo}+</span>
                      <span className="label mt-2" style={{ whiteSpace: "nowrap" }}>
                        Current Surveys
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Video Section */}
    <div className="col-lg-6 pt-4 col-md-7 mt-4 d-flex justify-content-center d-none d-lg-block d-md-block">
      <div className="contain w-100 px-3 px-lg-0">
        <div
          className="video-container position-relative"
          style={{ overflow: "hidden", borderRadius: "8px" }}
        >
          <video
            className="video-fluid "
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={brandVideo} />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  
  </div>
</div>

      <div className="container  p-4">
        <img src={brandList} className="img-fluid" alt="no Image of brands" />
      </div>

      <SurvySolution />
      <CustomizeFormSection />
      <EffortlessSurveySection />
      <StartTodaySection />
      <WhyChooseUs />
      {/* <Community/>
      <Bluesection />
      <PricingTable /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
