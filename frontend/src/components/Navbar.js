import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [userName, setUserName] = useState(() => localStorage.getItem('user_name') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('access_token')));
  const [arenasOpen, setArenasOpen] = useState(false);

  const navigate = useNavigate();
  const arenasRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (arenasRef.current && !arenasRef.current.contains(e.target)) {
        setArenasOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setArenasOpen(false);
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
    window.dispatchEvent(new Event('auth:updated'));
    navigate('/');
  };

  const primaryLinks = [
    { label: 'Home', href: '/' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Membership', href: '/membership' },
  ];

  const arenaLinks = [
    { label: 'Fitness Gym', href: '/gym' },
    { label: 'Football Turf', href: '/turf' },
    { label: 'Badminton Courts', href: '/badminton' },
  ];

  return (
    <div className="simple-nav-container">
      <nav className="simple-nav">
        <Link to="/" className="simple-nav-logo">
          <Logo showText={false} height="32px" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="nav-logo-title" style={{ fontFamily: 'Bebas Neue', fontSize: '1.25rem', color: 'var(--gold)', letterSpacing: '0.05em', lineHeight: 1 }}>KING SPORTS CLUB</span>
            <span className="nav-logo-sub" style={{ fontFamily: 'Barlow Condensed', fontSize: '0.45rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.1rem' }}>Gym · Turf · Badminton</span>
          </div>
        </Link>

        <div className="simple-nav-links">
          {primaryLinks.map(link => (
            <Link key={link.href} to={link.href} className="simple-nav-link">
              {link.label}
            </Link>
          ))}

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
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="simple-nav-link">Contact</Link>
        </div>

        <div className="simple-nav-right">
          {isLoggedIn ? (
            <>
              <Link to="/book" className="card-nav-cta-button" style={{ textDecoration: 'none' }}>
                Book Now
              </Link>
              <button onClick={handleLogout} className="simple-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Logout ({userName || 'Member'})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="simple-nav-link">Login</Link>
              <Link to="/book" className="card-nav-cta-button" style={{ textDecoration: 'none' }}>
                Book Now
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
