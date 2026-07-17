import React, { useState } from 'react';

const AerialCourtIllustration = ({ selectedCourt, onSelectCourt }) => {
  const [hovered, setHovered] = useState(null);

  /* Color palette */
  const synthGreen   = '#2d6a4f';
  const synthGreenHl = '#40916c';
  const lineWhite    = '#e8f4f0';
  const netYellow    = '#c9a84c';
  const streetGray   = '#2c2c2c';
  const sidewalkGray = '#3a3a3a';
  const streetLine   = '#f5c518';
  const roofGray     = '#1a1a1a';

  return (
    <div style={{ width: '100%', overflowX: 'auto', marginBottom: '1.5rem' }}>
      <svg
        viewBox="0 0 1000 560"
        style={{ width: '100%', maxWidth: '700px', display: 'block', margin: '0 auto', border: '1px solid rgba(201,168,76,0.15)', background: '#050a05' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Synthetic court surface texture */}
          <pattern id="synthSurface" patternUnits="userSpaceOnUse" width="8" height="8">
            <rect width="8" height="8" fill={synthGreen} />
            <rect width="4" height="4" fill={synthGreenHl} opacity="0.18" />
            <rect x="4" y="4" width="4" height="4" fill={synthGreenHl} opacity="0.18" />
          </pattern>
          {/* Street asphalt texture */}
          <pattern id="asphalt" patternUnits="userSpaceOnUse" width="12" height="12">
            <rect width="12" height="12" fill={streetGray} />
            <circle cx="3" cy="3" r="0.6" fill="rgba(255,255,255,0.04)" />
            <circle cx="9" cy="7" r="0.4" fill="rgba(255,255,255,0.03)" />
          </pattern>
          {/* Sidewalk texture */}
          <pattern id="sidewalk" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill={sidewalkGray} />
            <line x1="0" y1="10" x2="20" y2="10" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="10" y1="0" x2="10" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          </pattern>
          {/* Roof texture */}
          <pattern id="roofPattern" patternUnits="userSpaceOnUse" width="20" height="10">
            <rect width="20" height="10" fill={roofGray} />
            <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5" />
          </pattern>
          <filter id="courtGlow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={netYellow} stopOpacity="1" />
            <stop offset="100%" stopColor={netYellow} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="streetFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0f0a" />
            <stop offset="100%" stopColor="#050a05" />
          </linearGradient>
        </defs>

        {/* ── BACKGROUND ── */}
        <rect width="1000" height="560" fill="url(#bgGrad)" />

        {/* ── TITLE ── */}
        <text x="500" y="30" textAnchor="middle" fill="#c9a84c"
          fontFamily="'Bebas Neue', sans-serif" fontSize="16" letterSpacing="4">
          Interactive Court Selector — Click to select
        </text>

        {/* LEFT SIDE — 2 COURTS STACKED */}
        <rect x="30" y="60" width="420" height="470" fill="rgba(201,168,76,0.04)"
          stroke="rgba(201,168,76,0.12)" strokeWidth="1" rx="2" />

        {/* Roof overhang top */}
        <rect x="26" y="56" width="428" height="12" fill="url(#roofPattern)"
          stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
        <rect x="26" y="524" width="428" height="10" fill="url(#roofPattern)"
          stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
        {/* Side pillars */}
        {[30, 440].map((x, i) => (
          <rect key={i} x={x} y="56" width="8" height="478" fill="#1a1a1a"
            stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
        ))}
        {/* Pillars label */}
        {[32, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390, 410, 430].map((x, i) => (
          <line key={i} x1={x} y1="68" x2={x} y2="76" stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" />
        ))}

        {/* ── COURT 1 (top-left) ── */}
        {(() => {
          const cx0 = 50, cx1 = 420, cy0 = 72, cy1 = 280;
          const cw = cx1 - cx0, ch = cy1 - cy0;
          const midY = cy0 + ch / 2;
          const ix0 = cx0 + 20, ix1 = cx1 - 20;
          const iy0 = cy0 + 14, iy1 = cy1 - 14;
          const iw = ix1 - ix0, ih = iy1 - iy0;
          const sInset = iw * 0.076;
          const srvLine = ih * 0.296;
          const backSrv = ih * 0.114;
          const isSelected = selectedCourt === 'badminton_1';
          const isHov = hovered === 1 || isSelected;

          return (
            <g
              onMouseEnter={() => setHovered(1)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelectCourt && onSelectCourt('badminton_1')}
              style={{ cursor: 'pointer' }}
            >
              {/* Court surface */}
              <rect x={cx0} y={cy0} width={cw} height={ch}
                fill={isHov ? (isSelected ? '#1d5a35' : '#143f2c') : 'url(#synthSurface)'}
                stroke={isSelected ? '#c9a84c' : (isHov ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.2)')}
                strokeWidth={isSelected ? 3 : (isHov ? 1.5 : 1)} />

              {/* Court outer boundary */}
              <rect x={ix0} y={iy0} width={iw} height={ih}
                fill="none" stroke={lineWhite} strokeWidth="2" filter="url(#courtGlow)" opacity="0.85" />

              {/* Singles sidelines */}
              <line x1={ix0 + sInset} y1={iy0} x2={ix0 + sInset} y2={iy1} stroke={lineWhite} strokeWidth="1" opacity="0.55" />
              <line x1={ix1 - sInset} y1={iy0} x2={ix1 - sInset} y2={iy1} stroke={lineWhite} strokeWidth="1" opacity="0.55" />

              {/* Center line */}
              <line x1={(ix0 + ix1) / 2} y1={iy0} x2={(ix0 + ix1) / 2} y2={iy1} stroke={lineWhite} strokeWidth="1" opacity="0.65" />

              {/* Service lines */}
              <line x1={ix0} y1={midY - srvLine} x2={ix1} y2={midY - srvLine} stroke={lineWhite} strokeWidth="1" opacity="0.55" />
              <line x1={ix0} y1={midY + srvLine} x2={ix1} y2={midY + srvLine} stroke={lineWhite} strokeWidth="1" opacity="0.55" />

              {/* Doubles back lines */}
              <line x1={ix0} y1={iy0 + backSrv} x2={ix1} y2={iy0 + backSrv} stroke={lineWhite} strokeWidth="0.8" opacity="0.4" strokeDasharray="5,4" />
              <line x1={ix0} y1={iy1 - backSrv} x2={ix1} y2={iy1 - backSrv} stroke={lineWhite} strokeWidth="0.8" opacity="0.4" strokeDasharray="5,4" />

              {/* NET */}
              <line x1={ix0 - 2} y1={midY} x2={ix1 + 2} y2={midY} stroke="url(#netGrad)" strokeWidth="4" filter="url(#courtGlow)" />
              <rect x={ix0 - 6} y={midY - 14} width="6" height="28" fill={netYellow} rx="1" />
              <rect x={ix1} y={midY - 14} width="6" height="28" fill={netYellow} rx="1" />

              {/* Label */}
              <rect x={cx0 + 5} y={cy0 + 5} width={isSelected ? 90 : 68} height="20" fill={isSelected ? '#c9a84c' : 'rgba(10,10,10,0.8)'} rx="2" />
              <text x={cx0 + (isSelected ? 45 : 34)} y={cy0 + 18} textAnchor="middle" fill={isSelected ? '#0a0a0a' : '#c9a84c'}
                fontFamily="Rajdhani, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1">
                {isSelected ? '✓ COURT 1' : 'COURT 1'}
              </text>

              {/* Synthetic badge */}
              <rect x={cx1 - 74} y={cy0 + 5} width="68" height="18" fill="rgba(45,106,79,0.4)"
                stroke="rgba(45,200,120,0.35)" strokeWidth="1" rx="2" />
              <text x={cx1 - 40} y={cy0 + 17} textAnchor="middle" fill="#52b788"
                fontFamily="Rajdhani, sans-serif" fontSize="9" fontWeight="700" letterSpacing="1">SYNTHETIC</text>

              {/* Hover tooltip */}
              {isHov && (
                <g>
                  <rect x={cx0 + 6} y={cy0 + 30} width="145" height="52" fill="rgba(10,10,10,0.95)"
                    stroke="rgba(201,168,76,0.4)" strokeWidth="1" rx="3" />
                  <text x={cx0 + 78} y={cy0 + 46} textAnchor="middle" fill="#c9a84c"
                    fontFamily="Rajdhani,sans-serif" fontSize="11" fontWeight="700">SYNTHETIC SURFACE</text>
                  <text x={cx0 + 78} y={cy0 + 60} textAnchor="middle" fill="#aaa"
                    fontFamily="Rajdhani,sans-serif" fontSize="10">₹300/hr · 5AM–11PM · NEW</text>
                  <text x={cx0 + 78} y={cy0 + 73} textAnchor="middle" fill="#666"
                    fontFamily="Rajdhani,sans-serif" fontSize="9">Click to select court 1</text>
                </g>
              )}
            </g>
          );
        })()}

        {/* Divider wall between courts 1 & 2 */}
        <rect x="50" y="279" width="370" height="8" fill="#1a1a1a" stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" />

        {/* ── COURT 2 (bottom-left) ── */}
        {(() => {
          const cx0 = 50, cx1 = 420, cy0 = 288, cy1 = 518;
          const cw = cx1 - cx0, ch = cy1 - cy0;
          const midY = cy0 + ch / 2;
          const ix0 = cx0 + 20, ix1 = cx1 - 20;
          const iy0 = cy0 + 14, iy1 = cy1 - 14;
          const iw = ix1 - ix0, ih = iy1 - iy0;
          const sInset = iw * 0.076;
          const srvLine = ih * 0.296;
          const backSrv = ih * 0.114;
          const isSelected = selectedCourt === 'badminton_2';
          const isHov = hovered === 2 || isSelected;

          return (
            <g
              onMouseEnter={() => setHovered(2)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelectCourt && onSelectCourt('badminton_2')}
              style={{ cursor: 'pointer' }}
            >
              <rect x={cx0} y={cy0} width={cw} height={ch}
                fill={isHov ? (isSelected ? '#1d5a35' : '#143f2c') : 'url(#synthSurface)'}
                stroke={isSelected ? '#c9a84c' : (isHov ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.2)')}
                strokeWidth={isSelected ? 3 : (isHov ? 1.5 : 1)} />

              <rect x={ix0} y={iy0} width={iw} height={ih}
                fill="none" stroke={lineWhite} strokeWidth="2" filter="url(#courtGlow)" opacity="0.85" />

              <line x1={ix0 + sInset} y1={iy0} x2={ix0 + sInset} y2={iy1} stroke={lineWhite} strokeWidth="1" opacity="0.55" />
              <line x1={ix1 - sInset} y1={iy0} x2={ix1 - sInset} y2={iy1} stroke={lineWhite} strokeWidth="1" opacity="0.55" />
              <line x1={(ix0 + ix1) / 2} y1={iy0} x2={(ix0 + ix1) / 2} y2={iy1} stroke={lineWhite} strokeWidth="1" opacity="0.65" />
              <line x1={ix0} y1={midY - srvLine} x2={ix1} y2={midY - srvLine} stroke={lineWhite} strokeWidth="1" opacity="0.55" />
              <line x1={ix0} y1={midY + srvLine} x2={ix1} y2={midY + srvLine} stroke={lineWhite} strokeWidth="1" opacity="0.55" />
              <line x1={ix0} y1={iy0 + backSrv} x2={ix1} y2={iy0 + backSrv} stroke={lineWhite} strokeWidth="0.8" opacity="0.4" strokeDasharray="5,4" />
              <line x1={ix0} y1={iy1 - backSrv} x2={ix1} y2={iy1 - backSrv} stroke={lineWhite} strokeWidth="0.8" opacity="0.4" strokeDasharray="5,4" />

              <line x1={ix0 - 2} y1={midY} x2={ix1 + 2} y2={midY} stroke="url(#netGrad)" strokeWidth="4" filter="url(#courtGlow)" />
              <rect x={ix0 - 6} y={midY - 14} width="6" height="28" fill={netYellow} rx="1" />
              <rect x={ix1} y={midY - 14} width="6" height="28" fill={netYellow} rx="1" />

              {/* Label */}
              <rect x={cx0 + 5} y={cy0 + 5} width={isSelected ? 90 : 68} height="20" fill={isSelected ? '#c9a84c' : 'rgba(10,10,10,0.8)'} rx="2" />
              <text x={cx0 + (isSelected ? 45 : 34)} y={cy0 + 18} textAnchor="middle" fill={isSelected ? '#0a0a0a' : '#c9a84c'}
                fontFamily="Rajdhani, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1">
                {isSelected ? '✓ COURT 2' : 'COURT 2'}
              </text>

              <rect x={cx1 - 74} y={cy0 + 5} width="68" height="18" fill="rgba(45,106,79,0.4)"
                stroke="rgba(45,200,120,0.35)" strokeWidth="1" rx="2" />
              <text x={cx1 - 40} y={cy0 + 17} textAnchor="middle" fill="#52b788"
                fontFamily="Rajdhani, sans-serif" fontSize="9" fontWeight="700" letterSpacing="1">SYNTHETIC</text>

              {isHov && (
                <g>
                  <rect x={cx0 + 6} y={cy0 + 30} width="145" height="52" fill="rgba(10,10,10,0.95)"
                    stroke="rgba(201,168,76,0.4)" strokeWidth="1" rx="3" />
                  <text x={cx0 + 78} y={cy0 + 46} textAnchor="middle" fill="#c9a84c"
                    fontFamily="Rajdhani,sans-serif" fontSize="11" fontWeight="700">SYNTHETIC SURFACE</text>
                  <text x={cx0 + 78} y={cy0 + 60} textAnchor="middle" fill="#aaa"
                    fontFamily="Rajdhani,sans-serif" fontSize="10">₹300/hr · 5AM–11PM · NEW</text>
                  <text x={cx0 + 78} y={cy0 + 73} textAnchor="middle" fill="#666"
                    fontFamily="Rajdhani,sans-serif" fontSize="9">Click to select court 2</text>
                </g>
              )}
            </g>
          );
        })()}

        {/* LEFT BLOCK LABEL */}
        <text x="235" y="545" textAnchor="middle" fill="rgba(201,168,76,0.6)"
          fontFamily="Rajdhani,sans-serif" fontSize="12" fontWeight="700" letterSpacing="3">
          LEFT BLOCK — COURTS 1 & 2
        </text>

        {/* ── STREET / ROAD ── */}
        <rect x="450" y="56" width="110" height="478" fill="url(#asphalt)" />
        <rect x="450" y="56" width="12" height="478" fill="url(#sidewalk)" />
        <rect x="548" y="56" width="12" height="478" fill="url(#sidewalk)" />

        {[80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380, 410, 440, 470, 500].map((y, i) => (
          <rect key={i} x={499} y={y} width="4" height="18" fill={streetLine} opacity="0.5" rx="1" />
        ))}
        <rect x="450" y="56" width="110" height="478" fill="url(#streetFade)" />
        <text x="505" y="310" textAnchor="middle" fill="rgba(255,255,255,0.18)"
          fontFamily="Rajdhani,sans-serif" fontSize="10" fontWeight="700" letterSpacing="4"
          transform="rotate(-90, 505, 310)">STREET</text>

        {/* RIGHT SIDE — 1 COURT */}
        <rect x="560" y="60" width="410" height="470" fill="rgba(201,168,76,0.03)"
          stroke="rgba(201,168,76,0.12)" strokeWidth="1" rx="2" />
        <rect x="556" y="56" width="418" height="12" fill="url(#roofPattern)"
          stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
        <rect x="556" y="524" width="418" height="10" fill="url(#roofPattern)"
          stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
        {[560, 962].map((x, i) => (
          <rect key={i} x={x} y="56" width="8" height="478" fill="#1a1a1a"
            stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
        ))}

        {/* ── COURT 3 (right) ── */}
        {(() => {
          const cx0 = 570, cx1 = 960, cy0 = 72, cy1 = 518;
          const cw = cx1 - cx0, ch = cy1 - cy0;
          const midY = cy0 + ch / 2;
          const ix0 = cx0 + 24, ix1 = cx1 - 24;
          const iy0 = cy0 + 18, iy1 = cy1 - 18;
          const iw = ix1 - ix0, ih = iy1 - iy0;
          const sInset = iw * 0.076;
          const srvLine = ih * 0.296;
          const backSrv = ih * 0.114;
          const isSelected = selectedCourt === 'badminton_3';
          const isHov = hovered === 3 || isSelected;

          return (
            <g
              onMouseEnter={() => setHovered(3)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelectCourt && onSelectCourt('badminton_3')}
              style={{ cursor: 'pointer' }}
            >
              <rect x={cx0} y={cy0} width={cw} height={ch}
                fill={isHov ? (isSelected ? '#1d5a35' : '#143f2c') : 'url(#synthSurface)'}
                stroke={isSelected ? '#c9a84c' : (isHov ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.2)')}
                strokeWidth={isSelected ? 3 : (isHov ? 1.5 : 1)} />

              <rect x={ix0} y={iy0} width={iw} height={ih}
                fill="none" stroke={lineWhite} strokeWidth="2.5" filter="url(#courtGlow)" opacity="0.9" />

              <line x1={ix0 + sInset} y1={iy0} x2={ix0 + sInset} y2={iy1} stroke={lineWhite} strokeWidth="1.2" opacity="0.6" />
              <line x1={ix1 - sInset} y1={iy0} x2={ix1 - sInset} y2={iy1} stroke={lineWhite} strokeWidth="1.2" opacity="0.6" />
              <line x1={(ix0 + ix1) / 2} y1={iy0} x2={(ix0 + ix1) / 2} y2={iy1} stroke={lineWhite} strokeWidth="1.2" opacity="0.7" />
              <line x1={ix0} y1={midY - srvLine} x2={ix1} y2={midY - srvLine} stroke={lineWhite} strokeWidth="1.2" opacity="0.6" />
              <line x1={ix0} y1={midY + srvLine} x2={ix1} y2={midY + srvLine} stroke={lineWhite} strokeWidth="1.2" opacity="0.6" />
              <line x1={ix0} y1={iy0 + backSrv} x2={ix1} y2={iy0 + backSrv} stroke={lineWhite} strokeWidth="0.9" opacity="0.45" strokeDasharray="6,5" />
              <line x1={ix0} y1={iy1 - backSrv} x2={ix1} y2={iy1 - backSrv} stroke={lineWhite} strokeWidth="0.9" opacity="0.45" strokeDasharray="6,5" />

              {/* NET */}
              <line x1={ix0 - 3} y1={midY} x2={ix1 + 3} y2={midY} stroke="url(#netGrad)" strokeWidth="5" filter="url(#courtGlow)" />
              <rect x={ix0 - 8} y={midY - 18} width="8" height="36" fill={netYellow} rx="1.5" />
              <rect x={ix1} y={midY - 18} width="8" height="36" fill={netYellow} rx="1.5" />
              {[4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64].map((offset, i) => (
                <line key={i} x1={ix0 + offset * ((ix1 - ix0) / 64)} y1={midY - 6}
                  x2={ix0 + offset * ((ix1 - ix0) / 64)} y2={midY + 6}
                  stroke={netYellow} strokeWidth="0.5" opacity="0.3" />
              ))}

              {/* Label */}
              <rect x={cx0 + 6} y={cy0 + 6} width={isSelected ? 90 : 68} height="22" fill={isSelected ? '#c9a84c' : 'rgba(10,10,10,0.7)'} rx="2" />
              <text x={cx0 + (isSelected ? 45 : 34)} y={cy0 + 20} textAnchor="middle" fill={isSelected ? '#0a0a0a' : '#c9a84c'}
                fontFamily="Rajdhani, sans-serif" fontSize="12" fontWeight="700" letterSpacing="1">
                {isSelected ? '✓ COURT 3' : 'COURT 3'}
              </text>

              <rect x={cx1 - 80} y={cy0 + 6} width="74" height="20" fill="rgba(45,106,79,0.4)"
                stroke="rgba(45,200,120,0.35)" strokeWidth="1" rx="2" />
              <text x={cx1 - 43} y={cy0 + 19} textAnchor="middle" fill="#52b788"
                fontFamily="Rajdhani, sans-serif" fontSize="9" fontWeight="700" letterSpacing="1">SYNTHETIC</text>

              {isHov && (
                <g>
                  <rect x={cx0 + 8} y={cy0 + 35} width="155" height="55" fill="rgba(10,10,10,0.95)"
                    stroke="rgba(201,168,76,0.4)" strokeWidth="1" rx="3" />
                  <text x={cx0 + 85} y={cy0 + 52} textAnchor="middle" fill="#c9a84c"
                    fontFamily="Rajdhani,sans-serif" fontSize="12" fontWeight="700">SYNTHETIC SURFACE</text>
                  <text x={cx0 + 85} y={cy0 + 67} textAnchor="middle" fill="#aaa"
                    fontFamily="Rajdhani,sans-serif" fontSize="10">₹300/hr · 5AM–11PM</text>
                  <text x={cx0 + 85} y={cy0 + 80} textAnchor="middle" fill="#666"
                    fontFamily="Rajdhani,sans-serif" fontSize="9">Click to select court 3</text>
                </g>
              )}
            </g>
          );
        })()}

        {/* Right block label */}
        <text x="765" y="545" textAnchor="middle" fill="rgba(201,168,76,0.6)"
          fontFamily="Rajdhani,sans-serif" fontSize="12" fontWeight="700" letterSpacing="3">
          RIGHT BLOCK — COURT 3
        </text>

        {/* Compass */}
        <g transform="translate(950, 80)">
          <circle r="16" fill="rgba(10,10,10,0.8)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
          <text textAnchor="middle" y="-5" fill="#c9a84c" fontFamily="Rajdhani" fontSize="8" fontWeight="700">N</text>
          <line x1="0" y1="-3" x2="0" y2="-12" stroke="#c9a84c" strokeWidth="1" />
          <text textAnchor="middle" y="11" fill="#555" fontFamily="Rajdhani" fontSize="7">S</text>
        </g>
      </svg>
    </div>
  );
};

export default AerialCourtIllustration;
