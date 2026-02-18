import { forwardRef } from 'react';
import MUIDrawer from '@mui/material/Drawer';
import type { DrawerProps as MUIDrawerProps } from '@mui/material/Drawer';

/**
 * DrawerProps extends MUI's DrawerProps to maintain the full API surface
 * of MUI's Drawer component. This interface preserves complete prop forwarding
 * for all Drawer functionality including side panel positioning, variant
 * behavior, and transition configuration.
 *
 * Inherited key props include:
 * - `anchor` — Side from which the drawer slides in ('left' | 'right' | 'top' | 'bottom')
 * - `variant` — Drawer behavior variant ('permanent' | 'persistent' | 'temporary')
 * - `open` — Controls drawer visibility
 * - `onClose` — Close event handler for backdrop click or escape key
 * - `children` — Drawer content
 * - `elevation` — Shadow depth for temporary variant (0-24)
 * - `hideBackdrop` — Whether to hide the backdrop for temporary variant
 * - `ModalProps` — Props forwarded to the underlying Modal (temporary variant)
 * - `PaperProps` — Props forwarded to the underlying Paper surface
 * - `SlideProps` — Props forwarded to the slide transition
 * - `transitionDuration` — Transition timing configuration
 * - `sx` — MUI sx prop for theme-aware one-off styling
 * - `classes` — MUI class name overrides for granular styling control
 *
 * The interface is extended (rather than aliased) to allow future custom
 * prop additions without breaking the public API contract.
 */
export interface DrawerProps extends MUIDrawerProps {}

/**
 * Drawer — A themed wrapper around MUI's Drawer component for side panel navigation.
 *
 * This component provides a side navigation container with support for
 * permanent, persistent, and temporary panel variants. It encapsulates
 * MUI's Drawer following the composition pattern — delegating entirely
 * to the MUI primitive while preserving the full API surface.
 *
 * The Drawer inherits all of MUI's built-in accessibility features including:
 * - Focus trapping for temporary variant (prevents tabbing outside the drawer)
 * - Keyboard navigation (Escape key to close)
 * - Backdrop click handling for temporary variant
 * - Proper ARIA attributes and role management
 * - Screen reader support via semantic HTML structure
 *
 * Ref forwarding is supported to provide direct access to the underlying
 * HTMLDivElement root.
 *
 * @example
 * ```tsx
 * // Temporary drawer (default variant)
 * <Drawer open={isOpen} onClose={handleClose} anchor="left">
 *   <List>
 *     <ListItem>Navigation Item</ListItem>
 *   </List>
 * </Drawer>
 *
 * // Permanent drawer (always visible)
 * <Drawer variant="permanent" anchor="left">
 *   <List>
 *     <ListItem>Sidebar Item</ListItem>
 *   </List>
 * </Drawer>
 *
 * // Persistent drawer (toggleable, pushes content)
 * <Drawer variant="persistent" open={isOpen} anchor="left">
 *   <List>
 *     <ListItem>Panel Item</ListItem>
 *   </List>
 * </Drawer>
 * ```
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (props, ref) => {
    return <MUIDrawer ref={ref} {...props} />;
  }
);

Drawer.displayName = 'Drawer';
