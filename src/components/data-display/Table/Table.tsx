import { forwardRef } from 'react';
import MUITable from '@mui/material/Table';
import type { TableProps as MUITableProps } from '@mui/material/Table';
import MUITableHead from '@mui/material/TableHead';
import type { TableHeadProps as MUITableHeadProps } from '@mui/material/TableHead';
import MUITableBody from '@mui/material/TableBody';
import type { TableBodyProps as MUITableBodyProps } from '@mui/material/TableBody';
import MUITableRow from '@mui/material/TableRow';
import type { TableRowProps as MUITableRowProps } from '@mui/material/TableRow';
import MUITableCell from '@mui/material/TableCell';
import type { TableCellProps as MUITableCellProps } from '@mui/material/TableCell';

// ---------------------------------------------------------------------------
// Props Interfaces
// ---------------------------------------------------------------------------
// Each interface extends its MUI counterpart, inheriting the full MUI prop
// surface. Consumers get complete type-safety and IDE intellisense for every
// MUI prop (size, padding, stickyHeader, sx, className, etc.) while the
// library retains the ability to add custom extensions in future versions.
// ---------------------------------------------------------------------------

/**
 * Props for the Table wrapper component.
 *
 * Inherits all MUI TableProps including:
 * - `size` — 'small' | 'medium' (allows TableCells to inherit size)
 * - `padding` — 'checkbox' | 'none' | 'normal' (allows TableCells to inherit padding)
 * - `stickyHeader` — boolean (sets the header sticky)
 * - `children` — React.ReactNode (normally TableHead and TableBody)
 * - `sx` — MUI System sx prop for theme-aware styling
 * - `className` — standard HTML class attribute
 */
export interface TableProps extends MUITableProps {}

/**
 * Props for the TableHead wrapper component.
 *
 * Inherits all MUI TableHeadProps including:
 * - `children` — React.ReactNode (normally TableRow elements)
 * - `sx` — MUI System sx prop for theme-aware styling
 * - `className` — standard HTML class attribute
 */
export interface TableHeadProps extends MUITableHeadProps {}

/**
 * Props for the TableBody wrapper component.
 *
 * Inherits all MUI TableBodyProps including:
 * - `children` — React.ReactNode (normally TableRow elements)
 * - `sx` — MUI System sx prop for theme-aware styling
 * - `className` — standard HTML class attribute
 */
export interface TableBodyProps extends MUITableBodyProps {}

/**
 * Props for the TableRow wrapper component.
 *
 * Inherits all MUI TableRowProps including:
 * - `hover` — boolean (if true, the row will shade on hover)
 * - `selected` — boolean (if true, the row will have the selected shading)
 * - `children` — React.ReactNode (normally TableCell elements)
 * - `sx` — MUI System sx prop for theme-aware styling
 * - `className` — standard HTML class attribute
 */
export interface TableRowProps extends MUITableRowProps {}

/**
 * Props for the TableCell wrapper component.
 *
 * Inherits all MUI TableCellProps including:
 * - `align` — 'left' | 'center' | 'right' | 'justify' | 'inherit'
 * - `scope` — string (scope attribute for th elements, aids screen readers)
 * - `variant` — 'head' | 'body' | 'footer'
 * - `padding` — 'checkbox' | 'none' | 'normal'
 * - `size` — 'small' | 'medium'
 * - `sortDirection` — 'asc' | 'desc' | false
 * - `children` — React.ReactNode
 * - `sx` — MUI System sx prop for theme-aware styling
 * - `className` — standard HTML class attribute
 */
export interface TableCellProps extends MUITableCellProps {}

// ---------------------------------------------------------------------------
// Table Component
// ---------------------------------------------------------------------------
// Wraps MUI Table, rendering a semantic <table> element. Forwards all props
// and the ref to the underlying MUI component. Inherits MUI's built-in
// accessibility via proper HTML table semantics.
// ---------------------------------------------------------------------------

const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  return <MUITable ref={ref} {...props} />;
});

Table.displayName = 'Table';

// ---------------------------------------------------------------------------
// TableHead Component
// ---------------------------------------------------------------------------
// Wraps MUI TableHead, rendering a semantic <thead> element. Provides the
// table context that marks child TableCell components as header cells (<th>).
// ---------------------------------------------------------------------------

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>((props, ref) => {
  return <MUITableHead ref={ref} {...props} />;
});

TableHead.displayName = 'TableHead';

// ---------------------------------------------------------------------------
// TableBody Component
// ---------------------------------------------------------------------------
// Wraps MUI TableBody, rendering a semantic <tbody> element. Provides the
// table context that marks child TableCell components as body cells (<td>).
// ---------------------------------------------------------------------------

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>((props, ref) => {
  return <MUITableBody ref={ref} {...props} />;
});

TableBody.displayName = 'TableBody';

// ---------------------------------------------------------------------------
// TableRow Component
// ---------------------------------------------------------------------------
// Wraps MUI TableRow, rendering a semantic <tr> element. Supports hover and
// selected states via props for interactive table rows.
// ---------------------------------------------------------------------------

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => {
  return <MUITableRow ref={ref} {...props} />;
});

TableRow.displayName = 'TableRow';

// ---------------------------------------------------------------------------
// TableCell Component
// ---------------------------------------------------------------------------
// Wraps MUI TableCell, rendering a semantic <td> or <th> element depending
// on context (body vs head). Supports align, scope, variant, padding, size,
// and sortDirection props for comprehensive table cell configuration.
// The scope attribute on header cells provides screen reader context.
// ---------------------------------------------------------------------------

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>((props, ref) => {
  return <MUITableCell ref={ref} {...props} />;
});

TableCell.displayName = 'TableCell';

// ---------------------------------------------------------------------------
// Named Exports — NO default exports (AAP Section 0.8.3)
// ---------------------------------------------------------------------------

export { Table, TableHead, TableBody, TableRow, TableCell };
