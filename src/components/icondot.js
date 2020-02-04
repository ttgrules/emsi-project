import React from 'react';

const IconDot = ({radius,color,className}) => {
  const dot_style={

  }
  return (
    <svg class={className} height={radius*2} width={radius*2}>
      <circle cx={radius} cy={radius} r={radius} fill={color} />
    </svg>
  );
};

export default IconDot
