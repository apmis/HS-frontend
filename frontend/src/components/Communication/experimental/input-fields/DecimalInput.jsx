import React from 'react';
import Input from './Input';

const DecimalInput = ({ ...props }) => {
  return (
    <>
      <Input {...props} type='number' step='0.01' />
    </>
  );
};

export default DecimalInput;
