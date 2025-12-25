import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`zen-card backdrop-blur-sm border border-emerald-100/30 ${className}`}>
      {children}
    </div>
  );
}
