import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitText from '../components/SplitText';

/* ─────────────────────────────────────────────
   REALISTIC AERIAL COURT ILLUSTRATION
   Layout: [Court 1][Court 2] | STREET | [Court 3]
   All three are SYNTHETIC courts
────────────────────────────────────────────── */
const AerialCourtIllustration = () => {
  const [hovered, setHovered] = useState(null);

  /* Color palette */
  // eslint-disable-next-line no-unused-vars
  const skyBlue      = '#1a3a5c';
  const synthGreen   = '#2d6a4f';
  const synthGreenHl = '#40916c';
  const lineWhite    = '#e8f4f0';
  const netYellow    = 'var(--gold)';
  const streetGray   = '#2c2c2c';
  const sidewalkGray = '#3a3a3a';
  const streetLine   = '#f5c518';
  const roofGray     = 'var(--bg-card)';

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg
        viewBox="0 0 1000 560"
        style={{ width: '100%', maxWidth: '1000px', display: 'block', margin: '0 auto' }}
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
            <line x1="0" y1="10" x2="20" y2="10" stroke="var(--border-sub)" strokeWidth="0.5" />
            <line x1="10" y1="0" x2="10" y2="20" stroke="var(--border-sub)" strokeWidth="0.5" />
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
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.6)" />
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
        <text x="500" y="30" textAnchor="middle" fill="var(--gold)"
          fontFamily="'Bebas Neue', sans-serif" fontSize="18" letterSpacing="5">
          KING SPORTS CLUB — AERIAL COURT VIEW
        </text>
        <text x="500" y="48" textAnchor="middle" fill="rgba(201,168,76,0.45)"
          fontFamily="Rajdhani, sans-serif" fontSize="11" letterSpacing="3">
          PADAPPAI · 3 SYNTHETIC BADMINTON COURTS
        </text>

        {/* ══════════════════════════════════════════
            LEFT SIDE — 2 COURTS STACKED
        ══════════════════════════════════════════ */}

        {/* Left building / covered structure */}
        <rect x="30" y="60" width="420" height="470" fill="rgba(201,168,76,0.04)"
          stroke="rgba(201,168,76,0.12)" strokeWidth="1" rx="2" />

        {/* Roof overhang top */}
        <rect x="26" y="56" width="428" height="12" fill="url(#roofPattern)"
          stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
        <rect x="26" y="524" width="428" height="10" fill="url(#roofPattern)"
          stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
        {/* Side pillars */}
        {[30, 440].map((x, i) => (
          <rect key={i} x={x} y="56" width="8" height="478" fill="var(--bg-card)"
            stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
        ))}
        {/* Pillar between courts */}
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
          const isHov = hovered === 1;

          return (
            <g onMouseEnter={() => setHovered(1)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
              {/* Court surface */}
              <rect x={cx0} y={cy0} width={cw} height={ch}
                fill={isHov ? '#1d4a35' : 'url(#synthSurface)'}
                stroke={isHov ? 'var(--gold)' : 'rgba(201,168,76,0.2)'} strokeWidth={isHov ? 1.5 : 1} />

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
              {/* Net mesh lines */}
              {[4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map((offset, i) => (
                <line key={i} x1={ix0 + offset * ((ix1 - ix0) / 40)} y1={midY - 5} x2={ix0 + offset * ((ix1 - ix0) / 40)} y2={midY + 5}
                  stroke={netYellow} strokeWidth="0.5" opacity="0.35" />
              ))}

              {/* Label */}
              <rect x={cx0 + 5} y={cy0 + 5} width="68" height="20" fill="var(--bg-card)" rx="2" />
              <text x={cx0 + 39} y={cy0 + 18} textAnchor="middle" fill="var(--gold)"
                fontFamily="Rajdhani, sans-serif" fontSize="11" fontWeight="700" letterSpacing="2">COURT 1</text>

              {/* Synthetic badge */}
              <rect x={cx1 - 74} y={cy0 + 5} width="68" height="18" fill="rgba(45,106,79,0.4)"
                stroke="rgba(45,200,120,0.35)" strokeWidth="1" rx="2" />
              <text x={cx1 - 40} y={cy0 + 17} textAnchor="middle" fill="#52b788"
                fontFamily="Rajdhani, sans-serif" fontSize="9" fontWeight="700" letterSpacing="2">SYNTHETIC</text>

              {/* Hover tooltip */}
              {isHov && (
                <g>
                  <rect x={cx0 + 6} y={cy0 + 30} width="145" height="52" fill="var(--bg-card)"
                    stroke="rgba(201,168,76,0.4)" strokeWidth="1" rx="3" />
                  <text x={cx0 + 78} y={cy0 + 46} textAnchor="middle" fill="var(--gold)"
                    fontFamily="Rajdhani,sans-serif" fontSize="11" fontWeight="700">SYNTHETIC SURFACE</text>
                  <text x={cx0 + 78} y={cy0 + 60} textAnchor="middle" fill="var(--text-sub)"
                    fontFamily="Rajdhani,sans-serif" fontSize="10">₹300/hr · 5AM–11PM · NEW</text>
                  <text x={cx0 + 78} y={cy0 + 73} textAnchor="middle" fill="var(--text-muted)"
                    fontFamily="Rajdhani,sans-serif" fontSize="9">Hover to explore · Left Block</text>
                </g>
              )}
            </g>
          );
        })()}

        {/* Divider wall between courts 1 & 2 */}
        <rect x="50" y="279" width="370" height="8" fill="var(--bg-card)" stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" />

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
          const isHov = hovered === 2;

          return (
            <g onMouseEnter={() => setHovered(2)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
              <rect x={cx0} y={cy0} width={cw} height={ch}
                fill={isHov ? '#1d4a35' : 'url(#synthSurface)'}
                stroke={isHov ? 'var(--gold)' : 'rgba(201,168,76,0.2)'} strokeWidth={isHov ? 1.5 : 1} />

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

              <rect x={cx0 + 5} y={cy0 + 5} width="68" height="20" fill="var(--bg-card)" rx="2" />
              <text x={cx0 + 39} y={cy0 + 18} textAnchor="middle" fill="var(--gold)"
                fontFamily="Rajdhani, sans-serif" fontSize="11" fontWeight="700" letterSpacing="2">COURT 2</text>

              <rect x={cx1 - 74} y={cy0 + 5} width="68" height="18" fill="rgba(45,106,79,0.4)"
                stroke="rgba(45,200,120,0.35)" strokeWidth="1" rx="2" />
              <text x={cx1 - 40} y={cy0 + 17} textAnchor="middle" fill="#52b788"
                fontFamily="Rajdhani, sans-serif" fontSize="9" fontWeight="700" letterSpacing="2">SYNTHETIC</text>

              {isHov && (
                <g>
                  <rect x={cx0 + 6} y={cy0 + 30} width="145" height="52" fill="var(--bg-card)"
                    stroke="rgba(201,168,76,0.4)" strokeWidth="1" rx="3" />
                  <text x={cx0 + 78} y={cy0 + 46} textAnchor="middle" fill="var(--gold)"
                    fontFamily="Rajdhani,sans-serif" fontSize="11" fontWeight="700">SYNTHETIC SURFACE</text>
                  <text x={cx0 + 78} y={cy0 + 60} textAnchor="middle" fill="var(--text-sub)"
                    fontFamily="Rajdhani,sans-serif" fontSize="10">₹300/hr · 5AM–11PM · NEW</text>
                  <text x={cx0 + 78} y={cy0 + 73} textAnchor="middle" fill="var(--text-muted)"
                    fontFamily="Rajdhani,sans-serif" fontSize="9">Hover to explore · Left Block</text>
                </g>
              )}
            </g>
          );
        })()}

        {/* Left block label */}
        <text x="235" y="545" textAnchor="middle" fill="rgba(201,168,76,0.6)"
          fontFamily="Rajdhani,sans-serif" fontSize="12" fontWeight="700" letterSpacing="3">
          LEFT BLOCK — 2 COURTS
        </text>

        {/* ══════════════════════════════════════════
            STREET / ROAD IN THE MIDDLE
        ══════════════════════════════════════════ */}
        {/* Street base */}
        <rect x="450" y="56" width="110" height="478" fill="url(#asphalt)" />

        {/* Sidewalk left edge */}
        <rect x="450" y="56" width="12" height="478" fill="url(#sidewalk)" />
        {/* Sidewalk right edge */}
        <rect x="548" y="56" width="12" height="478" fill="url(#sidewalk)" />

        {/* Road center dashed line */}
        {[80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380, 410, 440, 470, 500].map((y, i) => (
          <rect key={i} x={499} y={y} width="4" height="18" fill={streetLine} opacity="0.5" rx="1" />
        ))}

        {/* Street shadow overlay */}
        <rect x="450" y="56" width="110" height="478" fill="url(#streetFade)" />

        {/* STREET label */}
        <text x="505" y="310" textAnchor="middle" fill="var(--border)"
          fontFamily="Rajdhani,sans-serif" fontSize="10" fontWeight="700" letterSpacing="4"
          transform="rotate(-90, 505, 310)">STREET</text>

        {/* Manhole */}
        <circle cx="505" cy="295" r="8" fill="#222" stroke="var(--border-sub)" strokeWidth="1" />
        <circle cx="505" cy="295" r="5" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        {/* Street lamp posts */}
        {[120, 350, 490].map((y, i) => (
          <g key={i}>
            <rect x="506" y={y} width="3" height="30" fill="#333" />
            <rect x="503" y={y - 2} width="9" height="4" fill="#444" rx="1" />
            <ellipse cx="508" cy={y - 3} rx="6" ry="3" fill="rgba(255,220,100,0.12)" />
          </g>
        ))}

        {/* ══════════════════════════════════════════
            RIGHT SIDE — 1 COURT
        ══════════════════════════════════════════ */}

        {/* Right building */}
        <rect x="560" y="60" width="410" height="470" fill="rgba(201,168,76,0.03)"
          stroke="rgba(201,168,76,0.12)" strokeWidth="1" rx="2" />

        {/* Roof overhangs */}
        <rect x="556" y="56" width="418" height="12" fill="url(#roofPattern)"
          stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
        <rect x="556" y="524" width="418" height="10" fill="url(#roofPattern)"
          stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
        {/* Side pillars */}
        {[560, 962].map((x, i) => (
          <rect key={i} x={x} y="56" width="8" height="478" fill="var(--bg-card)"
            stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
        ))}

        {/* ── COURT 3 (right, full height) ── */}
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
          const isHov = hovered === 3;

          return (
            <g onMouseEnter={() => setHovered(3)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
              <rect x={cx0} y={cy0} width={cw} height={ch}
                fill={isHov ? '#1d4a35' : 'url(#synthSurface)'}
                stroke={isHov ? 'var(--gold-lt)' : 'rgba(201,168,76,0.18)'} strokeWidth={isHov ? 1.5 : 1} />

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
              <rect x={cx0 + 6} y={cy0 + 6} width="68" height="22" fill="var(--bg-card)" rx="2" />
              <text x={cx0 + 40} y={cy0 + 20} textAnchor="middle" fill="var(--gold)"
                fontFamily="Rajdhani, sans-serif" fontSize="12" fontWeight="700" letterSpacing="2">COURT 3</text>

              <rect x={cx1 - 80} y={cy0 + 6} width="74" height="20" fill="rgba(45,106,79,0.4)"
                stroke="rgba(45,200,120,0.35)" strokeWidth="1" rx="2" />
              <text x={cx1 - 43} y={cy0 + 19} textAnchor="middle" fill="#52b788"
                fontFamily="Rajdhani, sans-serif" fontSize="9" fontWeight="700" letterSpacing="2">SYNTHETIC</text>

              {isHov && (
                <g>
                  <rect x={cx0 + 8} y={cy0 + 35} width="155" height="55" fill="var(--bg-card)"
                    stroke="rgba(201,168,76,0.4)" strokeWidth="1" rx="3" />
                  <text x={cx0 + 85} y={cy0 + 52} textAnchor="middle" fill="var(--gold)"
                    fontFamily="Rajdhani,sans-serif" fontSize="12" fontWeight="700">SYNTHETIC SURFACE</text>
                  <text x={cx0 + 85} y={cy0 + 67} textAnchor="middle" fill="var(--text-sub)"
                    fontFamily="Rajdhani,sans-serif" fontSize="10">₹300/hr · 5AM–11PM</text>
                  <text x={cx0 + 85} y={cy0 + 80} textAnchor="middle" fill="var(--text-muted)"
                    fontFamily="Rajdhani,sans-serif" fontSize="9">Full-size · Right Block</text>
                </g>
              )}
            </g>
          );
        })()}

        {/* Right block label */}
        <text x="765" y="545" textAnchor="middle" fill="rgba(201,168,76,0.6)"
          fontFamily="Rajdhani,sans-serif" fontSize="12" fontWeight="700" letterSpacing="3">
          RIGHT BLOCK — 1 COURT
        </text>

        {/* ── COMPASS / LEGEND ── */}
        <g transform="translate(930, 80)">
          <circle r="22" fill="var(--bg-card)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
          <text textAnchor="middle" y="-8" fill="var(--gold)" fontFamily="Rajdhani" fontSize="9" fontWeight="700">N</text>
          <line x1="0" y1="-5" x2="0" y2="-18" stroke="var(--gold)" strokeWidth="1.5" />
          <text textAnchor="middle" y="16" fill="#555" fontFamily="Rajdhani" fontSize="8">S</text>
          <text x="-14" y="4" textAnchor="middle" fill="#555" fontFamily="Rajdhani" fontSize="8">W</text>
          <text x="14" y="4" textAnchor="middle" fill="#555" fontFamily="Rajdhani" fontSize="8">E</text>
        </g>

        {/* ── BOTTOM LEGEND ── */}
        <g transform="translate(20, 548)">
          <rect width="12" height="10" fill={synthGreen} rx="1" />
          <text x="16" y="9" fill="var(--text-muted)" fontFamily="Rajdhani,sans-serif" fontSize="9" letterSpacing="1">SYNTHETIC SURFACE</text>
          <line x1="160" y1="5" x2="182" y2="5" stroke="url(#netGrad)" strokeWidth="3.5" />
          <text x="186" y="9" fill="var(--text-muted)" fontFamily="Rajdhani,sans-serif" fontSize="9" letterSpacing="1">NET</text>
          <rect x="225" width="12" height="10" fill="url(#asphalt)" rx="1" />
          <text x="241" y="9" fill="var(--text-muted)" fontFamily="Rajdhani,sans-serif" fontSize="9" letterSpacing="1">STREET</text>
          <line x1="310" y1="5" x2="330" y2="5" stroke={lineWhite} strokeWidth="1.5" opacity="0.6" />
          <text x="334" y="9" fill="var(--text-muted)" fontFamily="Rajdhani,sans-serif" fontSize="9" letterSpacing="1">COURT LINES</text>
          <text x="460" y="9" fill="rgba(201,168,76,0.4)" fontFamily="Rajdhani,sans-serif" fontSize="9" letterSpacing="1">HOVER COURTS FOR INFO</text>
        </g>
      </svg>
    </div>
  );
};

const BadmintonPage = () => (
  <>
    {/* HERO */}
    <section style={{ paddingTop: '8rem', paddingBottom: '3rem', background: 'var(--bg)', borderBottom: '1px solid rgba(201,168,76,0.12)', position: 'relative', overflow: 'hidden' }}>
      <div className="bg-blob bg-blob-blue" style={{ width: '380px', height: '380px', top: '-10%', right: '0%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">Court Information</div>
        <h1 className="section-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <SplitText text="BADMINTON" tag="span" delay={30} duration={0.6} textAlign="left" />
          <SplitText text="COURTS" tag="span" className="gold-text" delay={30} duration={0.6} textAlign="left" />
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '620px', lineHeight: 1.8, marginTop: '1rem' }}>
          Three professional <strong style={{ color: 'var(--gold)' }}>synthetic badminton courts</strong> open daily from 5AM to 11PM.
          Two courts are on the <strong style={{ color: 'var(--text)' }}>left block</strong>, and one large court is on the
          <strong style={{ color: 'var(--text)' }}> right block</strong> — separated by a street in between.
          All courts feature premium synthetic flooring approved for professional play.
        </p>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { val: '3', label: 'Synthetic Courts' },
            { val: '₹300', label: 'Per Hour' },
            { val: '18hrs', label: 'Open Daily' },
            { val: '2+1', label: 'Left + Right Block' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.3 }}
              style={{ padding: '1rem 1.5rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.18)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: 'var(--gold)', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* AERIAL ILLUSTRATION */}
    <section style={{ padding: '4rem 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Aerial View Illustration</div>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
            REAL COURT <span className="gold-text">LAYOUT</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '560px', lineHeight: 1.7 }}>
            Two courts on the left block, one court on the right block — with a street running in between.
            All three are <span style={{ color: '#52b788' }}>synthetic surface</span> courts.
            Hover over any court to view details.
          </p>
          <div className="glass-premium" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <AerialCourtIllustration />
          </div>
        </motion.div>
      </div>
    </section>

    {/* COURT FEATURES SECTION */}
    <section style={{ padding: '4rem 0', background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-label">Why Our Courts?</div>
        <h2 className="section-title" style={{ marginBottom: '3rem' }}>WORLD-CLASS <span className="gold-text">SYNTHETIC</span> SURFACE</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            { icon: '🟢', title: 'Synthetic Flooring', desc: 'ITF-grade synthetic surface on all 3 courts — engineered for consistent bounce, shock absorption, and reduced joint fatigue.' },
            { icon: '💡', title: 'Floodlit Evenings', desc: 'Bright LED floodlights across both blocks keep all courts fully playable through late evening.' },
            { icon: '🌬️', title: 'Ventilated Enclosure', desc: 'Both blocks are enclosed yet ventilated — keeping you cool and focused even in peak summer.' },
            { icon: '🏆', title: 'Tournament Ready', desc: 'Court dimensions and net height comply with BWF standards. We host local leagues and club tournaments.' },
            { icon: '🎯', title: 'Coaching Available', desc: 'Certified badminton coaches available for private sessions, group coaching, and weekend clinics.' },
            { icon: '🛍️', title: 'Equipment Rental', desc: 'Rackets, shuttlecocks (feather & nylon), and grip tape available at the front desk.' },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-sub)', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.15rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>{f.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* COURT CARDS */}
    <section style={{ padding: '2rem 0 4rem', background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-label" style={{ marginBottom: '1rem' }}>Individual Courts</div>
        <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>PICK YOUR <span className="gold-text">COURT</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {[
            {
              num: '1', name: 'Court 1', badge: 'LEFT BLOCK', side: 'Left Side',
              floor: 'Synthetic Surface', color: 'var(--gold)',
              desc: 'Located on the left block (top position). Premium synthetic flooring with ideal shock absorption. Perfect for serious practice and competitive play.',
              extras: ['Left block, top court', 'Synthetic ITF-grade surface', 'Full-size doubles layout', 'Adjacent to Court 2'],
            },
            {
              num: '2', name: 'Court 2', badge: 'LEFT BLOCK', side: 'Left Side',
              floor: 'Synthetic Surface', color: 'var(--gold)',
              desc: 'Left block, lower court. Identical synthetic surface to Court 1 — great for simultaneous sessions, doubles, or club practice.',
              extras: ['Left block, bottom court', 'Synthetic ITF-grade surface', 'Ideal for group sessions', 'Adjacent to Court 1'],
            },
            {
              num: '3', name: 'Court 3', badge: 'RIGHT BLOCK', side: 'Right Side',
              floor: 'Synthetic Surface', color: 'var(--gold-lt)',
              desc: 'Standalone court on the right block, across the street from Courts 1 & 2. Full-size court with dedicated lighting and ample spectator space.',
              extras: ['Right block, standalone court', 'Synthetic surface', 'Extra spectator space', 'Separate entrance'],
            },
          ].map((court, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }} whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
              style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.15)', padding: '2rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${court.color}, transparent)` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '4rem', color: `${court.color}22`, lineHeight: 1 }}>{court.num}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                  <span style={{ padding: '0.2rem 0.6rem', background: `rgba(201,168,76,0.12)`, border: `1px solid ${court.color}55`, fontFamily: 'Rajdhani', fontSize: '0.6rem', letterSpacing: '0.2em', color: court.color, textTransform: 'uppercase' }}>{court.badge}</span>
                  <span style={{ padding: '0.2rem 0.5rem', background: 'rgba(82,183,136,0.1)', border: '1px solid rgba(82,183,136,0.3)', fontFamily: 'Rajdhani', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#52b788', textTransform: 'uppercase' }}>SYNTHETIC</span>
                </div>
              </div>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.2rem' }}>{court.name}</h3>
              <div style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', color: court.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{court.floor} · {court.side}</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{court.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                {court.extras.map((e, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '5px', height: '5px', background: '#52b788', borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'var(--text-sub)' }}>{e}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', color: 'var(--gold)' }}>₹300</div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>/hour</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rules & Tips */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: '3rem', padding: '2.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-sub)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '1rem' }}>COURT RULES</h4>
            {['Non-marking sports shoes required', 'Book at least 1 hour in advance', 'Grace period: 10 mins', 'No food or drinks on court', 'BWF shuttlecocks recommended'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>›</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{r}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '1rem' }}>OPERATING HOURS</h4>
            {[
              { day: 'Monday – Friday', time: '5:00 AM – 11:00 PM' },
              { day: 'Saturday', time: '5:00 AM – 11:00 PM' },
              { day: 'Sunday', time: '6:00 AM – 10:00 PM' },
              { day: 'Public Holidays', time: 'Same as Sunday' },
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{h.day}</span>
                <span style={{ color: 'var(--gold)', fontSize: '0.82rem', fontFamily: 'Rajdhani', fontWeight: 600 }}>{h.time}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '1rem' }}>HOW TO FIND US</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.7 }}>
              Courts 1 & 2 are on the <span style={{ color: 'var(--text)' }}>left side</span> of the entrance on Bazzar Road.
              Court 3 is on the <span style={{ color: 'var(--text)' }}>right side</span>, across the small street.
              Look for the green synthetic courts visible from the road.
            </p>
            <div style={{ marginTop: '0.75rem', padding: '0.6rem 1rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', fontFamily: 'Rajdhani', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              📍 6/518, Bazzar Road, Padappai
            </div>
          </div>
        </motion.div>

        {/* Booking CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '2rem', padding: '3rem', background: 'linear-gradient(135deg, var(--gold-dim), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--text)', letterSpacing: '0.03em' }}>READY TO SMASH IT?</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Book your synthetic court online — secure your slot in seconds.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/book" style={{ textDecoration: 'none' }}><button className="btn-primary">Book a Court →</button></Link>
            <a href="https://wa.me/919080703491" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-outline" style={{ borderColor: '#25d366', color: '#25d366' }}>💬 WhatsApp</button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

export default BadmintonPage;
