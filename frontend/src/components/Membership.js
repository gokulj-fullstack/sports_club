import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const plans = [
  {
    name: 'GYM AC', price: '₹6,000', period: '/year', popular: false,
    features: ['Cardio & Strength Machines', 'AC Environment', 'Personal Training Available', '5AM – 10PM Access'],
    cta: 'Get Started',
  },
  {
    name: 'GYM NON-AC', price: '₹4,500', period: '/year', popular: false,
    features: ['Strength Training Machines', 'Non-AC Facility', 'Personal Training Available', '5AM – 10PM Access'],
    cta: 'Get Started',
  },
  {
    name: 'BADMINTON', price: '₹1,000', period: '/month', popular: false,
    features: ['1 Hour Court Access Per Day', '3 Premium Courts (1 Old, 2 New)', 'Equipment Rental', 'Coaching Available', '5AM – 11PM Access'],
    cta: 'Get Started',
  },
  {
    name: 'TOTAL MEMBERSHIP', price: '₹3,000', period: '/month', popular: true,
    features: ['Full Gym Access (AC & Non-AC)', 'Unlimited Badminton Courts', 'Turf Bookings (Special Rates)', 'Priority Reservations', 'Guest Passes', 'Coaching & Training'],
    cta: 'Contact Us',
  },
];

const Membership = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <section id="membership" style={{ padding: '6rem 0', background: 'var(--bg)' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">Pricing Plans</div>
          <h2 className="section-title">CHOOSE YOUR <span className="gold-text">MEMBERSHIP</span></h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '480px', margin: '1rem auto 0', lineHeight: 1.8 }}>
            Flexible plans built around your goals. No hidden fees, no lock-ins.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(1rem, 3vw, 1.5rem)' }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
              style={{
                background: plan.popular ? 'linear-gradient(145deg, var(--gold-dim), var(--bg-card))' : 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))',
                border: plan.popular ? '1px solid rgba(201,168,76,0.5)' : '1px solid var(--border-sub)',
                padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: '1.2rem', right: '1.2rem',
                  background: 'var(--gold)', color: 'var(--on-gold)',
                  fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 'clamp(0.55rem, 2vw, 0.65rem)',
                  letterSpacing: '0.15em', padding: '0.3rem 0.8rem', textTransform: 'uppercase',
                }}>POPULAR</div>
              )}
              {plan.popular && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
              )}

              <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 'clamp(0.65rem, 2vw, 0.75rem)', letterSpacing: '0.3em', color: plan.popular ? 'var(--gold)' : 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                {plan.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', color: 'var(--text)', lineHeight: 1 }}>{plan.price}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>{plan.period}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: plan.popular ? 'rgba(201,168,76,0.15)' : 'var(--border-sub)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: plan.popular ? 'var(--gold)' : '#555', fontSize: '0.6rem' }}>✓</span>
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: 'var(--text-sub)' }}>{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo('book-now')}
                style={{
                  width: '100%', padding: '0.9rem',
                  marginTop: 'auto',
                  background: plan.popular ? 'var(--gold)' : 'transparent',
                  color: plan.popular ? 'var(--bg)' : 'var(--gold)',
                  border: plan.popular ? 'none' : '1px solid rgba(201,168,76,0.4)',
                  fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { if (!plan.popular) { e.target.style.background = 'rgba(201,168,76,0.1)'; } }}
                onMouseLeave={e => { if (!plan.popular) { e.target.style.background = 'transparent'; } }}
              >
                {plan.cta} →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;
