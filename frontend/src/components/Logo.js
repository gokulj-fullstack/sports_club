import React from 'react';

const Logo = ({ height = '46px', showText = true, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={showText ? "0 0 1000 600" : "265 80 455 280"}
      width="auto"
      height={height}
      style={{ display: 'block', ...style }}
    >
      <defs>
        {/* Luxury Gold Gradient */}
        <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--gold-dk)" />
          <stop offset="50%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-lt)" />
        </linearGradient>
      </defs>

      <g transform={showText ? "translate(0, -20)" : "translate(0, 0)"}>
        {/* ================= BRANDING EMBLEM (GOLD) ================= */}
        <g fill="none" stroke="url(#logoGoldGrad)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
          
          {/* Base of the Crown */}
          <line x1="390" y1="340" x2="610" y2="340" strokeWidth="20" />
          <path d="M 390,340 L 405,325 L 595,325 L 610,340" fill="url(#logoGoldGrad)" fillOpacity="0.15" stroke="none" />
          <path d="M 405,325 L 595,325" />

          {/* Main Crown Peaks */}
          <path d="M 405,325 L 380,220 L 450,260 L 500,140 L 550,260 L 620,220 L 595,325" />
          
          {/* Center Diamond / Spear Motif in Crown */}
          <path d="M 500,165 L 520,220 L 500,275 L 480,220 Z" fill="url(#logoGoldGrad)" fillOpacity="0.2" />

          {/* Badminton Racquet (Left Peak Integration) */}
          <g transform="translate(350, 210) rotate(-25)">
            {/* Racquet Head */}
            <ellipse cx="0" cy="-60" rx="40" ry="50" />
            {/* Strings (Abstract Minimalist Grid) */}
            <path d="M -25,-60 L 25,-60 M -20,-35 L 20,-35 M -20,-85 L 20,-85 M -35,-48 L 35,-48 M -35,-72 L 35,-72" strokeWidth="6" opacity="0.9"/>
            <path d="M 0,-110 L 0,-10 M -20,-105 L -20,-15 M 20,-105 L 20,-15 M -30,-98 L -30,-22 M 30,-98 L 30,-22" strokeWidth="6" opacity="0.9"/>
            {/* Shaft & Handle */}
            <line x1="0" y1="-10" x2="0" y2="50" strokeWidth="16" />
            <rect x="-6" y="50" width="12" height="25" rx="3" fill="url(#logoGoldGrad)" stroke="none" />
          </g>

          {/* Dumbbell (Center Motif) */}
          <g transform="translate(500, 285)">
            {/* Central Bar */}
            <line x1="-50" y1="0" x2="50" y2="0" strokeWidth="18" />
            {/* Inner Weights */}
            <rect x="-35" y="-25" width="12" height="50" rx="2" fill="url(#logoGoldGrad)" stroke="none" />
            <rect x="23" y="-25" width="12" height="50" rx="2" fill="url(#logoGoldGrad)" stroke="none" />
            {/* Outer Weights */}
            <rect x="-52" y="-35" width="14" height="70" rx="4" fill="url(#logoGoldGrad)" stroke="none" />
            <rect x="38" y="-35" width="14" height="70" rx="4" fill="url(#logoGoldGrad)" stroke="none" />
            {/* End Caps */}
            <rect x="-60" y="-10" width="8" height="20" rx="1" fill="url(#logoGoldGrad)" stroke="none" />
            <rect x="52" y="-10" width="8" height="20" rx="1" fill="url(#logoGoldGrad)" stroke="none" />
          </g>

          {/* Gaming Controller (Right Peak Integration) */}
          <g transform="translate(650, 215) rotate(20)">
            {/* Main Controller Body */}
            <path d="M -45,-20 C -45,-45 -20,-45 0,-30 C 20,-45 45,-45 45,-20 C 45,5 30,35 20,30 C 10,25 -10,25 -20,30 C -30,35 -45,5 -45,-20 Z" fill="var(--bg-card)" strokeWidth="16" />
            {/* D-Pad (Left side) */}
            <path d="M -25,-15 L -15,-15 M -20,-20 L -20,-10" strokeWidth="10" strokeLinecap="square" />
            {/* Action Buttons (Right side) */}
            <circle cx="20" cy="-20" r="4" fill="url(#logoGoldGrad)" stroke="none" />
            <circle cx="28" cy="-12" r="4" fill="url(#logoGoldGrad)" stroke="none" />
            <circle cx="12" cy="-12" r="4" fill="url(#logoGoldGrad)" stroke="none" />
            <circle cx="20" cy="-4" r="4" fill="url(#logoGoldGrad)" stroke="none" />
          </g>

        </g>

        {/* ================= TYPOGRAPHY (THEMED) ================= */}
        {showText && (
          <g fill="currentColor" textAnchor="middle" fontFamily="'Montserrat', 'Helvetica', 'Arial', sans-serif">
            {/* KING */}
            <text x="500" y="430" fontSize="72" fontWeight="900" letterSpacing="18">KING</text>
            {/* SPORTS CLUB */}
            <text x="500" y="485" fontSize="28" fontWeight="700" letterSpacing="9">SPORTS CLUB</text>
          </g>
        )}
      </g>
    </svg>
  );
};

export default Logo;
