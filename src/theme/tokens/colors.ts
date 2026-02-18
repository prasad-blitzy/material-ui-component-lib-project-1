/**
 * Color Palette Token Definitions
 *
 * Defines all semantic color tokens for the MUI theme system. This file serves as the
 * centralized source of truth for the library's color palette, structured as a MUI
 * PaletteOptions compatible object.
 *
 * Consumed by:
 * - `src/theme/createCustomTheme.ts` — as the `palette` property in `createTheme()` options
 * - `src/theme/tokens/index.ts` — re-exported in the token barrel
 *
 * Architecture Notes:
 * - Named export only (no default export) per project conventions
 * - Pure constant definition with no runtime side effects
 * - Foundational file: imports only from external packages, never from sibling or parent modules
 * - MUI auto-calculates `light` and `dark` variants from `main` via `tonalOffset` and
 *   `contrastThreshold` — only `main` values are specified here
 *
 * @module theme/tokens/colors
 */
import type { PaletteOptions } from '@mui/material/styles';

/**
 * Complete color palette token configuration for the component library theme.
 *
 * All color values align with MUI's default theme palette as documented in the
 * Design Token Catalog (AAP Section 0.5.3). Defining them explicitly here makes
 * them inspectable and overridable by consumers through the `createCustomTheme()`
 * factory function.
 *
 * Each semantic color provides only the `main` value. MUI's `createTheme()`
 * automatically derives `light`, `dark`, and `contrastText` variants using
 * the `tonalOffset` (default: 0.2) and `contrastThreshold` (default: 3) settings.
 *
 * @example
 * ```typescript
 * import { colorTokens } from './colors';
 * import { createTheme } from '@mui/material/styles';
 *
 * const theme = createTheme({ palette: colorTokens });
 * // theme.palette.primary.main === '#1976d2'
 * // theme.palette.primary.light === auto-calculated
 * // theme.palette.primary.dark === auto-calculated
 * ```
 */
export const colorTokens: PaletteOptions = {
  /**
   * Primary brand color for interactive elements (buttons, links, active states).
   * MUI color reference: blue[700]
   */
  primary: {
    main: '#1976d2',
  },

  /**
   * Secondary accent color for complementary interactive elements.
   * MUI color reference: purple[500]
   */
  secondary: {
    main: '#9c27b0',
  },

  /**
   * Error and destructive action color for validation errors, delete actions,
   * and critical alerts.
   * MUI color reference: red[700]
   */
  error: {
    main: '#d32f2f',
  },

  /**
   * Warning notification color for cautionary messages and non-critical alerts.
   * MUI color reference: orange[800]
   */
  warning: {
    main: '#ed6c02',
  },

  /**
   * Informational element color for help text, info banners, and status indicators.
   * MUI color reference: lightBlue[700]
   */
  info: {
    main: '#0288d1',
  },

  /**
   * Success confirmation color for positive outcomes, completion states, and
   * success notifications.
   * MUI color reference: green[800]
   */
  success: {
    main: '#2e7d32',
  },

  /**
   * Surface and background colors for the application canvas and elevated surfaces.
   * - `default`: Page-level background color
   * - `paper`: Surface/card background color for Paper-based components
   */
  background: {
    default: '#fff',
    paper: '#fff',
  },

  /**
   * Text color tokens for body copy and secondary/muted text.
   * - `primary`: Standard body text with 87% opacity black
   * - `secondary`: Muted/secondary text with 60% opacity black
   */
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
  },
};
