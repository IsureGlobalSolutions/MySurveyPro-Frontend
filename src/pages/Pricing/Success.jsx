import React, { useEffect, useState } from 'react';
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import img1 from '../../assets/Q12survey/trueicon.png';
import './Pricing.css';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkPaymentStatus, LaunchedSurveysStatusApi } from '../../Redux/slice/surveySlice';
import toast from 'react-hot-toast';
import { store } from '../../Redux/store';
import { updatePaymentStatus } from '../../Redux/slice/surveySlice'; 

const Success = () => {
 
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  const { userId, surveyId } = useParams();
  console.log(userId, surveyId, 'params');

  useEffect(() => {
    if (userId) {
      setisLoading(true);
      // Uncomment and use API as needed
      dispatch(checkPaymentStatus({userId, surveyId}))
        .then((res) => {
      
          if (res?.payload?.paymentStatus === 'paid') {
            toast.success('payment has been successfully paid');

   dispatch(LaunchedSurveysStatusApi())
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res?.payload)
        
          if (res?.payload?.surveyResponse?.length > 0) {
            const paymentStatusUpdates = {};
            res?.payload?.surveyResponse?.forEach((element) => {
              // Add payment status object to the paymentStatusUpdates object
              paymentStatusUpdates[element?.surveyId] = {
                paymentStatus: element?.surveyPaymentStatus,
              };
            });

            // Dispatch the collected payment status updates to the store
            store.dispatch(updatePaymentStatus(paymentStatusUpdates)); 
            setisLoading(false);
          }
       
      });



          }
         
        });
    }
  }, []);

  
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center ">
      <div className="paymentsuccess col-md-7 col-lg-6  m-4 p-4">
        <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center m-4 p-4 pe-0 pt-0 mt-0">
          <h1>Success</h1>
          <span>
            <img src={img1} className="img-fluid" alt="Success Image" />
          </span>
          <h2>Payment Received!</h2>

          <Link to={`${isLoading ? '#' : '/pricing'}`} className="sidbar-item-link">
       
            <WebsiteButton className='w-100' type='submit' loading={isLoading}>
                  {isLoading?" Loading" :'Back to Dashboard'}
                  </WebsiteButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
