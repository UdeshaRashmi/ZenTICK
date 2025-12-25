import React from 'react';

export default function Mountains() {
  return (
    <div aria-hidden className="mountains fixed left-0 right-0 bottom-0 z-0 pointer-events-none">
      <svg viewBox="0 0 1200 360" preserveAspectRatio="none" className="w-full h-56">
        <defs>
          <linearGradient id="mgrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#d8f3e6" stopOpacity="1" />
            <stop offset="100%" stopColor="#bfead7" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M0,220 C150,140 300,280 450,220 C600,160 750,240 900,200 C1050,160 1200,220 1200,220 L1200,360 L0,360 Z" fill="url(#mgrad)" opacity="1" />
        <path d="M0,240 C180,170 360,300 540,230 C720,160 900,280 1080,210 C1200,170 1200,220 1200,220 L1200,360 L0,360 Z" fill="#a7e6cf" opacity="0.92" />
        <path d="M0,260 C220,200 440,320 660,240 C880,160 1100,300 1200,240 L1200,360 L0,360 Z" fill="#7fd6b3" opacity="0.5" />
      </svg>
    </div>
  );
}
