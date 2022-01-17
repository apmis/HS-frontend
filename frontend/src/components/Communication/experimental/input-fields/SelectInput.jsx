import React from 'react';
import '../../../input.css';
import PropTypes from 'prop-types';

const SelectInput = ({ label, inputId, onChange, options = []}) => {
  return (
    <>
      <div className='form__div'>
        <select className='form__select' onSelect={onChange}>
          {options.map(option => (
            <option className='form__option'>{option}</option>
          ))}
        </select>
        <label htmlFor={inputId} class='form__label'>
          {label}
        </label>
      </div>
    </>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string,
  inputId: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.array,
};

export default SelectInput;
