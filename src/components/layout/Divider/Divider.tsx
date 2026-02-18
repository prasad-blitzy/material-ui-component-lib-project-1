import React from 'react';
import MUIDivider from '@mui/material/Divider';
import type { DividerProps as MUIDividerProps } from '@mui/material/Divider';

/**
 * DividerProps extends the full MUI DividerProps interface.
 *
 * All MUI Divider props are forwarded including:
 * - orientation: 'horizontal' | 'vertical' — separator direction
 * - variant: 'fullWidth' | 'inset' | 'middle' — visual variant
 * - flexItem: boolean — flex layout support
 * - textAlign: 'center' | 'left' | 'right' — text alignment for text dividers
 * - light: boolean — lighter color variant (deprecated in MUI v7)
 * - component: React.ElementType — overridable root element
 * - sx: SxProps<Theme> — MUI theme-aware styling
 * - children: React.ReactNode — optional text content for text dividers
 * - All standard HTML hr attributes via MUI's base
 */
export interface DividerProps extends MUIDividerProps {}

/**
 * Divider — A themed horizontal/vertical separator component.
 *
 * Wraps MUI's Divider component with full prop forwarding and ref access.
 * Uses theme.palette.divider for the separator color. Supports orientation
 * (horizontal/vertical), variant (fullWidth/inset/middle), flexItem for
 * flex containers, and text content for text dividers.
 *
 * Implements React.forwardRef for consumer access to the underlying
 * HTMLHRElement DOM node. All MUI props including slots and slotProps
 * are forwarded for full MUI v7 customization support.
 *
 * @example
 * ```tsx
 * // Basic horizontal divider
 * <Divider />
 *
 * // Vertical divider inside a flex container
 * <Divider orientation="vertical" flexItem />
 *
 * // Text divider
 * <Divider textAlign="left">Section</Divider>
 *
 * // Inset variant
 * <Divider variant="inset" />
 * ```
 */
export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (props, ref) => {
    return <MUIDivider ref={ref} {...props} />;
  }
);

Divider.displayName = 'Divider';
