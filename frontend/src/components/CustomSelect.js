import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomSelect = ({ name, value, onChange, options, placeholder, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedOption = options.find(opt => opt.value === value || opt.value === Number(value));

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      {/* Select Box Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '0.9rem 1rem',
          background: 'var(--bg-card)',
          border: isOpen ? '1px solid var(--gold)' : '1px solid var(--border)',
          color: selectedOption ? 'var(--text)' : 'var(--text-muted)',
          fontFamily: 'Inter',
          fontSize: '0.9rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'border-color 0.2s, background-color 0.2s',
          ...style,
        }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        {/* Chevron Icon */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            display: 'inline-block',
            marginLeft: '0.5rem',
          }}
        >
          ▼
        </motion.span>
      </div>

      {/* Options List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 999,
              marginTop: '4px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              maxHeight: '240px',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  padding: '0.75rem 1rem',
                  fontFamily: 'Inter',
                  fontSize: '0.9rem',
                  color: (opt.value === value || opt.value === Number(value)) ? 'var(--gold)' : 'var(--text)',
                  background: (opt.value === value || opt.value === Number(value)) ? 'var(--bg-alt)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, color 0.2s',
                  borderBottom: '1px solid var(--border-sub)',
                }}
                onMouseEnter={(e) => {
                  if (opt.value !== value && opt.value !== Number(value)) {
                    e.target.style.background = 'var(--bg-alt)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (opt.value !== value && opt.value !== Number(value)) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
