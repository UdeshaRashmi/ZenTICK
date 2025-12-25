import React from 'react';

export default function Button({ children, onClick, className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
