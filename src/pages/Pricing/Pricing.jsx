import React, { useEffect, useState } from 'react';
import './Pricing.css';
import Tickicon from '../../assets/svgs/TrueTick.svg?react';
import pricingIcon from '../../assets/pricingIcon.png';
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurveyList, paymentSurvey } from '../../Redux/slice/surveySlice';
import toast from 'react-hot-toast';

const Pricing = () => {
  const dispatch = useDispatch();
  const { surveysList, paymentStatus } = useSelector((state) => state.survey);

  // Local state to manage loading per card
  const [loadingStates, setLoadingStates] = useState({});

  // Fetch surveys on mount
  useEffect(() => {
    dispatch(getAllSurveyList());
  }, [dispatch]);

  const sendPayment = async (surveyId, surveyName) => {
    // Set loading state for the specific survey
    setLoadingStates((prev) => ({ ...prev, [surveyId]: true }));

    try {
      const res = await dispatch(
        paymentSurvey({ surveyId, surveyDescription: surveyName })
      ).unwrap();

      if (res?.url) {
        window.location.replace(res.url);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      // Reset loading state for the specific survey
      setLoadingStates((prev) => ({ ...prev, [surveyId]: false }));
    }
  };

  return (
    <div className="pricing p-3">
      <div className="container mt-4 mb-4">
        <div className="row justify-content-center">
          {surveysList?.map((item, index) => {
            const isPaid = paymentStatus[item?.id]?.paymentStatus === true;
            const isLoading = loadingStates[item?.id] || false;

            return (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div className="pricingcard">
                  <div className="text-start m-4 mt-0">
                    <div className="mb-3">
                      <img src={pricingIcon} alt="Pricing Icon" className="img-fluid" />
                    </div>
                    <div className="mb-3">
                      <h1>{item?.name}</h1>
                    </div>
                    <div className="mb-3">
                      <span>
                        Unleash the Power of Your Business <br />
                        with Pro Plan.
                      </span>
                    </div>
                    <div className="d-flex justify-content-start mb-3">
                      <h1>$5</h1>
                      <span className="m-3">per Survey</span>
                    </div>
                    <div className="d-flex price-line mb-3"></div>

                    {/* Features */}
                    {Array(4)
                      .fill('Enhanced Analytics')
                      .map((feature, idx) => (
                        <div
                          className="d-flex pricingcard-text mb-2 justify-content-start align-items-center"
                          key={idx}
                        >
                          <Tickicon />
                          <span className="ms-2">{feature}</span>
                        </div>
                      ))}

                    <div className="text-center">
                      {isPaid ? (
                        <WebsiteButton
                          type="button"
                          buttonDesign="outliner"
                          disabled
                        >
                          Paid
                        </WebsiteButton>
                      ) : (
                        <WebsiteButton
                          type="button"
                          buttonDesign="outliner"
                          disabled={isLoading}
                          onClick={() => sendPayment(item?.id, item?.name)}
                        >
                          {isLoading ? 'Loading...' : 'Get Started'}
                        </WebsiteButton>
                      )}
                    </div>
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
