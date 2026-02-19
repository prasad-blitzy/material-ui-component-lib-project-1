/**
 * Shape/Border Radius Token Definitions
 *
 * Exports the border radius configuration consumed by the MUI theme system.
 * MUI applies `theme.shape.borderRadius` as the default corner radius to
 * all components that render rounded corners (Button, Card, Paper, TextField,
 * Dialog, Chip, etc.).
 *
 * The value is a plain number (4) representing 4 pixels. MUI handles the
 * `px` unit conversion internally when applying styles.
 *
 * Consumed by:
 *   - `src/theme/createCustomTheme.ts` — as the `shape` property in createTheme()
 *   - `src/theme/tokens/index.ts` — re-exported in the token barrel
 *
 * @module theme/tokens/shape
 * @see https://mui.com/material-ui/customization/default-theme/?expand-path=$.shape
 */
import type { ShapeOptions } from '@mui/material/styles';

/**
 * Shape token configuration for the MUI theme system.
 *
 * Defines the base border radius applied to all components.
 * The value (4) matches MUI's default theme shape configuration
 * as documented in AAP Section 0.5.3.
 *
 * @example
 * ```typescript
 * import { createTheme } from '@mui/material/styles';
 * import { shapeTokens } from './tokens/shape';
 *
 * const theme = createTheme({ shape: shapeTokens });
 * // theme.shape.borderRadius === 4
 * ```
 */
export const shapeTokens: ShapeOptions = {
  /** Default border radius in pixels for all components. */
  borderRadius: 4,
};
