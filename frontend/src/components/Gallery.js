import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const galleryItems = [
  { id: 1, tag: 'GYM', title: 'Weight Training Zone', color: '#1a1200', accent: 'var(--gold)', icon: '🏋️' },
  { id: 2, tag: 'GYM', title: 'Cardio Floor', color: '#0d1a0d', accent: '#4caf50', icon: '🏃' },
  { id: 3, tag: 'TURF', title: 'Main Football Field', color: '#0d1a0d', accent: '#4caf50', icon: '⚽' },
  { id: 4, tag: 'BADMINTON', title: 'Court 1 – Singles', color: '#0a0d1a', accent: '#4a9eff', icon: '🏸' },
  { id: 5, tag: 'BADMINTON', title: 'Court 2 – Doubles', color: '#0a0d1a', accent: '#4a9eff', icon: '🏸' },
  { id: 6, tag: 'TURF', title: 'Night Matches', color: '#1a0a0a', accent: '#ff6b35', icon: '🌙' },
];

const Gallery = () => {
  const [filter, setFilter] = useState('ALL');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const filters = ['ALL', 'GYM', 'TURF', 'BADMINTON'];
  const filtered = filter === 'ALL' ? galleryItems : galleryItems.filter(i => i.tag === filter);

  return (
    <section id="gallery" style={{ padding: '6rem 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '3rem' }}>
          <div className="section-label">Visual Tour</div>
          <h2 className="section-title">OUR <span className="gold-text">SPACE</span></h2>
        </motion.div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '0.5rem 1.5rem', background: filter === f ? 'var(--gold)' : 'transparent',
              color: filter === f ? 'var(--bg)' : 'var(--text-muted)', border: '1px solid',
              borderColor: filter === f ? 'var(--gold)' : 'var(--border)',
              fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.8rem',
              letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              {f}
            </button>
          ))}
        </div>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  height: '220px', position: 'relative', overflow: 'hidden',
                  background: item.color, border: '1px solid var(--border-sub)',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: `radial-gradient(circle at center, ${item.accent}22, transparent 70%)`,
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{item.icon}</div>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.3em', color: item.accent, textTransform: 'uppercase', marginBottom: '0.3rem' }}>{item.tag}</div>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.3rem', color: 'var(--text)', letterSpacing: '0.05em' }}>{item.title}</div>
                </div>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                }} />
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0,
                  background: 'rgba(201,168,76,0.05)',
                  transition: 'opacity 0.3s',
                }} className="hover-overlay" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1.5rem', fontFamily: 'Rajdhani', letterSpacing: '0.1em' }}>
          * Replace placeholder cards with actual facility photos
        </p>
      </div>
    </section>
  );
};

export default Gallery;
