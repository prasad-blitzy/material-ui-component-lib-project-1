import React, { forwardRef } from 'react';
import MUISwitch from '@mui/material/Switch';
import type { SwitchProps as MUISwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

/**
 * Props interface for the Switch wrapper component.
 *
 * Extends MUI's SwitchProps to provide full access to all MUI Switch props
 * (checked, onChange, color, size, disabled, defaultChecked, edge, required,
 * inputProps, inputRef, value, sx, classes, etc.) while adding label support
 * via FormControlLabel integration.
 */
export interface SwitchProps extends MUISwitchProps {
  /**
   * Optional label to display alongside the switch via FormControlLabel.
   * When provided, the Switch is rendered wrapped in a FormControlLabel component.
   * When omitted, the Switch renders as a standalone MUI Switch.
   */
  label?: React.ReactNode;

  /**
   * Position of the label relative to the switch control.
   * Only applies when the `label` prop is provided.
   * @default 'end'
   */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

/**
 * Switch wrapper component that extends MUI's Switch primitive with themed
 * on/off states and FormControlLabel integration for label support.
 *
 * This component wraps `@mui/material/Switch` using the MUI composition pattern:
 * - Forwards all MUI Switch props via TypeScript generics and spread operator
 * - Uses `React.forwardRef` for ref forwarding to the underlying MUI Switch DOM element
 * - Conditionally wraps with `FormControlLabel` when a `label` prop is provided
 * - Works both as a standalone toggle and as a labeled form control
 *
 * @example
 * ```tsx
 * // Standalone switch (no label)
 * <Switch checked={isEnabled} onChange={handleChange} color="primary" />
 *
 * // Switch with label
 * <Switch label="Enable notifications" checked={isEnabled} onChange={handleChange} />
 *
 * // Switch with label placement
 * <Switch label="Dark mode" labelPlacement="start" checked={isDark} onChange={toggleDark} />
 * ```
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ label, labelPlacement = 'end', ...rest }, ref) => {
    if (label) {
      return (
        <FormControlLabel
          control={<MUISwitch ref={ref} {...rest} />}
          label={label}
          labelPlacement={labelPlacement}
        />
      );
    }

    return <MUISwitch ref={ref} {...rest} />;
  }
);

Switch.displayName = 'Switch';
