import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [userName, setUserName] = useState(() => localStorage.getItem('user_name') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('access_token')));
  const [arenasOpen, setArenasOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileArenasOpen, setMobileArenasOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const arenasRef = useRef(null);

  // Scroll listener to toggle transparent/blur header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileArenasOpen(false);
    setArenasOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const syncAuthState = () => {
      const storedName = localStorage.getItem('user_name') || '';
      setUserName(storedName);
      setIsLoggedIn(Boolean(localStorage.getItem('access_token')));
    };
    window.addEventListener('auth:updated', syncAuthState);
    syncAuthState();
    return () => window.removeEventListener('auth:updated', syncAuthState);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (arenasRef.current && !arenasRef.current.contains(e.target)) {
        setArenasOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') { setArenasOpen(false); setMobileOpen(false); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    setUserName('');
    setMobileOpen(false);
    window.dispatchEvent(new Event('auth:updated'));
    navigate('/');
  };

  const arenaLinks = [
    { label: 'Fitness Gym', href: '/gym', icon: '🏋️' },
    { label: 'Football Turf', href: '/turf', icon: '⚽' },
    { label: 'Badminton Courts', href: '/badminton', icon: '🏸' },
  ];

  return (
    <>
      <div className={`simple-nav-container ${scrolled ? 'simple-nav-scrolled' : ''}`}>
        <nav className="simple-nav">
          {/* Logo */}
          <Link to="/" className="simple-nav-logo">
            <Logo showText={false} height="32px" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="nav-logo-title" style={{ fontFamily: 'Bebas Neue', fontSize: '1.25rem', color: 'var(--gold)', letterSpacing: '0.05em', lineHeight: 1 }}>KING SPORTS CLUB</span>
              <span className="nav-logo-sub" style={{ fontFamily: 'Barlow Condensed', fontSize: '0.45rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.1rem' }}>Gym · Turf · Badminton</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="simple-nav-links">
            <Link to="/" className="simple-nav-link">Home</Link>
            <Link to="/facilities" className="simple-nav-link">Facilities</Link>
            <Link to="/membership" className="simple-nav-link">Membership</Link>

            <div className="simple-nav-dropdown" ref={arenasRef}>
              <button
                className="simple-nav-link simple-nav-dropdown-trigger"
                onClick={() => setArenasOpen(o => !o)}
                aria-expanded={arenasOpen}
                aria-haspopup="true"
              >
                Arenas
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: '5px', transform: arenasOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                  <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {arenasOpen && (
                <div className="simple-nav-dropdown-menu">
                  {arenaLinks.map(link => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="simple-nav-dropdown-item"
                      onClick={() => setArenasOpen(false)}
                    >
                      <span style={{ marginRight: '0.5rem' }}>{link.icon}</span>{link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" className="simple-nav-link">Contact</Link>
          </div>

          {/* Desktop right */}
          <div className="simple-nav-right">
            {isLoggedIn ? (
              <>
                <Link to="/book" className="card-nav-cta-button" style={{ textDecoration: 'none' }}>Book Now</Link>
                <button onClick={handleLogout} className="simple-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="simple-nav-link">Login</Link>
                <Link to="/book" className="card-nav-cta-button" style={{ textDecoration: 'none' }}>Book Now</Link>
              </>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className={`nav-hamburger-bar ${mobileOpen ? 'bar-top-open' : ''}`} />
            <span className={`nav-hamburger-bar ${mobileOpen ? 'bar-mid-open' : ''}`} />
            <span className={`nav-hamburger-bar ${mobileOpen ? 'bar-bot-open' : ''}`} />
          </button>
        </nav>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="nav-mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={`nav-mobile-drawer ${mobileOpen ? 'nav-mobile-drawer-open' : ''}`}>
        <div className="nav-mobile-links">

          <Link to="/" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
            <span>🏠</span> Home
          </Link>
          <Link to="/facilities" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
            <span>🏟️</span> Facilities
          </Link>
          <Link to="/membership" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
            <span>💳</span> Membership
          </Link>

          {/* Arenas accordion */}
          <button
            className="nav-mobile-link nav-mobile-accordion"
            onClick={() => setMobileArenasOpen(o => !o)}
          >
            <span>🏆</span>
            <span style={{ flex: 1, textAlign: 'left' }}>Arenas</span>
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" style={{ transform: mobileArenasOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }}>
              <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {mobileArenasOpen && (
            <div className="nav-mobile-sub">
              {arenaLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="nav-mobile-sub-link"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{link.icon}</span> {link.label}
                </Link>
              ))}
            </div>
          )}

          <Link to="/contact" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
            <span>📞</span> Contact
          </Link>

          {/* Divider */}
          <div className="nav-mobile-divider" />

          {isLoggedIn ? (
            <>
              <Link to="/book" className="nav-mobile-cta" onClick={() => setMobileOpen(false)}>
                🎯 Book Now
              </Link>
              <button className="nav-mobile-logout" onClick={handleLogout}>
                Logout {userName ? `(${userName})` : ''}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
                <span>👤</span> Login
              </Link>
              <Link to="/book" className="nav-mobile-cta" onClick={() => setMobileOpen(false)}>
                🎯 Book Now
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
