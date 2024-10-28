// src/components/InputField.js
import React from 'react';
import './input.css';

const InputField = ({ label, value , type = 'text', register, name, onChange , errors, ...props}) => {

  
  return (

    <div className="input-field">
      {label && <label>{label}</label>}
      <input
        className='mysurveypro-input-field'
        name={name}
        value={value}
        type={type}
        {...register(name)}
        onChange={onChange}
        {...props}
      />
      {errors[name] && <small className="error-message">{errors[name].message}</small>}
    </div>
  );
};

export default InputField;
