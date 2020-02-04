import React from 'react';

const NumberComma = ({number,decimals}) => {
  return (number.toLocaleString(undefined, {minimumFractionDigits:decimals}));
};

export default NumberComma
