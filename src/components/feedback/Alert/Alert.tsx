import { forwardRef } from 'react';
import MUIAlert from '@mui/material/Alert';
import type { AlertProps as MUIAlertProps } from '@mui/material/Alert';

/**
 * AlertProps extends MUI's AlertProps, forwarding all native MUI Alert props
 * including severity, variant, action, icon, onClose, color, closeText,
 * children, sx, and all standard HTML div attributes.
 */
export interface AlertProps extends MUIAlertProps {}

/**
 * Alert — A thin wrapper around MUI's Alert component for themed severity-based
 * notification banners. Forwards all MUI Alert props and refs to the underlying
 * MUI primitive.
 *
 * Supports severity variants: error, warning, info, success
 * Supports visual variants: standard, filled, outlined
 *
 * MUI Alert provides built-in role="alert" ARIA attribute for screen reader
 * announcement and a configurable close button with closeText for accessibility.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MUIAlert ref={ref} {...props} />;
  }
);

Alert.displayName = 'Alert';
