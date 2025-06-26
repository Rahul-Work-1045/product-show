import React, { forwardRef } from 'react';

const Select = forwardRef(({ label, options = [], className = '', ...props }, ref) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && <label htmlFor={props.name} className="font-medium">{label}</label>}
    <select
      ref={ref}
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
));

export default Select; 