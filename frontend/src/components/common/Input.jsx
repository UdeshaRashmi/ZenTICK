import React from 'react';

export default function Input({ value, onChange, placeholder = '', type = 'text', className = '', ...props }) {
  return (
    <input
      className={`zt-input ${className}`}
      type={type}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      {...props}
    />
  );
}
