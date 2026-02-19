/**
 * Spacing Scale Token Definitions
 *
 * Defines the base spacing unit consumed by MUI's theme system.
 * MUI's `theme.spacing()` function multiplies this base value by
 * a provided factor to produce pixel-based spacing values.
 *
 * Spacing scale reference:
 * ┌────────┬───────┬──────────────────────────┐
 * │ Factor │ Value │ Common Usage             │
 * ├────────┼───────┼──────────────────────────┤
 * │ 0      │ 0px   │ No spacing               │
 * │ 0.5    │ 4px   │ Minimal gap              │
 * │ 1      │ 8px   │ Base unit (default)       │
 * │ 2      │ 16px  │ Standard component padding│
 * │ 3      │ 24px  │ Section padding           │
 * │ 4      │ 32px  │ Large section gap         │
 * │ 5      │ 40px  │ Container margin          │
 * │ 6      │ 48px  │ Major section separation  │
 * └────────┴───────┴──────────────────────────┘
 *
 * Usage in createTheme():
 *   createTheme({ spacing: spacingTokens })
 *
 * Consumer usage:
 *   theme.spacing(2) → '16px'
 *
 * @module theme/tokens/spacing
 */

/**
 * Base spacing unit in pixels.
 *
 * MUI's spacing system multiplies this value by a factor:
 * - `theme.spacing(0)` → `'0px'`
 * - `theme.spacing(0.5)` → `'4px'`
 * - `theme.spacing(1)` → `'8px'` (base unit)
 * - `theme.spacing(2)` → `'16px'`
 * - `theme.spacing(3)` → `'24px'`
 * - `theme.spacing(4)` → `'32px'`
 * - `theme.spacing(5)` → `'40px'`
 * - `theme.spacing(6)` → `'48px'`
 *
 * When passed to `createTheme({ spacing: 8 })`, MUI internally
 * creates a spacing function that computes `factor * 8` and
 * appends the `px` unit.
 *
 * This value (8) aligns with MUI's default spacing system.
 */
export const spacingTokens: number = 8;
