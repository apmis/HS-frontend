import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({ name, onChange, options = []}) => {
  return (
    <>
      <div>
        <select name={name} onChange={(e) => onChange(e)}>
          {options.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
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
