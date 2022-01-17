import React from 'react';
import Input from './Input';

const DateTimeInput = ({ ...props }) => {
  return (
    <div>
      <Input type='datetime-local' {...props} />
    </div>
  );
};

export default DateTimeInput;
