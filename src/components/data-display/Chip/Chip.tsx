import React from 'react';
import MUIChip from '@mui/material/Chip';
import type { ChipProps as MUIChipProps } from '@mui/material/Chip';

/**
 * ChipProps interface extending MUI's ChipProps.
 *
 * Provides a library-specific type for the Chip component that inherits
 * all MUI Chip props (label, variant, color, size, onDelete, icon, avatar,
 * clickable, disabled, deleteIcon, onClick, sx, and more).
 *
 * Defined as a separate interface to:
 * 1. Allow consumers to import a library-specific type
 * 2. Enable future extensions without breaking changes
 * 3. Maintain a stable type name through the barrel export chain
 */
export interface ChipProps extends MUIChipProps {}

/**
 * Chip — A themed wrapper around MUI's Chip component.
 *
 * Renders a compact element for tags, labels, and actions with full
 * support for MUI's theming system. Supports filled and outlined variants,
 * semantic colors, deletable and clickable states, and icon/avatar integration.
 *
 * All props are forwarded directly to MUI's Chip primitive via spread.
 * Ref forwarding is implemented for consumer DOM access.
 *
 * @example
 * ```tsx
 * <Chip label="Tag" variant="outlined" color="primary" />
 * <Chip label="Deletable" onDelete={handleDelete} />
 * <Chip label="Clickable" clickable onClick={handleClick} />
 * ```
 */
export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (props, ref) => {
    return <MUIChip ref={ref} {...props} />;
  }
);

Chip.displayName = 'Chip';
