import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import type { ToolbarProps as MuiToolbarProps } from '@mui/material/Toolbar';

/**
 * AppBarProps extends all MUI AppBar props, providing a stable API surface
 * for the wrapper component. Key forwarded props include:
 * - `position`: fixed | absolute | sticky | static | relative
 * - `color`: primary | secondary | inherit | transparent | error | info | success | warning
 * - `elevation`: shadow depth (0–24)
 * - `sx`: MUI system prop for theme-aware inline styles
 * - `children`: typically a Toolbar component
 * - `component`: polymorphic element type override
 */
export interface AppBarProps extends MuiAppBarProps {}

/**
 * AppBar — Themed top navigation bar wrapper around MUI AppBar.
 *
 * Wraps the MUI AppBar primitive with full prop forwarding and ref forwarding.
 * Designed to be composed with the Toolbar component for layout content.
 *
 * @example
 * ```tsx
 * <AppBar position="sticky" color="primary">
 *   <Toolbar>
 *     <Typography variant="h6">My App</Typography>
 *   </Toolbar>
 * </AppBar>
 * ```
 */
export const AppBar = React.forwardRef<HTMLElement, AppBarProps>(
  (props, ref) => {
    return <MuiAppBar ref={ref} {...props} />;
  }
);

AppBar.displayName = 'AppBar';

/**
 * ToolbarProps extends all MUI Toolbar props, providing a stable API surface
 * for the wrapper component. Key forwarded props include:
 * - `variant`: regular | dense
 * - `disableGutters`: removes default horizontal padding
 * - `sx`: MUI system prop for theme-aware inline styles
 * - `children`: flex container children (IconButton, Button, Typography, etc.)
 * - `component`: polymorphic element type override
 */
export interface ToolbarProps extends MuiToolbarProps {}

/**
 * Toolbar — Inner container wrapper around MUI Toolbar for AppBar content layout.
 *
 * Wraps the MUI Toolbar primitive with full prop forwarding and ref forwarding.
 * Provides proper spacing and flex layout for navigation bar children.
 *
 * @example
 * ```tsx
 * <Toolbar variant="dense" disableGutters>
 *   <IconButton edge="start" aria-label="menu">
 *     {menuIcon}
 *   </IconButton>
 *   <Typography variant="h6" sx={{ flexGrow: 1 }}>Title</Typography>
 * </Toolbar>
 * ```
 */
export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  (props, ref) => {
    return <MuiToolbar ref={ref} {...props} />;
  }
);

Toolbar.displayName = 'Toolbar';
