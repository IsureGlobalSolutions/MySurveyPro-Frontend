// SurveyCheckbox.js
import React from 'react';
import './CustomCheckbox.css';

const SurveyCheckbox = ({index, value, checked, onChange, label }) => {
  // Generate a unique ID using the value
  const checkboxId = `checkbox-${index}`;

  return (
    <div className="checkbox">
      <input
        className="check-input"
        value={value}
        checked={checked}
        onChange={onChange}
        id={checkboxId} // Use unique id
        type="checkbox"
        name="check"
      />
      <label className='lab' htmlFor={checkboxId}>{label}</label> {/* Match label with the checkbox */}
    </div>
  );
};

export default SurveyCheckbox;
