import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({
  label,
  helperText,
  onChange,
  value,
  error,
  inputId,
  required,
  errorText,
}) => {
  return (
    <>
      <div>
        <div class='form__div'>
          <input
            type='file'
            class={`form__input ${error ? 'error__input' : null}`}
            id={inputId}
            onChange={onChange}
            value={value}
            required={required}
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
        {helperText ? <p class=' text-xs italic mt-10'>{helperText}</p> : null}
      </div>
    </>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string,
  inputId: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  step: PropTypes.any,
};

export default FileUpload;
