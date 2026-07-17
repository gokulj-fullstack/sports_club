import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars', // Supports 'chars' and 'words'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  // Wait for fonts to load to prevent layout shifts during splitting
  useEffect(() => {
    if (document.fonts && document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      setFontsLoaded(true); // Fallback for older browsers
    }
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const el = containerRef.current;
      const targets = el.querySelectorAll('.split-item');

      if (!targets.length) return;

      // Calculate ScrollTrigger activation offsets based on threshold and margins
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const tween = gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: 'transform, opacity',
          force3D: true
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        tween.kill();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: containerRef
    }
  );

  const words = text.split(' ');

  const renderContent = () => {
    if (splitType === 'words') {
      return words.map((word, idx) => (
        <span
          key={idx}
          className="split-item split-word"
          style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}
        >
          {word}
        </span>
      ));
    }

    // chars or 'words, chars'
    return words.map((word, wIdx) => (
      <span
        key={wIdx}
        className="split-word"
        style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}
      >
        {word.split('').map((char, cIdx) => (
          <span
            key={cIdx}
            className="split-item split-char"
            style={{ display: 'inline-block' }}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  const style = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };
  const classes = `split-parent ${className}`;
  const Tag = tag || 'p';

  return (
    <Tag ref={containerRef} style={style} className={classes}>
      {renderContent()}
    </Tag>
  );
};

export default SplitText;
