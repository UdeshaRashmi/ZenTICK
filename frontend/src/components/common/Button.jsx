import React from 'react';

export default function Button({ children, onClick, className = '', type = 'button', variant = 'primary', ...props }) {
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2';
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-200',
    danger: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-200',
    ghost: 'bg-transparent text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-200',
    neutral: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-200',
  };

  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;

  return (
    <button type={type} onClick={onClick} className={cls} {...props}>
      {children}
    </button>
  );
}
