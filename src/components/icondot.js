import React from 'react';

const IconDot = ({radius,color,className}) => {
  const dot_style={
    fill: color
  }
  return (
    <svg className={className} height={radius*2} width={radius*2}>
      <circle cx={radius} cy={radius} r={radius} style={dot_style} />
    </svg>
  );
};

export default IconDot
