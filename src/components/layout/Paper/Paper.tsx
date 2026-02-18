import { forwardRef } from 'react';
import MUIPaper from '@mui/material/Paper';
import type { PaperProps as MUIPaperProps } from '@mui/material/Paper';

/**
 * PaperProps extends the full MUI Paper props interface.
 *
 * Key inherited props:
 * - elevation: number (0–24) — shadow depth level, maps to theme.shadows[elevation] (default: 1)
 * - variant: 'elevation' | 'outlined' — visual variant (shadow-based or border-based, default: 'elevation')
 * - square: boolean — removes border radius when true (default: false)
 * - component: React.ElementType — overridable root element type
 * - sx: SxProps<Theme> — MUI theme-aware styling prop
 * - children: React.ReactNode — child content rendered inside the surface
 *
 * All standard HTML div attributes are also available via MUI's base props.
 */
export interface PaperProps extends MUIPaperProps {}

/**
 * Paper — Themed wrapper around MUI's Paper component.
 *
 * Provides an elevated surface container with themed shadow and background color.
 * Paper uses theme.palette.background.paper for its background and
 * theme.shadows[elevation] for its box-shadow depth (0–24 levels).
 *
 * The component supports two visual variants:
 * - 'elevation' (default): Uses box-shadow for depth based on the elevation prop
 * - 'outlined': Uses a 1px border from theme.palette.divider instead of shadow
 *
 * Border radius is controlled by theme.shape.borderRadius (default 4px) and
 * can be removed by setting square={true}.
 *
 * This component uses React.forwardRef to forward refs to the underlying MUI
 * Paper DOM element (<div>), enabling consumers to imperatively access the
 * root element when needed.
 *
 * @example
 * ```tsx
 * // Basic elevated paper surface
 * <Paper elevation={3}>Content on an elevated surface</Paper>
 *
 * // Outlined variant (border instead of shadow)
 * <Paper variant="outlined">Outlined surface</Paper>
 *
 * // Square corners with no elevation
 * <Paper square elevation={0}>Flat square surface</Paper>
 *
 * // Custom themed styling via sx prop
 * <Paper sx={{ p: 2, bgcolor: 'background.default' }}>Styled surface</Paper>
 * ```
 */
export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  (props, ref) => {
    return <MUIPaper ref={ref} {...props} />;
  }
);

Paper.displayName = 'Paper';
