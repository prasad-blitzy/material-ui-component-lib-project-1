import React from 'react';
import MUIButton from '@mui/material/Button';
import type { ButtonProps as MUIButtonProps } from '@mui/material/Button';

/**
 * ButtonProps extends MUI's ButtonProps, providing the full MUI Button API surface.
 *
 * Inherited props include:
 * - `variant`: 'contained' | 'outlined' | 'text' — visual style of the button
 * - `color`: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit'
 * - `size`: 'small' | 'medium' | 'large' — size of the button
 * - `disabled`: boolean — whether the button is disabled
 * - `startIcon` / `endIcon`: React.ReactNode — icons at start/end of button
 * - `href`: string — if set, renders as an anchor element
 * - `onClick`: React.MouseEventHandler — click handler
 * - `sx`: SxProps<Theme> — MUI system prop for theme-aware styling
 * - `children`: React.ReactNode — button content
 *
 * Custom extensions can be added to this interface in future iterations.
 */
export interface ButtonProps extends MUIButtonProps {}

/**
 * Button — A themed wrapper around MUI's Button component.
 *
 * This component follows the MUI Composition Pattern, delegating entirely to
 * the MUI Button primitive while providing a consistent API surface for the
 * wrapper library. All MUI Button props are forwarded via prop spreading.
 *
 * Supports ref forwarding to the underlying HTMLButtonElement for direct DOM access.
 *
 * @example
 * ```tsx
 * <Button variant="contained" color="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <MUIButton ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';
