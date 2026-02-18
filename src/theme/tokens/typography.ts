/**
 * Typography Scale Token Definitions
 *
 * Exports the complete typography configuration used by the MUI theme system.
 * Defines font families, the variant scale (h1–h6, body1–2, caption, button),
 * and their associated font size, weight, and line height values.
 *
 * The exported constant is structured as a MUI `TypographyVariantsOptions`
 * compatible object, suitable for direct use as the `typography` property
 * in `createTheme()` options.
 *
 * Typography scale reference (from AAP Section 0.5.3):
 * ┌─────────┬──────────────────┬────────────┬────────┬─────────────┐
 * │ Variant │ Font Family      │ Size       │ Weight │ Line Height │
 * ├─────────┼──────────────────┼────────────┼────────┼─────────────┤
 * │ h1      │ Roboto, sans     │ 6rem (96px)│ 300    │ 1.167       │
 * │ h2      │ Roboto, sans     │ 3.75rem    │ 300    │ 1.2         │
 * │ h3      │ Roboto, sans     │ 3rem (48px)│ 400    │ 1.167       │
 * │ h4      │ Roboto, sans     │ 2.125rem   │ 400    │ 1.235       │
 * │ h5      │ Roboto, sans     │ 1.5rem     │ 400    │ 1.334       │
 * │ h6      │ Roboto, sans     │ 1.25rem    │ 500    │ 1.6         │
 * │ body1   │ Roboto, sans     │ 1rem (16px)│ 400    │ 1.5         │
 * │ body2   │ Roboto, sans     │ 0.875rem   │ 400    │ 1.43        │
 * │ caption │ Roboto, sans     │ 0.75rem    │ 400    │ 1.66        │
 * │ button  │ Roboto, sans     │ 0.875rem   │ 500    │ 1.75        │
 * └─────────┴──────────────────┴────────────┴────────┴─────────────┘
 *
 * Consumed by:
 *   - `src/theme/createCustomTheme.ts` — as the `typography` property in createTheme()
 *   - `src/theme/tokens/index.ts` — re-exported in the token barrel
 *
 * Consumer usage via theme:
 *   theme.typography.h1   → { fontFamily, fontSize, fontWeight, lineHeight }
 *   theme.typography.body1 → { fontFamily, fontSize, fontWeight, lineHeight }
 *
 * Notes:
 *   - MUI's subtitle1, subtitle2, and overline variants are NOT explicitly
 *     defined here. MUI applies its own defaults for unspecified variants.
 *   - The button variant includes `textTransform: 'uppercase'` per MUI defaults.
 *   - Each variant explicitly sets `fontFamily` for consistency and overridability.
 *
 * @module theme/tokens/typography
 * @see https://mui.com/material-ui/customization/typography/
 */
import type { TypographyVariantsOptions } from '@mui/material/styles';

/**
 * Default font family stack used across all typography variants.
 *
 * Uses the CSS-standard double-quoted font names:
 * - "Roboto" — Google's Material Design typeface (primary)
 * - "Helvetica" — fallback for macOS/iOS systems
 * - "Arial" — fallback for Windows systems
 * - sans-serif — generic family fallback
 */
const DEFAULT_FONT_FAMILY = '"Roboto", "Helvetica", "Arial", sans-serif';

/**
 * Complete typography token configuration for the MUI theme system.
 *
 * This constant defines the root `fontFamily` and all ten required
 * typography variants (h1–h6, body1, body2, caption, button) with
 * their font size, weight, and line height values.
 *
 * All values align with MUI's default theme as documented in the
 * AAP Section 0.5.3 Design Token Catalog.
 *
 * @example
 * ```typescript
 * import { createTheme } from '@mui/material/styles';
 * import { typographyTokens } from './tokens/typography';
 *
 * const theme = createTheme({
 *   typography: typographyTokens,
 * });
 * ```
 */
export const typographyTokens: TypographyVariantsOptions = {
  /**
   * Root font family applied as the default to all typography variants.
   * Individual variants can override this value.
   */
  fontFamily: DEFAULT_FONT_FAMILY,

  /**
   * Heading 1 — Largest display heading.
   * Used for hero sections and primary page titles.
   * Size: 6rem (96px) | Weight: 300 (light) | Line Height: 1.167
   */
  h1: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: '6rem',
    fontWeight: 300,
    lineHeight: 1.167,
  },

  /**
   * Heading 2 — Large display heading.
   * Used for section titles and secondary page headings.
   * Size: 3.75rem (60px) | Weight: 300 (light) | Line Height: 1.2
   */
  h2: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: '3.75rem',
    fontWeight: 300,
    lineHeight: 1.2,
  },

  /**
   * Heading 3 — Medium heading.
   * Used for sub-section titles and content group headings.
   * Size: 3rem (48px) | Weight: 400 (regular) | Line Height: 1.167
   */
  h3: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: '3rem',
    fontWeight: 400,
    lineHeight: 1.167,
  },

  /**
   * Heading 4 — Small heading.
   * Used for card titles and grouped content headings.
   * Size: 2.125rem (34px) | Weight: 400 (regular) | Line Height: 1.235
   */
  h4: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: '2.125rem',
    fontWeight: 400,
    lineHeight: 1.235,
  },

  /**
   * Heading 5 — Extra-small heading.
   * Used for inline headings and list group labels.
   * Size: 1.5rem (24px) | Weight: 400 (regular) | Line Height: 1.334
   */
  h5: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.334,
  },

  /**
   * Heading 6 — Smallest heading.
   * Used for overlines, tab labels, and minor titles.
   * Size: 1.25rem (20px) | Weight: 500 (medium) | Line Height: 1.6
   */
  h6: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.6,
  },

  /**
   * Body 1 — Primary body text.
   * Used for paragraph content and primary reading text.
   * Size: 1rem (16px) | Weight: 400 (regular) | Line Height: 1.5
   */
  body1: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },

  /**
   * Body 2 — Secondary body text.
   * Used for supporting text, descriptions, and secondary content.
   * Size: 0.875rem (14px) | Weight: 400 (regular) | Line Height: 1.43
   */
  body2: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
  },

  /**
   * Caption — Smallest body text.
   * Used for labels, timestamps, and supplementary metadata.
   * Size: 0.75rem (12px) | Weight: 400 (regular) | Line Height: 1.66
   */
  caption: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
  },

  /**
   * Button — Text style for interactive button labels.
   * Includes `textTransform: 'uppercase'` per MUI's default convention.
   * Size: 0.875rem (14px) | Weight: 500 (medium) | Line Height: 1.75
   */
  button: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: 'uppercase',
  },
};
