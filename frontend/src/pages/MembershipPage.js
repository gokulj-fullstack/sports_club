import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitText from '../components/SplitText';

const plans = [
  { name: 'GYM AC', price: '₹6,000', period: '/year', popular: false, features: ['Cardio & Strength Machines', 'AC Environment', 'Personal Training Available', '5AM – 10PM Access', 'Towel Service'], cta: 'Get Started' },
  { name: 'GYM NON-AC', price: '₹4,500', period: '/year', popular: false, features: ['Strength Training Machines', 'Non-AC Facility', 'Personal Training Available', '5AM – 10PM Access', 'Heavy Free Weights'], cta: 'Get Started' },
  { name: 'BADMINTON', price: '₹1,000', period: '/month', popular: false, features: ['1 Hour Court Access Per Day', '3 Synthetic Courts', 'Equipment Rental Discounts', 'Coaching Available', '5AM – 11PM Access', 'Priority Booking'], cta: 'Get Started' },
  { name: 'TOTAL MEMBERSHIP', price: '₹3,000', period: '/month', popular: true, features: ['Full Gym Access (AC & Non-AC)', 'Unlimited Badminton Courts', 'Turf Bookings (Special Rates)', 'Priority Reservations', 'Guest Passes (2/month)', 'Personal Coaching Sessions', 'Nutrition Consultation'], cta: 'Contact Us' },
];

const MembershipPage = () => (
  <>
    {/* HERO */}
    <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      <div className="bg-blob bg-blob-gold" style={{ width: '420px', height: '420px', top: '-20%', right: '-10%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">Pricing Plans</div>
        <h1 className="section-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <SplitText text="CHOOSE YOUR" tag="span" delay={30} duration={0.6} textAlign="left" />
          <SplitText text="MEMBERSHIP" tag="span" className="gold-text" delay={30} duration={0.6} textAlign="left" />
        </h1>
        <p style={{ color: 'var(--text-sub)', maxWidth: '500px', lineHeight: 1.8, marginTop: '1rem' }}>Flexible plans built around your goals. No hidden fees, no long lock-ins. Train on your terms at Padappai's top sports club.</p>
      </div>
    </section>

    {/* PLANS */}
    <section style={{ padding: '5rem 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }} whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
              style={{ background: plan.popular ? 'linear-gradient(145deg, var(--gold-dim), var(--bg-alt))' : 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: plan.popular ? '1px solid var(--gold)' : '1px solid var(--border)', padding: '2.5rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {plan.popular && <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'var(--gold)', color: 'var(--text)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', padding: '0.3rem 0.8rem', textTransform: 'uppercase' }}>POPULAR</div>}
              {plan.popular && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />}
              <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.3em', color: plan.popular ? 'var(--gold)' : 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'Bebas Neue', fontSize: '3.5rem', color: 'var(--text)', lineHeight: 1 }}>{plan.price}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{plan.period}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: plan.popular ? 'rgba(201,168,76,0.15)' : 'var(--border-sub)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: plan.popular ? 'var(--gold)' : '#555', fontSize: '0.6rem' }}>✓</span>
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'var(--text-sub)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to={plan.cta === 'Contact Us' ? '/contact' : '/book'} style={{ textDecoration: 'none', marginTop: 'auto' }}>
                <button style={{ width: '100%', padding: '0.9rem', background: plan.popular ? 'var(--gold)' : 'transparent', color: plan.popular ? 'var(--bg)' : 'var(--gold)', border: plan.popular ? 'none' : '1px solid rgba(201,168,76,0.4)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { if (!plan.popular) e.target.style.background = 'rgba(201,168,76,0.1)'; }}
                  onMouseLeave={e => { if (!plan.popular) e.target.style.background = 'transparent'; }}>
                  {plan.cta} →
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Walk-in rates */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: '4rem', padding: '3rem', background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid var(--border)' }}>
          <div className="section-label">Walk-in & Per-Session Rates</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '2rem' }}>NO COMMITMENT? <span className="gold-text">NO PROBLEM</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: 'Badminton Court', price: '₹300', per: 'per hour', icon: '🏸', note: 'All synthetic courts' },
              { title: 'Turf (Weekday)', price: '₹700', per: 'per session', icon: '⚽', note: 'Mon–Fri' },
              { title: 'Turf (Weekend)', price: '₹1,000', per: 'per session', icon: '🌙', note: 'Sat–Sun' },
              { title: 'Gym Day Pass', price: 'Ask Us', per: 'per day', icon: '🏋️', note: 'Call +91 90807 03491' },
            ].map((rate, i) => (
              <motion.div key={i} className="glass-premium" whileHover={{ y: -5, rotateX: 2, rotateY: -2 }} style={{ padding: '1.5rem', textAlign: 'center', transformStyle: 'preserve-3d' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{rate.icon}</div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--text-sub)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{rate.title}</div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: 'var(--gold)', lineHeight: 1 }}>{rate.price}</div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{rate.per}</div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', color: 'var(--text-sub)', marginTop: '0.3rem' }}>{rate.note}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: '4rem' }}>
          <div className="section-label">Common Questions</div>
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>MEMBERSHIP <span className="gold-text">FAQ</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              { q: 'Can I pause my membership?', a: 'Yes, you can pause your membership for up to 30 days per year with valid reason. Contact us at least 3 days before your billing date.' },
              { q: 'Are there joining fees?', a: 'No joining fees. You only pay the monthly membership rate — nothing else at signup.' },
              { q: 'Can I use both AC and Non-AC gym?', a: 'Total Membership gives you access to both. Individual gym plans are tied to the specific floor type.' },
              { q: 'Is the badminton membership unlimited?', a: 'Yes — once you have a badminton monthly plan, you can book any of the 3 synthetic courts as many times as you like, subject to availability.' },
              { q: 'Do you offer student discounts?', a: 'Contact us directly to discuss student pricing. We offer special rates for school and college students.' },
              { q: 'Can I bring a guest?', a: 'Total Membership includes 2 guest passes per month. Other plans allow guest entry at walk-in rates.' },
            ].map((item, i) => (
              <motion.div key={i} className="glass-premium" whileHover={{ y: -4 }} style={{ padding: '1.5rem' }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '1rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{item.q}</div>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.85rem', lineHeight: 1.65 }}>{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ marginTop: '3rem', padding: '2.5rem', background: 'linear-gradient(135deg, var(--gold-dim), var(--bg-alt))', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--text)', letterSpacing: '0.03em' }}>READY TO JOIN?</div>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Visit the club or book online and a team member will get back to you.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ textDecoration: 'none' }}><button className="btn-primary">Contact Us →</button></Link>
            <a href="https://wa.me/919080703491" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-outline" style={{ borderColor: '#25d366', color: '#25d366' }}>💬 WhatsApp</button>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  </>
);

export default MembershipPage;
