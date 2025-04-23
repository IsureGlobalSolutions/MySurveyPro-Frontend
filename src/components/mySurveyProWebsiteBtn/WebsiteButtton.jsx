// src/components/Button.js
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Import styles for the button
import { Link } from 'react-router-dom';

const WebsiteButton = ({
  children,
  onClick,
  to,
  type = 'button', 
  loading = false,
  className = '',
  buttonDesign = '',
  disabled = false,
  ...props
}) => {
  // Combine disabled prop with loading state
  const isDisabled = disabled || loading;
  
  // Button content with loading indicator
  const buttonContent = loading ? (
    <>
      <i class="fa fa-spinner fa-spin"></i>
      {children}
    </>
  ) : children;

  if (to) {
    return (
      <Link to={to} className="link-text">
        <button
          type={type}
          onClick={onClick}
          className={`${className} d-flex justify-content-center align-items-center gap-2 ${
            buttonDesign === 'outliner' ? 'outliner-button' : 'website-button'
          }`}
          disabled={isDisabled}
          {...props}
        >
          <div className="website-button-text">{buttonContent}</div>
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} d-flex justify-content-center align-items-center gap-2 ${
        buttonDesign === 'outliner' ? 'outliner-button' : 'website-button'
      }`}
      disabled={isDisabled}
      {...props}
    >
      <div className="website-button-text">{buttonContent}</div>
    </button>
  );
};

WebsiteButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string, // Link destination (optional)
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  loading: PropTypes.bool,
  className: PropTypes.string,
  buttonDesign: PropTypes.string,
  disabled: PropTypes.bool,
};

WebsiteButton.defaultProps = {
  loading: false,
  disabled: false,
};

export default WebsiteButton;