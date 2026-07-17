import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ChevronDown, Target, Trophy, Dumbbell, Flame, Sparkles } from 'lucide-react';

// Custom hook for click outside detection
function useClickAway(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Icon mapper for sports club facilities
const getIconConfig = (value) => {
  const val = (value || '').toLowerCase();
  if (val.includes('badminton')) {
    return { icon: Target, color: '#1e90ff', bg: 'rgba(30,144,255,0.1)' };
  } else if (val.includes('turf')) {
    return { icon: Trophy, color: '#2da44e', bg: 'rgba(45,164,78,0.1)' };
  } else if (val.includes('ac') && val.includes('gym')) {
    return { icon: Dumbbell, color: '#c9a84c', bg: 'rgba(201,168,76,0.1)' };
  } else if (val.includes('gym')) {
    return { icon: Flame, color: '#ff6b6b', bg: 'rgba(255,107,107,0.1)' };
  }
  return { icon: Sparkles, color: '#a06cd5', bg: 'rgba(160,108,213,0.1)' };
};

// Animated Icon Wrapper
const AnimatedIcon = ({ value, isHovered }) => {
  const { icon: Icon, color, bg } = getIconConfig(value);
  return (
    <motion.div
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '6px',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '0.75rem',
        border: `1px solid ${color}30`,
        position: 'relative',
        color: color,
        flexShrink: 0
      }}
      initial={false}
      animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
    >
      <Icon style={{ width: '15px', height: '15px' }} />
      {isHovered && (
        <motion.div
          style={{ position: 'absolute', inset: 0, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon style={{ width: '15px', height: '15px', strokeWidth: 2.5 }} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default function FluidDropdown({ value, onChange, options, placeholder, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const dropdownRef = useRef(null);

  useClickAway(dropdownRef, () => setIsOpen(false));

  const selectedOption = options.find(opt => opt.value === value) || null;

  const handleSelect = (opt) => {
    onChange({
      target: {
        name,
        value: opt.value
      }
    });
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={dropdownRef}
        style={{
          width: '100%',
          position: 'relative',
          fontFamily: 'Rajdhani',
          zIndex: isOpen ? 60 : 10
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          style={{
            width: '100%',
            height: '46px',
            padding: '0 1rem',
            background: isOpen ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
            border: isOpen ? '1px solid var(--gold)' : '1px solid var(--border)',
            borderRadius: '6px',
            color: selectedOption ? '#ffffff' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'Rajdhani',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            textAlign: 'left',
            outline: 'none',
            boxShadow: isOpen ? '0 0 0 3px rgba(201,168,76,0.15)' : 'none',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', width: '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selectedOption ? (
              <>
                <AnimatedIcon value={selectedOption.value} isHovered={false} />
                <span>{selectedOption.label}</span>
              </>
            ) : (
              <span>{placeholder || 'Select option'}</span>
            )}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7 }}
          >
            <ChevronDown style={{ width: '16px', height: '16px', color: 'var(--gold)' }} />
          </motion.div>
        </button>

        {/* Dropdown Options Container */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 450,
                  damping: 28,
                  mass: 1
                }
              }}
              exit={{
                opacity: 0,
                y: -6,
                scale: 0.99,
                transition: { duration: 0.15 }
              }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '108%',
                background: '#0a0a0a',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '0.35rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.8)',
                maxHeight: '300px',
                overflowY: 'auto',
                scrollbarWidth: 'thin'
              }}
            >
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                
                {/* Floating highlight backing */}
                {options.map((opt, idx) => {
                  const isHovered = (hoveredOption || (selectedOption ? selectedOption.value : null)) === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(opt)}
                      onMouseEnter={() => setHoveredOption(opt.value)}
                      onMouseLeave={() => setHoveredOption(null)}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        fontFamily: 'Rajdhani',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        borderRadius: '6px',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        background: isHovered ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                        color: isHovered ? 'var(--gold)' : '#b3b3b3',
                        outline: 'none',
                        transition: 'color 0.15s ease-in-out, background-color 0.15s ease-in-out'
                      }}
                    >
                      <AnimatedIcon value={opt.value} isHovered={hoveredOption === opt.value} />
                      <span style={{ position: 'relative', zIndex: 2 }}>{opt.label}</span>
                      
                      {/* Active indicator dot */}
                      {selectedOption?.value === opt.value && (
                        <span style={{
                          marginLeft: 'auto',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--gold)',
                          boxShadow: '0 0 8px var(--gold)'
                        }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
