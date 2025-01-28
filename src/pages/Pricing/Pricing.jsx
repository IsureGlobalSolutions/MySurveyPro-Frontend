import React, { useEffect, useState } from 'react';
import './Pricing.css';
import Tickicon from '../../assets/svgs/PricingVector.svg?react';
import pricingIcon from '../../assets/Coin.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurveyList, paymentSurvey } from '../../Redux/slice/surveySlice';
import toast from 'react-hot-toast';
import pricingimg from '../../assets/Pricingimg.png'
import CustomeButton from '../../components/mySurveyProWebsiteBtn/CustomeButton';
const Pricing = () => {
  const dispatch = useDispatch();
  const { surveysList, paymentStatus } = useSelector((state) => state.survey);
    const [PricingDescription] = useState([
      'Advanced analytics & performance tracking.',
      'Task & project management features.',
      'Real-time collaboration tools.', 
      'Detailed insights into team effectiveness.',
      'Priority support for seamless operations.'
    ]);
  const [loadingStates, setLoadingStates] = useState({});
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
    <div className="pricing p-5 mt-4 ">
      <div className="container mt-4 mb-4">
        <div className="row justify-content-center">
          {surveysList?.map((item, index) => {
            const isPaid = paymentStatus[item?.id]?.paymentStatus === true;
            const isLoading = loadingStates[item?.id] || false;

            return (
              <div className="col-lg-4 col-md-6 mb-3" key={index}>
                <div className="pricingcard ">
                <div className="image-container ">
      <img className="pricing-image" src={pricingimg} alt="Pricing" />
      <div className="text-overlay mt-1">
        <span className='dollar'>$</span> <span className='five'>5</span><br />/month
      </div>
    </div>
                  <div className="text-start m-4 mt-0">
                    <div className="mb-4">
                      <img src={pricingIcon}
                        style={{ width: '40px', height: '40px' }} 
                      alt="Pricing Icon" size={20} className="custom-img-fluid" />
                    </div>
                    <div className="mb-4">
                      <h1>{item?.name}</h1>
                    </div>
                    <div className="mb-4">
                      <span>
                        Unleash the Power of Your Business <br />
                        with Pro Plan.
                      </span>
                    </div>
                    {/* <div className="d-flex justify-content-start mb-3">
                      <h1>$5</h1>
                      <span className="m-3">per Survey</span>
                    </div> */}
                    {/* <div className="d-flex price-line mb-4"></div> */}

                    {/* Features */}
                    {PricingDescription.map((feature, idx) => (
                        <div
                          className="d-flex pricingcard-text mb-2 justify-content-start align-items-center"
                          key={idx}
                        >
                          <Tickicon />
                          <span className="ms-2">{feature}</span>
                        </div>
                      ))}

                    
                  </div>
                  <div className="text-center  d-flex  justify-content-center mt-5 mb-4">
                      {isPaid ? (
                        <CustomeButton
                          type="button"
                          buttonDesign="outliner"
                          disabled
                        >
                          Paid
                          </CustomeButton>
                      ) : (
                          <CustomeButton
                          type="button"
                          buttonDesign="outliner"
                          disabled={isLoading}
                          onClick={() => sendPayment(item?.id, item?.name)}
                        >
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
