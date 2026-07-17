import React from 'react';

/**
 * CourtBackdrop — a professional, photo-free hero background built entirely
 * from layered gradients and a faint badminton/turf court-line pattern.
 * Reads as "premium sports facility" without needing a real photograph.
 */
const CourtBackdrop = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Base tone — deep charcoal with a subtle warm gold wash top-left, cool wash bottom-right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 90% 60% at 15% 0%, rgba(201,168,76,0.16) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 100% 100%, rgba(30,144,255,0.09) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 100% 0%, rgba(45,164,78,0.07) 0%, transparent 55%),
            linear-gradient(180deg, #0a0a0a 0%, #050505 55%, #000000 100%)
          `,
        }}
      />

      {/* Faint court-line pattern — evokes a badminton court without literal imagery */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }}
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <rect x="60" y="60" width="880" height="880" fill="none" stroke="#c9a84c" strokeWidth="2" />
        <line x1="60" y1="500" x2="940" y2="500" stroke="#c9a84c" strokeWidth="2" />
        <line x1="500" y1="60" x2="500" y2="940" stroke="#c9a84c" strokeWidth="1.5" />
        <rect x="150" y="150" width="700" height="700" fill="none" stroke="#c9a84c" strokeWidth="1.2" />
        <circle cx="500" cy="500" r="120" fill="none" stroke="#c9a84c" strokeWidth="1" />
      </svg>

      {/* Subtle diagonal texture, like turf grain / gym flooring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 34px)',
        }}
      />

      {/* Vignette to keep focus on the center/left content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 120% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
};

export default CourtBackdrop;
