import React from 'react';
import './contact.css';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Import axios for API requests
import lining from '../../assets/contactus/contact-lines.png';
import sideimage from '../../assets/contactus/rectangle-237@2x.png';
import InputField from '../../components/mySurveyProInput/InputField';
import WebsiteButton from '../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { contactus } from '../../Redux/slice/authSlice';

const ContactUs = ({ className = "" }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
const dispatch =useDispatch()
  // Handle form submission
  const onSubmit =(data) => {
    console.log("Form submission triggered");

    console.log("🚀 ~ onSubmit ~ data1:", data)
    
    try {
      const contactData = {...data}; 
      dispatch(contactus(contactData)) 
        .then((res) => {
          if (res.payload) {
            alert('Your message has been sent successfully!');
            reset();
          }
        })
        .catch((error) => {
          alert('There was an error submitting the form.');
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className="contact-main-banner">
        <div className="">
          <p>Contact us</p>
        </div>
      </div>
      <div className="row m-0">
        <div className="col-md-6">
          <div className={`survey-pro-contactus ${className}`}>
            <div className="image-58-icon">
              <div className="">
                <p>Send Us Your Questions</p>
                <small>We’ll have a specialist follow up with an email as soon as they can</small>
              </div>
            </div>

            <div className="rectangle-group">
              <div className="group-child4" />
              <div className="group-child5" />
              <div className="wrapper-rectangle-237">
                <img className="wrapper-rectangle-237-child" alt="" src={sideimage} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 contact-form-parent">
          <div className="w-100">
            <div className="contact-form-title">Contact Form</div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-space">
                <InputField
                  type="text"
                  name="firstName"
                  register={register}
                  errors={errors}
                  placeholder="First Name"
                  {...register('firstName', { required: 'First name is required' })}
                />
              </div>

              <div className="input-space">
                <InputField
                  type="text"
                  name="lastName"
                  register={register}
                  errors={errors}
                  placeholder="Last Name"
                  {...register('lastName', { required: 'Last name is required' })}
                />
              </div>

              <div className="input-space">
                <InputField
                  type="email"
                  name="email"
                  register={register}
                  errors={errors}
                  placeholder="Email Address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                />
              </div>

              <div className="input-space">
                <InputField
                  type="number"
                  name="phone"
                  register={register}
                  errors={errors}
                  placeholder="Phone Number"
                  {...register('phone', { required: 'Phone number is required' })}
                />
              </div>

              <div className="input-space">
                <textarea
                  className="contact-message"
                  placeholder="Message"
                  rows={5}
                  {...register('message', { required: 'Message is required' })}
                />
              </div>

              <div className="signup-button">
                <WebsiteButton type="submit" className="w-100">
                  Send Message
                </WebsiteButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

ContactUs.propTypes = {
  className: PropTypes.string,
};

export default ContactUs;
