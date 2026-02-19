import React from 'react';
import MUISelect from '@mui/material/Select';
import type { SelectProps as MUISelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { MenuItemProps } from '@mui/material/MenuItem';

/**
 * SelectProps extends MUI's SelectProps, providing a consistent API surface
 * for the wrapper component library while forwarding all MUI Select capabilities.
 *
 * Since MUI's SelectProps is a discriminated union type (across filled, standard, and
 * outlined variants), this wrapper uses a type alias to preserve full variant support
 * and the generic Value parameter for typed value handling.
 *
 * Key inherited props include:
 * - `value` — the currently selected value
 * - `onChange` — change handler callback
 * - `multiple` — enables multi-select mode
 * - `displayEmpty` — shows placeholder when value is empty
 * - `variant` — 'outlined' | 'filled' | 'standard'
 * - `label` — the label text
 * - `error` — error state boolean
 * - `disabled` — disabled state boolean
 * - `fullWidth` — full width mode
 * - `size` — 'small' | 'medium'
 *
 * Custom extension props can be added via intersection in future iterations.
 */
export type SelectProps = MUISelectProps;

/**
 * Select — A themed wrapper around MUI's Select component.
 *
 * Forwards all MUI Select props and ref to the underlying primitive.
 * Use with MenuItem components to build dropdown option lists.
 *
 * This component follows the MUI Composition Pattern — it wraps the MUI primitive
 * rather than re-implementing dropdown behavior. The wrapper adds value through:
 * consistent defaults, TypeScript type narrowing, custom prop extensions, and
 * theme integration.
 *
 * All styling is driven by the MUI theme system via ThemeProvider context.
 * No hardcoded CSS values are used — colors, spacing, fonts, shadows, and radii
 * all resolve to MUI theme tokens.
 *
 * @example
 * ```tsx
 * import { Select, MenuItem } from 'material-ui-component-lib-project-1';
 *
 * <Select value={value} onChange={handleChange} displayEmpty>
 *   <MenuItem value="">None</MenuItem>
 *   <MenuItem value="option1">Option 1</MenuItem>
 *   <MenuItem value="option2">Option 2</MenuItem>
 * </Select>
 * ```
 */
export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (props, ref) => {
    return <MUISelect ref={ref} {...props} />;
  }
);

Select.displayName = 'Select';

// Re-export MenuItem for consumer convenience (paired with Select for option rendering)
export { MenuItem };
export type { MenuItemProps };
