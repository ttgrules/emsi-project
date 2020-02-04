import React from 'react';

const IconSquare = ({size,color,className}) => {
  const rect_style={
    fill: color,
    strokeWidth:0
  }
  return (
    <svg className={className} width={size} height={size}>
      <rect width={size} height={size} style={rect_style} />
    </svg>
  );
};

export default IconSquare
