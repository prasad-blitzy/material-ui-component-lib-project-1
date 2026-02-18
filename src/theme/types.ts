/**
 * @file src/theme/types.ts
 * @description TypeScript interfaces and types for the theme configuration system.
 *
 * This foundational file provides:
 * 1. Custom theme option types consumed by `createCustomTheme()`
 * 2. ThemeProvider props interface consumed by `ThemeProvider.tsx`
 * 3. Token type definitions for type-safe design token access
 * 4. MUI module augmentation documentation for future custom theme extensions
 *
 * Architecture placement: Theme Layer — foundation level.
 * Imports ONLY from external packages (`@mui/material/styles`, `react`).
 * No sibling theme file imports — prevents circular dependencies.
 * No runtime code — pure type definitions for tree-shaking safety.
 *
 * Named exports ONLY (no default exports) per library convention.
 * All types are compatible with TypeScript strict mode.
 */

import type { Theme, ThemeOptions, Shadows, TypographyVariantsOptions } from '@mui/material/styles';
import type React from 'react';

// ---------------------------------------------------------------------------
// Core Theme Option Types
// ---------------------------------------------------------------------------

/**
 * CustomThemeOptions — extends MUI's ThemeOptions with library-specific
 * configuration support.
 *
 * Currently inherits all MUI ThemeOptions properties for full compatibility
 * with `createTheme()`. Custom extensions (e.g., custom spacing scales,
 * brand-specific tokens) can be added here in future iterations without
 * breaking consumers.
 *
 * @example
 * ```tsx
 * const options: CustomThemeOptions = {
 *   palette: { primary: { main: '#1976d2' } },
 *   typography: { fontFamily: 'Inter, sans-serif' },
 * };
 * const theme = createCustomTheme(options);
 * ```
 */
export interface CustomThemeOptions extends ThemeOptions {
  // Custom extensions can be added here in future iterations.
  // Currently inherits all MUI ThemeOptions for full compatibility.
}

// ---------------------------------------------------------------------------
// ThemeProvider Props
// ---------------------------------------------------------------------------

/**
 * ThemeProviderProps — prop interface for the library's ThemeProvider wrapper.
 *
 * Mirrors the API of MUI's own ThemeProvider while providing sensible defaults.
 * The `theme` prop is optional — when omitted, the ThemeProvider falls back to
 * the library's default theme created by `createCustomTheme()`.
 *
 * @example
 * ```tsx
 * <ThemeProvider theme={customTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export interface ThemeProviderProps {
  /** Custom MUI theme created via createCustomTheme(). Falls back to default library theme when omitted. */
  theme?: Theme;
  /** Child components that will receive the theme context via React Context. */
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Color Token Types
// ---------------------------------------------------------------------------

/**
 * PaletteColorTokens — defines the color values for a single semantic palette
 * category (e.g., primary, secondary, error).
 *
 * Maps to MUI's PaletteColor structure. The `main` shade is required; `light`,
 * `dark`, and `contrastText` are optional and will be computed by MUI's
 * `augmentColor()` if omitted.
 *
 * @example
 * ```ts
 * const primaryTokens: PaletteColorTokens = {
 *   main: '#1976d2',
 *   light: '#42a5f5',
 *   dark: '#1565c0',
 *   contrastText: '#ffffff',
 * };
 * ```
 */
export interface PaletteColorTokens {
  /** The primary shade of the color, used for main interactive elements. */
  main: string;
  /** Lighter shade for hover and selected states. Computed via tonalOffset if omitted. */
  light?: string;
  /** Darker shade for pressed and active states. Computed via tonalOffset if omitted. */
  dark?: string;
  /** Text color with sufficient contrast against the main shade. Computed if omitted. */
  contrastText?: string;
}

/**
 * ColorTokens — complete color palette definition covering all semantic
 * categories from the design token catalog.
 *
 * Each semantic category (primary through success) maps to a PaletteColorTokens
 * group. The `background` and `text` categories use inline object types matching
 * MUI's TypeBackground and TypeText structures respectively.
 *
 * @see AAP Section 0.5.3 — Design Token Catalog: Color Tokens
 *
 * @example
 * ```ts
 * const colors: ColorTokens = {
 *   primary: { main: '#1976d2' },
 *   secondary: { main: '#9c27b0' },
 *   error: { main: '#d32f2f' },
 *   warning: { main: '#ed6c02' },
 *   info: { main: '#0288d1' },
 *   success: { main: '#2e7d32' },
 * };
 * ```
 */
export interface ColorTokens {
  /** Primary brand color for interactive elements. */
  primary: PaletteColorTokens;
  /** Secondary accent color. */
  secondary: PaletteColorTokens;
  /** Error and destructive action color. */
  error: PaletteColorTokens;
  /** Warning notification color. */
  warning: PaletteColorTokens;
  /** Informational element color. */
  info: PaletteColorTokens;
  /** Success confirmation color. */
  success: PaletteColorTokens;
  /** Background colors for page and surface elements. */
  background?: {
    /** Page background color. Default: '#fff'. */
    default: string;
    /** Surface/card background color. Default: '#fff'. */
    paper: string;
  };
  /** Text colors for primary, secondary, and disabled text. */
  text?: {
    /** Primary body text color. Default: 'rgba(0,0,0,0.87)'. */
    primary: string;
    /** Secondary/muted text color. Default: 'rgba(0,0,0,0.6)'. */
    secondary: string;
    /** Disabled text color. Default: 'rgba(0,0,0,0.38)'. */
    disabled?: string;
  };
}

// ---------------------------------------------------------------------------
// Typography Token Types
// ---------------------------------------------------------------------------

/**
 * TypographyTokens — type alias for MUI's TypographyVariantsOptions interface.
 *
 * Represents the complete set of typography configuration options including
 * font family, font sizes, font weights, line heights, and variant mappings
 * (h1-h6, body1-2, subtitle1-2, caption, button, overline).
 *
 * MUI v7 exports this as `TypographyVariantsOptions` (renamed from the legacy
 * `TypographyOptions` in earlier versions). This alias provides a stable,
 * library-specific type name that insulates consumers from MUI naming changes.
 *
 * @see AAP Section 0.5.3 — Design Token Catalog: Typography Tokens
 */
export type TypographyTokens = TypographyVariantsOptions;

// ---------------------------------------------------------------------------
// Breakpoint Token Types
// ---------------------------------------------------------------------------

/**
 * BreakpointTokens — responsive breakpoint definitions for the 5-tier
 * device size system.
 *
 * Values represent minimum widths in pixels. Aligns with MUI's default
 * breakpoint configuration: xs(0), sm(600), md(900), lg(1200), xl(1536).
 *
 * @see AAP Section 0.5.3 — Design Token Catalog: Breakpoint Tokens
 *
 * @example
 * ```ts
 * const breakpoints: BreakpointTokens = {
 *   xs: 0,
 *   sm: 600,
 *   md: 900,
 *   lg: 1200,
 *   xl: 1536,
 * };
 * ```
 */
export interface BreakpointTokens {
  /** Mobile portrait — minimum width 0px. */
  xs: number;
  /** Mobile landscape / small tablet — minimum width 600px. */
  sm: number;
  /** Tablet — minimum width 900px. */
  md: number;
  /** Desktop — minimum width 1200px. */
  lg: number;
  /** Large desktop — minimum width 1536px. */
  xl: number;
}

// ---------------------------------------------------------------------------
// Shape Token Types
// ---------------------------------------------------------------------------

/**
 * ShapeTokens — border radius configuration for component corners.
 *
 * MUI's shape system uses a single `borderRadius` value as the base unit.
 * Individual components may apply multipliers of this base value for different
 * corner radius needs (e.g., chips use full rounding, buttons use standard).
 *
 * @see AAP Section 0.5.3 — Design Token Catalog: Shape Tokens
 *
 * @example
 * ```ts
 * const shape: ShapeTokens = { borderRadius: 4 };
 * ```
 */
export interface ShapeTokens {
  /** Default border radius in pixels applied to all components. */
  borderRadius: number;
}

// ---------------------------------------------------------------------------
// Shadow Token Types
// ---------------------------------------------------------------------------

/**
 * ShadowTokens — type alias for MUI's Shadows tuple type.
 *
 * MUI defines exactly 25 shadow levels (indices 0-24) as a fixed-length tuple
 * where index 0 is 'none' and index 24 is the maximum elevation. Components
 * such as Paper, Card, AppBar, and Dialog consume elevation values that map
 * directly to indices in this tuple.
 *
 * @see AAP Section 0.5.3 — Design Token Catalog: Shadow/Elevation Tokens
 */
export type ShadowTokens = Shadows;

// ---------------------------------------------------------------------------
// Spacing Token Types
// ---------------------------------------------------------------------------

/**
 * SpacingTokens — type alias for the spacing base unit value.
 *
 * MUI's spacing system uses a single numeric base unit (default: 8px) that
 * gets multiplied by a factor. For example, `theme.spacing(2)` yields 16px
 * when the base unit is 8. This type represents that base unit value.
 *
 * @see AAP Section 0.5.3 — Design Token Catalog: Spacing Tokens
 *
 * @example
 * ```ts
 * const spacingBase: SpacingTokens = 8; // 8px base unit
 * // theme.spacing(1) → '8px'
 * // theme.spacing(2) → '16px'
 * // theme.spacing(3) → '24px'
 * ```
 */
export type SpacingTokens = number;

// ---------------------------------------------------------------------------
// MUI Module Augmentation
// ---------------------------------------------------------------------------

/**
 * Module augmentation placeholder for future custom theme extensions.
 *
 * When the library needs to add custom properties to the MUI Theme object
 * (e.g., brand-specific token namespaces, custom component variants), uncomment
 * and extend the declarations below. This pattern follows MUI's official
 * recommendation for extending the theme type system:
 *
 * @see https://mui.com/material-ui/customization/theming/#typescript
 *
 * @example
 * ```typescript
 * declare module '@mui/material/styles' {
 *   interface Theme {
 *     custom: {
 *       brandColor: string;
 *     };
 *   }
 *   interface ThemeOptions {
 *     custom?: {
 *       brandColor?: string;
 *     };
 *   }
 * }
 * ```
 *
 * For the initial implementation (v0.1.0), standard MUI theme types are
 * sufficient. The module augmentation pattern is documented here for when
 * custom theme extensions are needed in future releases.
 */
