import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SplitText from '../components/SplitText';

const API = process.env.REACT_APP_API_URL || 'https://sports-club-2i4r.onrender.com/api';

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
    features: ['Premium Cardio Machines', 'Weight Stations', 'Free Weights Area', 'Unisex Gym Floor', 'Personal Training Available', 'AC Environment'],
    tag: 'GYM',
    link: '/gym',
  },
  {
    id: 'gym-nonac', icon: '💪', name: 'Fitness Gym — Non-AC', price: 'from ₹0/month', hours: '5AM – 10PM',
    desc: 'Train hard in our strength-focused non-AC gym. All the iron you need to build serious muscle.',
    features: ['Strength Training Machines', 'Heavy Free Weights', 'Barbells & Dumbbells', 'Unisex Gym Floor', 'Personal Training Available'],
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

const DEFAULT_PRICES = {
  badminton_1: 0,
  turf_weekday: 0,
  turf_weekend: 0,
  gym_ac_monthly: 0,
  gym_ac_quarterly: 0,
  gym_ac_halfyearly: 0,
  gym_ac_yearly: 0,
  gym_nonac_monthly: 0,
  gym_nonac_quarterly: 0,
  gym_nonac_halfyearly: 0,
  gym_nonac_yearly: 0,
  badminton_membership: 0,
  total_membership: 0,
};

const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState(DEFAULT_FACILITIES);
  const [prices, setPrices] = useState(DEFAULT_PRICES);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    axios.get(`${API}/pricing/`)
      .then(res => {
        const data = res.data;
        if (!data) return;

        setPrices(prev => ({
          ...prev,
          ...data
        }));
        
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

    {/* QUICK PRICING TABLE / TABBED PRICING DASHBOARD */}
    <section style={{ padding: '5rem 0', background: 'var(--bg)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
      <div className="container">
        <div className="section-label">At a Glance</div>
        <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>PRICING <span className="gold-text">SUMMARY</span></h2>
        
        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {[
            { id: 'bookings', label: 'Casual Bookings', icon: '⚽' },
            { id: 'gym', label: 'Gym Memberships', icon: '🏋️' },
            { id: 'club', label: 'Club Memberships', icon: '💳' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 1.5rem',
                background: activeTab === tab.id ? 'var(--gold)' : 'rgba(255,255,255,0.02)',
                color: activeTab === tab.id ? 'var(--on-gold)' : 'var(--text-sub)',
                border: activeTab === tab.id ? '1px solid var(--gold)' : '1px solid var(--border-sub)',
                fontFamily: 'Rajdhani',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div style={{ minHeight: '320px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
              >
                {/* Badminton Booking Card */}
                <div style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.15)', padding: '2.5rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏸</div>
                  <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '0.03em' }}>BADMINTON COURT</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Reserve synthetic badminton courts on an hourly basis. Perfect for single games or regular friendly play. Available across 3 premium synthetic courts.
                  </p>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: 'var(--gold)', lineHeight: 1 }}>
                      ₹{Number(prices.badminton_1).toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontFamily: 'Rajdhani', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      / hour per court
                    </span>
                  </div>
                </div>

                {/* Football Turf Booking Card */}
                <div style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.15)', padding: '2.5rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚽</div>
                  <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '0.03em' }}>FOOTBALL TURF</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    FIFA-quality synthetic turf with high-luminance floodlights. Bookable hourly slots for football/cricket matches and corporate sports events.
                  </p>
                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--border-sub)', paddingBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-sub)' }}>WEEKDAYS (MON-FRI)</span>
                      <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: 'var(--gold)' }}>
                        ₹{Number(prices.turf_weekday).toLocaleString('en-IN')}/session
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-sub)' }}>WEEKENDS (SAT-SUN)</span>
                      <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: 'var(--gold)' }}>
                        ₹{Number(prices.turf_weekend).toLocaleString('en-IN')}/session
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'gym' && (
              <motion.div
                key="gym"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
              >
                {/* Gym AC Subscriptions */}
                <div style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.15)', padding: '2.5rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '2rem' }}>🏋️</div>
                    <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', fontFamily: 'Rajdhani', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--gold)', fontWeight: 600 }}>AIR CONDITIONED</span>
                  </div>
                  <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '0.03em' }}>AC GYM FLOOR</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Full access to AC gym, premium cardio deck, strength machines, free weights, and certified floor training assistance.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { label: 'MONTHLY', value: prices.gym_ac_monthly },
                      { label: 'QUARTERLY', value: prices.gym_ac_quarterly },
                      { label: 'HALF-YEARLY', value: prices.gym_ac_halfyearly },
                      { label: 'YEARLY', value: prices.gym_ac_yearly, badge: 'BEST VALUE' },
                    ].map((plan, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: index < 3 ? '1px solid var(--border-sub)' : 'none', paddingBottom: '0.6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-sub)' }}>{plan.label}</span>
                          {plan.badge && (
                            <span style={{ background: 'var(--gold)', color: 'var(--on-gold)', fontSize: '0.55rem', fontWeight: 700, padding: '0.1rem 0.3rem', letterSpacing: '0.05em' }}>{plan.badge}</span>
                          )}
                        </div>
                        <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: 'var(--gold)' }}>
                          ₹{Number(plan.value).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gym Non-AC Subscriptions */}
                <div style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.15)', padding: '2.5rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '2rem' }}>💪</div>
                    <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-sub)', fontFamily: 'Rajdhani', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--text-muted)', fontWeight: 600 }}>NON-AC ZONE</span>
                  </div>
                  <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '0.03em' }}>NON-AC GYM FLOOR</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Focus on heavy strength lifts, free weights training, raw iron machinery, and customized coaching plans.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { label: 'MONTHLY', value: prices.gym_nonac_monthly },
                      { label: 'QUARTERLY', value: prices.gym_nonac_quarterly },
                      { label: 'HALF-YEARLY', value: prices.gym_nonac_halfyearly },
                      { label: 'YEARLY', value: prices.gym_nonac_yearly, badge: 'SAVINGS' },
                    ].map((plan, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: index < 3 ? '1px solid var(--border-sub)' : 'none', paddingBottom: '0.6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-sub)' }}>{plan.label}</span>
                          {plan.badge && (
                            <span style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text)', fontSize: '0.55rem', fontWeight: 600, padding: '0.1rem 0.3rem', letterSpacing: '0.05em' }}>{plan.badge}</span>
                          )}
                        </div>
                        <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: 'var(--text-sub)' }}>
                          ₹{Number(plan.value).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'club' && (
              <motion.div
                key="club"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
              >
                {/* Badminton Membership Card */}
                <div style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.15)', padding: '2.5rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏸</div>
                  <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '0.03em' }}>BADMINTON MEMBERSHIP</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Includes 1 hour daily court access, priority booking privileges on synthetic courts, and member coaching discounts.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
                    {['1 Hour Court Access Per Day', '3 Synthetic Courts Access', 'Rental Equipment Discounts', 'Priority Court Reservations'].map((perk, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>✓</span>
                        <span style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: 'var(--text-sub)' }}>{perk}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: 'var(--gold)', lineHeight: 1 }}>
                      ₹{Number(prices.badminton_membership).toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontFamily: 'Rajdhani', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      / month
                    </span>
                  </div>
                </div>

                {/* Total Membership Card - Highlighted popular option */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(28,26,20,0.85), rgba(15,15,15,0.95))',
                  border: '2px solid var(--gold)',
                  boxShadow: '0 8px 30px rgba(201,168,76,0.18)',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '20px',
                    background: 'var(--gold)',
                    color: 'var(--on-gold)',
                    fontFamily: 'Rajdhani',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    padding: '0.25rem 0.75rem',
                    textTransform: 'uppercase'
                  }}>
                    RECOMMENDED
                  </div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👑</div>
                  <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '0.03em' }}>TOTAL MEMBERSHIP</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Our all-access premium pass. Full access to Gym floor (both AC & Non-AC), unlimited badminton, and turf discounts.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
                    {['Full Gym Floor Access (AC & Non-AC)', 'Unlimited Badminton Courts Play', 'Turf Sessions at Special Member Rates', '2 Free Guest Passes Per Month', 'Free Towel & Locker Service', '1-on-1 Nutrition Consultation'].map((perk, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>✓</span>
                        <span style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'var(--text)' }}>{perk}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: '2.4rem', color: 'var(--gold)', lineHeight: 1 }}>
                      ₹{Number(prices.total_membership).toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontFamily: 'Rajdhani', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      / month
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/book" style={{ textDecoration: 'none' }}><button className="btn-primary">Book a Session →</button></Link>
          <Link to="/membership" style={{ textDecoration: 'none' }}><button className="btn-outline">View Memberships</button></Link>
        </div>
      </div>
    </section>
  </>
  );
};

export default FacilitiesPage;
