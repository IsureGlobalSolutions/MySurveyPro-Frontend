// src/components/Button.js
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Import styles for the button
import { Link } from 'react-router-dom';
const WebsiteButton = ({ children,
   onClick, 
   to,
   type = 'button', 
   className = '',
   buttonDesign=''
   , ...props }) => {
  return (
    <Link to={to} className='link-text'>
     <button type={type} onClick={onClick} className={`${className} d-flex justify-content-center align-items-center ${buttonDesign==='outliner'? 'outliner-button':'website-button '}`} {...props}>
      <div className="website-button-text">
         
            {children} 
          

      </div>
     
    </button>
    </Link>
   
  );
};

WebsiteButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default WebsiteButton;
