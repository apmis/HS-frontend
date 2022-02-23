import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label,
  onChange,
  inputId,
  error,
  errorText,
  type,
  value,
  required,
  step,
}) => {
  return (
    <>
      <div>
        <div>
          <input
            type={type}
            id={inputId}
            onChange={onChange}
            value={value}
            required={required}
            step={step}
          />
          <label
            htmlFor={inputId}
          >
            {label}
          </label>
        </div>
        {error ? (
          <p>{errorText}</p>
        ) : null}
      </div>
    </>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  inputId: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  required: PropTypes.bool,
  step: PropTypes.any,
};

export default Input;
