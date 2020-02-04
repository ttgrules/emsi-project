import React from 'react';

const IconTriangle = ({size,color,className}) => {

  const poly_points = "0," + size + " " + Math.round(size/2) + ",0 " + size + "," + size;
  const poly_style = {
    fill: color,
  }

  return (
    <svg className={className} height={size} width={size}>
      <polygon points={poly_points} style={poly_style} />
    </svg>
  );
};

export default IconTriangle
