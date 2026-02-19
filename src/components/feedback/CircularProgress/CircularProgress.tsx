import { forwardRef } from 'react';
import MUICircularProgress from '@mui/material/CircularProgress';
import type { CircularProgressProps as MUICircularProgressProps } from '@mui/material/CircularProgress';

/**
 * CircularProgressProps extends the full MUI CircularProgress props interface.
 *
 * Key inherited props:
 * - variant: 'determinate' | 'indeterminate' — controls progress display mode (default: 'indeterminate')
 * - value: number — progress percentage (0–100) for the determinate variant
 * - size: number | string — diameter of the circular indicator
 * - color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' — theme palette color
 * - thickness: number — stroke thickness of the circle
 * - disableShrink: boolean — disables the shrink animation (indeterminate only)
 * - sx: SxProps<Theme> — MUI sx prop for theme-aware one-off styling
 */
export interface CircularProgressProps extends MUICircularProgressProps {}

/**
 * CircularProgress — Themed wrapper around MUI's CircularProgress component.
 *
 * Provides a spinner/loading indicator that inherits all MUI CircularProgress
 * functionality including determinate/indeterminate variants, theme-aware colors,
 * size and thickness customization, and built-in ARIA progressbar accessibility.
 *
 * This component uses React.forwardRef to forward refs to the underlying MUI
 * CircularProgress DOM element (<span>), enabling consumers to imperatively
 * access the root element when needed.
 *
 * @example
 * ```tsx
 * // Indeterminate spinner (default)
 * <CircularProgress />
 *
 * // Determinate progress indicator
 * <CircularProgress variant="determinate" value={75} />
 *
 * // Custom size, color, and thickness
 * <CircularProgress size={60} color="secondary" thickness={5} />
 * ```
 */
export const CircularProgress = forwardRef<HTMLSpanElement, CircularProgressProps>(
  (props, ref) => {
    return <MUICircularProgress ref={ref} {...props} />;
  }
);

CircularProgress.displayName = 'CircularProgress';
