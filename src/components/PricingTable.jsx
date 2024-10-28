import Card from "./Card";
import PropTypes from "prop-types";
import "./PricingTable.css";

const PricingTable = ({ className = "" }) => {
  return (
    <section className={`pricing-table ${className}`}>
      <div className="pricing-table-child" />
      <div className="table-container">
       
        
        <Card
          premium="Business"
          delimiter="$5"
          everythingInBASIC="Everything in PREMIUM"
          kResponsesPerMonth="150k responses per month"
          gBWorkspaceStorage="50GB workspace storage"
          inviteUpTo3Members="Invite up to 10 members"
          customDomain="No commission on payments"
          customCSS="No size limit on file upload"
          removeFormBranding="Priority support"
          propFlex="1"
          propPadding="var(--padding-6xl) var(--padding-lgi) var(--padding-12xl) var(--padding-9xl)"
          propWidth="142px"
          propPadding1="0px 0px 0px var(--padding-2xs)"
          propDisplay="inline-block"
          propAlignSelf="unset"
          propPadding2="0px var(--padding-xs)"
          propWidth1="332.5px"
        />
      </div>
    </section>
  );
};

PricingTable.propTypes = {
  className: PropTypes.string,
};

export default PricingTable;
