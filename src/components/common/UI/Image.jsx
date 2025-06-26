import React, { forwardRef } from 'react';

const Image = forwardRef(({ src, alt = '', className = '', ...props }, ref) => (
  <img
    ref={ref}
    src={src}
    alt={alt}
    className={`object-cover ${className}`}
    {...props}
  />
));

export default Image; 