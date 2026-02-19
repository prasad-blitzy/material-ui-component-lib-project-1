import { forwardRef } from 'react';
import MUIDialog from '@mui/material/Dialog';
import type { DialogProps as MUIDialogProps } from '@mui/material/Dialog';
import MUIDialogTitle from '@mui/material/DialogTitle';
import MUIDialogContent from '@mui/material/DialogContent';
import MUIDialogActions from '@mui/material/DialogActions';

/**
 * DialogProps extends MUI's DialogProps interface, providing full access to all
 * MUI Dialog props including open, onClose, maxWidth, fullWidth, fullScreen,
 * scroll behavior, transition configuration, and accessibility attributes.
 */
export interface DialogProps extends MUIDialogProps {}

/**
 * Dialog — A themed wrapper around MUI Dialog that provides a modal dialog system.
 *
 * This component forwards all props and refs to the underlying MUI Dialog,
 * preserving full MUI functionality including ARIA dialog role, focus trapping,
 * escape key handling, and backdrop click handling.
 *
 * Compose with DialogTitle, DialogContent, and DialogActions for structured dialogs:
 *
 * ```tsx
 * <Dialog open={open} onClose={handleClose}>
 *   <DialogTitle>Title</DialogTitle>
 *   <DialogContent>Content here</DialogContent>
 *   <DialogActions>
 *     <Button onClick={handleClose}>Cancel</Button>
 *   </DialogActions>
 * </Dialog>
 * ```
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  function Dialog(props, ref) {
    return <MUIDialog ref={ref} {...props} />;
  }
);

Dialog.displayName = 'Dialog';

/**
 * DialogTitle — Re-export of MUI DialogTitle for the dialog title section.
 * Renders an h2 element by default within the dialog header area.
 */
export const DialogTitle = MUIDialogTitle;

/**
 * DialogContent — Re-export of MUI DialogContent for the dialog body content.
 * Provides scrollable content area with appropriate padding.
 */
export const DialogContent = MUIDialogContent;

/**
 * DialogActions — Re-export of MUI DialogActions for the dialog footer actions.
 * Provides a flex container for action buttons aligned to the right.
 */
export const DialogActions = MUIDialogActions;
