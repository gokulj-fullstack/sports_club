import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import AerialCourtIllustration from './AerialCourtIllustration';
import CustomSelect from './CustomSelect';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const BookingForm = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', phone: '', facility: '', date: '', time_slot: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const timeSlots = ['5:00 AM','6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM'];
  const facilities = [
    { value: 'gym', label: 'Fitness Gym' },
    { value: 'turf', label: 'Football Turf' },
    { value: 'badminton_1', label: 'Badminton Court 1' },
    { value: 'badminton_2', label: 'Badminton Court 2' },
    { value: 'badminton_3', label: 'Badminton Court 3' },
  ];

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    let facilityValue = form.facility;
    if (facilityValue === 'turf') {
      const dateObj = new Date(form.date);
      const day = dateObj.getDay();
      const isWeekend = (day === 0 || day === 6);
      facilityValue = isWeekend ? 'turf_weekend' : 'turf_weekday';
    }

    try {
      await axios.post(`${API}/bookings/`, {
        ...form,
        facility: facilityValue
      });
      setStatus({ type: 'success', msg: "✓ Booking confirmed! King Sports Club will contact you shortly." });
      setForm({ name: '', email: '', phone: '', facility: '', date: '', time_slot: '', message: '' });
    } catch {
      setStatus({ type: 'error', msg: '✗ Something went wrong. Please call us at +91 90807 03491.' });
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
  const labelStyle = {
    display: 'block', fontFamily: 'Rajdhani', fontWeight: 600,
    fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)',
    textTransform: 'uppercase', marginBottom: '0.5rem',
  };

  return (
    <section id="book-now" style={{ padding: '6rem 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left info */}
          <motion.div ref={ref} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="section-label">Reserve Your Spot</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>BOOK A <span className="gold-text">SESSION</span></h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              Secure your slot in advance. Our courts and gym are in high demand — book now to avoid missing out.
            </p>
            {[
              { icon: '📍', title: 'Address', info: '6/518, Bazzar Road, Padappai, Chennai' },
              { icon: '📞', title: 'Phone', info: '+91 90807 03491' },
              { icon: '✉️', title: 'Email', info: 'jgokul823@gmail.com' },
              { icon: '⏰', title: 'Open', info: 'Daily 5:00 AM – 11:00 PM' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 * i + 0.3 }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ width: '36px', height: '36px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase' }}>{item.title}</div>
                  <div style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginTop: '0.1rem' }}>{item.info}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Booking form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.15)', padding: '2.5rem' }}>
              <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', marginBottom: '2rem' }} />

              {status && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ padding: '1rem', marginBottom: '1.5rem', background: status.type === 'success' ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)', border: `1px solid ${status.type === 'success' ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)'}`, color: status.type === 'success' ? '#81c784' : '#e57373', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.9rem' }}>
                  {status.msg}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={inputStyle}
                      onFocus={e => e.target.style.borderColor='rgba(201,168,76,0.5)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" style={inputStyle}
                      onFocus={e => e.target.style.borderColor='rgba(201,168,76,0.5)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor='rgba(201,168,76,0.5)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Facility</label>
                  <CustomSelect
                    name="facility"
                    value={form.facility}
                    onChange={handleChange}
                    placeholder="Select a facility"
                    options={facilities}
                  />
                </div>

                {/* Interactive Court Illustration */}
                {['badminton_1', 'badminton_2', 'badminton_3'].includes(form.facility) && (
                  <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      Select Court Visually:
                    </div>
                    <AerialCourtIllustration
                      selectedCourt={form.facility}
                      onSelectCourt={(courtId) => setForm({ ...form, facility: courtId })}
                    />
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Date</label>
                    <input name="date" type="date" value={form.date} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => e.target.style.borderColor='rgba(201,168,76,0.5)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Time Slot</label>
                    <CustomSelect
                      name="time_slot"
                      value={form.time_slot}
                      onChange={handleChange}
                      placeholder="Select time"
                      options={timeSlots.map(t => ({
                        value: t,
                        label: t
                      }))}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Message (optional)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any special requirements..." style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor='rgba(201,168,76,0.5)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                </div>
                <button type="submit" disabled={loading} style={{
                  width: '100%', padding: '1rem',
                  background: loading ? 'rgba(201,168,76,0.5)' : 'var(--gold)',
                  color: 'var(--on-gold)', border: 'none', fontFamily: 'Rajdhani', fontWeight: 700,
                  fontSize: '0.95rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', transition: 'all 0.3s',
                }}>
                  {loading ? 'Confirming...' : 'Confirm Booking →'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#book-now .container>div{grid-template-columns:1fr!important;gap:2rem!important;}}`}</style>
    </section>
  );
};

export default BookingForm;
