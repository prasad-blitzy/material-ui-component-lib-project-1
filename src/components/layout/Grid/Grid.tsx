import { forwardRef } from 'react';
import MUIGrid from '@mui/material/Grid';
import type { GridProps as MUIGridProps } from '@mui/material/Grid';

/**
 * GridProps extends all MUI Grid v7 props without custom additions.
 * This interface provides a stable API surface for future extensions
 * and maintains consistent naming convention across all library components.
 *
 * Key inherited props from MUI Grid v7:
 * - `container` — Boolean flag to enable flex container behavior for grid items
 * - `size` — Responsive size object (replaces v5's individual xs/sm/md/lg/xl props)
 * - `offset` — Responsive offset object for column offsetting
 * - `spacing` — Gap between grid items using theme.spacing() factor
 * - `columns` — Number of columns in the grid (default 12)
 * - `direction` — Flex-direction style property for the container
 * - `wrap` — Flex-wrap behavior ('nowrap' | 'wrap' | 'wrap-reverse')
 * - `component` — Polymorphic root element type (defaults to 'div')
 * - `sx` — MUI's theme-aware style prop for one-off customization
 * - `children` — Child grid items or content
 */
export interface GridProps extends MUIGridProps {
  // Extends all MUI Grid v7 props. Custom props can be added here in future iterations.
}

/**
 * Grid wrapper component for MUI Grid v7.
 *
 * Provides a responsive 12-column layout system built on CSS flexbox.
 * Supports both container and item modes for composing responsive layouts.
 * Wraps MUI's Grid component (renamed from Grid2 in v7) with full prop
 * forwarding and ref forwarding.
 *
 * @example
 * ```tsx
 * <Grid container spacing={2}>
 *   <Grid size={{ xs: 12, md: 6 }}>
 *     Left column content
 *   </Grid>
 *   <Grid size={{ xs: 12, md: 6 }}>
 *     Right column content
 *   </Grid>
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * <Grid container spacing={3} columns={16}>
 *   <Grid size={{ xs: 8 }}>Half width in 16-column grid</Grid>
 *   <Grid size={{ xs: 8 }}>Half width in 16-column grid</Grid>
 * </Grid>
 * ```
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  function Grid(props, ref) {
    return <MUIGrid ref={ref} {...props} />;
  }
);

Grid.displayName = 'Grid';
