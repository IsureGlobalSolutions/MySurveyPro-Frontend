import PropTypes from "prop-types";
import "./Bluesection.css";
import Inersect from '../../assets/svgs/intersect.svg'
const Bluesection = ({ className = "" }) => {
  return (
    <section className={`bluesection ${className}`}>
      <div className="bluesection-child" />
      <div className="localization-content">
        <div className="looking-for-targeted-responses-wrapper">
          <h2 className="looking-for-targeted">
          Looking to Gather More Focused Insights?
          </h2>
        </div>
        <div className="localization-description-conta">
          <img
            className="intersect-icon"
            loading="lazy"
            alt=""
            src={Inersect}
          />
          <div className="expand-your-reach">
          Connect with a wider audience by providing forms in multiple languages,
           ensuring a seamless experience for everyone.
          </div>
        </div>
      </div>
      <div className="localization-more-button-conta">
        <button className="more-container">
          <b className="more1">More</b>
        </button>
      </div>
    </section>
  );
};

Bluesection.propTypes = {
  className: PropTypes.string,
};

export default Bluesection;
