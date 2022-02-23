import React from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

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
  const ref = useRef()
  return (
    <>
      <div>
        <div>
          <input
            type={type}
            id={inputId}
            onChange={onChange}
            defaultValue={value}
            required={required}
            step={step}
            ref={ref}
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
