import React from 'react';
import Input from './Input';

const EmailInput = ({ ...props }) => {
  return (
    <>
      <Input {...props} type='email' />
    </>
  );
};

export default EmailInput;
