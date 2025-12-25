import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-lg p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
