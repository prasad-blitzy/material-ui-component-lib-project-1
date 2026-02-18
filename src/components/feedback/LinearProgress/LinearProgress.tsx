import { forwardRef } from 'react';
import MUILinearProgress from '@mui/material/LinearProgress';
import type { LinearProgressProps as MUILinearProgressProps } from '@mui/material/LinearProgress';

/**
 * LinearProgressProps extends MUI's LinearProgressProps interface,
 * inheriting all MUI LinearProgress props including variant, value,
 * valueBuffer, color, sx, and classes without modification.
 */
export interface LinearProgressProps extends MUILinearProgressProps {}

/**
 * LinearProgress — themed wrapper around MUI LinearProgress.
 *
 * This thin wrapper component delegates entirely to @mui/material/LinearProgress,
 * forwarding all props and refs. It supports determinate, indeterminate, buffer,
 * and query animation variants with full theme integration via MUI's theming system.
 *
 * Accessibility is inherited from MUI: role="progressbar", aria-valuenow,
 * aria-valuemin, and aria-valuemax are set automatically by the underlying component.
 *
 * @example
 * ```tsx
 * <LinearProgress />
 * <LinearProgress variant="determinate" value={50} />
 * <LinearProgress variant="buffer" value={60} valueBuffer={80} />
 * <LinearProgress color="secondary" />
 * ```
 */
export const LinearProgress = forwardRef<HTMLSpanElement, LinearProgressProps>(
  (props, ref) => {
    return <MUILinearProgress ref={ref} {...props} />;
  }
);

LinearProgress.displayName = 'LinearProgress';
