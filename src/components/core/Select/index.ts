/**
 * Select module barrel export.
 *
 * Re-exports the Select wrapper component, its props type, the MenuItem component,
 * and MenuItemProps type from the Select implementation file. This provides a clean
 * import surface for the core category barrel at src/components/core/index.ts.
 *
 * @module components/core/Select
 */

export { Select } from './Select';
export type { SelectProps } from './Select';
export { MenuItem } from './Select';
export type { MenuItemProps } from './Select';
