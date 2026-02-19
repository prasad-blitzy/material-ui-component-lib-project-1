import { forwardRef } from 'react';
import MuiBox from '@mui/material/Box';
import type { BoxProps as MuiBoxProps } from '@mui/material/Box';

/**
 * BoxProps extends MUI's BoxProps, providing the complete prop interface
 * for the Box wrapper component including sx, component, display,
 * flexDirection, children, className, and all HTML div attributes
 * via the polymorphic component prop system.
 */
export interface BoxProps extends MuiBoxProps {}

/**
 * Box — A theme-aware container and spacing layout wrapper component.
 *
 * Wraps MUI's Box component with ref forwarding, providing a consistent
 * API surface for theme-driven layout composition. Supports the full
 * MUI sx prop system for theme-token-based inline styling.
 *
 * @example
 * ```tsx
 * <Box sx={{ p: 2, bgcolor: 'background.paper', display: 'flex' }}>
 *   <Typography>Content inside a themed Box</Typography>
 * </Box>
 * ```
 *
 * @example
 * ```tsx
 * // Polymorphic rendering — renders as a <section> element
 * <Box component="section" sx={{ mt: 3 }}>
 *   <Typography variant="h4">Section Title</Typography>
 * </Box>
 * ```
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  function Box(props, ref) {
    return <MuiBox ref={ref} {...props} />;
  }
);

Box.displayName = 'Box';
