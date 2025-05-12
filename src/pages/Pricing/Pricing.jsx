import React, { useEffect, useRef, useState } from 'react';
import './Pricing.css';
import Tickicon from '../../assets/svgs/PricingVector.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurveyList, paymentSurvey } from '../../Redux/slice/surveySlice';
import CustomeButton from '../../components/mySurveyProWebsiteBtn/CustomeButton';
import toast from 'react-hot-toast';

const Pricing = () => {
  const dispatch = useDispatch();
  const { surveysList, paymentStatus } = useSelector((state) => state.survey);
  
  const [PricingDescription] = useState([
    {
      surveyName: 'CA',
      tagLine: 'Provide assessment by director for employees and vise virsa   ',
      description: [
        `Scientifically-Designed Survey Templates - Based on proven models like Gallup Q12 & TEI (Team Emotional Intelligence).`,
        "Real-Time Analytics & Visual Dashboards - Instantly view department-wise, grade-wise, and gender-wise reports.",
        "Actionable Insights - Custom-built algorithm to help identify gaps, strengths, and opportunities.",
        "Data Security & Privacy - Built on latest Core technologies with enterprise-grade encryption and access control.",
        "Excel & CSV Report Downloads - Easy export for offline review and compliance.",
        "	Unlimited Survey Runs - Run assessments as often as needed with no hidden limits.",
      ]
    },
    {
      surveyName: 'TEI',
      tagLine: 'Measures 10 key team engagement dimensions with advanced reporting.',
      description: [
        "Comprehensive Dimension Analysis - Evaluate 10 key dimensions for deeper team insights.",
        "Advanced Dashboard Reports - Access Dimension Reports, Department Reports, and Team Averages.",
        "Comparison & Trend Analysis - Track engagement trends with Dimensions vs. Recipients Reports.",
        "Excel Export for Data Processing - Download all reports in Excel format for further analysis.",
        "GUI-Based Interactive Insights - Visualize results with intuitive charts and graphs.",
      ]
    },
    {
      surveyName: 'MP12',
      tagLine: 'Provides MPI2-based employee engagement insights.',
      description: [
        "Tailored Employee Engagement Surveys - Conduct MPI2-based survey questions to match your organization's culture.",
        "Comprehensive Analytics Dashboard - Get detailed Overall, Department-wise, Grade-wise, and Gender-wise reports.",
        "Algorithm-Driven Insights - Gain accurate engagement trends using custom-built algorithms.",
        "Excel Export for Data Processing - Download all reports in Excel format for further analysis.",
        "User-Based Data Access - Provide secure, filtered access to HR Consultants and managers.",
      ]
    },
  ]);

  const [loadingStates, setLoadingStates] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentDescription, setCurrentDescription] = useState([]);
  const detailsRef = useRef(null);
  useEffect(() => {
    dispatch(getAllSurveyList());
  }, [dispatch]);

  const sendPayment = async (surveyId, surveyName) => {
    setLoadingStates((prev) => ({ ...prev, [surveyId]: true }));

    try {
      const res = await dispatch(paymentSurvey({ surveyId, surveyDescription: surveyName })).unwrap();
      if (res?.url) {
        window.location.replace(res.url);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoadingStates((prev) => ({ ...prev, [surveyId]: false }));
    }
  };


  const handleCardHover = (index, description) => {
    setHoveredCard(index);
    setCurrentDescription(description);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setCurrentDescription([]);
  };
  return (
    <div className="pricing">
      <div className="container mt-4 mb-4">
        {/* Cards Row */}
        <div className="row justify-content-center pricing-container">
          {surveysList?.map((item, index) => {
            const isPaid = paymentStatus[item?.id]?.paymentStatus === true;
            const isLoading = loadingStates[item?.id] || false;
            
            const data = PricingDescription?.find((value) => value.surveyName === item?.name);
            if (!data) return null;

            const { tagLine } = data;

            return (
              <div 
                className={`col-lg-4 col-md-6 p-0 pricing-column ${hoveredCard === index ? 'hovered' : ''}`} 
                key={index}
                onMouseEnter={() => handleCardHover(index, data.description)}
              >
                {/* Pricing Card */}
                <div className="pricingcard">
                  <div className="pricing-header">
                    <div className="pricing-title">
                      <h3>{item?.name}</h3>
                      <div className="pricing-amount">
                        <span className="price">5</span>
                        <div className="currency">
                          <span className="usd">USD</span>
                          <span className="period">/mo.</span>
                        </div>
                      </div>
                    </div>
                    <p className="tagline">{tagLine}</p>
                  </div>

                  <div className="pricing-cta">
                    <CustomeButton 
                      type="button" 
                      buttonDesign="outliner" 
                      disabled={isPaid || isLoading} 
                      onClick={(e) => {
                        e.stopPropagation();
                        sendPayment(item?.id, item?.name);
                      }}
                    >
                      {isPaid ? 'Paid' : isLoading ? 'Loading...' : 'Start my free trial'}
                    </CustomeButton>
                  </div>  
                  <div className="no-credit">
                    <p className="">(no credit card required)</p>
                  </div>
                  <div className="no-credit">
                    <p className="">Whats included</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full-width Details Section - Outside the map */}
        {hoveredCard !== null && currentDescription.length > 0 && (
          <div
            className="row hoverable-details"
            onMouseEnter={() => setHoveredCard(hoveredCard)}
            onMouseLeave={handleMouseLeave}
            ref={detailsRef}
          >
            <div className="col-12 p-0">
              <div className="pricing-details">
                <h4>What's included:</h4>
                <ul className="feature-list">
                  {currentDescription.map((feature, idx) => {
                    const parts = feature.split(' - ');
                    const heading = parts[0];
                    const description = parts.slice(1).join(' - ');
                    
                    return (
                      <li key={idx} className="feature-item">
                        <div className="icon-container">
                          <Tickicon className="tick-icon" />
                        </div>
                        <div className="feature-content">
                          <strong className="feature-heading">{heading}</strong>
                          {description && <p className="feature-description">{description}</p>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;