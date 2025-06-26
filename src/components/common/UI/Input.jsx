import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, type = 'text', className = '', ...props }, ref) => {
  const inputClass =
    type === 'range'
      ? `border rounded px-3 py-2 ${className}`
      : `border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label htmlFor={props.name} className="font-medium">{label}</label>}
      <input
        ref={ref}
        type={type}
        className={inputClass}
        {...props}
      />
    </div>
  );
});

export default Input; 