import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SplitText from '../components/SplitText';

/* ─────────────────────────────────────────────
   SVG TURF TOP-DOWN ILLUSTRATION
   Football/Cricket multi-sport turf aerial view
────────────────────────────────────────────── */
const TurfIllustration = () => (
  <div style={{ width: '100%', overflowX: 'auto' }}>
    <svg
      viewBox="0 0 1000 520"
      style={{ width: '100%', maxWidth: '1000px', display: 'block', margin: '0 auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="turfSurface" patternUnits="userSpaceOnUse" width="20" height="20">
          <rect width="20" height="20" fill="#1a3a20" />
          <rect width="10" height="10" fill="#1e4024" />
          <rect x="10" y="10" width="10" height="10" fill="#1e4024" />
        </pattern>
        <pattern id="turfStripe" patternUnits="userSpaceOnUse" width="40" height="520">
          <rect width="40" height="520" fill="#1a3a20" />
          <rect width="20" height="520" fill="#1c3c22" />
        </pattern>
        <linearGradient id="turfBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080e08" />
          <stop offset="100%" stopColor="#040804" />
        </linearGradient>
        <linearGradient id="floodlightBeam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,245,200,0.12)" />
          <stop offset="100%" stopColor="rgba(255,245,200,0)" />
        </linearGradient>
        <filter id="turfGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="lightGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="1000" height="520" fill="url(#turfBg)" />

      {/* Title */}
      <text x="500" y="26" textAnchor="middle" fill="var(--gold)"
        fontFamily="'Bebas Neue', sans-serif" fontSize="17" letterSpacing="5">
        KING SPORTS CLUB — FOOTBALL TURF AERIAL VIEW
      </text>
      <text x="500" y="42" textAnchor="middle" fill="rgba(201,168,76,0.4)"
        fontFamily="Rajdhani, sans-serif" fontSize="10" letterSpacing="3">
        FIFA-QUALITY SYNTHETIC TURF · PADAPPAI
      </text>

      {/* Outer compound wall */}
      <rect x="40" y="52" width="920" height="430" fill="rgba(20,40,20,0.4)"
        stroke="rgba(201,168,76,0.15)" strokeWidth="1.5" rx="2" />

      {/* Floodlight beams (4 corners) */}
      {[[60, 60], [940, 60], [60, 470], [940, 470]].map(([fx, fy], i) => (
        <ellipse key={i} cx={fx} cy={fy} rx={i % 2 === 0 ? 180 : -180} ry={100}
          fill="url(#floodlightBeam)" opacity="0.4"
          transform={`rotate(${[15, -15, -15, 15][i]}, ${fx}, ${fy})`} />
      ))}

      {/* Turf surface with stripes */}
      <rect x="60" y="68" width="880" height="398" fill="url(#turfStripe)" />
      <rect x="60" y="68" width="880" height="398" fill="url(#turfSurface)" opacity="0.3" />

      {/* ── FOOTBALL PITCH MARKINGS ── */}
      {/* Outer boundary */}
      <rect x="80" y="84" width="840" height="364" fill="none"
        stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" filter="url(#turfGlow)" />

      {/* Centre line */}
      <line x1="500" y1="84" x2="500" y2="448" stroke="rgba(255,255,255,0.65)" strokeWidth="2" filter="url(#turfGlow)" />

      {/* Centre circle */}
      <circle cx="500" cy="266" r="52" fill="none"
        stroke="rgba(255,255,255,0.55)" strokeWidth="2" filter="url(#turfGlow)" />
      <circle cx="500" cy="266" r="4" fill="rgba(255,255,255,0.8)" filter="url(#turfGlow)" />

      {/* Left penalty area */}
      <rect x="80" y="178" width="120" height="176" fill="none"
        stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" filter="url(#turfGlow)" />
      {/* Left goal area */}
      <rect x="80" y="214" width="50" height="104" fill="none"
        stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" filter="url(#turfGlow)" />
      {/* Left penalty spot */}
      <circle cx="140" cy="266" r="3" fill="rgba(255,255,255,0.7)" />
      {/* Left penalty arc */}
      <path d="M 200 220 A 52 52 0 0 1 200 312" fill="none"
        stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" filter="url(#turfGlow)" />

      {/* Right penalty area */}
      <rect x="800" y="178" width="120" height="176" fill="none"
        stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" filter="url(#turfGlow)" />
      {/* Right goal area */}
      <rect x="870" y="214" width="50" height="104" fill="none"
        stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" filter="url(#turfGlow)" />
      {/* Right penalty spot */}
      <circle cx="860" cy="266" r="3" fill="rgba(255,255,255,0.7)" />
      {/* Right penalty arc */}
      <path d="M 800 220 A 52 52 0 0 0 800 312" fill="none"
        stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" filter="url(#turfGlow)" />

      {/* Corner arcs */}
      <path d="M 80 100 A 16 16 0 0 1 96 84" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <path d="M 920 100 A 16 16 0 0 0 904 84" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <path d="M 80 432 A 16 16 0 0 0 96 448" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <path d="M 920 432 A 16 16 0 0 1 904 448" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />

      {/* ── GOAL POSTS ── */}
      {/* Left goal */}
      <rect x="56" y="228" width="24" height="76" fill="var(--border-sub)"
        stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <rect x="56" y="226" width="24" height="4" fill="white" opacity="0.7" />
      <rect x="56" y="302" width="24" height="4" fill="white" opacity="0.7" />
      <rect x="56" y="228" width="4" height="76" fill="white" opacity="0.5" />
      {/* Right goal */}
      <rect x="920" y="228" width="24" height="76" fill="var(--border-sub)"
        stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <rect x="920" y="226" width="24" height="4" fill="white" opacity="0.7" />
      <rect x="920" y="302" width="24" height="4" fill="white" opacity="0.7" />
      <rect x="940" y="228" width="4" height="76" fill="white" opacity="0.5" />

      {/* ── FLOODLIGHT POLES (4 corners) ── */}
      {[[50, 56], [950, 56], [50, 476], [950, 476]].map(([px, py], i) => (
        <g key={i}>
          <rect x={px - 4} y={py - 20} width="8" height="20" fill="#333"
            stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
          <rect x={px - 14} y={py - 22} width="28" height="6" fill="#222"
            stroke="rgba(255,245,180,0.4)" strokeWidth="0.5" rx="1" />
          {/* Light sources */}
          {[-8, -2, 4, 10].map((lx, j) => (
            <circle key={j} cx={px + lx} cy={py - 19} r="2.5"
              fill="rgba(255,245,180,0.9)" filter="url(#lightGlow)" />
          ))}
        </g>
      ))}

      {/* TURF & SPORT labels */}
      <rect x="445" y="248" width="110" height="36" fill="rgba(10,20,10,0.85)"
        stroke="rgba(201,168,76,0.25)" strokeWidth="0.8" rx="2" />
      <text x="500" y="262" textAnchor="middle" fill="var(--gold)"
        fontFamily="Rajdhani" fontSize="10" fontWeight="700" letterSpacing="2">FIFA SYNTHETIC</text>
      <text x="500" y="278" textAnchor="middle" fill="var(--text-muted)"
        fontFamily="Rajdhani" fontSize="9" letterSpacing="1">FOOTBALL / CRICKET</text>

      {/* Cricket crease overlays (subtle) */}
      {/* Batting crease left */}
      <line x1="164" y1="220" x2="164" y2="312" stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4" />
      {/* Batting crease right */}
      <line x1="836" y1="220" x2="836" y2="312" stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4" />
      {/* Cricket pitch strip */}
      <rect x="310" y="226" width="380" height="80" fill="none"
        stroke="var(--border)" strokeWidth="0.8" strokeDasharray="6,4" />

      {/* Scoreboard */}
      <rect x="430" y="456" width="140" height="36" fill="var(--bg-card)"
        stroke="rgba(201,168,76,0.3)" strokeWidth="1" rx="2" />
      <text x="500" y="469" textAnchor="middle" fill="var(--gold)"
        fontFamily="Rajdhani" fontSize="9" fontWeight="700" letterSpacing="2">SCOREBOARD</text>
      <text x="500" y="483" textAnchor="middle" fill="#555"
        fontFamily="Rajdhani" fontSize="8">HOME 0 — 0 AWAY</text>

      {/* Changing rooms */}
      <rect x="40" y="56" width="18" height="180" fill="rgba(20,20,25,0.9)"
        stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" />
      <text x="49" y="148" textAnchor="middle" fill="rgba(201,168,76,0.4)"
        fontFamily="Rajdhani" fontSize="8" fontWeight="700" letterSpacing="1"
        transform="rotate(-90, 49, 148)">CHANGING ROOMS</text>

      {/* Legend */}
      <g transform="translate(20, 500)">
        <rect width="14" height="10" fill="#1a3a20" rx="1" />
        <text x="18" y="9" fill="var(--text-muted)" fontFamily="Rajdhani" fontSize="9" letterSpacing="1">FIFA SYNTHETIC TURF</text>
        <line x1="200" y1="5" x2="220" y2="5" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
        <text x="224" y="9" fill="var(--text-muted)" fontFamily="Rajdhani" fontSize="9" letterSpacing="1">PITCH MARKINGS</text>
        <line x1="370" y1="5" x2="390" y2="5" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x="394" y="9" fill="var(--text-muted)" fontFamily="Rajdhani" fontSize="9" letterSpacing="1">CRICKET CREASE</text>
        <circle cx="550" cy="5" r="3" fill="rgba(255,245,180,0.9)" />
        <text x="558" y="9" fill="var(--text-muted)" fontFamily="Rajdhani" fontSize="9" letterSpacing="1">FLOODLIGHTS</text>
        <text x="680" y="9" fill="rgba(201,168,76,0.35)" fontFamily="Rajdhani" fontSize="9" letterSpacing="1">HOVER / ILLUSTRATIVE LAYOUT</text>
      </g>
    </svg>
  </div>
);

const API = process.env.REACT_APP_API_URL || 'https://sports-club-2i4r.onrender.com/api';

const TurfPage = () => {
  const [weekdayPrice, setWeekdayPrice] = useState(0);
  const [weekendPrice, setWeekendPrice] = useState(0);

  useEffect(() => {
    axios.get(`${API}/pricing/`)
      .then(res => {
        const data = res.data;
        if (data.turf_weekday !== undefined) setWeekdayPrice(Number(data.turf_weekday));
        if (data.turf_weekend !== undefined) setWeekendPrice(Number(data.turf_weekend));
      })
      .catch(err => console.error("Error fetching turf prices:", err));
  }, []);

  return (
  <>
    {/* HERO */}
    <section style={{ paddingTop: '8rem', paddingBottom: '3rem', background: 'var(--bg)', borderBottom: '1px solid rgba(201,168,76,0.12)', position: 'relative', overflow: 'hidden' }}>
      <div className="bg-blob bg-blob-green" style={{ width: '400px', height: '400px', top: '-15%', right: '-5%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">Multi-Sport Turf</div>
        <h1 className="section-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <SplitText text="FOOTBALL" tag="span" delay={30} duration={0.6} textAlign="left" />
          <SplitText text="TURF" tag="span" className="gold-text" delay={30} duration={0.6} textAlign="left" />
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '640px', lineHeight: 1.8, marginTop: '1rem' }}>
          A <strong style={{ color: 'var(--gold)' }}>FIFA-quality synthetic turf</strong> built for football, cricket, and multi-sport action.
          Bright LED floodlights for evening matches, professional goal posts, and dedicated changing rooms —
          open daily from 6AM to 11PM.
        </p>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { val: '1', label: 'Full-Size Turf' },
            { val: `₹${weekdayPrice.toLocaleString('en-IN')}`, label: 'Weekday / Session' },
            { val: `₹${weekendPrice.toLocaleString('en-IN')}`, label: 'Weekend / Session' },
            { val: '17hrs', label: 'Open Daily' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.3 }}
              style={{ padding: '1rem 1.5rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.18)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: 'var(--gold)', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* AERIAL ILLUSTRATION */}
    <section style={{ padding: '4rem 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Aerial View Illustration</div>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
            TURF <span className="gold-text">LAYOUT</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '560px', lineHeight: 1.7 }}>
            Full-size FIFA-quality synthetic turf with football markings and cricket crease lines.
            Corner floodlights illuminate the entire pitch for evening sessions.
          </p>
          <div className="glass-premium" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <TurfIllustration />
          </div>
        </motion.div>
      </div>
    </section>

    {/* SPORTS CARDS */}
    <section style={{ padding: '4rem 0', background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-label">Supported Sports</div>
        <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>ONE TURF, <span className="gold-text">MANY GAMES</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              icon: '⚽', sport: 'FOOTBALL', badge: 'PRIMARY SPORT',
              color: 'var(--gold)', borderColor: 'rgba(201,168,76,0.3)',
              desc: 'Full-size synthetic football pitch with FIFA-standard markings — penalty areas, centre circle, goal arcs, and corner arcs. Professional goal posts installed.',
              features: ['FIFA-standard pitch markings', 'Full-size goal posts (both ends)', 'Penalty spot & arcs marked', 'Centre circle & halfway line', 'Supports 5-a-side to 11-a-side', 'Suitable for tournaments'],
              price: `₹${weekdayPrice.toLocaleString('en-IN')}/session`, priceNote: 'Weekday',
              price2: `₹${weekendPrice.toLocaleString('en-IN')}/session`, priceNote2: 'Weekend',
            },
            {
              icon: '🏏', sport: 'CRICKET', badge: 'MULTI-SPORT',
              color: '#52b788', borderColor: 'rgba(82,183,136,0.3)',
              desc: 'The turf doubles as a cricket ground with crease markings. Ideal for practice nets, batting drills, and friendly T20 matches with synthetic surface play.',
              features: ['Batting & bowling crease lines', 'Synthetic pitch strip', 'Ideal for batting practice', 'T20 & box cricket format', 'Rubber ball & hard ball play', 'Available on advance booking'],
              price: `₹${weekdayPrice.toLocaleString('en-IN')}/session`, priceNote: 'Weekday',
              price2: `₹${weekendPrice.toLocaleString('en-IN')}/session`, priceNote2: 'Weekend',
            },
            {
              icon: '🏢', sport: 'CORPORATE & EVENTS', badge: 'BOOKINGS',
              color: 'var(--gold-lt)', borderColor: 'rgba(232,201,122,0.3)',
              desc: 'Ideal for corporate team sports events, inter-college tournaments, school matches, and club leagues. Bulk session packages available on request.',
              features: ['Full-day turf bookings', 'Tournament hosting support', 'Scoreboard & seating area', 'Changing rooms for both teams', 'Floodlit for evening events', 'Custom packages available'],
              price: 'Contact Us', priceNote: 'Bulk bookings',
              price2: 'Custom', priceNote2: 'Packages',
            },
          ].map((sport, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }} whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
              style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: `1px solid ${sport.borderColor}`, padding: '2.5rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${sport.color}, transparent)` }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{sport.icon}</div>
                <span style={{ padding: '0.2rem 0.6rem', background: `${sport.color}18`, border: `1px solid ${sport.color}55`, fontFamily: 'Rajdhani', fontSize: '0.6rem', letterSpacing: '0.2em', color: sport.color, textTransform: 'uppercase' }}>{sport.badge}</span>
              </div>

              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.75rem' }}>{sport.sport}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{sport.desc}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                {sport.features.map((feat, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '5px', height: '5px', background: sport.color, borderRadius: '50%', flexShrink: 0, marginTop: '0.45rem' }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '0.83rem', color: 'var(--text-sub)' }}>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Pricing chips */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                <div style={{ padding: '0.3rem 0.8rem', background: `${sport.color}12`, border: `1px solid ${sport.color}40` }}>
                  <span style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', letterSpacing: '0.1em', color: sport.color, textTransform: 'uppercase' }}>{sport.price} · {sport.priceNote}</span>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-sub)' }}>
                  <span style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{sport.price2} · {sport.priceNote2}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURES GRID */}
    <section style={{ padding: '4rem 0', background: 'var(--bg-alt)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
      <div className="container">
        <div className="section-label">Turf Facilities</div>
        <h2 className="section-title" style={{ marginBottom: '3rem' }}>WORLD-CLASS <span className="gold-text">INFRASTRUCTURE</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {[
            { icon: '🟩', title: 'FIFA Synthetic Surface', desc: 'Premium quality synthetic grass — consistent bounce, low maintenance, and safe for intense play in all weather conditions.' },
            { icon: '💡', title: 'LED Floodlights', desc: 'Four-corner LED floodlight towers illuminate the entire pitch uniformly — perfect for evening and night matches.' },
            { icon: '🥅', title: 'Professional Goal Posts', desc: 'Regulation-size goal posts at both ends. Removable for cricket sessions and other multi-sport formats.' },
            { icon: '🚿', title: 'Changing Rooms', desc: 'Dedicated changing rooms for both teams — benches and shower access available.' },
            { icon: '📊', title: 'Scoreboard', desc: 'Electronic scoreboard visible from the entire field — track goals, overs, and match time in real time.' },
            { icon: '🅿️', title: 'Parking & Access', desc: 'Spacious parking on Bazzar Road. Direct turf access from the main gate at 6/518, Padappai.' },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-sub)', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.15rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>{f.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* RULES & HOURS */}
    <section style={{ padding: '2rem 0 4rem', background: 'var(--bg)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ padding: '2.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-sub)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '1rem' }}>TURF RULES</h4>
            {['Non-marking turf shoes or studs only', 'Book at least 1 hour in advance', 'No glass bottles on the turf', 'No food on the playing surface', 'Maximum 14 players per session', 'Respect the turf — no aggressive tackles'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>›</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{r}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '1rem' }}>OPERATING HOURS</h4>
            {[
              { day: 'Monday – Friday', time: '6:00 AM – 11:00 PM' },
              { day: 'Saturday', time: '5:00 AM – 11:00 PM' },
              { day: 'Sunday', time: '5:00 AM – 11:00 PM' },
              { day: 'Public Holidays', time: '6:00 AM – 9:00 PM' },
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{h.day}</span>
                <span style={{ color: 'var(--gold)', fontSize: '0.82rem', fontFamily: 'Rajdhani', fontWeight: 600 }}>{h.time}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '1rem' }}>HOW TO BOOK</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              Book online via our <span style={{ color: 'var(--gold)' }}>Book Now</span> page, or WhatsApp us directly to check availability and confirm your slot. Advance booking of at least 1 hour is required.
            </p>
            <div style={{ marginTop: '0.75rem', padding: '0.6rem 1rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', fontFamily: 'Rajdhani', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              📍 6/518, Bazzar Road, Padappai
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '2rem', padding: '3rem', background: 'linear-gradient(135deg, var(--gold-dim), var(--bg-alt))', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--text)', letterSpacing: '0.03em' }}>READY TO PLAY?</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Book your turf slot online — weekday or weekend, day or night.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/book" style={{ textDecoration: 'none' }}><button className="btn-primary">Book the Turf →</button></Link>
            <a href="https://wa.me/919080703491" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-outline" style={{ borderColor: '#25d366', color: '#25d366' }}>💬 WhatsApp</button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    <style>{`@media(max-width:768px){
      section .container > div[style*="grid-template-columns: repeat(auto-fit, minmax(300px"] { grid-template-columns: 1fr !important; }
    }`}</style>
  </>
  );
};

export default TurfPage;
