import React from 'react';
import { motion } from 'framer-motion';

/**
 * SportsPlayerArt — a crisp, clearly-defined athlete silhouette in a
 * static dynamic pose (mid-stride lunge). No limb-swinging animation —
 * just a gentle overall float so it reads as a clean hero graphic rather
 * than a looping dance.
 */
const SportsPlayerArt = () => {
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
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: 'min(85vw, 1000px)',
          height: '100%',
          marginLeft: '8vw',
        }}
      >
        {/* Ambient glow behind the figure */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '720px',
            height: '720px',
            maxWidth: '90%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.05) 45%, transparent 72%)',
            filter: 'blur(4px)',
            animation: 'auraPulse 5s ease-in-out infinite',
          }}
        />

        {/* Gentle overall float — the only motion on the figure */}
        <motion.svg
          viewBox="0 0 700 900"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <defs>
            <linearGradient id="spGoldGrad" gradientUnits="userSpaceOnUse" x1="200" y1="150" x2="520" y2="820">
              <stop offset="0%" stopColor="#e8cf85" />
              <stop offset="50%" stopColor="#d9b968" />
              <stop offset="100%" stopColor="#a0812c" />
            </linearGradient>
            <filter id="spGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ground contact shadow — static */}
          <ellipse cx="360" cy="855" rx="150" ry="18" fill="#000" opacity="0.24" />

          {/* ═════════ ATHLETE — static mid-stride lunge, sharp shapes ═════════ */}
          <g fill="url(#spGoldGrad)" stroke="#0a0a0a" strokeWidth="3">
            {/* Back leg — thigh + shin, bent and trailing */}
            <path d="M 296,560 L 344,560 L 356,660 L 306,668 Z" />
            <path d="M 308,664 L 352,664 L 344,764 L 312,764 Z" />
            <ellipse cx="326" cy="778" rx="26" ry="14" />

            {/* Front leg — thigh + shin, extended forward */}
            <path d="M 356,560 L 404,560 L 420,650 L 372,662 Z" />
            <path d="M 378,658 L 424,652 L 448,748 L 406,758 Z" />
            <ellipse cx="428" cy="770" rx="28" ry="14" />

            {/* Hips */}
            <rect x="292" y="520" width="130" height="70" rx="26" />

            {/* Torso */}
            <path d="M 300,300 L 420,300 L 410,540 L 310,540 Z" />

            {/* Head */}
            <circle cx="362" cy="240" r="52" />

            {/* Back arm — swept back */}
            <path d="M 296,320 L 340,320 L 320,430 L 288,424 Z" />
            <circle cx="298" cy="434" r="18" />

            {/* Front arm — driving forward and up */}
            <path d="M 386,318 L 428,306 L 462,388 L 424,402 Z" />
            <circle cx="452" cy="398" r="18" />

            {/* Shoulders */}
            <circle cx="310" cy="312" r="30" />
            <circle cx="412" cy="312" r="30" />
          </g>

          {/* Subtle static motion lines to suggest speed, no animation */}
          <g stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" opacity="0.35" filter="url(#spGlow)">
            <line x1="150" y1="360" x2="230" y2="360" />
            <line x1="130" y1="430" x2="220" y2="430" />
            <line x1="160" y1="500" x2="235" y2="500" />
          </g>
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

export default SportsPlayerArt;
