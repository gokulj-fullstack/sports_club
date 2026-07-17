import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';

/* Lightweight inline SVG icon set — no new dependency added */
const SocialIcon = ({ type }) => {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (type) {
    case 'FB':
      return (
        <svg {...common}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
      );
    case 'IG':
      return (
        <svg {...common}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
      );
    case 'YT':
      return (
        <svg {...common}><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" /></svg>
      );
    case 'WA':
      return (
        <svg {...common}><path d="M20.5 3.5A10.7 10.7 0 0 0 12.1 1C6.3 1 1.6 5.7 1.6 11.4c0 2 .5 3.9 1.5 5.5L1.5 22.5l5.8-1.5c1.6.9 3.4 1.3 5.2 1.3 5.8 0 10.5-4.7 10.5-10.4 0-2.8-1.1-5.4-3-7.4z" /><path d="M8.9 7.6c.2-.5.5-.5.7-.5h.6c.2 0 .5 0 .7.5l.9 2.1c.1.3 0 .5-.1.7l-.5.6c-.2.2-.2.4 0 .7.5.9 1.6 2 2.5 2.5.3.2.5.2.7 0l.6-.6c.2-.2.4-.2.7-.1l2 .9c.4.2.5.5.5.7v.6c0 .2 0 .6-.6.9-.6.4-1.5.6-2.3.3-1.7-.5-3.5-1.6-4.9-3-1.4-1.4-2.4-3.1-2.9-4.8-.3-.9 0-1.7.3-2.3z" fill="currentColor" stroke="none" /></svg>
      );
    default:
      return null;
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const FooterLink = ({ to, children }) => (
  <Link to={to} className="footer-link">{children}</Link>
);

const Footer = () => (
  <footer className="site-footer">
    {/* ambient top glow — purely decorative, matches hero/nav gold accent */}
    <div className="footer-glow" aria-hidden="true" />

    <div className="container">
      <motion.div
        className="footer-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.08 }}
      >

        {/* Brand */}
        <motion.div variants={fadeUp}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Logo showText={false} height="38px" />
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: 'var(--gold)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              KING SPORTS CLUB
            </div>
          </div>
          <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.4em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            GYM · TURF · BADMINTON
          </div>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '260px' }}>
            Padappai's premier multi-sport facility at 6/518, Bazzar Road. Training, competing, and winning — all in one place.
          </p>
          <div style={{ marginTop: '1.25rem' }}>
            <a href="https://maps.app.goo.gl/JDKTpVQNLLFjgsjc9" target="_blank" rel="noopener noreferrer" className="footer-meta-link">
              📍&nbsp;6/518, Bazzar Road, Padappai
            </a>
            <div className="footer-meta">📞&nbsp;+91 90807 03491</div>
          </div>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1.5rem' }}>
            {['FB', 'IG', 'YT', 'WA'].map(s => (
              <button key={s} type="button" aria-label={s} className="footer-social" onClick={e => e.preventDefault()}>
                <SocialIcon type={s} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pages */}
        <motion.div variants={fadeUp}>
          <div className="footer-heading">Pages</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[{ label: 'Home', path: '/' }, { label: 'Facilities', path: '/facilities' }, { label: 'Badminton', path: '/badminton' }, { label: 'Membership', path: '/membership' }, { label: 'Book Now', path: '/book' }, { label: 'Contact', path: '/contact' }].map(link => (
              <FooterLink key={link.path} to={link.path}>{link.label}</FooterLink>
            ))}
          </div>
        </motion.div>

        {/* Facilities */}
        <motion.div variants={fadeUp}>
          <div className="footer-heading">Facilities</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {['Fitness Gym (AC)', 'Fitness Gym (Non-AC)', 'Football Turf', 'Badminton Court 1', 'Badminton Court 2', 'Badminton Court 3'].map(item => (
              <span key={item} style={{ color: 'var(--text-sub)', fontSize: '0.88rem', lineHeight: 1.4 }}>{item}</span>
            ))}
          </div>
        </motion.div>

        {/* Hours */}
        <motion.div variants={fadeUp}>
          <div className="footer-heading">Hours</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {[
              { label: 'Mon – Fri', val: '5:00 AM – 10:00 PM' },
              { label: 'Sat – Sun', val: '5:00 AM – 11:00 PM' },
              { label: 'Holidays', val: '6:00 AM – 9:00 PM' },
            ].map((h, i) => (
              <div key={i} style={{ marginBottom: '0.4rem' }}>
                <div style={{ color: 'var(--text)', fontSize: '0.82rem', fontFamily: 'Barlow Condensed', fontWeight: 600 }}>{h.label}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{h.val}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-fine">
          © 2025 KING SPORTS CLUB. 6/518, BAZZAR ROAD, PADAPPAI. ALL RIGHTS RESERVED.
        </span>
        <span className="footer-fine">
          PRIVACY POLICY · TERMS OF USE
        </span>
      </div>
    </div>

    <style>{`
      .site-footer {
        position: relative;
        background: var(--bg-alt);
        border-top: 1px solid var(--border-sub);
        padding: 4.5rem 0 2rem;
        overflow: hidden;
        transition: background 0.4s ease;
      }
      .footer-glow {
        position: absolute;
        top: -120px; left: 50%;
        transform: translateX(-50%);
        width: 560px; height: 240px;
        background: radial-gradient(closest-side, var(--gold-glow), transparent 75%);
        opacity: 0.5;
        pointer-events: none;
        filter: blur(10px);
      }
      .footer-grid {
        display: grid;
        grid-template-columns: 1.8fr 1fr 1fr 1fr;
        gap: 3rem;
        margin-bottom: 3rem;
        position: relative;
        z-index: 1;
      }
      .footer-heading {
        font-family: 'Barlow Condensed', sans-serif;
        font-weight: 700;
        font-size: 0.75rem;
        letter-spacing: 0.3em;
        color: var(--gold);
        text-transform: uppercase;
        margin-bottom: 1.25rem;
      }
      .footer-link {
        color: var(--text-sub);
        font-size: 0.88rem;
        text-decoration: none;
        width: fit-content;
        position: relative;
        transition: color 0.25s var(--ease-out);
      }
      .footer-link::after {
        content: '';
        position: absolute;
        left: 0; bottom: -3px;
        width: 100%; height: 1px;
        background: var(--gold);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.35s var(--ease-out);
      }
      .footer-link:hover { color: var(--gold); }
      .footer-link:hover::after { transform: scaleX(1); }

      .footer-meta-link, .footer-meta {
        display: block;
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 0.8rem;
        color: var(--text-muted);
        letter-spacing: 0.08em;
        text-decoration: none;
        transition: color 0.2s ease;
      }
      .footer-meta { margin-top: 0.3rem; }
      .footer-meta-link:hover { color: var(--gold); }

      .footer-social {
        width: 38px; height: 38px;
        display: flex; align-items: center; justify-content: center;
        border: 1px solid var(--border);
        border-radius: 50%;
        color: var(--text-muted);
        background: var(--bg-card);
        backdrop-filter: blur(6px);
        transition: transform 0.35s var(--ease-spring), border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
      }
      .footer-social:hover {
        color: var(--gold);
        border-color: var(--gold);
        box-shadow: var(--shadow-gold);
        transform: translateY(-3px);
      }

      .footer-bottom {
        border-top: 1px solid var(--border-sub);
        padding-top: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .footer-fine {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 0.75rem;
        color: var(--text-muted);
        letter-spacing: 0.1em;
      }

      @media(max-width:900px){ .footer-grid{grid-template-columns:1fr 1fr!important;} }
      @media(max-width:480px){ .footer-grid{grid-template-columns:1fr!important;} .footer-glow{width:320px;} }
    `}</style>
  </footer>
);

export default Footer;
