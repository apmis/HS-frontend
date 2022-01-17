import React from 'react';
import PropTypes from 'prop-types';
import '../../../input.css';

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
        <div class='form__div'>
          <input
            type={type}
            class={`form__input ${error ? 'error__input' : null}`}
            id={inputId}
            onChange={onChange}
            value={value}
            required={required}
            step={step}
          />
          <label
            htmlFor={inputId}
            class={`form__label ${error ? 'error__label' : null}`}
          >
            {label}
          </label>
        </div>
        {error ? (
          <p class='text-red-500 text-xs italic mt-10'>{errorText}</p>
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
