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
        <div>
          <input
            type='file'
            id={inputId}
            onChange={onChange}
            value={value}
            required={required}
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
