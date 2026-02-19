import React, { forwardRef } from 'react';
import MUICheckbox from '@mui/material/Checkbox';
import type { CheckboxProps as MUICheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

/**
 * Custom CheckboxProps interface that extends MUI's CheckboxProps with
 * optional label support via FormControlLabel integration.
 *
 * When the `label` prop is provided, the checkbox is automatically wrapped
 * in a `FormControlLabel` component for accessible labeling. All standard
 * MUI Checkbox props (checked, onChange, color, disabled, indeterminate,
 * defaultChecked, required, inputProps, inputRef, value, size, sx, classes)
 * are forwarded to the underlying MUI Checkbox primitive.
 */
export interface CheckboxProps extends MUICheckboxProps {
  /** Optional label to display alongside the checkbox via FormControlLabel */
  label?: React.ReactNode;
  /** Position of the label relative to the checkbox control. Defaults to 'end'. */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

/**
 * Checkbox wrapper component built on top of MUI's Checkbox primitive.
 *
 * This component follows the MUI composition pattern — it wraps the MUI Checkbox
 * and forwards all props via spread, adding value through FormControlLabel integration
 * for label support and consistent defaults.
 *
 * Features:
 * - Full prop forwarding to MUI Checkbox (checked, onChange, color, disabled, indeterminate, etc.)
 * - Optional label support via FormControlLabel when `label` prop is provided
 * - Configurable label placement (end, start, top, bottom)
 * - Ref forwarding to the underlying HTMLButtonElement via React.forwardRef
 * - Theme-aware styling through MUI's ThemeProvider context
 * - WCAG 2.1 AA accessibility inherited from MUI's built-in ARIA attributes and keyboard navigation
 *
 * @example
 * ```tsx
 * // Standalone checkbox without label
 * <Checkbox checked={isChecked} onChange={handleChange} color="primary" />
 *
 * // Checkbox with label
 * <Checkbox label="Accept terms" checked={isChecked} onChange={handleChange} />
 *
 * // Checkbox with label positioned at start
 * <Checkbox label="Subscribe" labelPlacement="start" />
 *
 * // Indeterminate checkbox
 * <Checkbox indeterminate checked={isPartial} onChange={handleChange} />
 * ```
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, labelPlacement = 'end', ...rest }, ref) => {
    if (label) {
      return (
        <FormControlLabel
          control={<MUICheckbox ref={ref} {...rest} />}
          label={label}
          labelPlacement={labelPlacement}
        />
      );
    }

    return <MUICheckbox ref={ref} {...rest} />;
  }
);

Checkbox.displayName = 'Checkbox';
