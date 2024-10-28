import React from 'react';
import PropTypes from 'prop-types';


const LoginLayout = ({ children }) => {
  return (
    <>
    
      {children}
     
    </>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginLayout;
