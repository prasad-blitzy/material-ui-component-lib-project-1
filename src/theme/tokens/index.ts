/**
 * Design Token Barrel Export
 *
 * Aggregates and re-exports all design token modules from the
 * `src/theme/tokens/` directory. This file serves as the single
 * import surface for the library's design tokens.
 *
 * Consumed by:
 *   - `src/theme/createCustomTheme.ts` — composes all tokens into a MUI `createTheme()` call
 *   - `src/theme/index.ts` — re-exports tokens as part of the public API
 *   - Consumer code wanting direct access to individual token values
 *
 * Barrel export chain:
 *   `src/index.ts` → `src/theme/index.ts` → `src/theme/tokens/index.ts` → individual token modules
 *
 * Architecture rules:
 *   - Named exports only — no default exports (AAP Section 0.8.3)
 *   - Pure re-exports — no logic, transformations, or runtime side effects
 *   - No circular imports — this file only re-exports downstream token modules
 *   - Tree-shakeable — wildcard re-exports allow bundlers to eliminate unused tokens
 *   - Unidirectional dependency flow — tokens are foundational; this barrel aggregates them
 *
 * @module theme/tokens
 */

/**
 * Color palette tokens — primary, secondary, error, warning, info, success,
 * background, and text color definitions for the MUI theme palette.
 */
export { colorTokens } from './colors';

/**
 * Typography scale tokens — fontFamily, heading variants (h1–h6),
 * body text (body1, body2), caption, and button typography definitions.
 */
export { typographyTokens } from './typography';

/**
 * Spacing scale tokens — base spacing unit (8px) consumed by
 * MUI's `theme.spacing()` function for consistent spatial rhythm.
 */
export { spacingTokens } from './spacing';

/**
 * Responsive breakpoint tokens — viewport width thresholds (xs, sm, md, lg, xl)
 * and the BreakpointValues interface for type-safe breakpoint configuration.
 */
export { breakpointTokens } from './breakpoints';
export type { BreakpointValues } from './breakpoints';

/**
 * Shadow/elevation tokens — 25-level shadow array (indices 0–24)
 * mapping to MUI's Material Design elevation model.
 */
export { shadowTokens } from './shadows';

/**
 * Shape/border radius tokens — base border radius configuration
 * applied to all components via MUI's `theme.shape.borderRadius`.
 */
export { shapeTokens } from './shape';
