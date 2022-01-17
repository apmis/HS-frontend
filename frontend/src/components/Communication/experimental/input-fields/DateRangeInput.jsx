import React from 'react';
import PropTypes from 'prop-types';

import { DateRangePicker } from 'rsuite';
const DateRangeInput = ({ hoverRange, ranges }) => {
  return (
    <>
      <DateRangePicker hoverRange={hoverRange} ranges={ranges} />{' '}
    </>
  );
};

DateRangeInput.propTypes = {
  hoverRange: PropTypes.func,
  ranges: PropTypes.array,
};

export default DateRangeInput;
