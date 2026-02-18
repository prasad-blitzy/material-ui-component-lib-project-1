/**
 * Navigation components category barrel export.
 *
 * Re-exports all 5 navigation wrapper components and their associated
 * TypeScript prop interfaces for the library's public API surface.
 *
 * Exported components:
 * - AppBar, Toolbar (from ./AppBar)
 * - Tabs, Tab (from ./Tabs)
 * - Drawer (from ./Drawer)
 * - Breadcrumbs (from ./Breadcrumbs)
 * - Link (from ./Link)
 *
 * This file is consumed by src/components/index.ts via:
 *   export * from './navigation';
 */

// AppBar — themed top navigation bar with Toolbar inner container
export * from './AppBar';

// Tabs — themed tabbed navigation with individual Tab components
export * from './Tabs';

// Drawer — themed side panel navigation
export * from './Drawer';

// Breadcrumbs — themed navigation hierarchy with separators
export * from './Breadcrumbs';

// Link — themed anchor element with typography integration
export * from './Link';
