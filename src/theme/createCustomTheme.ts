/**
 * @file src/theme/createCustomTheme.ts
 * @description Factory function that composes all design tokens into a MUI createTheme() call.
 *
 * This module serves as the single entry point for theme creation in the library.
 * It wraps MUI's `createTheme()` with library-specific defaults (assembled from the
 * token modules under `./tokens/`) while accepting consumer overrides via deep merge.
 *
 * Consumers can use this function in two ways:
 *
 * 1. **Default theme** — call with no arguments to get the library's standard theme:
 *    ```typescript
 *    import { createCustomTheme } from 'material-ui-component-lib-project-1';
 *    const theme = createCustomTheme();
 *    ```
 *
 * 2. **Customized theme** — pass partial overrides that deep-merge with defaults:
 *    ```typescript
 *    const theme = createCustomTheme({
 *      palette: { primary: { main: '#ff5722' } },
 *      typography: { fontFamily: '"Inter", sans-serif' },
 *    });
 *    ```
 *
 * Internal consumers:
 * - `src/theme/ThemeProvider.tsx` — uses this to generate the default theme when
 *   no custom theme prop is provided
 *
 * Architecture placement: Theme Layer.
 * Dependencies flow downward only: tokens → createCustomTheme → ThemeProvider.
 * This file never imports from ThemeProvider, components, or barrel index files.
 *
 * @module theme/createCustomTheme
 */

import { createTheme } from '@mui/material/styles';
import type { Theme, ThemeOptions } from '@mui/material/styles';
import deepmerge from '@mui/utils/deepmerge';

import { colorTokens } from './tokens/colors';
import { typographyTokens } from './tokens/typography';
import { spacingTokens } from './tokens/spacing';
import { breakpointTokens } from './tokens/breakpoints';
import { shadowTokens } from './tokens/shadows';
import { shapeTokens } from './tokens/shape';
import type { CustomThemeOptions } from './types';

// ---------------------------------------------------------------------------
// Default Theme Options Assembly
// ---------------------------------------------------------------------------

/**
 * Default theme options object that composes all imported design token modules
 * into a single MUI-compatible `ThemeOptions` structure.
 *
 * This constant is exported so that consumers can inspect or extend the
 * library's default configuration before creating a theme.
 *
 * Token wiring summary:
 * - `palette`      ← colorTokens       — semantic colors (primary, secondary, error, etc.)
 * - `typography`   ← typographyTokens   — font family, variant scale (h1–h6, body1–2, etc.)
 * - `spacing`      ← spacingTokens      — 8px base unit for the spacing multiplier
 * - `breakpoints`  ← breakpointTokens   — responsive viewport tiers (xs/sm/md/lg/xl)
 * - `shadows`      ← shadowTokens       — 25-level elevation shadow array
 * - `shape`        ← shapeTokens        — border radius configuration (4px default)
 * - `cssVariables` ← true               — enables MUI v7 CSS theme variables support
 *
 * @example
 * ```typescript
 * import { defaultThemeOptions } from 'material-ui-component-lib-project-1';
 *
 * console.log(defaultThemeOptions.palette);
 * // { primary: { main: '#1976d2' }, secondary: { main: '#9c27b0' }, ... }
 *
 * console.log(defaultThemeOptions.spacing);
 * // 8
 * ```
 */
export const defaultThemeOptions: ThemeOptions = {
  /**
   * Color palette tokens — semantic colors for all interactive and feedback elements.
   * Includes primary (#1976d2), secondary (#9c27b0), error (#d32f2f),
   * warning (#ed6c02), info (#0288d1), success (#2e7d32), background, and text colors.
   * MUI auto-derives light/dark/contrastText variants from the main values.
   */
  palette: colorTokens,

  /**
   * Typography scale tokens — font family (Roboto), variant definitions (h1–h6,
   * body1–2, caption, button) with font size, weight, and line height values.
   */
  typography: typographyTokens,

  /**
   * Spacing base unit — 8px multiplier. MUI's `theme.spacing(n)` computes `n * 8`.
   * Example: theme.spacing(2) → '16px', theme.spacing(3) → '24px'.
   */
  spacing: spacingTokens,

  /**
   * Responsive breakpoint values — minimum viewport widths for each tier.
   * xs: 0px, sm: 600px, md: 900px, lg: 1200px, xl: 1536px.
   * Wrapped in `{ values: ... }` to match MUI's BreakpointsOptions shape.
   */
  breakpoints: {
    values: breakpointTokens,
  },

  /**
   * Shadow/elevation tokens — 25-level array (indices 0–24) of CSS box-shadow strings.
   * shadows[0] = 'none', shadows[24] = maximum elevation shadow.
   */
  shadows: shadowTokens,

  /**
   * Shape tokens — border radius configuration.
   * Default: borderRadius: 4 (4px applied to all component corners).
   */
  shape: shapeTokens,

  /**
   * Enable MUI v7 CSS theme variables support.
   * When true, MUI generates CSS custom properties (e.g., --mui-palette-primary-main)
   * that can be referenced in stylesheets and support runtime theme switching
   * without full React re-renders.
   */
  cssVariables: true,
};

// ---------------------------------------------------------------------------
// Theme Factory Function
// ---------------------------------------------------------------------------

/**
 * Creates a customized MUI Theme by composing library design tokens with
 * optional consumer overrides.
 *
 * This function wraps MUI's `createTheme()` and leverages its built-in deep
 * merge capability: when `createTheme(defaults, overrides)` is called with
 * two arguments, MUI deep-merges `overrides` into `defaults`. This means
 * consumers only need to specify the properties they want to override —
 * all other token values remain at their library defaults.
 *
 * @param options - Optional partial theme configuration that overrides the
 *   library defaults. Accepts all standard MUI ThemeOptions properties plus
 *   any future library-specific extensions defined in CustomThemeOptions.
 *   When omitted, the default library theme is returned.
 *
 * @returns A complete, ready-to-use MUI Theme object that can be passed to
 *   the library's ThemeProvider or MUI's native ThemeProvider.
 *
 * @example Default theme (no overrides):
 * ```typescript
 * import { createCustomTheme, ThemeProvider } from 'material-ui-component-lib-project-1';
 *
 * const theme = createCustomTheme();
 * // theme.palette.primary.main === '#1976d2'
 * // theme.spacing(2) === '16px'
 * // theme.shape.borderRadius === 4
 *
 * <ThemeProvider theme={theme}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @example Customized theme (partial overrides):
 * ```typescript
 * const theme = createCustomTheme({
 *   palette: {
 *     primary: { main: '#ff5722' },  // Override primary color
 *   },
 *   typography: {
 *     fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
 *   },
 *   shape: {
 *     borderRadius: 8,  // Rounder corners
 *   },
 * });
 * // theme.palette.primary.main === '#ff5722' (overridden)
 * // theme.palette.secondary.main === '#9c27b0' (preserved from defaults)
 * // theme.typography.fontFamily === '"Inter", ...' (overridden)
 * // theme.shape.borderRadius === 8 (overridden)
 * ```
 */
export const createCustomTheme = (options?: CustomThemeOptions): Theme => {
  if (!options) {
    return createTheme(defaultThemeOptions);
  }

  // Manually deep-merge consumer overrides with library defaults before passing
  // to createTheme(). This is necessary because MUI v7's multi-argument
  // createTheme(defaults, overrides) does not correctly deep-merge palette
  // properties when cssVariables is enabled. By pre-merging into a single
  // ThemeOptions object, we ensure all consumer overrides (including palette
  // colors) are correctly applied regardless of the cssVariables setting.
  const mergedOptions: ThemeOptions = deepmerge(defaultThemeOptions, options);
  return createTheme(mergedOptions);
};
