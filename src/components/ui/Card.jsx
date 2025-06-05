'use client';

import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'p-6',
  shadow = 'shadow-md',
  rounded = 'rounded-lg',
  background = 'bg-white',
  ...props
}) => {
  const cardClasses = `${background} ${shadow} ${rounded} ${padding} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;