import { forwardRef } from 'react';
import MUIIconButton from '@mui/material/IconButton';
import type { IconButtonProps as MUIIconButtonProps } from '@mui/material/IconButton';

/**
 * IconButtonProps extends MUI's IconButtonProps with `aria-label` made required.
 *
 * MUI's native IconButton allows `aria-label` to be omitted, which can result
 * in inaccessible icon buttons where screen readers cannot announce the button's
 * purpose. This wrapper enforces `aria-label` as a required string at the
 * TypeScript level to catch accessibility violations at compile time, ensuring
 * WCAG 2.1 AA compliance for every IconButton instance.
 *
 * All other MUI IconButton props (color, size, edge, disabled, children, sx, etc.)
 * are forwarded transparently through the extended interface.
 */
export interface IconButtonProps extends Omit<MUIIconButtonProps, 'aria-label'> {
  /** Accessible label for the icon button — REQUIRED for WCAG 2.1 AA compliance */
  'aria-label': string;
}

/**
 * IconButton — A thin wrapper around MUI's IconButton component.
 *
 * This wrapper enforces the `aria-label` prop as required for accessibility
 * compliance and forwards all props and refs to the underlying MUI IconButton.
 * It follows the MUI composition pattern: wrap the MUI primitive with prop
 * forwarding via `React.forwardRef`, without re-implementing any internal logic.
 *
 * @example
 * ```tsx
 * import { IconButton } from 'material-ui-component-lib-project-1';
 * import DeleteIcon from '@mui/icons-material/Delete';
 *
 * <IconButton aria-label="Delete item" color="error" size="small">
 *   <DeleteIcon />
 * </IconButton>
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    return <MUIIconButton ref={ref} {...props} />;
  }
);

IconButton.displayName = 'IconButton';
