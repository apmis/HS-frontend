import React from 'react';

const CheckboxInput = ({ value, name, inputId, onChange, label }) => {
  return (
    <>
      <div class='flex mt-6'>
        <label class='flex items-center' htmlFor={inputId}>
          <input
            type='checkbox'
            id={inputId}
            class='form-checkbox h-4 w-4'
            name={name}
            value={value}
            onChange={onChange}
          />
          <span class='ml-2'>{label}</span>
        </label>
      </div>
    </>
  );
};

export default CheckboxInput;
