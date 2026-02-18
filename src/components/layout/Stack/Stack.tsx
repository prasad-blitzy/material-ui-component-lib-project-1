import { forwardRef } from 'react';
import MUIStack from '@mui/material/Stack';
import type { StackProps as MUIStackProps } from '@mui/material/Stack';

/**
 * StackProps extends all MUI Stack props without custom additions.
 * This interface provides a stable API surface for future extensions
 * and maintains consistent naming convention across all library components.
 *
 * Key inherited props from MUI Stack:
 * - `direction` — Flex-direction for stacking children ('row' | 'row-reverse' | 'column' | 'column-reverse')
 * - `spacing` — Gap between children using theme.spacing() factor
 * - `divider` — Optional divider element rendered between each child
 * - `useFlexGap` — When true, uses CSS gap property instead of margin for spacing
 * - `component` — The root element type (defaults to 'div')
 * - `sx` — MUI's theme-aware style prop
 * - `children` — Child elements to be stacked
 */
export interface StackProps extends MUIStackProps {
  // Extends all MUI Stack props. Custom props can be added here in future iterations.
}

/**
 * Stack wrapper component for MUI Stack.
 *
 * A convenience component for CSS flexbox layouts with configurable direction,
 * spacing, dividers, and flex gap support. Wraps MUI's Stack component with
 * full prop forwarding and ref forwarding.
 *
 * @example
 * ```tsx
 * <Stack direction="row" spacing={2}>
 *   <Item>Item 1</Item>
 *   <Item>Item 2</Item>
 *   <Item>Item 3</Item>
 * </Stack>
 * ```
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  function Stack(props, ref) {
    return <MUIStack ref={ref} {...props} />;
  }
);

Stack.displayName = 'Stack';
