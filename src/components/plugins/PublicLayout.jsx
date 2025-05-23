import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import "./Header.css";

const PublicLayout = ({ children }) => {
  return (
    <>
    <Header />
      {children}
      <Footer />
    </>
  );
};

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicLayout;
