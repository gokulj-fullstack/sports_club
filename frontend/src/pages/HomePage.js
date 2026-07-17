import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const HomePage = () => {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* FEATURES STRIP */}
      <section className="ksc-section-light" style={{ padding: '6rem 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '4rem' }}>
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">WORLD-CLASS <span className="gold-text">FACILITIES</span></h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🏋️', title: 'Fitness Gym', desc: 'AC & Non-AC gym with state-of-the-art equipment and certified personal trainers. Machines, free weights, and cardio zones.', price: '₹3,000/mo | ₹4,500–₹6,000/yr', link: '/gym' },
              { icon: '⚽', title: 'Football Turf', desc: 'Professional synthetic turf with floodlights for evening matches, tournaments, and corporate events.', price: '₹700 – ₹1000/hr', link: '/turf' },
              { icon: '🏸', title: '3 Synthetic Courts', desc: 'All three courts feature ITF-grade synthetic surface — two on the left block, one on the right. Street separates the blocks.', price: '₹300/hr', link: '/badminton' },
            ].map((f, i) => (
              <motion.div key={i} className="ksc-feature-card" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.2rem' }}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="ksc-price-badge"><span>{f.price}</span></div>
                <br/>
                <Link to={f.link} style={{ textDecoration: 'none' }}>
                  <button className="ksc-learn-more">Learn More →</button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY KING SPORTS SECTION */}
      <section className="ksc-section-dark" style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-blob bg-blob-gold" style={{ width: '420px', height: '420px', top: '-10%', left: '-8%' }} />
        <div className="bg-blob bg-blob-blue" style={{ width: '360px', height: '360px', bottom: '-15%', right: '-6%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '3rem' }}>
            <div className="section-label">Our Edge</div>
            <h2 className="section-title">WHY <span className="gold-text">KING SPORTS?</span></h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🟢', title: 'All Synthetic', desc: 'Every badminton court uses premium ITF-approved synthetic surface for the best play experience.' },
              { icon: '🌙', title: 'Late Hours', desc: 'Open till 11PM every day — train after work, beat the crowds, play under the lights.' },
              { icon: '💲', title: 'Affordable', desc: 'Courts from ₹300/hr, gym from ₹800/month. No hidden fees, no long lock-ins.' },
              { icon: '📍', title: 'Central Location', desc: 'Easily accessible at Bazzar Road, Padappai — close to residential areas and main roads.' },
              { icon: '👩‍🏫', title: 'Expert Coaches', desc: '18+ certified trainers and coaches for gym, badminton, and football training.' },
              { icon: '🚻', title: 'Unisex Gym Floor', desc: 'Fully unisex gym layout offering safe, inclusive, and professional training environments for everyone.' },
              { icon: '🚿', title: 'Clean Amenities', desc: 'Dedicated changing rooms, secure locker cabinets, clean showers, and fresh water stations.' },
              { icon: '⚡', title: 'Power Backup', desc: '100% power backup support ensuring uninterrupted games under the floodlights and air conditioning.' },
              { icon: '🏆', title: 'Tournament Hosting', desc: 'We host local badminton leagues, football tournaments, and corporate sports events.' },
            ].map((item, i) => (
              <motion.div key={i} className="ksc-why-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="ksc-section-light" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-label">Member Stories</div>
          <h2 className="section-title" style={{ marginBottom: '3rem' }}>WHAT MEMBERS <span className="gold-text">SAY</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { name: 'Ravi K.', role: 'Badminton Player', text: 'The synthetic courts are excellent — soft on the knees and consistent bounce every single time. Court 3 across the street is my favourite for morning sessions.' },
              { name: 'Priya S.', role: 'Gym Member', text: 'The AC gym is properly cool even in peak Chennai summer. Equipment is well-maintained and the trainers know their stuff. Worth every rupee at ₹1000/month.' },
              { name: 'Arjun T.', role: 'Football Team Captain', text: 'We book the turf every Sunday. Floodlights are bright, turf surface is top quality, and management is super cooperative for group bookings.' },
            ].map((t, i) => (
              <motion.div key={i} className="ksc-testimonial-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}>
                <div className="ksc-quote-mark">"</div>
                <p>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="ksc-avatar">{t.name[0]}</div>
                  <div>
                    <div className="ksc-avatar-name">{t.name}</div>
                    <div className="ksc-avatar-role">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="ksc-cta-band bg-mesh" style={{ padding: '5rem 0' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2>READY TO START YOUR <span className="gold-text">JOURNEY?</span></h2>
            <p>Join 500+ members already training at King Sports Club, Padappai.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/book"><button className="btn-primary">Book Session ↗</button></Link>
            <Link to="/membership"><button className="btn-outline">View Plans</button></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
