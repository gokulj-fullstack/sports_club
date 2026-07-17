import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FacilityCard = ({ facility, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const icons = { gym: '🏋️', turf: '⚽', badminton: '🏸' };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))',
        border: '1px solid rgba(201,168,76,0.15)',
        padding: 'clamp(1.5rem, 5vw, 2.5rem)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Gold accent line on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
      }} />

      <div style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1.2rem' }}>{icons[facility.id] || '🏃'}</div>

      <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(1.2rem, 4vw, 2rem)', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>
        {facility.name}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        {facility.description}
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ padding: '0.3rem 0.8rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <span style={{ fontFamily: 'Rajdhani', fontSize: 'clamp(0.65rem, 2vw, 0.75rem)', letterSpacing: '0.1em', color: 'var(--gold)', textTransform: 'uppercase' }}>{facility.price}</span>
        </div>
        <div style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-sub)' }}>
          <span style={{ fontFamily: 'Rajdhani', fontSize: 'clamp(0.65rem, 2vw, 0.75rem)', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{facility.hours}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {(facility.features || []).map((feature, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '5px', height: '5px', background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Inter', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: 'var(--text-sub)' }}>{feature}</span>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: '-30px', right: '-30px',
        width: '120px', height: '120px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06), transparent)',
        borderRadius: '50%',
      }} />
    </motion.div>
  );
};

const Facilities = ({ facilities }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const defaultFacilities = [
    { id: 'badminton', name: '3 Badminton Courts', description: 'Three professional badminton courts - One old court and two new courts with wooden sprung flooring. Ideal for club play, coaching, and tournaments.', price: '₹300/hour', hours: '5AM – 11PM', features: ['1 Old Court', '2 New Courts', 'Wooden Flooring', 'Professional Nets', 'Equipment Rental'] },
    { id: 'turf', name: 'Football Turf', description: 'Professional synthetic turf for football & cricket. Perfect for tournaments, practice, and casual matches.', price: '₹700 (Weekdays) / ₹1000 (Weekends)', hours: '6AM – 11PM', features: ['FIFA Quality Turf', 'Floodlights', 'Changing Rooms', 'Score Board'] },
    { id: 'gym', name: 'Fitness Gym', description: 'State-of-the-art equipment with certified personal trainers. Choose between AC or Non-AC facilities.', price: 'AC: ₹6000/yr | Non-AC: ₹4500/yr | Monthly: ₹3000', hours: '5AM – 10PM', features: ['AC: Cardio & Strength', 'Non-AC: Strength Only', 'Free Weights', 'Personal Training'] },
  ];

  const data = facilities?.length ? facilities : defaultFacilities;

  return (
    <section id="facilities" style={{ padding: '10rem 0 6rem', background: 'var(--bg-alt)' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">
            WORLD-CLASS<br /><span className="gold-text">FACILITIES</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '500px', lineHeight: 1.8, marginTop: '1rem' }}>
            Three premium sporting facilities designed for performance. Whether you're training solo or competing with friends, we have the perfect space.
          </p>
        </motion.div>

        <div id="facilities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(1rem, 3vw, 1.5rem)' }}>
          {data.map((f, i) => <FacilityCard key={f.id} facility={f} index={i} />)}
        </div>
        <style>{`
          @media (max-width: 768px) {
            #facilities-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Facilities;
