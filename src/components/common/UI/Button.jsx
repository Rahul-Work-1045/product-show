import React, { forwardRef } from 'react';

const Button = forwardRef(({ children, className = '', ...props }, ref) => (
  <button
    ref={ref}
    className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </button>
));

export default Button; 