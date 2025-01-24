import React from 'react'
import PropTypes from 'prop-types';
import './Button.css'; // Import styles for the button
import { Link } from 'react-router-dom';
const CustomeButton = ({
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
          <Link to={to} className="custom-link-text">
            <button
              type={type}
              onClick={onClick}
              className={`${className} d-flex justify-content-center align-items-center ${buttonDesign === 'custom-outliner' ? 'custom-outliner-button' : 'custom-website-button'}`}
              disabled={disabled}
              {...props}
            >
              <div className="custom-website-button-text">{children}</div>
            </button>
          </Link>
        );
      }
      return (
        <button
          type={type}
          onClick={onClick}
          className={`${className} d-flex justify-content-center align-items-center ${buttonDesign === 'custom-outliner' ? 'custom-outliner-button' : 'custom-website-button'}`}
          disabled={disabled}
          {...props}
        >
          <div className="custom-website-button-text">{children}</div>
        </button>
      );
}
CustomeButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string, // Link destination (optional)
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    buttonDesign: PropTypes.string,
    disabled: PropTypes.bool,
  };
export default CustomeButton