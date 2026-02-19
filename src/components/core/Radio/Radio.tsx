import React, { forwardRef } from 'react';
import MUIRadio from '@mui/material/Radio';
import type { RadioProps as MUIRadioProps } from '@mui/material/Radio';
import MUIRadioGroup from '@mui/material/RadioGroup';
import type { RadioGroupProps as MUIRadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

/**
 * Props interface for the RadioGroup wrapper component.
 *
 * Extends MUI's RadioGroupProps to forward all native RadioGroup props
 * including value, onChange, row, defaultValue, name, children, and sx.
 * Acts as a pure thin wrapper providing radio group context for child Radio components.
 */
export interface RadioGroupProps extends MUIRadioGroupProps {}

/**
 * RadioGroup wrapper component that extends MUI RadioGroup.
 *
 * Provides a radio group context container for child Radio buttons.
 * Forwards all MUI RadioGroup props and supports ref forwarding to the
 * underlying HTMLDivElement rendered by MUI RadioGroup.
 *
 * @example
 * ```tsx
 * <RadioGroup value={selectedValue} onChange={handleChange}>
 *   <Radio value="a" label="Option A" />
 *   <Radio value="b" label="Option B" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => {
    return <MUIRadioGroup ref={ref} {...props} />;
  }
);

RadioGroup.displayName = 'RadioGroup';

/**
 * Props interface for the Radio wrapper component.
 *
 * Extends MUI's RadioProps to forward all native Radio props including
 * value, color, disabled, size, checked, onChange, inputProps, inputRef,
 * required, sx, and classes.
 *
 * Adds optional label and labelPlacement props for automatic FormControlLabel
 * wrapping when a label is provided.
 */
export interface RadioProps extends MUIRadioProps {
  /** Optional label to display alongside the radio via FormControlLabel */
  label?: React.ReactNode;
  /** Position of the label relative to the radio control. Defaults to 'end'. */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

/**
 * Radio wrapper component that extends MUI Radio.
 *
 * Individual radio button with optional FormControlLabel integration.
 * When a `label` prop is provided, the radio is automatically wrapped
 * in a FormControlLabel for accessible label rendering.
 * When no label is provided, renders a bare MUI Radio suitable for
 * use inside a custom label or layout.
 *
 * Supports ref forwarding to the underlying HTMLButtonElement rendered
 * by MUI Radio internally.
 *
 * @example
 * ```tsx
 * // With label (renders FormControlLabel wrapping)
 * <Radio value="option1" label="Option 1" />
 *
 * // Without label (bare radio button)
 * <Radio value="option2" />
 *
 * // With label placement
 * <Radio value="option3" label="Option 3" labelPlacement="start" />
 * ```
 */
export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ label, labelPlacement = 'end', ...rest }, ref) => {
    if (label) {
      return (
        <FormControlLabel
          control={<MUIRadio ref={ref} {...rest} />}
          label={label}
          labelPlacement={labelPlacement}
        />
      );
    }

    return <MUIRadio ref={ref} {...rest} />;
  }
);

Radio.displayName = 'Radio';
