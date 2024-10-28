import PropTypes from "prop-types";
import "./Footer.css";
// import logo from '../../assets/group-40-1@2x.png'
import Logo from '../../assets/svgs/logofinal.svg?react'
import { Link } from "react-router-dom";

const Footer = ({ className = "" }) => {
  return (
    <footer className={`footer ${className}`}>
      <div className="footer-background" />
      <div className="footer-content">
        <div className="group-40-2-parent">
          {/* <img
            className="group-40-2"
            loading="lazy"
            alt=""
            src={logo}
          /> */}
          <div className="pb-3">
                    <Link to={'/'}>  <Logo width={150}/>  </Link>
          </div>
          <p className="create-forms-that2">
            Create forms that drive engagements
          </p>
        </div>
      </div>
      <div className="footer-links">
        <div className="product-links">
          <b className="product">Product</b>
          <div className="product-items">
            <div className="templates1">Templates</div>
            <div className="integration">Resources</div>
            {/* <div className="pricing1">Pricing</div> */}
            <div className="open-source">Enterprise</div>
          </div>
        </div>
        <div className="resource-links">
          <b className="resources1">Resources</b>
          <div className="resource-items">
            <div className="resource-item">
              <div className="help-center">Help Center</div>
              <div className="community">community</div>
              <div className="blog">blog</div>
            </div>
          </div>
        </div>
        <div className="company-links">
          <b className="company">Company</b>
          <div className="company-items">
            <div className="about-faqs-contact-container">
              <p className="about">about</p>
              <p className="faqs">faqs</p>
              <p className="contact">contact</p>
            </div>
          </div>
        </div>
        <div className="legal-links">
          <b className="legal">Legal</b>
          <div className="legal-items">
            <div className="privacy-terms-abuse-container">
              <p className="privacy">privacy</p>
              <p className="terms">terms</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
