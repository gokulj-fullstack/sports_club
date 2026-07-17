import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SplitText from '../components/SplitText';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const PageHero = ({ label, titleWord1, titleWord2, sub }) => (
  <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg)', borderBottom: '1px solid rgba(201,168,76,0.12)', position: 'relative', overflow: 'hidden' }}>
    <div className="bg-blob bg-blob-gold" style={{ width: '380px', height: '380px', top: '-15%', right: '-8%' }} />
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-label">{label}</div>
      <h1 className="section-title" style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <SplitText text={titleWord1} tag="span" delay={30} duration={0.6} textAlign="left" />
        <SplitText text={titleWord2} tag="span" className="gold-text" delay={30} duration={0.6} textAlign="left" />
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.8 }}>{sub}</p>
    </div>
  </section>
);

const DEFAULT_FACILITIES = [
  {
    id: 'gym-ac', icon: '🏋️', name: 'Fitness Gym — AC', price: 'from ₹0/month', hours: '5AM – 10PM',
    desc: 'Beat the heat while you train. Our air-conditioned gym floor features premium cardio machines, weight stations, and free weights.',
    features: ['Premium Cardio Machines', 'Weight Stations', 'Free Weights Area', 'Personal Training Available', 'AC Environment'],
    tag: 'GYM',
    link: '/gym',
  },
  {
    id: 'gym-nonac', icon: '💪', name: 'Fitness Gym — Non-AC', price: 'from ₹0/month', hours: '5AM – 10PM',
    desc: 'Train hard in our strength-focused non-AC gym. All the iron you need to build serious muscle.',
    features: ['Strength Training Machines', 'Heavy Free Weights', 'Barbells & Dumbbells', 'Personal Training Available'],
    tag: 'GYM',
    link: '/gym',
  },
  {
    id: 'turf', icon: '⚽', name: 'Football Turf', price: '₹0 (Weekday) / ₹0 (Weekend)', hours: '6AM – 11PM',
    desc: 'FIFA-quality synthetic turf for football and cricket. Bright floodlights for night matches, changing rooms, and scoreboard.',
    features: ['FIFA Quality Synthetic Turf', 'Floodlit for Night Matches', 'Changing Rooms', 'Scoreboard', 'Goal Posts', 'Suitable for Cricket'],
    tag: 'TURF',
    link: '/turf',
  },
  {
    id: 'badminton', icon: '🏸', name: '3 Synthetic Badminton Courts', price: '₹0/hour per court', hours: '5AM – 11PM',
    desc: 'All three courts feature premium synthetic surface. Two courts on the left block, one standalone court on the right block — street in between. Perfect for casual play, coaching, and tournaments.',
    features: ['All 3 Courts Synthetic Surface', 'Left Block: Courts 1 & 2', 'Right Block: Court 3', 'Professional Nets & Lines', 'Equipment Rental', 'Coaching Available', 'Tournament Hosting'],
    tag: 'BADMINTON',
    link: '/badminton',
  },
];

const DEFAULT_PRICING_TABLE = [
  { key: 'badminton_1', facility: 'Badminton Court (any)', price: '₹0/hour', note: '3 synthetic courts · 5AM–11PM' },
  { key: 'turf_weekday', facility: 'Football Turf (Weekday)', price: '₹0/session', note: 'Mon–Fri · Floodlit' },
  { key: 'turf_weekend', facility: 'Football Turf (Weekend)', price: '₹0/session', note: 'Sat–Sun · Floodlit' },
  { key: 'gym_ac_monthly', facility: 'Gym AC - Monthly', price: '₹0/month', note: 'Premium machines · AC hall' },
  { key: 'gym_ac_quarterly', facility: 'Gym AC - Quarterly', price: '₹0/quarter', note: 'Premium machines · AC hall' },
  { key: 'gym_ac_halfyearly', facility: 'Gym AC - Half-Yearly', price: '₹0/half-year', note: 'Premium machines · AC hall' },
  { key: 'gym_ac_yearly', facility: 'Gym AC - Yearly', price: '₹0/year', note: 'Premium machines · AC hall' },
  { key: 'gym_nonac_monthly', facility: 'Gym Non-AC - Monthly', price: '₹0/month', note: 'Strength zone · Non-AC' },
  { key: 'gym_nonac_quarterly', facility: 'Gym Non-AC - Quarterly', price: '₹0/quarter', note: 'Strength zone · Non-AC' },
  { key: 'gym_nonac_halfyearly', facility: 'Gym Non-AC - Half-Yearly', price: '₹0/half-year', note: 'Strength zone · Non-AC' },
  { key: 'gym_nonac_yearly', facility: 'Gym Non-AC - Yearly', price: '₹0/year', note: 'Strength zone · Non-AC' },
  { key: 'badminton_membership', facility: 'Badminton Membership', price: '₹0/month', note: '1 Hour Court Access Per Day' },
  { key: 'total_membership', facility: 'Total Membership', price: '₹0/month', note: 'Full access to Gym (AC/Non-AC) & Badminton courts' },
];

const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState(DEFAULT_FACILITIES);
  const [pricingTable, setPricingTable] = useState(DEFAULT_PRICING_TABLE);

  useEffect(() => {
    axios.get(`${API}/pricing/`)
      .then(res => {
        const data = res.data;
        
        // update facilities card prices
        setFacilities(prev => prev.map(f => {
          if (f.id === 'gym-ac' && data.gym_ac_monthly !== undefined) {
            return { ...f, price: `from ₹${Number(data.gym_ac_monthly).toLocaleString('en-IN')}/month` };
          }
          if (f.id === 'gym-nonac' && data.gym_nonac_monthly !== undefined) {
            return { ...f, price: `from ₹${Number(data.gym_nonac_monthly).toLocaleString('en-IN')}/month` };
          }
          if (f.id === 'turf' && data.turf_weekday !== undefined && data.turf_weekend !== undefined) {
            return { ...f, price: `₹${Number(data.turf_weekday)} (Weekday) / ₹${Number(data.turf_weekend)} (Weekend)` };
          }
          if (f.id === 'badminton' && data.badminton_1 !== undefined) {
            return { ...f, price: `₹${Number(data.badminton_1)}/hour per court` };
          }
          return f;
        }));

        // update pricing table
        setPricingTable(prev => prev.map(row => {
          if (data[row.key] !== undefined) {
            let unit = 'session';
            if (row.key === 'badminton_1' || row.key === 'badminton_2' || row.key === 'badminton_3') unit = 'hour';
            else if (row.key.endsWith('_yearly')) unit = 'year';
            else if (row.key.endsWith('_halfyearly')) unit = 'half-year';
            else if (row.key.endsWith('_quarterly')) unit = 'quarter';
            else if (row.key.endsWith('_monthly') || row.key === 'badminton_membership' || row.key === 'total_membership') unit = 'month';
            
            return { ...row, price: `₹${Number(data[row.key]).toLocaleString('en-IN')}/${unit}` };
          }
          return row;
        }));
      })
      .catch(err => console.error("Error fetching facilities prices:", err));
  }, []);

  return (
  <>
    <PageHero label="What We Offer" titleWord1="WORLD-CLASS" titleWord2="FACILITIES"
      sub="Four premium sporting spaces under one roof — and one across the street. Train, compete, and push your limits at King Sports Club, Padappai." />

    {/* FACILITIES CARDS */}
    <section style={{ padding: '5rem 0', background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {facilities.map((f, i) => (
            <motion.div key={f.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
              style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.15)', padding: '2.5rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
              <div style={{ display: 'inline-block', padding: '0.2rem 0.7rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', fontFamily: 'Rajdhani', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{f.tag}</div>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>{f.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{f.desc}</p>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ padding: '0.3rem 0.8rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <span style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--gold)', textTransform: 'uppercase' }}>{f.price}</span>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-sub)' }}>
                  <span style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{f.hours}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {f.features.map((feat, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '5px', height: '5px', background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'var(--text-sub)' }}>{feat}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                <Link to="/book" style={{ textDecoration: 'none', flex: 1 }}>
                  <button style={{ width: '100%', padding: '0.75rem', background: 'var(--gold)', color: 'var(--on-gold)', border: 'none', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    Book Now →
                  </button>
                </Link>
                {f.link && (
                  <Link to={f.link} style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '0.75rem 1rem', background: 'transparent', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.4)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                      Details
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FACILITY HIGHLIGHTS */}
    <section style={{ padding: '5rem 0', background: 'var(--bg-alt)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
      <div className="container">
        <div className="section-label">Facility Highlights</div>
        <h2 className="section-title" style={{ marginBottom: '3rem' }}>EVERYTHING <span className="gold-text">YOU NEED</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {[

            { icon: '💡', title: 'LED Floodlights', desc: 'Full-coverage LED lighting across turf and badminton courts for evening sessions.' },
            { icon: '🅿️', title: 'Parking', desc: 'Ample parking space on Bazzar Road and within the complex.' },
            { icon: '💧', title: 'Hydration Station', desc: 'Cold water dispensers and refreshment counter available on-site.' },
            { icon: '📹', title: 'CCTV Security', desc: 'All areas are monitored 24/7 for the safety of members and their belongings.' },
            { icon: '📱', title: 'Online Booking', desc: 'Reserve courts, gym sessions, and turf slots instantly via our booking page or WhatsApp.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-sub)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>{item.icon}</div>
              <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.1rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.4rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* QUICK PRICING TABLE */}
    <section style={{ padding: '5rem 0', background: 'var(--bg)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
      <div className="container">
        <div className="section-label">At a Glance</div>
        <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>PRICING <span className="gold-text">SUMMARY</span></h2>
        <div style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
          <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
          {pricingTable.map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: i < 6 ? '1px solid var(--border-sub)' : 'none', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}>{row.facility}</div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{row.note}</div>
              </div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: 'var(--gold)' }}>{row.price}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/book" style={{ textDecoration: 'none' }}><button className="btn-primary">Book a Session →</button></Link>
          <Link to="/membership" style={{ textDecoration: 'none' }}><button className="btn-outline">View Memberships</button></Link>
        </div>
      </div>
    </section>
  </>
  );
};

export default FacilitiesPage;
