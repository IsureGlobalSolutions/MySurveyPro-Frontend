import { useMemo } from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({
  className = "",
  premium,
  delimiter,
  everythingInBASIC,
  kResponsesPerMonth,
  gBWorkspaceStorage,
  inviteUpTo3Members,
  customDomain,
  customCSS,
  removeFormBranding,
  propFlex,
  propPadding,
  propWidth,
  propPadding1,
  propDisplay,
  propAlignSelf,
  propPadding2,
  propWidth1,
}) => {
  const cardStyle = useMemo(() => {
    return {
      flex: propFlex,
      padding: propPadding,
    };
  }, [propFlex, propPadding]);

  const premiumStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const frameDivStyle = useMemo(() => {
    return {
      padding: propPadding1,
    };
  }, [propPadding1]);

  const everythingInBASICContainerStyle = useMemo(() => {
    return {
      display: propDisplay,
    };
  }, [propDisplay]);

  const frameDiv1Style = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      padding: propPadding2,
      width: propWidth1,
    };
  }, [propAlignSelf, propPadding2, propWidth1]);

  return (
    <div className={`card ${className}`} style={cardStyle}>
      <div className="card-child" />
      <div className="premium-parent">
        <h2 className="premium" style={premiumStyle}>
          {premium}
        </h2>
        <div className="frame-wrapper" style={frameDivStyle}>
          <div className="separator-parent">
            <div className="separator">
              <div className="delimiter">{delimiter}</div>
              <div className="duration">
                <b className="per-month">
                  <p className="per">Per/</p>
                  <p className="month">Month</p>
                </b>
              </div>
            </div>
            <div className="premium-description">
              <div
                className="everything-in-basic-container"
                style={everythingInBASICContainerStyle}
              >
                <ul className="everything-in-basic-20k-respon">
                  <li className="everything-in-basic">{everythingInBASIC}</li>
                  <li className="k-responses-per">{kResponsesPerMonth}</li>
                  <li className="gb-workspace-storage">{gBWorkspaceStorage}</li>
                  <li className="invite-up-to">{inviteUpTo3Members}</li>
                  <li className="custom-domain">{customDomain}</li>
                  <li className="custom-css">{customCSS}</li>
                  <li>{removeFormBranding}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-inner" style={frameDiv1Style}>
        <button className="start-a-free-trial-wrapper">
          <b className="start-a-free">Start a free trial</b>
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  premium: PropTypes.string,
  delimiter: PropTypes.string,
  everythingInBASIC: PropTypes.string,
  kResponsesPerMonth: PropTypes.string,
  gBWorkspaceStorage: PropTypes.string,
  inviteUpTo3Members: PropTypes.string,
  customDomain: PropTypes.string,
  customCSS: PropTypes.string,
  removeFormBranding: PropTypes.string,

  /** Style props */
  propFlex: PropTypes.any,
  propPadding: PropTypes.any,
  propWidth: PropTypes.any,
  propPadding1: PropTypes.any,
  propDisplay: PropTypes.any,
  propAlignSelf: PropTypes.any,
  propPadding2: PropTypes.any,
  propWidth1: PropTypes.any,
};

export default Card;
