import React from 'react';
import Input from './Input';

const DateInput = ({ ...props }) => {
  return (
    <>
      <Input type='date' {...props} />
    </>
  );
};

export default DateInput;
