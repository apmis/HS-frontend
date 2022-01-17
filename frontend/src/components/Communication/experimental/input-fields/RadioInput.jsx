import React from 'react';

const RadioInput = ({ value, name, inputId, onChange, label }) => {
  return (
    <>
      <div class='flex mt-6'>
        <label class='flex items-center' htmlFor={inputId}>
          <input
            type='radio'
            id={inputId}
            class='form-radio h-4 w-41'
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

export default RadioInput;
