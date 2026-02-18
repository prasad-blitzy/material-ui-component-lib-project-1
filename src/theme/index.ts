/**
 * @file src/theme/index.ts
 * @description Theme system barrel export — single import surface for all
 * theme-related functionality in the component library.
 *
 * This file aggregates and re-exports the complete theme API:
 * - ThemeProvider component for distributing design tokens via React Context
 * - createCustomTheme factory function for generating customized MUI themes
 * - defaultThemeOptions constant exposing the library's baseline theme config
 * - All design token constants (colors, typography, spacing, breakpoints, shadows, shape)
 * - All TypeScript type definitions for theme configuration and tokens
 *
 * Consumed by:
 * - `src/index.ts` (root barrel export) via `export * from './theme'`
 * - Component files that need direct theme system access
 * - Consumer code: `import { ThemeProvider, createCustomTheme } from 'material-ui-component-lib-project-1'`
 *
 * Import chain:
 *   src/theme/index.ts
 *     ├── src/theme/ThemeProvider.tsx   → ThemeProvider component
 *     ├── src/theme/createCustomTheme.ts → createCustomTheme factory + defaultThemeOptions
 *     ├── src/theme/types.ts            → TypeScript theme interfaces and type aliases
 *     └── src/theme/tokens/index.ts     → all design token constant modules
 *
 * Architecture rules:
 * - Named exports ONLY — no default exports (AAP Section 0.8.3)
 * - Pure re-exports — no logic, transformations, or runtime side effects
 * - No circular imports — this file only re-exports downstream modules
 * - Tree-shakeable — named exports allow bundlers to eliminate unused theme exports
 * - Unidirectional dependency flow — Theme layer sits above Foundation tokens
 *   and below the Component layer
 *
 * @module theme
 */

// ---------------------------------------------------------------------------
// ThemeProvider Component
// ---------------------------------------------------------------------------

/**
 * Re-export the ThemeProvider component from its dedicated module.
 *
 * ThemeProvider wraps MUI's native ThemeProvider with CssBaseline injection
 * and an automatic default theme fallback when no custom theme is provided.
 *
 * Note: ThemeProviderProps type is NOT re-exported from here because it is
 * already included in the wildcard re-export from `./types` below. This
 * avoids duplicate export identifier errors.
 */
export { ThemeProvider } from './ThemeProvider';

// ---------------------------------------------------------------------------
// Theme Factory Function & Default Options
// ---------------------------------------------------------------------------

/**
 * Re-export the createCustomTheme factory function and the defaultThemeOptions
 * constant from the theme creation module.
 *
 * - createCustomTheme: Wraps MUI's createTheme() with library design token
 *   defaults and deep-merge support for consumer overrides.
 * - defaultThemeOptions: The baseline ThemeOptions object composed from all
 *   design token modules (palette, typography, spacing, breakpoints, shadows,
 *   shape, cssVariables).
 */
export { createCustomTheme, defaultThemeOptions } from './createCustomTheme';

// ---------------------------------------------------------------------------
// Theme TypeScript Types
// ---------------------------------------------------------------------------

/**
 * Re-export all theme-related TypeScript type definitions from the types module.
 *
 * Includes:
 * - CustomThemeOptions    — extends MUI ThemeOptions for library configuration
 * - ThemeProviderProps    — prop interface for the ThemeProvider component
 * - PaletteColorTokens   — single semantic palette color group (main, light, dark, contrastText)
 * - ColorTokens           — complete color palette definition (primary through success + bg/text)
 * - TypographyTokens      — typography variant configuration type alias
 * - BreakpointTokens      — responsive breakpoint value definitions (xs/sm/md/lg/xl)
 * - ShapeTokens           — border radius configuration
 * - ShadowTokens          — 25-level elevation shadow array type alias
 * - SpacingTokens         — spacing base unit numeric type alias
 */
export * from './types';

// ---------------------------------------------------------------------------
// Design Tokens
// ---------------------------------------------------------------------------

/**
 * Re-export all design token constants from the tokens barrel module.
 *
 * Includes:
 * - colorTokens         — semantic color palette values (primary, secondary, error, etc.)
 * - typographyTokens    — font family, variant scale, weight, and line height definitions
 * - spacingTokens       — 8px base spacing unit
 * - breakpointTokens    — responsive viewport width thresholds (xs/sm/md/lg/xl)
 * - shadowTokens        — 25-level elevation shadow CSS strings
 * - shapeTokens         — border radius configuration (4px default)
 * - BreakpointValues    — type export for breakpoint value mapping
 */
export * from './tokens';
