import { forwardRef } from 'react';
import MUISnackbar from '@mui/material/Snackbar';
import type { SnackbarProps as MUISnackbarProps } from '@mui/material/Snackbar';

/**
 * Props for the Snackbar wrapper component.
 *
 * Extends the full MUI SnackbarProps interface, forwarding all native MUI props
 * including `open`, `autoHideDuration`, `onClose`, `anchorOrigin`, `message`,
 * `action`, `TransitionComponent`, `transitionDuration`, and slot-based customization.
 *
 * Consumers can use any prop supported by MUI's Snackbar component.
 */
export interface SnackbarProps extends MUISnackbarProps {}

/**
 * Snackbar wrapper component built on top of MUI's Snackbar.
 *
 * Provides a themed toast notification with full prop forwarding, ref forwarding,
 * and TypeScript type safety. This thin wrapper delegates entirely to the MUI
 * Snackbar primitive, enabling consumers to leverage the complete MUI Snackbar API
 * while benefiting from the library's unified theming system.
 *
 * @example
 * ```tsx
 * <Snackbar
 *   open={isOpen}
 *   autoHideDuration={6000}
 *   onClose={handleClose}
 *   message="Operation completed successfully"
 *   anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
 * />
 * ```
 *
 * @see {@link https://mui.com/material-ui/react-snackbar/ MUI Snackbar Documentation}
 */
export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(props, ref) {
    return <MUISnackbar ref={ref} {...props} />;
  }
);

Snackbar.displayName = 'Snackbar';
