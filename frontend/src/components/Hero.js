import React from 'react';
import { motion } from 'framer-motion';
import Spotlight from './ui/Spotlight';
import CourtBackdrop from './CourtBackdrop';

const Hero = () => {
  const scrollTo = id => { const el = document.getElementById(id); if(el) el.scrollIntoView({ behavior:'smooth' }); };

  return (
    <section id="home" style={{
      position:'relative', minHeight:'100vh', width:'100%', overflow:'hidden',
      background: '#050505',
    }}>

      {/* ── Professional court-themed backdrop: gradient + faint court lines + gold glow ── */}
      <CourtBackdrop />



      {/* ── Cursor-follow spotlight glow, gold, over the whole hero ── */}
      <Spotlight size={340} color="rgba(201, 168, 76, 0.30)" />

      {/* ══════════ HERO CONTENT ══════════ */}
      <div className="hero-content-wrap" style={{ zIndex:3 }}>
        <div className="hero-container-layout">
          <div className="hero-grid">
            
            {/* Left Column: Text & CTAs */}
            <div className="hero-left">
              <motion.div initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.15 }}>
                
                {/* Eyebrow */}
                <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:0.1 }}
                  style={{ display:'flex', alignItems:'center', gap:'0.9rem', marginBottom:'1.2rem' }}>
                  <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.5, delay:0.3 }}
                    style={{ width:'36px', height:'2px', background:'#c9a84c', transformOrigin:'left', flexShrink:0 }} />
                  <span style={{ fontFamily:'Barlow Condensed', fontSize:'0.85rem', fontWeight:600, letterSpacing:'0.5em', color:'#c9a84c', textTransform:'uppercase' }}>
                    Padappai's Premier Sports Hub
                  </span>
                </motion.div>

                {/* Headline */}
                <h1 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', fontWeight: 700, fontStyle: 'normal', lineHeight: 1.05, marginBottom: '1.8rem', letterSpacing: '0.04em', color: '#f5f5f5' }}>
                  <motion.span initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.65 }}
                    style={{ display:'block', textShadow:'0 0 60px rgba(201,168,76,0.18)' }}>
                    TRAIN
                  </motion.span>
                  <motion.span initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5, duration:0.65 }}
                    style={{ display:'block', WebkitTextStroke:'2px #c9a84c', color:'transparent' }}>
                    COMPETE
                  </motion.span>
                  <motion.span initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.7, duration:0.65 }}
                    style={{ display:'block', textShadow:'0 0 60px rgba(201,168,76,0.12)' }}>
                    DOMINATE
                  </motion.span>
                </h1>

                {/* Subtext */}
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
                  style={{ fontFamily:'Barlow Condensed', fontWeight:400, fontSize:'clamp(1rem, 2vw, 1.15rem)', color:'rgba(220,220,220,0.8)', maxWidth:'440px', lineHeight:1.75, marginBottom:'2rem', letterSpacing:'0.03em' }}>
                  Premium <strong style={{ color:'#c9a84c', fontWeight:600 }}>Gym</strong>,{' '}
                  <strong style={{ color:'#2da44e', fontWeight:600 }}>Football Turf</strong> &amp;{' '}
                  <strong style={{ color:'#1e90ff', fontWeight:600 }}>3 Badminton Courts</strong>.{' '}
                  6/518, Bazzar Road, Padappai.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.05 }}
                  className="hero-ctas">
                  <button className="btn-primary" onClick={() => scrollTo('book-now')}>Book a Session ↗</button>
                  <button className="btn-outline" onClick={() => scrollTo('facilities')}>View Facilities</button>
                </motion.div>

                {/* Facility Chips */}
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
                  className="hero-chips">
                  {[
                    { icon:'🏋️', label:'AC + Non-AC Gym', color:'#c9a84c' },
                    { icon:'⚽', label:'Football Turf', color:'#2da44e' },
                    { icon:'🏸', label:'3 Badminton Courts', color:'#1e90ff' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.3rem 0.8rem',
                      background:`${item.color}10`, border:`1px solid ${item.color}35`,
                      fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.78rem',
                      letterSpacing:'0.12em', color:`${item.color}dd`, textTransform:'uppercase',
                    }}>
                      <span>{item.icon}</span> {item.label}
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Player Real Cutout */}
            <div className="hero-image-col">
              <motion.div 
                initial={{ opacity:0, y: 30, scale: 0.95 }} 
                animate={{ opacity:1, y: 0, scale: 1 }} 
                transition={{ duration:1.2, delay:0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {/* Back glow */}
                <div style={{
                  position: 'absolute',
                  width: '320px',
                  height: '320px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 70%)',
                  filter: 'blur(35px)',
                  zIndex: 1,
                  top: '15%'
                }} />
                
                <motion.img 
                  src="/hero-player-cutout.png" 
                  alt="Badminton Player Smash" 
                  className="hero-player-image"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    zIndex: 2,
                    filter: 'grayscale(100%) contrast(130%) brightness(105%) drop-shadow(0 25px 45px rgba(0,0,0,0.95)) drop-shadow(0 0 25px rgba(201,168,76,0.35))',
                  }} 
                />
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════ STATS BAR ══════════ */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.5, duration:0.6 }}
        style={{ position:'absolute', bottom:0, left:0, right:0, display:'flex', flexWrap:'wrap',
          background:'rgba(8,8,8,0.96)', borderTop:'1px solid rgba(201,168,76,0.2)',
          backdropFilter:'blur(24px)', zIndex:5 }}>
        {[
          { num:'500+', label:'Active Members', color:'#c9a84c' },
          { num:'3', label:'Badminton Courts', color:'#1e90ff' },
          { num:'1', label:'Premium Turf', color:'#2da44e' },
          { num:'18+', label:'Expert Trainers', color:'#c9a84c' },
        ].map((s, i) => (
          <div key={i} style={{ flex:'1 1 25%', padding:'1rem 0.5rem', textAlign:'center',
            borderRight:i<3?'1px solid rgba(201,168,76,0.08)':'none' }}>
            <div style={{ fontFamily:'Bebas Neue', fontSize:'2rem', color:s.color, lineHeight:1 }}>{s.num}</div>
            <div style={{ fontFamily:'Barlow Condensed', fontWeight:500, fontSize:'0.68rem', letterSpacing:'0.18em', color:'#666', textTransform:'uppercase', marginTop:'0.15rem' }}>{s.label}</div>
          </div>
        ))}
      </motion.div>



      <style>{`
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(3%,5%) scale(1.06);} }
        @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-2%,-4%) scale(1.04);} }
        @keyframes floatC { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(2%,3%) scale(1.07);} }
        @keyframes gridDrift { from{background-position:0 0;} to{background-position:0 72px;} }
        
        .hero-container-layout {
          margin: 0 auto;
          max-width: 1280px;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: 3.5rem;
          width: 100%;
          padding-bottom: 3.5rem;
        }
        .hero-left {
          z-index: 2;
        }
        .hero-image-col {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
          width: 100%;
          height: 520px;
        }
        .hero-ctas, .hero-chips {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
          justify-content: flex-start;
        }
        .hero-chips {
          gap: 0.5rem;
          margin-bottom: 0;
        }

        @media(max-width:900px){
          .hero-sport-cards { display:none!important; }
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
            padding-bottom: 7rem;
          }
          .hero-left {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-left > div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-ctas, .hero-chips {
            justify-content: center;
          }
          .hero-image-col {
            height: 380px;
          }
        }
        @media(max-width:600px){
          .hero-content-wrap .container h1 { font-size:clamp(2.8rem,14vw,5rem)!important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
