import React from 'react';
import MUITextField from '@mui/material/TextField';
import type { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';

/**
 * TextFieldProps extends MUI's TextFieldProps, providing a consistent API surface
 * for the wrapper component library while forwarding all MUI TextField capabilities.
 *
 * Key props inherited from MUI TextField:
 * - `variant` — 'outlined' | 'filled' | 'standard' (visual variants)
 * - `label` — Label text for the form control
 * - `error` — Boolean to indicate error state
 * - `helperText` — Helper text displayed below the input
 * - `size` — 'small' | 'medium'
 * - `fullWidth` — Full width mode
 * - `disabled` — Disabled state
 * - `required` — Required field indicator
 * - `multiline` — Enables textarea mode
 * - `rows` — Number of rows for multiline
 * - `type` — Input type (text, password, number, etc.)
 * - `placeholder` — Placeholder text
 *
 * Wraps the complete MUI form control (label + input + helper text).
 */
export type TextFieldProps = MUITextFieldProps;

/**
 * TextField — A themed wrapper around MUI's TextField component.
 *
 * Forwards all MUI TextField props and ref to the underlying primitive.
 * Wraps the complete form control including label, input, and helper text.
 * Uses React.forwardRef to ensure consumers can attach refs to the
 * underlying MUI DOM element (HTMLDivElement).
 *
 * This component follows the MUI Composition Pattern — it wraps the MUI
 * primitive rather than re-implementing form control behavior. The wrapper
 * adds value through consistent defaults, TypeScript type narrowing,
 * custom prop extensions, and theme integration.
 *
 * All visual styling flows through the MUI ThemeProvider context.
 * Zero hardcoded CSS values are used — every style resolves to a MUI theme token.
 *
 * @example
 * ```tsx
 * import { TextField } from 'material-ui-component-lib-project-1';
 *
 * // Basic outlined text field (default variant)
 * <TextField label="Email" helperText="Enter your email address" />
 *
 * // Filled variant with error state
 * <TextField
 *   label="Password"
 *   variant="filled"
 *   type="password"
 *   error={true}
 *   helperText="Password is required"
 * />
 *
 * // Multiline text area
 * <TextField
 *   label="Description"
 *   multiline
 *   rows={4}
 *   variant="outlined"
 * />
 *
 * // With ref forwarding
 * const inputRef = React.useRef<HTMLDivElement>(null);
 * <TextField ref={inputRef} label="Name" />
 * ```
 */
export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    return <MUITextField ref={ref} {...props} />;
  }
);

TextField.displayName = 'TextField';
