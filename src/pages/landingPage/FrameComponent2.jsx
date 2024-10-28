import { useMemo } from "react";
import PropTypes from "prop-types";
import "./FrameComponent2.css";

const FrameComponent2 = ({
  className = "",
  cardImage,
  hotDeals,
  getAnIndividualPlanWithFe,
  propPadding,
  propMarginLeft,
}) => {
  const cardDetailsStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const getAnIndividualStyle = useMemo(() => {
    return {
      marginLeft: propMarginLeft,
    };
  }, [propMarginLeft]);

  return (
    <div className={`card-items-parent ${className}`}>
      <div className="card-items">
        <img
          className="card-image-icon"
          loading="lazy"
          alt=""
          src={cardImage}
        />
      </div>
      <div className="card-details" style={cardDetailsStyle}>
        <h3 className="hot-deals">{hotDeals}</h3>
        <div className="get-an-individual" style={getAnIndividualStyle}>
          {getAnIndividualPlanWithFe}
        </div>
      </div>
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
  cardImage: PropTypes.string,
  hotDeals: PropTypes.string,
  getAnIndividualPlanWithFe: PropTypes.string,

  /** Style props */
  propPadding: PropTypes.any,
  propMarginLeft: PropTypes.any,
};

export default FrameComponent2;
