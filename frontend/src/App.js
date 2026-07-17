import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Logo from './components/Logo';

import HomePage from './pages/HomePage';
import FacilitiesPage from './pages/FacilitiesPage';
import BadmintonPage from './pages/BadmintonPage';
import MembershipPage from './pages/MembershipPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import GymPage from './pages/GymPage';
import TurfPage from './pages/TurfPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './index.css';

// Branded shimmer shown while a lazy page chunk is loading
const PageFallback = () => (
  <div style={{
    minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{ width: '160px', height: '2px', background: 'var(--border)', position: 'relative', overflow: 'hidden', borderRadius: '2px' }}>
      <motion.div
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
      />
    </div>
  </div>
);


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '44px', height: '44px', background: 'var(--gold)', color: 'var(--on-gold)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Loader = ({ onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 800); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.6 }}
      style={{ position: 'fixed', inset: 0, background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Logo showText={false} height="120px" style={{ marginBottom: '2.5rem' }} />
        <div style={{ fontFamily: 'Bebas Neue', fontSize: '3.5rem', color: 'var(--gold)', letterSpacing: '0.08em', textAlign: 'center', lineHeight: 1 }}>
          KING SPORTS CLUB
        </div>
        <div style={{ fontFamily: 'Rajdhani', fontSize: '0.65rem', letterSpacing: '0.55em', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.6rem', textTransform: 'uppercase' }}>
          GYM · TURF · BADMINTON
        </div>
        <div style={{ fontFamily: 'Rajdhani', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.3rem' }}>
          6/518, Bazzar Road, Padappai
        </div>
      </motion.div>
      <div style={{ marginTop: '3rem', width: '220px', height: '1px', background: 'var(--border)', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.8, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      </div>
    </motion.div>
  );
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/* Fixed, site-wide film-grain + vignette layer — sits above every page so the
   "premium studio" texture is consistent on every route, not just the hero. */
const GlobalAtmosphere = () => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none',
  }}>
    {/* subtle vignette for depth */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.10) 100%)',
    }} />
    {/* fine grain, blended so it never washes out either theme */}
    <div style={{
      position: 'absolute', inset: 0,
      opacity: 0.03, mixBlendMode: 'overlay',
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }} />
  </div>
);

function AppContent() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <GlobalAtmosphere />
      <Navbar />
      <PageTransition>
        <Suspense fallback={<PageFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/gym" element={<GymPage />} />
            <Route path="/turf" element={<TurfPage />} />
            <Route path="/badminton" element={<BadmintonPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </PageTransition>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onDone={() => setLoading(false)} />
        ) : (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <AppContent />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
