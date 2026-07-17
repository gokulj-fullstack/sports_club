import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.VITE_API_URL || 'https://sports-club-2i4r.onrender.com/api'),
      'process.env.REACT_APP_ADMIN_URL': JSON.stringify(env.VITE_ADMIN_URL || 'https://sports-club-2.onrender.com'),
    },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — cached long-term, rarely changes
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library — heaviest single dep
          'vendor-motion': ['framer-motion'],
          // Animation (GSAP)
          'vendor-gsap': ['gsap', '@gsap/react'],
          // Icon set
          'vendor-icons': ['lucide-react'],
          // 3D/Spline (large, only used in specific components)
          'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
        },
      },
    },
  },
  // Allow existing .js files to contain JSX (avoids renaming all source files)
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
};
});
