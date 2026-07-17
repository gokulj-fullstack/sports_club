import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import SplitText from '../components/SplitText';

const API = process.env.REACT_APP_API_URL || 'https://sports-club-2i4r.onrender.com/api';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const payload = { ...form };

    try {
      await axios.post(`${API}/contact/`, payload);
      setStatus({ type: 'success', msg: '✓ Your message has been sent successfully.' });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus({ type: 'error', msg: '✗ Failed to send your message. Please try again or call us directly.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 6000);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    color: 'var(--text)', fontFamily: 'Inter', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.25s ease, box-shadow 0.25s ease', borderRadius: '6px',
  };
  const focusIn = e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px var(--gold-dim)'; };
  const focusOut = e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; };

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg)', borderBottom: '1px solid rgba(201,168,76,0.12)', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-blob bg-blob-gold" style={{ width: '360px', height: '360px', top: '-20%', left: '20%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label">Get In Touch</div>
          <h1 className="section-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <SplitText text="CONTACT" tag="span" delay={30} duration={0.6} textAlign="left" />
            <SplitText text="US" tag="span" className="gold-text" delay={30} duration={0.6} textAlign="left" />
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.8, marginTop: '1rem' }}>Have a question, want to arrange a tour, or need info about membership? We'd love to hear from you. Our team typically responds within 24 hours.</p>

          {/* Quick Contact Chips */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <a href="tel:+919080703491" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.82rem', color: 'var(--gold)', letterSpacing: '0.05em' }}>
              📞 +91 90807 03491
            </a>
            <a href="https://wa.me/919080703491" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.82rem', color: '#25d366', letterSpacing: '0.05em' }}>
              💬 WhatsApp Us
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-sub)', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              ⏰ Open Daily 5AM – 11PM
            </div>
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section style={{ padding: '5rem 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>

            {/* FORM */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="glass-premium" style={{ padding: '2.5rem' }}>
                <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', marginBottom: '2rem' }} />
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: 'var(--text)', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>SEND US A MESSAGE</h3>
                {status && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ padding: '1rem', marginBottom: '1.5rem', background: status.type === 'success' ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)', border: `1px solid ${status.type === 'success' ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)'}`, color: status.type === 'success' ? '#81c784' : '#e57373', fontFamily: 'Rajdhani', fontWeight: 600 }}>
                    {status.msg}
                  </motion.div>
                )}
                <form onSubmit={handleSubmit}>
                  {[{ name: 'name', label: 'Full Name', type: 'text', req: true }, { name: 'email', label: 'Email Address', type: 'email', req: true }, { name: 'phone', label: 'Phone Number', type: 'text', req: false }].map(f => (
                    <div key={f.name} style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{f.label}</label>
                      <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} required={f.req} style={inputStyle}
                        onFocus={focusIn} onBlur={focusOut} />
                    </div>
                  ))}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={4} style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={focusIn} onBlur={focusOut} />
                  </div>
                  <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', background: loading ? 'rgba(37,211,102,0.6)' : '#25d366', color: '#fff', border: 'none', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', transition: 'background 0.2s' }}>
                    {loading ? '⏳ Opening WhatsApp...' : '💬 Send via WhatsApp'}
                  </button>
                  <p style={{ marginTop: '0.6rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'Rajdhani', letterSpacing: '0.08em', textAlign: 'center' }}>
                    Opens WhatsApp with your message pre-filled — you just tap Send.
                  </p>
                </form>
              </div>
            </motion.div>

            {/* INFO PANEL */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '1rem', letterSpacing: '0.05em' }}>FIND US</h3>
                <div style={{ width: '100%', height: '220px', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
                  <iframe title="King Sports Club Location"
                    src="https://maps.google.com/maps?q=12.8872815,80.023538&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen loading="lazy" />
                </div>
                <a href="https://maps.app.goo.gl/JDKTpVQNLLFjgsjc9" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', marginTop: '0.75rem', color: 'var(--gold)', fontSize: '0.85rem', fontFamily: 'Rajdhani', fontWeight: 600, letterSpacing: '0.05em', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color='var(--text)'} onMouseLeave={e => e.target.style.color='var(--gold)'}>
                  Get Directions on Google Maps ↗
                </a>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { icon: '📍', label: 'Address', value: '6/518, Bazzar Road\nPadappai, Chennai' },
                  { icon: '📞', label: 'Call Us', value: '+91 90807 03491' },
                  { icon: '✉️', label: 'Email', value: 'jgokul823@gmail.com' },
                  { icon: '⏰', label: 'Hours', value: 'Daily 5AM – 11PM' },
                ].map((item, i) => (
                  <motion.div key={i} className="glass-premium" whileHover={{ y: -4 }} style={{ padding: '1.25rem' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                    <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{item.label}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'var(--text-sub)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{item.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* How to find courts */}
              <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>🏸 Finding the Courts</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.65 }}>
                  Courts 1 & 2 are on the <span style={{ color: 'var(--text)' }}>left side</span> of Bazzar Road entrance.
                  Court 3 is on the <span style={{ color: 'var(--text)' }}>right side</span>, across the small street.
                  Look for green synthetic courts visible from the road.
                </p>
              </div>

              <motion.a href="https://wa.me/919080703491" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#25d366', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                <span style={{ fontSize: '1.2rem' }}>💬</span> Chat on WhatsApp
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOCIAL + VISIT INFO */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-alt)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div className="container">
          <div className="section-label">Visit Us</div>
          <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>WHAT TO <span className="gold-text">EXPECT</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: '🚶', title: 'Walk-in Welcome', desc: 'No appointment needed for gym walk-ins. Courts and turf require a quick advance booking to guarantee your slot.' },
              { icon: '🧳', title: 'What to Bring', desc: 'Non-marking sports shoes, sports attire, and a water bottle.' },
              { icon: '🏸', title: 'Equipment on Site', desc: 'Rackets, shuttlecocks, and grip tape available to rent or purchase at the front desk.' },
              { icon: '🚗', title: 'Getting Here', desc: '6/518 Bazzar Road, Padappai. Auto rickshaws from Padappai bus stop drop you right at the entrance.' },
            ].map((item, i) => (
              <motion.div key={i} className="glass-premium" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                style={{ padding: '1.5rem', transformStyle: 'preserve-3d' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>{item.icon}</div>
                <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.1rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.4rem' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`@media(max-width:768px){ section .container>div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:2rem!important;} }`}</style>
    </>
  );
};

export default ContactPage;
