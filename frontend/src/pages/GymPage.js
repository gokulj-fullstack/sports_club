import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitText from '../components/SplitText';

/* ─────────────────────────────────────────────
   SVG GYM FLOOR ILLUSTRATION
   Split view: AC section (left) + Non-AC (right)
────────────────────────────────────────────── */
const GymFloorIllustration = () => (
  <div style={{ width: '100%', overflowX: 'auto' }}>
    <svg
      viewBox="0 0 1000 460"
      style={{ width: '100%', maxWidth: '1000px', display: 'block', margin: '0 auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="gymFloor" patternUnits="userSpaceOnUse" width="40" height="40">
          <rect width="40" height="40" fill="#1a1410" />
          <rect width="20" height="20" fill="#1e1812" />
          <rect x="20" y="20" width="20" height="20" fill="#1e1812" />
        </pattern>
        <pattern id="rubberFloor" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill="#1c1410" />
          <circle cx="5" cy="5" r="1" fill="rgba(201,168,76,0.06)" />
        </pattern>
        <linearGradient id="gymBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0b08" />
          <stop offset="100%" stopColor="#080604" />
        </linearGradient>
        <linearGradient id="acGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(100,160,255,0.06)" />
          <stop offset="100%" stopColor="rgba(100,160,255,0.01)" />
        </linearGradient>
        <linearGradient id="nonacGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(201,168,76,0.04)" />
          <stop offset="100%" stopColor="rgba(201,168,76,0.08)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.8)" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="1000" height="460" fill="url(#gymBg)" />

      {/* Title */}
      <text x="500" y="28" textAnchor="middle" fill="var(--gold)"
        fontFamily="'Bebas Neue', sans-serif" fontSize="17" letterSpacing="5">
        KING SPORTS CLUB — GYM FLOOR PLAN
      </text>
      <text x="500" y="44" textAnchor="middle" fill="rgba(201,168,76,0.4)"
        fontFamily="Rajdhani, sans-serif" fontSize="10" letterSpacing="3">
        AC SECTION · NON-AC SECTION · PADAPPAI
      </text>

      {/* ── AC SECTION (left) ── */}
      <rect x="30" y="56" width="450" height="372" fill="url(#gymFloor)"
        stroke="rgba(100,160,255,0.18)" strokeWidth="1" />
      <rect x="30" y="56" width="450" height="372" fill="url(#acGrad)" />

      {/* AC label banner */}
      <rect x="30" y="56" width="450" height="28" fill="rgba(100,160,255,0.08)"
        stroke="rgba(100,160,255,0.2)" strokeWidth="0.5" />
      <text x="255" y="74" textAnchor="middle" fill="#64a0ff"
        fontFamily="Rajdhani, sans-serif" fontSize="12" fontWeight="700" letterSpacing="4">
        AC GYM SECTION
      </text>
      {/* AC unit icons */}
      {[80, 200, 330, 440].map((x, i) => (
        <g key={i}>
          <rect x={x} y="88" width="38" height="14" fill="rgba(100,160,255,0.12)"
            stroke="rgba(100,160,255,0.3)" strokeWidth="0.5" rx="2" />
          <text x={x + 19} y="98" textAnchor="middle" fill="#64a0ff"
            fontFamily="Rajdhani" fontSize="7" letterSpacing="1">AC UNIT</text>
        </g>
      ))}

      {/* Cardio machines row */}
      <text x="255" y="122" textAnchor="middle" fill="rgba(201,168,76,0.5)"
        fontFamily="Rajdhani" fontSize="9" letterSpacing="3">CARDIO ZONE</text>
      {[50, 120, 190, 260, 330, 400].map((x, i) => (
        <g key={i}>
          <rect x={x} y="128" width="50" height="60" fill="rgba(40,40,60,0.9)"
            stroke="rgba(100,160,255,0.25)" strokeWidth="0.8" rx="3" />
          <rect x={x + 6} y="134" width="38" height="28" fill="rgba(100,160,255,0.08)"
            stroke="rgba(100,160,255,0.2)" strokeWidth="0.5" rx="2" />
          <text x={x + 25} y="175" textAnchor="middle" fill="var(--text-muted)"
            fontFamily="Rajdhani" fontSize="8">
            {['TREADMILL', 'BIKE', 'ELLIPTIC', 'TREADMILL', 'ROWING', 'STEPPER'][i]}
          </text>
        </g>
      ))}

      {/* Cable & machine row */}
      <line x1="30" y1="202" x2="480" y2="202" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <text x="255" y="220" textAnchor="middle" fill="rgba(201,168,76,0.5)"
        fontFamily="Rajdhani" fontSize="9" letterSpacing="3">MACHINE ZONE</text>
      {[50, 138, 226, 314, 402].map((x, i) => (
        <g key={i}>
          <rect x={x} y="228" width="64" height="56" fill="rgba(35,30,25,0.95)"
            stroke="rgba(201,168,76,0.2)" strokeWidth="0.8" rx="3" />
          <rect x={x + 8} y="236" width="48" height="32" fill="rgba(201,168,76,0.05)"
            stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" rx="2" />
          <circle cx={x + 32} cy={x % 3 === 0 ? 276 : 275} r="6" fill="rgba(201,168,76,0.15)"
            stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" />
          <text x={x + 32} y="294" textAnchor="middle" fill="var(--text-muted)"
            fontFamily="Rajdhani" fontSize="7.5">
            {['CHEST PRESS', 'LAT PULL', 'LEG PRESS', 'SHOULDER', 'CABLE'][i]}
          </text>
        </g>
      ))}

      {/* Free weights / dumbbell rack */}
      <line x1="30" y1="302" x2="480" y2="302" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <text x="255" y="322" textAnchor="middle" fill="rgba(201,168,76,0.5)"
        fontFamily="Rajdhani" fontSize="9" letterSpacing="3">FREE WEIGHTS (AC)</text>
      <rect x="50" y="330" width="400" height="42" fill="rgba(30,25,20,0.95)"
        stroke="rgba(201,168,76,0.15)" strokeWidth="0.8" rx="2" />
      {[70, 115, 160, 205, 250, 295, 340, 385, 430].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy="348" rx="12" ry="6" fill="rgba(80,80,90,0.9)"
            stroke="rgba(201,168,76,0.25)" strokeWidth="0.6" />
          <text x={x} y="353" textAnchor="middle" fill="#555" fontFamily="Rajdhani" fontSize="7">
            {[2, 4, 6, 8, 10, 12, 15, 20, 25][i]}
          </text>
        </g>
      ))}

      {/* AC mirror wall */}
      <rect x="30" y="382" width="450" height="6" fill="rgba(200,220,255,0.06)"
        stroke="rgba(200,220,255,0.15)" strokeWidth="0.5" />
      <text x="255" y="396" textAnchor="middle" fill="rgba(200,220,255,0.3)"
        fontFamily="Rajdhani" fontSize="8" letterSpacing="2">MIRROR WALL</text>
      {/* Locker rooms removed */}

      {/* Divider wall */}
      <rect x="488" y="56" width="16" height="372" fill="#111"
        stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
      <text x="496" y="245" textAnchor="middle" fill="rgba(201,168,76,0.4)"
        fontFamily="Rajdhani" fontSize="9" fontWeight="700" letterSpacing="2"
        transform="rotate(-90, 496, 245)">PARTITION WALL</text>

      {/* ── NON-AC SECTION (right) ── */}
      <rect x="512" y="56" width="458" height="372" fill="url(#rubberFloor)"
        stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
      <rect x="512" y="56" width="458" height="372" fill="url(#nonacGrad)" />

      {/* Non-AC label banner */}
      <rect x="512" y="56" width="458" height="28" fill="rgba(201,168,76,0.06)"
        stroke="rgba(201,168,76,0.18)" strokeWidth="0.5" />
      <text x="741" y="74" textAnchor="middle" fill="var(--gold)"
        fontFamily="Rajdhani, sans-serif" fontSize="12" fontWeight="700" letterSpacing="4">
        NON-AC STRENGTH SECTION
      </text>

      {/* Power rack / squat racks */}
      <text x="741" y="106" textAnchor="middle" fill="rgba(201,168,76,0.45)"
        fontFamily="Rajdhani" fontSize="9" letterSpacing="3">POWER ZONE</text>
      {[530, 660, 790, 910].map((x, i) => (
        <g key={i}>
          <rect x={x} y="112" width="70" height="80" fill="rgba(30,25,20,0.95)"
            stroke="rgba(201,168,76,0.3)" strokeWidth="1" rx="2" />
          {/* Rack uprights */}
          <rect x={x + 8} y="116" width="8" height="72" fill="#222" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
          <rect x={x + 54} y="116" width="8" height="72" fill="#222" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
          {/* Barbell */}
          <line x1={x + 4} y1="152" x2={x + 66} y2="152" stroke="var(--text-muted)" strokeWidth="4" />
          <ellipse cx={x + 4} cy="152" rx="5" ry="11" fill="rgba(120,80,30,0.8)"
            stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
          <ellipse cx={x + 66} cy="152" rx="5" ry="11" fill="rgba(120,80,30,0.8)"
            stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
          <text x={x + 35} y="206" textAnchor="middle" fill="#555"
            fontFamily="Rajdhani" fontSize="8">
            {['SQUAT RACK', 'BENCH PRESS', 'DEADLIFT', 'PULL-UP'][i]}
          </text>
        </g>
      ))}

      {/* Heavy dumbbell rack */}
      <line x1="512" y1="206" x2="970" y2="206" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <text x="741" y="226" textAnchor="middle" fill="rgba(201,168,76,0.45)"
        fontFamily="Rajdhani" fontSize="9" letterSpacing="3">HEAVY FREE WEIGHTS</text>
      <rect x="530" y="234" width="420" height="52" fill="rgba(25,20,15,0.95)"
        stroke="rgba(201,168,76,0.18)" strokeWidth="0.8" rx="2" />
      {[555, 605, 655, 705, 755, 805, 855, 905, 940].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy="258" rx="15" ry="8" fill="rgba(70,60,50,0.9)"
            stroke="rgba(201,168,76,0.3)" strokeWidth="0.7" />
          <text x={x} y="263" textAnchor="middle" fill="var(--text-muted)" fontFamily="Rajdhani" fontSize="8">
            {[15, 20, 25, 30, 35, 40, 45, 50, 55][i]}
          </text>
        </g>
      ))}

      {/* Functional / cable section */}
      <line x1="512" y1="298" x2="970" y2="298" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <text x="741" y="318" textAnchor="middle" fill="rgba(201,168,76,0.45)"
        fontFamily="Rajdhani" fontSize="9" letterSpacing="3">FUNCTIONAL TRAINING ZONE</text>
      {[530, 640, 750, 860].map((x, i) => (
        <g key={i}>
          <rect x={x} y="324" width="80" height="52" fill="rgba(28,22,16,0.95)"
            stroke="rgba(201,168,76,0.18)" strokeWidth="0.8" rx="3" />
          <rect x={x + 10} y="330" width="60" height="30" fill="rgba(201,168,76,0.04)"
            stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" rx="2" />
          <text x={x + 40} y="388" textAnchor="middle" fill="#555"
            fontFamily="Rajdhani" fontSize="8">
            {['CABLE CROSS', 'BATTLE ROPE', 'PULL-UP BAR', 'DUMBBELL'][i]}
          </text>
        </g>
      ))}

      {/* Floor markings */}
      <rect x="512" y="386" width="458" height="6" fill="rgba(201,168,76,0.04)"
        stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
      <text x="741" y="400" textAnchor="middle" fill="rgba(201,168,76,0.25)"
        fontFamily="Rajdhani" fontSize="8" letterSpacing="2">RUBBER FLOOR · ANTI-SLIP</text>

      {/* Personal trainer area */}
      <rect x="530" y="406" width="200" height="18" fill="rgba(201,168,76,0.05)"
        stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" rx="2" />
      <text x="630" y="418" textAnchor="middle" fill="var(--text-muted)"
        fontFamily="Rajdhani" fontSize="8" letterSpacing="2">PERSONAL TRAINER ZONE</text>

      {/* Legend */}
      <g transform="translate(20, 442)">
        <rect width="12" height="10" fill="url(#gymFloor)" rx="1" />
        <text x="16" y="9" fill="var(--text-muted)" fontFamily="Rajdhani" fontSize="9" letterSpacing="1">AC FLOORING</text>
        <rect x="140" width="12" height="10" fill="url(#rubberFloor)" rx="1" />
        <text x="156" y="9" fill="var(--text-muted)" fontFamily="Rajdhani" fontSize="9" letterSpacing="1">RUBBER FLOORING</text>
        <rect x="310" width="12" height="10" fill="rgba(100,160,255,0.1)"
          stroke="rgba(100,160,255,0.3)" strokeWidth="0.5" rx="1" />
        <text x="326" y="9" fill="var(--text-muted)" fontFamily="Rajdhani" fontSize="9" letterSpacing="1">AC ZONE</text>
        <rect x="430" width="12" height="10" fill="rgba(201,168,76,0.1)"
          stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" rx="1" />
        <text x="446" y="9" fill="var(--text-muted)" fontFamily="Rajdhani" fontSize="9" letterSpacing="1">STRENGTH ZONE</text>
        <text x="620" y="9" fill="rgba(201,168,76,0.35)" fontFamily="Rajdhani" fontSize="9" letterSpacing="1">ILLUSTRATIVE LAYOUT</text>
      </g>
    </svg>
  </div>
);

const GymPage = () => (
  <>
    {/* HERO */}
    <section style={{ paddingTop: '8rem', paddingBottom: '3rem', background: 'var(--bg)', borderBottom: '1px solid rgba(201,168,76,0.12)', position: 'relative', overflow: 'hidden' }}>
      <div className="bg-blob bg-blob-blue" style={{ width: '360px', height: '360px', top: '-10%', right: '5%' }} />
      <div className="bg-blob bg-blob-gold" style={{ width: '300px', height: '300px', bottom: '-20%', left: '-5%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">Fitness Centre</div>
        <h1 className="section-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <SplitText text="FITNESS" tag="span" delay={30} duration={0.6} textAlign="left" />
          <SplitText text="GYM" tag="span" className="gold-text" delay={30} duration={0.6} textAlign="left" />
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '640px', lineHeight: 1.8, marginTop: '1rem' }}>
          Two dedicated gym floors — a <strong style={{ color: '#64a0ff' }}>premium air-conditioned</strong> cardio and machine zone,
          and a <strong style={{ color: 'var(--gold)' }}>heavy-duty non-AC strength floor</strong> — both open daily from 5AM to 10PM.
          Trained staff on site at all times.
        </p>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { val: '2', label: 'Gym Floors' },
            { val: '₹4,500', label: 'Non-AC / Year' },
            { val: '₹6,000', label: 'AC / Year' },
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

    {/* FLOOR PLAN ILLUSTRATION */}
    <section style={{ padding: '4rem 0', background: 'var(--bg)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Floor Plan</div>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
            GYM <span className="gold-text">LAYOUT</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '560px', lineHeight: 1.7 }}>
            AC section on the left with premium cardio machines and air conditioning.
            Non-AC strength section on the right with heavy free weights and power racks.
          </p>
          <div className="glass-premium" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <GymFloorIllustration />
          </div>
        </motion.div>
      </div>
    </section>

    {/* TWO GYM FLOOR CARDS */}
    <section style={{ padding: '4rem 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="section-label">Choose Your Floor</div>
        <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>AC VS <span className="gold-text">NON-AC</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              badge: 'AC GYM', accentColor: '#64a0ff', borderColor: 'rgba(100,160,255,0.3)',
              icon: '❄️', title: 'Fitness Gym — AC',
              yearly: '₹6,000',
              tag: 'Cool & Premium',
              desc: 'Beat the heat while you train. Our air-conditioned floor features premium cardio machines, weight stations, free weights, and a mirror wall — all in a cool, focused environment.',
              features: [
                'Full cardio zone — treadmills, bikes, ellipticals, rowers',
                'Premium strength machines (chest, lat, leg, shoulder)',
                'Free weights 2–25 kg',
                'AC environment all year round',
                'Mirror wall for form checks',
                'Personal training available',
                '5:00 AM – 10:00 PM daily',
              ],
            },
            {
              badge: 'NON-AC GYM', accentColor: 'var(--gold)', borderColor: 'rgba(201,168,76,0.3)',
              icon: '💪', title: 'Fitness Gym — Non-AC',
              yearly: '₹4,500',
              tag: 'Power & Strength',
              desc: 'Train hard in our heavy-duty non-AC strength floor. Built for serious lifters — power racks, barbells, heavy dumbbells, and a full functional training zone.',
              features: [
                'Squat racks, bench press, deadlift stations',
                'Pull-up & dip bars',
                'Heavy dumbbells 15–55 kg',
                'Cable cross & functional training zone',
                'Battle ropes & resistance bands',
                'Rubber anti-slip flooring',
                'Personal training available',
                '5:00 AM – 10:00 PM daily',
              ],
            },
          ].map((gym, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }} whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
              style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-alt))', border: `1px solid ${gym.borderColor}`, padding: '2.5rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${gym.accentColor}, transparent)` }} />

              {/* Badge */}
              <div style={{ display: 'inline-block', padding: '0.2rem 0.7rem', background: `rgba(${i === 0 ? '100,160,255' : '201,168,76'},0.1)`, border: `1px solid ${gym.borderColor}`, fontFamily: 'Rajdhani', fontSize: '0.65rem', letterSpacing: '0.2em', color: gym.accentColor, textTransform: 'uppercase', marginBottom: '1rem' }}>{gym.badge}</div>

              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{gym.icon}</div>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.3rem' }}>{gym.title}</h3>
              <div style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', color: gym.accentColor, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>{gym.tag}</div>

              {/* Pricing */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ padding: '0.5rem 1rem', background: `rgba(${i === 0 ? '100,160,255' : '201,168,76'},0.08)`, border: `1px solid ${gym.borderColor}` }}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', color: gym.accentColor, lineHeight: 1 }}>{gym.yearly}</div>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>per year</div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{gym.desc}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                {gym.features.map((feat, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '5px', height: '5px', background: gym.accentColor, borderRadius: '50%', flexShrink: 0, marginTop: '0.45rem' }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '0.84rem', color: 'var(--text-sub)' }}>{feat}</span>
                  </div>
                ))}
              </div>

              <Link to="/book" style={{ textDecoration: 'none', display: 'block', marginTop: 'auto' }}>
                <button style={{ width: '100%', padding: '0.9rem', background: i === 0 ? 'rgba(100,160,255,0.12)' : 'var(--gold)', color: i === 0 ? '#64a0ff' : 'var(--bg)', border: i === 0 ? '1px solid rgba(100,160,255,0.35)' : 'none', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}>
                  Join This Floor →
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURES GRID */}
    <section style={{ padding: '4rem 0', background: 'var(--bg-alt)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
      <div className="container">
        <div className="section-label">Why Train With Us</div>
        <h2 className="section-title" style={{ marginBottom: '3rem' }}>EVERYTHING <span className="gold-text">YOU NEED</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {[
            { icon: '🏋️', title: 'State-of-the-Art Equipment', desc: 'Commercial-grade machines from trusted brands — maintained and serviced regularly for safe, effective workouts.' },
            { icon: '👨‍🏫', title: 'Certified Trainers', desc: 'Personal training sessions available with certified coaches — customised plans for weight loss, muscle gain, or sports performance.' },

            { icon: '📱', title: 'Flexible Memberships', desc: 'Annual and monthly plans with no hidden fees. Pause or switch floors any time with prior notice.' },
            { icon: '🌡️', title: 'Dual Environment', desc: 'One gym, two climates — choose the refreshing AC section or the raw, high-energy non-AC strength floor.' },
            { icon: '📹', title: 'Safe & Monitored', desc: 'CCTV throughout both floors and on-site staff ensuring a safe, respectful training environment.' },
          ].map((f, i) => (
            <motion.div key={i} className="glass-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              style={{ padding: '1.5rem', transformStyle: 'preserve-3d' }}>
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
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '1rem' }}>GYM RULES</h4>
            {['Proper athletic footwear required', 'Re-rack weights after use', 'Wipe equipment with cloth after use', 'No dropping weights on the floor', 'Respect other members — no hogging machines', 'Towel use recommended'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>›</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{r}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '1rem' }}>OPERATING HOURS</h4>
            {[
              { day: 'Monday – Friday', time: '5:00 AM – 10:00 PM' },
              { day: 'Saturday', time: '5:00 AM – 10:00 PM' },
              { day: 'Sunday', time: '6:00 AM – 9:00 PM' },
              { day: 'Public Holidays', time: '6:00 AM – 9:00 PM' },
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{h.day}</span>
                <span style={{ color: 'var(--gold)', fontSize: '0.82rem', fontFamily: 'Rajdhani', fontWeight: 600 }}>{h.time}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '1rem' }}>WHAT TO BRING</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              Wear proper athletic shoes and comfortable workout clothes. Bring a <span style={{ color: 'var(--text)' }}>water bottle</span> and a <span style={{ color: 'var(--text)' }}>small towel</span>. Changing rooms are available on-site.
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
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--text)', letterSpacing: '0.03em' }}>READY TO START TRAINING?</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Join King Sports Club gym — AC or Non-AC, pick your floor and start today.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/book" style={{ textDecoration: 'none' }}><button className="btn-primary">Join Now →</button></Link>
            <a href="https://wa.me/919080703491" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-outline" style={{ borderColor: '#25d366', color: '#25d366' }}>💬 WhatsApp</button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    <style>{`@media(max-width:768px){
      section .container > div[style*="grid-template-columns: repeat(auto-fit, minmax(320px"] { grid-template-columns: 1fr !important; }
    }`}</style>
  </>
);

export default GymPage;
