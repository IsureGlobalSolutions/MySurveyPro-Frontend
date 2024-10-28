// src/components/Button.js
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Import styles for the button

const WebsiteButton = ({ children,
   onClick, 
   type = 'button', 
   className = '',
   buttonDesign=''
   , ...props }) => {
  return (
    <button type={type} onClick={onClick} className={`${className} d-flex justify-content-center align-items-center ${buttonDesign==='outliner'? 'outliner-button':'website-button '}`} {...props}>
      <div className="website-button-text ">
         
            {children} 
          

      </div>
     
    </button>
  );
};

WebsiteButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default WebsiteButton;
