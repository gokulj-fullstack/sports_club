import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';
import SplitText from '../components/SplitText';
import AerialCourtIllustration from '../components/AerialCourtIllustration';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Razorpay integration
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const FACILITY_PRICES_DEFAULT = {
  gym_ac_monthly: { label: 'Fitness Gym (AC) - Monthly', price: 0, unit: 'month', desc: 'Monthly membership' },
  gym_ac_quarterly: { label: 'Fitness Gym (AC) - Quarterly', price: 0, unit: 'quarter', desc: 'Quarterly membership' },
  gym_ac_halfyearly: { label: 'Fitness Gym (AC) - Half-Yearly', price: 0, unit: 'half-year', desc: 'Half-yearly membership' },
  gym_ac_yearly: { label: 'Fitness Gym (AC) - Yearly', price: 0, unit: 'year', desc: 'Yearly membership' },
  gym_nonac_monthly: { label: 'Fitness Gym (Non-AC) - Monthly', price: 0, unit: 'month', desc: 'Monthly membership' },
  gym_nonac_quarterly: { label: 'Fitness Gym (Non-AC) - Quarterly', price: 0, unit: 'quarter', desc: 'Quarterly membership' },
  gym_nonac_halfyearly: { label: 'Fitness Gym (Non-AC) - Half-Yearly', price: 0, unit: 'half-year', desc: 'Half-yearly membership' },
  gym_nonac_yearly: { label: 'Fitness Gym (Non-AC) - Yearly', price: 0, unit: 'year', desc: 'Yearly membership' },
  total_membership: { label: 'Total Membership (Gym + Badminton)', price: 0, unit: 'month', desc: 'Full facility access' },
  badminton_1: { label: 'Badminton Court 1 (New)', price: 0, unit: 'hour', desc: 'Per hour' },
  badminton_2: { label: 'Badminton Court 2 (New)', price: 0, unit: 'hour', desc: 'Per hour' },
  badminton_3: { label: 'Badminton Court 3 (Classic)', price: 0, unit: 'hour', desc: 'Per hour' },
  turf_weekday: { label: 'Football Turf (Weekday)', price: 0, unit: 'session', desc: 'Per session' },
  turf_weekend: { label: 'Football Turf (Weekend)', price: 0, unit: 'session', desc: 'Per session' },
};

const timeSlots = ['5:00 AM','6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM'];

const inputStyle = {
  width: '100%', padding: '0.9rem 1rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)',
  color: 'var(--text)', fontFamily: 'Inter', fontSize: '0.9rem',
  outline: 'none', transition: 'border-color 0.25s ease, box-shadow 0.25s ease', borderRadius: '6px',
};
const labelStyle = {
  display: 'block', fontFamily: 'Rajdhani', fontWeight: 600,
  fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)',
  textTransform: 'uppercase', marginBottom: '0.5rem',
};

const BookingPage = () => {
  const [step, setStep] = useState(1); // 1 = details, 2 = payment, 3 = success
  const [form, setForm] = useState({ name: '', email: '', phone: '', facility: '', date: '', time_slot: '', hours: 1, message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [facilityPrices, setFacilityPrices] = useState(FACILITY_PRICES_DEFAULT);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get(`${API}/pricing/`)
      .then(res => {
        const data = res.data;
        setFacilityPrices(prev => {
          const updated = { ...prev };
          Object.keys(data).forEach(key => {
            if (updated[key]) {
              updated[key].price = Number(data[key]);
            }
          });
          return updated;
        });
      })
      .catch(err => console.error("Error fetching prices:", err));
  }, []);

  useEffect(() => {
    if (location.state?.bookingData) {
      setForm(prev => ({ ...prev, ...location.state.bookingData }));
    }
  }, [location.state]);

  useEffect(() => {
    const storedName = localStorage.getItem('user_name');
    const storedEmail = localStorage.getItem('user_email');
    if (storedName || storedEmail) {
      setForm(prev => ({
        ...prev,
        name: prev.name || storedName || '',
        email: prev.email || storedEmail || '',
      }));
    }
  }, []);

  // Fetch booked slots whenever facility or date changes
  useEffect(() => {
    if (!form.facility || !form.date) { setBookedSlots([]); return; }
    let facilityKey = form.facility;
    if (facilityKey === 'turf') {
      const d = new Date(form.date); const day = d.getDay();
      facilityKey = (day === 0 || day === 6) ? 'turf_weekend' : 'turf_weekday';
    }
    setSlotsLoading(true);
    axios.get(`${API}/bookings/slots/?facility=${facilityKey}&date=${form.date}`)
      .then(res => setBookedSlots(res.data.booked_slots || []))
      .catch(() => setBookedSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [form.facility, form.date]);

  const getTurfPriceInfo = (dateStr) => {
    const weekdayPrice = facilityPrices.turf_weekday?.price || 0;
    const weekendPrice = facilityPrices.turf_weekend?.price || 0;
    if (!dateStr) return { price: weekdayPrice, label: `Football Turf (Weekday: ₹${weekdayPrice} / Weekend: ₹${weekendPrice})` };
    const dateObj = new Date(dateStr);
    const day = dateObj.getDay();
    const isWeekend = (day === 0 || day === 6);
    return isWeekend
      ? { price: weekendPrice, label: `Football Turf (Weekend) — ₹${weekendPrice}/session` }
      : { price: weekdayPrice, label: `Football Turf (Weekday) — ₹${weekdayPrice}/session` };
  };

  const getSelectedFacility = () => {
    if (form.facility === 'turf') {
      const turfPriceInfo = getTurfPriceInfo(form.date);
      return {
        label: turfPriceInfo.label.split(' — ')[0],
        price: turfPriceInfo.price,
        unit: 'session',
        desc: 'Per session'
      };
    }
    return facilityPrices[form.facility];
  };

  const selectedFacility = getSelectedFacility();
  const totalAmount = selectedFacility
    ? (selectedFacility.unit === 'hour' || form.facility === 'turf'
        ? selectedFacility.price * (parseInt(form.hours) || 1)
        : selectedFacility.price)
    : 0;

  const turfInfo = getTurfPriceInfo(form.date);

  const selectOptions = [
    { value: 'gym_ac_monthly', label: `Fitness Gym (AC) — Monthly — ₹${facilityPrices.gym_ac_monthly?.price || 0}/month` },
    { value: 'gym_ac_quarterly', label: `Fitness Gym (AC) — Quarterly — ₹${facilityPrices.gym_ac_quarterly?.price || 0}/quarter` },
    { value: 'gym_ac_halfyearly', label: `Fitness Gym (AC) — Half-Yearly — ₹${facilityPrices.gym_ac_halfyearly?.price || 0}/half-year` },
    { value: 'gym_ac_yearly', label: `Fitness Gym (AC) — Yearly — ₹${facilityPrices.gym_ac_yearly?.price || 0}/year` },
    { value: 'gym_nonac_monthly', label: `Fitness Gym (Non-AC) — Monthly — ₹${facilityPrices.gym_nonac_monthly?.price || 0}/month` },
    { value: 'gym_nonac_quarterly', label: `Fitness Gym (Non-AC) — Quarterly — ₹${facilityPrices.gym_nonac_quarterly?.price || 0}/quarter` },
    { value: 'gym_nonac_halfyearly', label: `Fitness Gym (Non-AC) — Half-Yearly — ₹${facilityPrices.gym_nonac_halfyearly?.price || 0}/half-year` },
    { value: 'gym_nonac_yearly', label: `Fitness Gym (Non-AC) — Yearly — ₹${facilityPrices.gym_nonac_yearly?.price || 0}/year` },
    { value: 'total_membership', label: `Total Membership (Gym + Badminton) — ₹${facilityPrices.total_membership.price}/month` },
    { value: 'badminton_1', label: `Badminton Court 1 (New) — ₹${facilityPrices.badminton_1.price}/hour` },
    { value: 'badminton_2', label: `Badminton Court 2 (New) — ₹${facilityPrices.badminton_2.price}/hour` },
    { value: 'badminton_3', label: `Badminton Court 3 (Classic) — ₹${facilityPrices.badminton_3.price}/hour` },
    { value: 'turf', label: turfInfo.label },
  ];

  const getPayload = (extra) => {
    let facilityValue = form.facility;
    if (facilityValue === 'turf') {
      const dateObj = new Date(form.date);
      const day = dateObj.getDay();
      const isWeekend = (day === 0 || day === 6);
      facilityValue = isWeekend ? 'turf_weekend' : 'turf_weekday';
    }
    return {
      ...form,
      facility: facilityValue,
      ...extra,
    };
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleDetails = e => {
    e.preventDefault();
    if (!localStorage.getItem('access_token')) {
      window.alert('Please login to continue booking.');
      localStorage.setItem('pending_booking', JSON.stringify(form));
      navigate('/login', { state: { returnTo: '/book', bookingData: form } });
      return;
    }
    setStep(2);
  };

  const handleRazorpay = async () => {
    setLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setStatus({ type: 'error', msg: 'Payment gateway failed to load. Please try again or call us.' });
      setLoading(false);
      return;
    }

    // In production: create order on backend → get order_id → pass to Razorpay
    // For demo: use test key and simulate
    const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_XXXXXXXXXXXXXXXX';

    const options = {
      key: RAZORPAY_KEY,
      amount: totalAmount * 100, // in paise
      currency: 'INR',
      name: 'King Sports Club',
      description: `${selectedFacility?.label} — ${form.date} ${form.time_slot}`,
      image: '',
      // order_id: <from backend>,
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        facility: form.facility,
        date: form.date,
        time_slot: form.time_slot,
      },
      theme: { color: 'var(--gold)' },
      handler: async (response) => {
        // Payment success — confirm booking
        try {
          await axios.post(`${API}/bookings/`, getPayload({
            payment_id: response.razorpay_payment_id,
            payment_status: 'paid',
          }));
          setPaymentDone(true);
          setStep(3);
        } catch (err) {
          setStatus({
            type: 'error',
            msg: "Payment was successful, but we failed to register the booking automatically. Please contact us immediately at +91 90807 03491 with your Payment ID: " + response.razorpay_payment_id
          });
        }
        setLoading(false);
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
          setStatus({ type: 'error', msg: 'Payment was cancelled. You can retry or pay at the venue.' });
        }
      }
    };

    // eslint-disable-next-line no-undef
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', () => {
      setStatus({ type: 'error', msg: 'Payment failed. Please retry or call +91 90807 03491.' });
      setLoading(false);
    });
    rzp.open();
  };

  const handlePayAtVenue = async () => {
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API}/bookings/`, getPayload({ payment_status: 'pay_at_venue' }));
      setStep(3);
    } catch (err) {
      const errMsg = err.response?.data
        ? Object.entries(err.response.data).map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`).join(' | ')
        : "Failed to save booking. Please check your inputs or try again.";
      setStatus({ type: 'error', msg: errMsg });
    }
    setLoading(false);
  };

  if (step === 3) {
    return (
      <section style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'var(--bg)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-blob bg-blob-green" style={{ width: '400px', height: '400px', top: '10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="container glass-premium" style={{ position: 'relative', zIndex: 1, maxWidth: '600px', textAlign: 'center', padding: '3.5rem 2.5rem' }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(76,175,80,0.15)', border: '2px solid rgba(76,175,80,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '2rem', animation: 'glowRingPulse 2s ease-in-out infinite' }}>✓</div>
            <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '3rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '1rem' }}>
              BOOKING <span style={{ color: '#4caf50' }}>CONFIRMED!</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
              Thank you, <strong style={{ color: 'var(--text)' }}>{form.name}</strong>! Your slot for <strong style={{ color: 'var(--gold)' }}>{selectedFacility?.label}</strong> on <strong style={{ color: 'var(--gold)' }}>{form.date}</strong> at <strong style={{ color: 'var(--gold)' }}>{form.time_slot}</strong> is confirmed.
            </p>
            {paymentDone && (
              <div style={{ padding: '1rem', background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.25)', marginBottom: '2rem', fontFamily: 'Rajdhani', color: '#81c784', fontSize: '0.9rem' }}>
                ✓ Payment of ₹{totalAmount} received. See you at the club!
              </div>
            )}
            {!paymentDone && (
              <div style={{ padding: '1rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', marginBottom: '2rem', fontFamily: 'Rajdhani', color: 'var(--gold)', fontSize: '0.9rem' }}>
                ₹{totalAmount} to be paid at venue. Please arrive 10 min early.
              </div>
            )}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => { setStep(1); setForm({ name:'',email:'',phone:'',facility:'',date:'',time_slot:'',hours:1,message:'' }); setPaymentDone(false); setStatus(null); }}>
                Book Another Session
              </button>
              <a href="https://wa.me/919080703491" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="btn-outline" style={{ borderColor: '#25d366', color: '#25d366' }}>💬 WhatsApp Us</button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section style={{ paddingTop: '8rem', paddingBottom: '3rem', background: 'var(--bg)', borderBottom: '1px solid rgba(201,168,76,0.12)', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-blob bg-blob-gold" style={{ width: '360px', height: '360px', top: '-15%', right: '5%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label">Reserve Your Spot</div>
          <h1 className="section-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <SplitText text="BOOK A" tag="span" delay={30} duration={0.6} textAlign="left" />
            <SplitText text="SESSION" tag="span" className="gold-text" delay={30} duration={0.6} textAlign="left" />
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.8, marginTop: '1rem' }}>Secure your slot in advance. Pay online via Razorpay or settle at the venue.</p>
        </div>
      </section>

      {/* Step indicator */}
      <section style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border-sub)', padding: '1.25rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {[{ n: 1, l: 'Details' }, { n: 2, l: 'Payment' }, { n: 3, l: 'Confirmed' }].map((s, i, arr) => (
              <React.Fragment key={s.n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= s.n ? 'var(--gold)' : 'var(--border-sub)', border: step >= s.n ? 'none' : '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.8rem', color: step >= s.n ? 'var(--bg)' : 'var(--text-muted)' }}>{s.n}</div>
                  <span style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: step >= s.n ? 'var(--gold)' : 'var(--text-muted)' }}>{s.l}</span>
                </div>
                {i < arr.length - 1 && <div style={{ flex: 1, height: '1px', background: step > s.n ? 'rgba(201,168,76,0.4)' : 'var(--border-sub)', maxWidth: '60px' }} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0 6rem', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start' }}>

            {/* Left info panel */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              {[
                { icon: '📍', title: 'Address', info: '6/518, Bazzar Road, Padappai, Chennai' },
                { icon: '📞', title: 'Phone', info: '+91 90807 03491' },
                { icon: '✉️', title: 'Email', info: 'jgokul823@gmail.com' },
                { icon: '⏰', title: 'Open', info: 'Daily 5:00 AM – 11:00 PM' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i + 0.3 }}
                  style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{ width: '36px', height: '36px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase' }}>{item.title}</div>
                    <div style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginTop: '0.1rem' }}>{item.info}</div>
                  </div>
                </motion.div>
              ))}

              {/* Price preview */}
              {selectedFacility && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-premium"
                  style={{ marginTop: '2rem', padding: '1.5rem', borderColor: 'var(--gold)' }}>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Booking Summary</div>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: 'var(--text)', marginBottom: '0.25rem' }}>{selectedFacility.label}</div>
                  {selectedFacility.unit === 'hour' && (
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{form.hours} hour{form.hours > 1 ? 's' : ''} × ₹{selectedFacility.price}</div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.75rem', borderTop: '1px solid var(--border-sub)', paddingTop: '0.75rem' }}>
                    <span style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total</span>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: 'var(--gold)', lineHeight: 1 }}>₹{totalAmount}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right: Form or Payment */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="glass-premium" style={{ padding: '2.5rem' }}>
                <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', marginBottom: '2rem' }} />

                {status && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ padding: '1rem', marginBottom: '1.5rem', background: status.type === 'success' ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)', border: `1px solid ${status.type === 'success' ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)'}`, color: status.type === 'success' ? '#81c784' : '#e57373', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.9rem' }}>
                    {status.msg}
                  </motion.div>
                )}

                {/* STEP 1: Booking Details */}
                {step === 1 && (
                  <form onSubmit={handleDetails}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={labelStyle}>Full Name</label>
                        <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={inputStyle}
                          onFocus={e => { e.target.style.borderColor='var(--gold)'; e.target.style.boxShadow='0 0 0 3px var(--gold-dim)'; }} onBlur={e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none'; }} />
                      </div>
                      <div>
                        <label style={labelStyle}>Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" style={inputStyle}
                          onFocus={e => { e.target.style.borderColor='var(--gold)'; e.target.style.boxShadow='0 0 0 3px var(--gold-dim)'; }} onBlur={e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none'; }} />
                      </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>Email</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" style={inputStyle}
                        onFocus={e => { e.target.style.borderColor='var(--gold)'; e.target.style.boxShadow='0 0 0 3px var(--gold-dim)'; }} onBlur={e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none'; }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>Facility</label>
                      <CustomSelect
                        name="facility"
                        value={form.facility}
                        onChange={handleChange}
                        placeholder="Select a facility"
                        options={selectOptions}
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
                    {(selectedFacility?.unit === 'hour' || form.facility === 'turf') && (() => {
                      const pricePerUnit = selectedFacility?.price || 0;
                      const unitLabel = form.facility === 'turf' ? 'session' : 'hour';
                      const maxHours = form.facility === 'turf' ? 6 : 4;
                      return (
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={labelStyle}>Duration (Hours)</label>
                          <CustomSelect
                            name="hours"
                            value={form.hours}
                            onChange={handleChange}
                            placeholder="Select duration"
                            options={Array.from({ length: maxHours }, (_, i) => i + 1).map(h => ({
                              value: h,
                              label: `${h} hr${h > 1 ? 's' : ''} — ₹${pricePerUnit * h} (${h} ${unitLabel}${h > 1 ? 's' : ''})`
                            }))}
                          />
                        </div>
                      );
                    })()}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={labelStyle}>Date</label>
                        <input name="date" type="date" value={form.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} style={{ ...inputStyle, cursor: 'pointer' }}
                          onFocus={e => { e.target.style.borderColor='var(--gold)'; e.target.style.boxShadow='0 0 0 3px var(--gold-dim)'; }} onBlur={e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none'; }} />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={labelStyle}>
                          Time Slot
                          {slotsLoading && <span style={{ marginLeft: '0.5rem', fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>LOADING...</span>}
                        </label>
                        {/* Inline slot grid with real-time booked + duration-aware indicators */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                          {timeSlots.map((t, idx) => {
                            const isBooked = bookedSlots.includes(t);
                            const isSelected = form.time_slot === t;
                            // Check if slot falls within the selected duration range
                            const startIdx = timeSlots.indexOf(form.time_slot);
                            const numHours = parseInt(form.hours) || 1;
                            const isInRange = startIdx !== -1 && idx > startIdx && idx < startIdx + numHours;
                            // Check if picking this slot would overlap with any booked slot
                            const wouldOverlap = !isBooked && (() => {
                              const h = parseInt(form.hours) || 1;
                              for (let i = 0; i < h; i++) {
                                const checkSlot = timeSlots[idx + i];
                                if (checkSlot && bookedSlots.includes(checkSlot)) return true;
                              }
                              return false;
                            })();

                            let borderColor = '1px solid var(--border)';
                            let bg = 'rgba(255,255,255,0.03)';
                            let color = 'var(--text-sub)';
                            let cursor = 'pointer';
                            let title = t;

                            if (isBooked) {
                              borderColor = '1px solid rgba(244,67,54,0.25)';
                              bg = 'rgba(244,67,54,0.06)';
                              color = 'rgba(244,67,54,0.5)';
                              cursor = 'not-allowed';
                              title = `${t} — BOOKED`;
                            } else if (wouldOverlap) {
                              borderColor = '1px solid rgba(245,158,11,0.3)';
                              bg = 'rgba(245,158,11,0.05)';
                              color = 'rgba(245,158,11,0.5)';
                              cursor = 'not-allowed';
                              title = `${t} — Would overlap a booked slot`;
                            } else if (isSelected) {
                              borderColor = '1px solid var(--gold)';
                              bg = 'rgba(201,168,76,0.2)';
                              color = 'var(--gold)';
                            } else if (isInRange) {
                              borderColor = '1px solid rgba(201,168,76,0.4)';
                              bg = 'rgba(201,168,76,0.07)';
                              color = 'rgba(201,168,76,0.7)';
                            }

                            return (
                              <button
                                key={t}
                                type="button"
                                disabled={isBooked || wouldOverlap}
                                onClick={() => !(isBooked || wouldOverlap) && setForm({ ...form, time_slot: t })}
                                title={title}
                                style={{
                                  padding: '0.4rem 0.2rem',
                                  fontSize: '0.7rem',
                                  fontFamily: 'Rajdhani',
                                  fontWeight: 600,
                                  letterSpacing: '0.05em',
                                  textAlign: 'center',
                                  border: borderColor,
                                  background: bg,
                                  color,
                                  cursor,
                                  position: 'relative',
                                  transition: 'all 0.15s',
                                }}
                              >
                                {t}
                                {isBooked && (
                                  <div style={{
                                    position: 'absolute', top: '-6px', right: '-4px',
                                    fontSize: '0.45rem', fontWeight: 800, letterSpacing: '0.05em',
                                    background: 'rgba(244,67,54,0.85)', color: '#fff',
                                    padding: '1px 3px', lineHeight: 1.4,
                                  }}>BOOKED</div>
                                )}
                                {wouldOverlap && !isBooked && (
                                  <div style={{
                                    position: 'absolute', top: '-6px', right: '-4px',
                                    fontSize: '0.45rem', fontWeight: 800, letterSpacing: '0.05em',
                                    background: 'rgba(245,158,11,0.85)', color: '#fff',
                                    padding: '1px 3px', lineHeight: 1.4,
                                  }}>OVERLAP</div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {form.time_slot && !bookedSlots.includes(form.time_slot) && (
                          <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--gold)', fontFamily: 'Rajdhani', fontWeight: 600, letterSpacing: '0.1em' }}>
                            ✓ {form.time_slot}
                            {parseInt(form.hours) > 1 && ` → ${timeSlots[timeSlots.indexOf(form.time_slot) + parseInt(form.hours) - 1] || ''}` }
                            {` (${form.hours} hr${parseInt(form.hours) > 1 ? 's' : ''})`}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={labelStyle}>Message (optional)</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={2} placeholder="Any special requirements..." style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => { e.target.style.borderColor='var(--gold)'; e.target.style.boxShadow='0 0 0 3px var(--gold-dim)'; }} onBlur={e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none'; }} />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '1rem', background: 'var(--gold)', color: 'var(--on-gold)', border: 'none', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                      Continue to Payment →
                    </button>
                  </form>
                )}

                {/* STEP 2: Payment */}
                {step === 2 && (
                  <div>
                    <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '1.5rem' }}>CHOOSE PAYMENT METHOD</h3>

                    {/* Summary */}
                    <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-sub)', marginBottom: '2rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        {[
                          { l: 'Name', v: form.name },
                          { l: 'Phone', v: form.phone },
                          { l: 'Facility', v: selectedFacility?.label },
                          { l: 'Date & Time', v: `${form.date} · ${form.time_slot}` },
                        ].map((r, i) => (
                          <div key={i}>
                            <div style={{ fontFamily: 'Rajdhani', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#555', textTransform: 'uppercase' }}>{r.l}</div>
                            <div style={{ color: 'var(--text)', fontSize: '0.88rem', marginTop: '0.1rem' }}>{r.v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ borderTop: '1px solid var(--border-sub)', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Amount Due</span>
                        <span style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 1 }}>₹{totalAmount}</span>
                      </div>
                    </div>

                    {/* Razorpay Button */}
                    <button onClick={handleRazorpay} disabled={loading}
                      style={{ width: '100%', padding: '1.1rem', background: loading ? 'rgba(201,168,76,0.5)' : 'var(--gold)', color: 'var(--on-gold)', border: 'none', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>💳</span>
                      {loading ? 'Opening Payment...' : `Pay ₹${totalAmount} via Razorpay`}
                    </button>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
                      <div style={{ flex: 1, height: '1px', background: 'var(--border-sub)' }} />
                      <span style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase' }}>or</span>
                      <div style={{ flex: 1, height: '1px', background: 'var(--border-sub)' }} />
                    </div>

                    {/* Pay at venue */}
                    <button onClick={handlePayAtVenue} disabled={loading}
                      style={{ width: '100%', padding: '1rem', background: 'transparent', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.4)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', marginBottom: '1rem' }}>
                      🏛️ Pay at Venue
                    </button>

                    {/* Accepted cards */}
                    <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-sub)', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Accepted:</span>
                      {['UPI', 'Cards', 'Net Banking', 'Wallets'].map(m => (
                        <span key={m} style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0.2rem 0.5rem', border: '1px solid var(--border-sub)' }}>{m}</span>
                      ))}
                    </div>

                    <button onClick={() => setStep(1)} style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#555', fontFamily: 'Rajdhani', fontSize: '0.8rem', cursor: 'pointer', letterSpacing: '0.1em' }}>
                      ← Edit Details
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){ section .container>div[style*="grid-template-columns"]{grid-template-columns:1fr!important;gap:2rem!important;} }`}</style>
    </>
  );
};

export default BookingPage;
