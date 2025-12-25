import React from 'react';

export default function Input({ value, onChange, placeholder = '', type = 'text', className = '', ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-sm placeholder:text-gray-400 ${className}`}
      type={type}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      {...props}
    />
  );
}
