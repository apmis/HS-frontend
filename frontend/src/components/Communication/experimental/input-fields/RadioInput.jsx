import React from 'react';

const RadioInput = ({ value, caption, name, inputId, onChange, options, label }) => {
  console.log({options, value})
  return (
    <>
      <div class='flex mt-6'>
        <label class='flex items-center' htmlFor={inputId}>
          <span class='ml-2'>{caption}</span></label>
          {(options || []).map((option) => <div>{option.label}<input
            type='radio'
            id={inputId}
            class='form-radio h-4 w-41'
            name={name}
            checked={value === option.value ? 'checked' : 'unchecked'}
            value={option.value}
            onChange={onChange}
          /></div>)}
        
      </div>
    </>
  );
};

export default RadioInput;
