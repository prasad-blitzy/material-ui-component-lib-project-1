/**
 * Responsive Breakpoint Token Definitions
 *
 * Defines the minimum viewport widths (in pixels) for each responsive
 * breakpoint tier used throughout the component library. These values
 * feed into MUI's `createTheme()` as `breakpoints.values` and power
 * responsive utilities such as `theme.breakpoints.up()`,
 * `theme.breakpoints.down()`, and `theme.breakpoints.between()`.
 *
 * Values are plain numbers — MUI converts them to pixel-based media
 * queries internally (e.g. `sm: 600` → `@media (min-width: 600px)`).
 *
 * These match MUI's default breakpoints exactly, ensuring compatibility
 * with MUI's built-in responsive props on Grid, Container, and others.
 *
 * @see https://mui.com/material-ui/customization/breakpoints/
 */

/**
 * Type definition for the breakpoint values object.
 *
 * Each key corresponds to a responsive tier and maps to a minimum
 * viewport width in pixels. This interface mirrors the shape expected
 * by MUI's `BreakpointsOptions['values']`.
 */
export interface BreakpointValues {
  /** Extra-small — mobile portrait (0px and up) */
  readonly xs: number;
  /** Small — mobile landscape / small tablet (600px and up) */
  readonly sm: number;
  /** Medium — tablet (900px and up) */
  readonly md: number;
  /** Large — desktop (1200px and up) */
  readonly lg: number;
  /** Extra-large — large desktop (1536px and up) */
  readonly xl: number;
}

/**
 * Breakpoint token constants for responsive design.
 *
 * Consumed by `createCustomTheme()` as `breakpoints: { values: breakpointTokens }`.
 * Components never reference these values directly — they use
 * `theme.breakpoints.up('sm')` and similar utilities instead.
 *
 * | Breakpoint | Min Width | Target Devices              |
 * |------------|-----------|-----------------------------|
 * | xs         | 0px       | Mobile portrait             |
 * | sm         | 600px     | Mobile landscape / tablet   |
 * | md         | 900px     | Tablet                      |
 * | lg         | 1200px    | Desktop                     |
 * | xl         | 1536px    | Large desktop               |
 */
export const breakpointTokens: BreakpointValues = {
  /** Mobile portrait — minimum viewport width (always active) */
  xs: 0,

  /** Mobile landscape / small tablet */
  sm: 600,

  /** Tablet */
  md: 900,

  /** Desktop */
  lg: 1200,

  /** Large desktop */
  xl: 1536,
} as const;
