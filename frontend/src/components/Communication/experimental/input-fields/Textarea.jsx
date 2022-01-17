import React from 'react';
import '../../../input.css';
import PropTypes from 'prop-types';

const Textarea = ({
  label,
  onChange,
  inputId,
  error,
  errorText,
  value,
  placeholder,
  required,
}) => {
  return (
    <>
      <div>
        <div class='form__div'>
          <textarea
            class={`form__input ${error ? 'error__input' : null}`}
            id={inputId}
            placeholder={placeholder}
            onChange={onChange}
            style={{ minHeight: '80px' }}
            value={value}
            required={required}
          />
          <label
            for={inputId}
            class={`${error ? 'error__label' : null} form__label `}
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

Textarea.propTypes = {
  label: PropTypes.string,
  inputId: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default Textarea;
