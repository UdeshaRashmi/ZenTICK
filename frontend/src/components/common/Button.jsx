import React from 'react';

export default function Button({ children, onClick, className = '', type = 'button', ...props }) {
  return (
    <button type={type} onClick={onClick} className={`zt-btn ${className}`} {...props}>
      {children}
    </button>
  );
}
