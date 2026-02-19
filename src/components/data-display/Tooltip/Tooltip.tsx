import { forwardRef } from 'react';
import MUITooltip from '@mui/material/Tooltip';
import type { TooltipProps as MUITooltipProps } from '@mui/material/Tooltip';

/**
 * TooltipProps extends MUI's TooltipProps for full prop compatibility.
 *
 * All MUI Tooltip props are inherited through interface extension, including:
 * - `title` (ReactNode) — the tooltip content displayed in the popup (required)
 * - `placement` — positioning of the tooltip relative to the child element
 * - `arrow` — adds a directional arrow pointing to the trigger element
 * - `enterDelay` / `leaveDelay` — timing controls for show/hide transitions
 * - `children` (ReactElement) — single child element that acts as the trigger (required)
 * - `open` / `onOpen` / `onClose` — controlled tooltip state management
 * - `disableInteractive` — prevents tooltip from staying open on hover
 * - `followCursor` — tooltip follows the cursor position
 * - `disableFocusListener` / `disableHoverListener` / `disableTouchListener` — event trigger controls
 * - `id` — HTML id for accessibility (auto-generated if not provided)
 * - `sx` — MUI sx prop for theme-aware styling overrides
 * - `slots` / `slotProps` — MUI v7 slot pattern for sub-component customization
 */
export interface TooltipProps extends MUITooltipProps {}

/**
 * Tooltip wrapper component that wraps MUI's Tooltip with ref forwarding
 * and consistent theming support.
 *
 * Provides a themed informational popup that appears on hover/focus of the
 * child element. The wrapper preserves all MUI Tooltip behaviors including
 * WAI-ARIA tooltip pattern compliance, keyboard navigation support, and
 * automatic `aria-describedby` association.
 *
 * All MUI Tooltip props are forwarded without modification, including the
 * MUI v7 `slots` and `slotProps` API for granular customization of the
 * popper, transition, tooltip surface, and arrow sub-components.
 *
 * @example
 * ```tsx
 * <Tooltip title="Delete item" placement="top" arrow>
 *   <IconButton aria-label="delete">
 *     <DeleteIcon />
 *   </IconButton>
 * </Tooltip>
 * ```
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => {
    return <MUITooltip ref={ref} {...props} />;
  }
);

Tooltip.displayName = 'Tooltip';
