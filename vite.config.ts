/**
 * @file vite.config.ts
 * @description Vite 7 library-mode build configuration for the Material UI
 * component wrapper library.
 *
 * This configuration produces dual-format (ESM + CJS) bundles suitable for
 * npm distribution.  All runtime peer dependencies — React, MUI, and
 * Emotion — are externalised so that consumer applications provide their own
 * copies at runtime, preventing version duplication and "multiple React
 * instances" errors.
 *
 * Build outputs:
 *   dist/index.es.js   — ES module bundle (tree-shakeable)
 *   dist/index.cjs.js  — CommonJS bundle (Node.js / legacy tooling)
 *
 * Source maps are emitted alongside each bundle for production debugging.
 * CSS is NOT extracted — Emotion injects styles at runtime.
 *
 * @see AAP Section 0.1.1 — Distribution Requirements
 * @see AAP Section 0.4.2 — Library entry point (src/index.ts)
 * @see AAP Section 0.8.4 — Build & Distribution Rules
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// ---------------------------------------------------------------------------
// Vite configuration — Library Mode
// ---------------------------------------------------------------------------

export default defineConfig({
  // -------------------------------------------------------------------------
  // Plugins
  // -------------------------------------------------------------------------
  // The React plugin enables:
  //   • Automatic JSX runtime (react-jsx) — no manual React imports needed
  //   • React Fast Refresh during development
  //   • Babel / SWC JSX compilation
  plugins: [react()],

  // -------------------------------------------------------------------------
  // Build configuration
  // -------------------------------------------------------------------------
  build: {
    // Library mode — produces distributable bundles instead of an application
    lib: {
      // Absolute path to the library's root barrel export
      entry: resolve(__dirname, 'src/index.ts'),

      // Global variable name exposed when the library is loaded via a
      // <script> tag (UMD context).  Not directly relevant for ESM/CJS
      // consumers but required by Vite's library mode schema.
      name: 'MaterialUIComponentLib',

      // Dual-format output: ESM for modern bundlers, CJS for legacy tooling
      formats: ['es', 'cjs'],

      // Deterministic output file names per format
      fileName: (format) => {
        if (format === 'es') return 'index.es.js';
        return 'index.cjs.js';
      },
    },

    // Rollup-specific options (Vite uses Rollup under the hood for builds)
    rollupOptions: {
      // -----------------------------------------------------------------------
      // External dependencies — NEVER bundled
      // -----------------------------------------------------------------------
      // Every peer dependency is externalised so that the consumer's installed
      // versions are used at runtime.  Regex patterns ensure that deep
      // sub-path imports (e.g. @mui/material/Button) are also excluded.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@mui\/.*/,
        /^@emotion\/.*/,
      ],

      // -----------------------------------------------------------------------
      // Global variable mappings — used only for UMD / IIFE builds
      // -----------------------------------------------------------------------
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': 'MaterialUI',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled',
        },
      },
    },

    // Generate source maps alongside bundles for production debugging
    sourcemap: true,

    // Do NOT extract CSS into separate files — Emotion injects styles at
    // runtime via JavaScript, so there are no static CSS assets to split
    cssCodeSplit: false,

    // Use esbuild for fast, reliable minification of production bundles
    minify: 'esbuild',
  },

  // -------------------------------------------------------------------------
  // Module resolution
  // -------------------------------------------------------------------------
  resolve: {
    // Convenience alias so that internal source files can use '@/...'
    // imports if desired (e.g. '@/theme/tokens/colors')
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
