import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeToggle — a custom sun↔moon toggle (not a plain switch).
 * - The track morphs between a sky-blue day gradient and a starry night gradient.
 * - The thumb slides and spins 180°, cross-fading a sun disc (with retracting
 *   rays) into a crescent moon (with fading-in craters).
 * - Small stars twinkle in on the dark side; the whole thing respects
 *   prefers-reduced-motion via Tailwind's motion-reduce utilities.
 */
export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle light and dark theme"
      onClick={toggleTheme}
      className={`group relative h-8 w-16 shrink-0 overflow-hidden rounded-full border transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-night-bg ${
        isDark
          ? 'border-night-border bg-gradient-to-br from-[#0b1020] via-[#131b34] to-[#1b2749]'
          : 'border-sky-200 bg-gradient-to-br from-sky-300 via-sky-200 to-blue-100'
      } ${className}`}
    >
      {/* Stars — fade in only in dark mode */}
      <span
        className={`absolute left-2 top-1.5 h-[3px] w-[3px] rounded-full bg-white transition-opacity duration-700 motion-reduce:transition-none ${isDark ? 'opacity-90' : 'opacity-0'}`}
        style={{ animation: isDark ? 'ksc-twinkle 2.4s ease-in-out infinite' : 'none' }}
      />
      <span
        className={`absolute left-4 top-4 h-[2px] w-[2px] rounded-full bg-white transition-opacity duration-700 motion-reduce:transition-none ${isDark ? 'opacity-70' : 'opacity-0'}`}
        style={{ animation: isDark ? 'ksc-twinkle 3.1s ease-in-out infinite 0.4s' : 'none' }}
      />
      <span
        className={`absolute left-6 top-2 h-[2px] w-[2px] rounded-full bg-white transition-opacity duration-700 motion-reduce:transition-none ${isDark ? 'opacity-80' : 'opacity-0'}`}
        style={{ animation: isDark ? 'ksc-twinkle 2s ease-in-out infinite 0.8s' : 'none' }}
      />

      {/* Soft cloud — fades in only in light mode */}
      <span
        className={`absolute -bottom-1.5 left-1.5 h-4 w-7 rounded-full bg-white/70 blur-[2px] transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Sliding thumb */}
      <span
        className={`absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${
          isDark ? 'translate-x-8 rotate-[220deg] bg-slate-100' : 'translate-x-0 rotate-0 bg-amber-300'
        }`}
      >
        {/* Sun layer */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute h-4 w-4 text-amber-500 transition-all duration-500 ${isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
          fill="none"
        >
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="12"
              y1="2.5"
              x2="12"
              y2="4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              transform={`rotate(${deg} 12 12)`}
            />
          ))}
        </svg>

        {/* Moon layer */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute h-4 w-4 text-slate-600 transition-all duration-500 ${isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          fill="currentColor"
        >
          <path d="M20.5 14.6c-3.6 1.1-7.6-1-8.7-4.7-.7-2.4-.1-4.9 1.4-6.7-4.2.4-7.6 3.9-7.9 8.2-.3 4.8 3.3 8.9 8.1 9.2 3.7.2 7-1.9 8.4-5.1.1-.3-.1-.6-.4-.6-.3 0-.6.1-.9.7Z" />
          <circle cx="9.5" cy="10.5" r="0.9" className="fill-slate-400" />
          <circle cx="12.5" cy="14" r="0.6" className="fill-slate-400" />
        </svg>
      </span>

      <style>{`
        @keyframes ksc-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </button>
  );
}
