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
  className = '',
  buttonDesign = '',
  disabled = false,
  ...props
}) => {
  if (to) {
    return (
      <Link to={to} className="link-text">
        <button
          type={type}
          onClick={onClick}
          className={`${className} d-flex justify-content-center align-items-center ${buttonDesign === 'outliner' ? 'outliner-button' : 'website-button'}`}
          disabled={disabled}
          {...props}
        >
          <div className="website-button-text">{children}</div>
        </button>
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} d-flex justify-content-center align-items-center ${buttonDesign === 'outliner' ? 'outliner-button' : 'website-button'}`}
      disabled={disabled}
      {...props}
    >
      <div className="website-button-text">{children}</div>
    </button>
  );
};

WebsiteButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string, // Link destination (optional)
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  buttonDesign: PropTypes.string,
  disabled: PropTypes.bool,
};

export default WebsiteButton;
