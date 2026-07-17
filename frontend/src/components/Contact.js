import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'https://sports-club-2i4r.onrender.com/api';

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact/`, form);
      setStatus({ type: 'success', msg: "✓ Message sent! King Sports Club will get back to you within 24 hours." });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus({ type: 'error', msg: '✗ Failed to send. Please call us at +91 90807 03491.' });
    }
    setLoading(false);
    setTimeout(() => setStatus(null), 6000);
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    color: 'var(--text)', fontFamily: 'Inter', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.2s', borderRadius: 0,
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">CONTACT <span className="gold-text">US</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <div style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.15)', padding: '2.5rem' }}>
              {status && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ padding: '1rem', marginBottom: '1.5rem', background: status.type === 'success' ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)', border: `1px solid ${status.type === 'success' ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)'}`, color: status.type === 'success' ? '#81c784' : '#e57373', fontFamily: 'Rajdhani', fontWeight: 600 }}>
                  {status.msg}
                </motion.div>
              )}
              <form onSubmit={handleSubmit}>
                {[
                  { name: 'name', label: 'Full Name', type: 'text', required: true },
                  { name: 'email', label: 'Email Address', type: 'email', required: true },
                  { name: 'phone', label: 'Phone Number', type: 'text', required: false },
                ].map(field => (
                  <div key={field.name} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{field.label}</label>
                    <input name={field.name} type={field.type} value={form[field.name]} onChange={handleChange} required={field.required} style={inputStyle}
                      onFocus={e => e.target.style.borderColor='rgba(201,168,76,0.5)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                  </div>
                ))}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor='rgba(201,168,76,0.5)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                </div>
                <button type="submit" disabled={loading} style={{
                  width: '100%', padding: '1rem', background: 'var(--gold)', color: 'var(--on-gold)',
                  border: 'none', fontFamily: 'Rajdhani', fontWeight: 700,
                  fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info + Map */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            {/* Google Maps embed placeholder — client replaces src with real embed */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '1rem', letterSpacing: '0.05em' }}>FIND US</h3>
              <div style={{ width: '100%', height: '220px', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden', position: 'relative' }}>
                <iframe
                  title="King Sports Club Location"
                  src="https://maps.google.com/maps?q=12.8872815,80.023538&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen loading="lazy"
                />
              </div>
              <a href="https://maps.app.goo.gl/JDKTpVQNLLFjgsjc9" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', marginTop: '0.75rem', color: 'var(--gold)', fontSize: '0.85rem', fontFamily: 'Rajdhani', fontWeight: 600, letterSpacing: '0.05em', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color='var(--text)'} onMouseLeave={e => e.target.style.color='var(--gold)'}>
                Get Directions on Google Maps ↗
              </a>
            </div>

            {/* Contact info grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { icon: '📍', label: 'Address', value: '6/518, Bazzar Road\nPadappai, Chennai' },
                { icon: '📞', label: 'Call Us', value: '+91 90807 03491' },
                { icon: '✉️', label: 'Email', value: 'jgokul823@gmail.com' },
                { icon: '⏰', label: 'Hours', value: 'Daily 5AM – 11PM' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-sub)', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{item.label}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'var(--text-sub)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/919080703491"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                marginTop: '1rem', padding: '1rem',
                background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)',
                color: '#25d366', fontFamily: 'Rajdhani', fontWeight: 700,
                fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all 0.3s',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>💬</span>
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#contact .container>div{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
};

export default Contact;
