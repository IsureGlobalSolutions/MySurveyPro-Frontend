import React, { useEffect, useState } from 'react';
import './Pricing.css';
import Tickicon from '../../assets/svgs/PricingVector.svg?react';
import pricingIcon from '../../assets/Coin.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurveyList, paymentSurvey } from '../../Redux/slice/surveySlice';

import pricingimg from '../../assets/Pricingimg.png'
import CustomeButton from '../../components/mySurveyProWebsiteBtn/CustomeButton';
import toast from 'react-hot-toast';

const Pricing = () => {
  const dispatch = useDispatch();
  const { surveysList, paymentStatus } = useSelector((state) => state.survey);
  
  const [PricingDescription] = useState([
    {
      surveyName: 'TEI',
      tagLine: 'Measures 10 key team engagement dimensions with advanced reporting.',
      description: [
        "<b>Comprehensive Dimension Analysis</b> – Evaluate 10 key dimensions for deeper team insights.",
        "<b>Advanced Dashboard Reports</b> – Access Dimension Reports, Department Reports, and Team Averages for strategic decision-making.",
        "<b>Comparison & Trend Analysis</b> – Track engagement trends with Dimensions vs. Recipients Reports and User Dimension Reports.",
        "<b>Excel Export for Data Processing</b> – Download all reports in Excel format for further analysis.",
        "<b>GUI-Based Interactive Insights</b> – Visualize results with intuitive charts and graphs for better understanding.",
      ],
    },
    {
      surveyName: 'MP12',
      tagLine: 'Provides Q12-based employee engagement insights.',
      description: [
        "<b>Tailored Employee Engagement Surveys</b> – Conduct MP12-based survey questions to match your organization’s culture.",
        "<b>Comprehensive Analytics Dashboard</b> – Get detailed Overall, Department-wise, Grade-wise, and Gender-wise reports for meaningful insights.",
        "<b>Algorithm-Driven Insights</b> – Gain accurate engagement trends using custom-built algorithms for precise analysis.",
        "<b>Excel Export for Data Processing</b> – Download all reports in Excel format for further analysis.",
        "<b>User-Based Data Access</b> – Provide secure, filtered access to HR Consultants and managers for better decision-making.",
      ],
    },
  ]);

  const [loadingStates, setLoadingStates] = useState({});

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

  return (
    <div className="pricing p-5 mt-4 ">
      <div className="container mt-4 mb-4">
        <div className="row justify-content-center">
          {surveysList?.map((item, index) => {
            const isPaid = paymentStatus[item?.id]?.paymentStatus === true;
            const isLoading = loadingStates[item?.id] || false;
            
            const data = PricingDescription?.filter((value) => value.surveyName === item?.name);
            if (!data || data.length === 0) return null;

            const { tagLine, description } = data[0];
            return (
              <div className="col-lg-4 col-md-6 mb-3" key={index}>
                <div className="pricingcard">
                  <div className="image-container">
                    <img className="pricing-image" src={pricingimg} alt="Pricing" />
                    <div className="text-overlay mt-1">
                      <span className='dollar'>$</span> <span className='five'>5</span><br />/month
                    </div>
                  </div>
                  <div className="text-start m-4 mt-0">
                    <div className="mb-4">
                      <img src={pricingIcon} style={{ width: '40px', height: '40px' }} alt="Pricing Icon" className="custom-img-fluid" />
                    </div>
                    <div className="mb-4">
                      <h1>{item?.name}</h1>
                    </div>
                    <div className="mb-4">
                      <span>{tagLine}</span>
                    </div>

                    {/* Features */}
                    {description?.map((feature, idx) => (
                      <div className="d-flex pricingcard-text mb-2 justify-content-start" key={idx}>
                        <Tickicon className='mt-2' />
                        <span className="ms-2" dangerouslySetInnerHTML={{ __html: feature }}></span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center d-flex justify-content-center mt-5 mb-4">
                    {isPaid ? (
                      <CustomeButton type="button" buttonDesign="outliner" disabled>
                        Paid
                      </CustomeButton>
                    ) : (
                      <CustomeButton type="button" buttonDesign="outliner" disabled={isLoading} onClick={() => sendPayment(item?.id, item?.name)}>
                        {isLoading ? 'Loading...' : 'Choose this plan'}
                      </CustomeButton>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
