import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * SplineScene — lazy-loads an interactive 3D Spline scene.
 * Plain-JS port (no TypeScript) so it matches the rest of the KSC codebase.
 *
 * Props:
 *  - scene: URL to the .splinecode scene file
 *  - style: optional inline style overrides
 */
const SplineScene = ({ scene, style }) => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              width: '32px',
              height: '32px',
              border: '2px solid rgba(201,168,76,0.25)',
              borderTopColor: 'var(--gold)',
              borderRadius: '50%',
              animation: 'spinSlow 0.9s linear infinite',
              display: 'inline-block',
            }}
          />
        </div>
      }
    >
      <Spline scene={scene} style={{ width: '100%', height: '100%', ...style }} />
    </Suspense>
  );
};

export default SplineScene;
