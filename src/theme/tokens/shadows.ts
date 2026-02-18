/**
 * Shadow/Elevation Token Definitions
 *
 * Exports the complete 25-level shadow array used by the MUI theme system.
 * MUI requires a `Shadows` type — a fixed-length tuple of exactly 25 CSS
 * box-shadow strings (indices 0-24), where `shadows[0]` is `'none'` (no
 * shadow / flat element) and `shadows[24]` is the maximum elevation.
 *
 * Each shadow string is composed of three box-shadow layers representing
 * the Material Design elevation model:
 *   - Umbra:    rgba(0,0,0,0.2)  — primary shadow cast by direct light
 *   - Penumbra: rgba(0,0,0,0.14) — soft edge region around the umbra
 *   - Ambient:  rgba(0,0,0,0.12) — diffuse environmental shadow
 *
 * These tokens are consumed by:
 *   - `src/theme/createCustomTheme.ts` as the `shadows` property in createTheme()
 *   - `src/theme/tokens/index.ts` for barrel re-export
 *
 * Wrapper components access these values indirectly via the `elevation`
 * prop on Paper-based components or via `theme.shadows[n]` in the sx prop.
 *
 * @see https://mui.com/material-ui/customization/default-theme/?expand-path=$.shadows
 */
import type { Shadows } from '@mui/material/styles';

/**
 * Complete 25-level shadow token array matching MUI's default shadows.
 *
 * Index 0  → 'none' (flat, no elevation)
 * Index 1  → minimal elevation (e.g. cards at rest)
 * Index 4  → low elevation (e.g. app bar)
 * Index 8  → medium elevation (e.g. raised card, bottom sheet)
 * Index 12 → high elevation (e.g. floating action button)
 * Index 16 → higher elevation (e.g. navigation drawer)
 * Index 24 → maximum elevation (e.g. dialog, modal)
 */
export const shadowTokens: Shadows = [
  // Elevation 0 — No shadow (flat element)
  'none',

  // Elevation 1 — Minimal elevation (e.g. Card at rest, Switch)
  '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',

  // Elevation 2 — Low elevation (e.g. Contained Button resting)
  '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',

  // Elevation 3
  '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',

  // Elevation 4 — App Bar, raised Card hover
  '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',

  // Elevation 5
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',

  // Elevation 6 — Floating Action Button, Snackbar
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',

  // Elevation 7
  '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',

  // Elevation 8 — Raised Card, Bottom Sheet, Menu
  '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',

  // Elevation 9
  '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',

  // Elevation 10
  '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',

  // Elevation 11
  '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',

  // Elevation 12 — Floating Action Button pressed
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',

  // Elevation 13
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',

  // Elevation 14
  '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',

  // Elevation 15
  '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',

  // Elevation 16 — Navigation Drawer
  '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',

  // Elevation 17
  '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',

  // Elevation 18
  '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',

  // Elevation 19
  '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',

  // Elevation 20
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',

  // Elevation 21
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',

  // Elevation 22
  '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',

  // Elevation 23
  '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',

  // Elevation 24 — Maximum elevation (Dialog, Modal)
  '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
];
