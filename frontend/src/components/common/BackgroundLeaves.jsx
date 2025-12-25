import React from 'react';

// Simple floating leaves background. Renders N SVG leaves with randomized
// positions, delays and durations for a natural look.
export default function BackgroundLeaves({ count = 18 }) {
  const palette = [
    'rgba(47,133,90,0.95)',
    'rgba(72,187,120,0.9)',
    'rgba(34,197,94,0.85)',
    'rgba(88,215,146,0.8)'
  ];

  const leaves = Array.from({ length: count }).map((_, i) => {
    const left = Math.round(Math.random() * 100);
    const delay = (Math.random() * 8).toFixed(2);
    const duration = (10 + Math.random() * 22).toFixed(2); // 10-32s
    const scale = (0.5 + Math.random() * 1.0).toFixed(2);
    const rotate = Math.round(Math.random() * 360);
    const color = palette[Math.floor(Math.random() * palette.length)];
    return { id: `leaf-${i}`, left, delay, duration, scale, rotate, color };
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {leaves.map((l) => (
        <svg
          key={l.id}
          className="floating-leaf"
          viewBox="0 0 24 24"
          style={{
            left: `${l.left}%`,
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.duration}s`,
            transform: `translateY(0) rotate(${l.rotate}deg) scale(${l.scale})`,
          }}
        >
          <path
            d="M20.6 3.4c-2.3 2.2-5.6 4.2-9.5 5.1 1.6 3.9 3.2 7.1 5 9.1-2.1.8-5 1.2-8.4.8C3.2 17 1.4 13.8 1 11c3.1-.2 6.1-.8 8.6-1.7C9.3 6.1 12.2 3.7 16 2.8c.1 1.4.6 2.8 1.6 4.2 2.2-2.3 4.5-3.6 6-4.5-.2 1.4-.9 3-3 4.9z"
            fill={l.color}
          />
        </svg>
      ))}
    </div>
  );
}
