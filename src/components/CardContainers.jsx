import { useMemo } from "react";
import PropTypes from "prop-types";
import "./CardContainers.css";

const CardContainers = ({
  className = "",
  cardImages,
  employeeFeedback,
  buildABetterWorkplaceByHe,
  propTextTransform,
}) => {
  const employeeFeedbackStyle = useMemo(() => {
    return {
      textTransform: propTextTransform,
    };
  }, [propTextTransform]);

  return (
    <div className={`card-containers ${className}`}>
      <img className="card-images-icon" alt="" src={cardImages} />
      <div className="card-info">
        <h3 className="employee-feedback" style={employeeFeedbackStyle}>
          {employeeFeedback}
        </h3>
      </div>
      <div className="build-a-better">{buildABetterWorkplaceByHe}</div>
    </div>
  );
};

CardContainers.propTypes = {
  className: PropTypes.string,
  cardImages: PropTypes.string,
  employeeFeedback: PropTypes.string,
  buildABetterWorkplaceByHe: PropTypes.string,

  /** Style props */
  propTextTransform: PropTypes.any,
};

export default CardContainers;
