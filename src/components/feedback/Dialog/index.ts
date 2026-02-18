/**
 * Dialog module barrel export.
 *
 * Re-exports the Dialog wrapper component, its sub-components (DialogTitle,
 * DialogContent, DialogActions), and the DialogProps type interface from the
 * Dialog implementation module. This barrel enables clean import paths for
 * consumers and the parent feedback category barrel.
 */
export { Dialog, DialogTitle, DialogContent, DialogActions } from './Dialog';
export type { DialogProps } from './Dialog';
