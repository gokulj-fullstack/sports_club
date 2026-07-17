import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Builds a rounded "capsule" (stadium shape) path between two joints —
 * used to render each limb segment as a solid shape. Combined with the
 * "goo" filter below, adjoining capsules/circles fuse into one smooth
 * silhouette instead of showing seams at every joint.
 */
const capsule = (x1, y1, x2, y2, r) => {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const px = -uy, py = ux;
  const ax = x1 + px * r, ay = y1 + py * r;
  const bx = x2 + px * r, by = y2 + py * r;
  const cx = x2 - px * r, cy = y2 - py * r;
  const dxp = x1 - px * r, dyp = y1 - py * r;
  return `M ${ax},${ay} L ${bx},${by} A ${r},${r} 0 0 1 ${cx},${cy} L ${dxp},${dyp} A ${r},${r} 0 0 1 ${ax},${ay} Z`;
};

/**
 * BadmintonHeroArt — solid silhouette of a badminton player mid-jump-smash.
 * v2: joints repositioned with generous margins so nothing (racket, feet,
 * shuttle) clips against the SVG viewport; gradient switched to
 * userSpaceOnUse so it's continuous across the whole figure instead of
 * per-shape (which was causing visible seams at every joint); a "goo"
 * merge filter fuses the capsule limbs into one smooth body silhouette
 * instead of a jointed-mannequin look.
 */
const BadmintonHeroArt = ({ style }) => {
  const joints = useMemo(() => ({
    head: { x: 560, y: 270, r: 36 },
    neck: { x: 544, y: 318 },
    shoulderR: { x: 588, y: 335 },
    elbowR: { x: 642, y: 278 },
    wristR: { x: 672, y: 215 },
    shoulderL: { x: 468, y: 342 },
    elbowL: { x: 415, y: 398 },
    wristL: { x: 378, y: 438 },
    chest: { x: 543, y: 362 },
    pelvis: { x: 495, y: 510 },
    hipR: { x: 540, y: 524 },
    kneeR: { x: 600, y: 590 },
    ankleR: { x: 632, y: 675 },
    toeR: { x: 668, y: 698 },
    heelR: { x: 612, y: 698 },
    hipL: { x: 452, y: 524 },
    kneeL: { x: 412, y: 650 },
    ankleL: { x: 388, y: 788 },
    toeL: { x: 356, y: 888 },
    heelL: { x: 405, y: 802 },
  }), []);

  const j = joints;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: 'min(78vw, 980px)',
          height: '100%',
          marginLeft: '8vw',
          ...style
        }}
      >
        {/* Ambient glow behind the figure */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '640px',
            height: '640px',
            maxWidth: '90%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.05) 45%, transparent 72%)',
            filter: 'blur(4px)',
            animation: 'auraPulse 5s ease-in-out infinite',
          }}
        />

        <motion.svg
          viewBox="0 0 900 1000"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <defs>
            {/* userSpaceOnUse keeps the gradient continuous across the WHOLE
                figure instead of restarting per-shape (which caused visible
                seam rings at every joint before). */}
            <linearGradient id="playerGoldGrad" gradientUnits="userSpaceOnUse" x1="330" y1="220" x2="700" y2="900">
              <stop offset="0%" stopColor="#a0812c" />
              <stop offset="45%" stopColor="#d9b968" />
              <stop offset="100%" stopColor="#c9a84c" />
            </linearGradient>
            <linearGradient id="racketGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9a84c" />
              <stop offset="100%" stopColor="#f2dd9a" />
            </linearGradient>
            <linearGradient id="shuttleTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
            </linearGradient>

            {/* "Goo" merge — blurs then re-sharpens alpha so adjoining
                capsules/circles fuse into one smooth silhouette. */}
            <filter id="goo" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
            <filter id="goldGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softBlueGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ground contact shadow */}
          <ellipse cx="420" cy="915" rx="190" ry="20" fill="url(#playerGoldGrad)" opacity="0.10" />

          {/* ── Shuttlecock motion trail arcing up to the racket ── */}
          <motion.path
            d="M 170,340 C 280,280 360,240 450,215 C 520,196 580,205 630,225"
            fill="none"
            stroke="url(#shuttleTrailGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="10 10"
            filter="url(#softBlueGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
          />
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, 6, 0], y: [0, -4, 0] }}
            transition={{ opacity: { duration: 0.4, delay: 1.8 }, x: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <circle cx="170" cy="340" r="9" fill="#f5f5f5" filter="url(#softBlueGlow)" />
            <path d="M 170,340 L 148,318 M 170,340 L 142,336 M 170,340 L 148,358" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
          </motion.g>

          {/* ═════════ PLAYER SILHOUETTE — goo-merged capsule figure ═════════ */}
          <motion.g
            fill="url(#playerGoldGrad)"
            filter="url(#goo)"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Back leg (trailing, bent) */}
            <path d={capsule(j.hipR.x, j.hipR.y, j.kneeR.x, j.kneeR.y, 34)} />
            <circle cx={j.kneeR.x} cy={j.kneeR.y} r="30" />
            <path d={capsule(j.kneeR.x, j.kneeR.y, j.ankleR.x, j.ankleR.y, 25)} />
            <circle cx={j.ankleR.x} cy={j.ankleR.y} r="20" />
            <path d={`M ${j.heelR.x},${j.heelR.y + 14} L ${j.toeR.x},${j.toeR.y} L ${j.ankleR.x + 8},${j.ankleR.y + 6} Z`} />

            {/* Front leg (extended toward landing) */}
            <path d={capsule(j.hipL.x, j.hipL.y, j.kneeL.x, j.kneeL.y, 36)} />
            <circle cx={j.kneeL.x} cy={j.kneeL.y} r="32" />
            <path d={capsule(j.kneeL.x, j.kneeL.y, j.ankleL.x, j.ankleL.y, 26)} />
            <circle cx={j.ankleL.x} cy={j.ankleL.y} r="21" />
            <path d={`M ${j.heelL.x},${j.heelL.y} L ${j.toeL.x},${j.toeL.y} L ${j.ankleL.x - 6},${j.ankleL.y + 10} Z`} />

            {/* Pelvis / hips */}
            <ellipse cx={j.pelvis.x} cy={j.pelvis.y} rx="72" ry="44" />

            {/* Torso — tapered from chest to pelvis */}
            <path d={`M ${j.chest.x - 78},${j.chest.y - 10}
                      C ${j.chest.x - 70},${j.chest.y + 60} ${j.pelvis.x - 58},${j.pelvis.y - 70} ${j.pelvis.x - 66},${j.pelvis.y - 10}
                      L ${j.pelvis.x + 66},${j.pelvis.y - 10}
                      C ${j.pelvis.x + 58},${j.pelvis.y - 70} ${j.chest.x + 74},${j.chest.y + 55} ${j.chest.x + 82},${j.chest.y - 12}
                      C ${j.chest.x + 55},${j.chest.y - 45} ${j.chest.x - 50},${j.chest.y - 45} ${j.chest.x - 78},${j.chest.y - 10} Z`} />

            {/* Neck + head */}
            <path d={capsule(j.neck.x, j.neck.y, j.head.x, j.head.y - 22, 22)} />
            <circle cx={j.head.x} cy={j.head.y} r={j.head.r} />

            {/* Opposite (non-racket) arm — swept back for balance */}
            <path d={capsule(j.shoulderL.x, j.shoulderL.y, j.elbowL.x, j.elbowL.y, 24)} />
            <circle cx={j.elbowL.x} cy={j.elbowL.y} r="20" />
            <path d={capsule(j.elbowL.x, j.elbowL.y, j.wristL.x, j.wristL.y, 17)} />
            <circle cx={j.wristL.x} cy={j.wristL.y} r="14" />

            {/* Racket arm — raised fully overhead into the strike */}
            <path d={capsule(j.shoulderR.x, j.shoulderR.y, j.elbowR.x, j.elbowR.y, 26)} />
            <circle cx={j.elbowR.x} cy={j.elbowR.y} r="22" />
            <path d={capsule(j.elbowR.x, j.elbowR.y, j.wristR.x, j.wristR.y, 18)} />
            <circle cx={j.wristR.x} cy={j.wristR.y} r="15" />

            {/* Shoulders — round out the neckline join */}
            <circle cx={j.shoulderR.x} cy={j.shoulderR.y} r="28" />
            <circle cx={j.shoulderL.x} cy={j.shoulderL.y} r="26" />
          </motion.g>

          {/* Racket */}
          <motion.g
            initial={{ opacity: 0, rotate: -18 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${j.wristR.x}px ${j.wristR.y}px` }}
          >
            <g transform={`translate(${j.wristR.x}, ${j.wristR.y}) rotate(-30)`} stroke="url(#racketGoldGrad)" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#goldGlow)">
              <line x1="0" y1="0" x2="0" y2="80" strokeWidth="10" />
              <rect x="-7" y="80" width="14" height="30" rx="4" fill="url(#racketGoldGrad)" stroke="none" />
              <ellipse cx="0" cy="-68" rx="50" ry="64" strokeWidth="9" />
              <g strokeWidth="2.5" opacity="0.75">
                <path d="M -28,-68 L 28,-68 M -20,-44 L 20,-44 M -20,-92 L 20,-92 M -38,-56 L 38,-56 M -38,-80 L 38,-80" />
                <path d="M 0,-130 L 0,-6 M -17,-126 L -17,-10 M 17,-126 L 17,-10 M -31,-116 L -31,-18 M 31,-116 L 31,-18" />
              </g>
            </g>
          </motion.g>

          {/* Impact burst at the racket face */}
          <motion.g
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 1, 0], scale: [0.3, 1.3, 1.6] }}
            transition={{ duration: 0.9, delay: 1.55, ease: 'easeOut' }}
            style={{ transformOrigin: '606px 101px' }}
          >
            <g transform="translate(606, 101)" stroke="#f2dd9a" strokeWidth="4" strokeLinecap="round" filter="url(#goldGlow)">
              <line x1="0" y1="-6" x2="0" y2="-30" />
              <line x1="18" y1="-2" x2="38" y2="-14" />
              <line x1="-18" y1="-2" x2="-38" y2="-14" />
              <line x1="12" y1="12" x2="26" y2="28" />
              <line x1="-12" y1="12" x2="-26" y2="28" />
            </g>
          </motion.g>
        </motion.svg>
      </motion.div>

      <style>{`
        @keyframes auraPulse {
          0%, 100% { opacity: 0.75; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.06); }
        }
      `}</style>
    </div>
  );
};

export default BadmintonHeroArt;
