import { forwardRef } from 'react';
import MUIBreadcrumbs from '@mui/material/Breadcrumbs';
import type { BreadcrumbsProps as MUIBreadcrumbsProps } from '@mui/material/Breadcrumbs';

/**
 * BreadcrumbsProps extends MUI's BreadcrumbsProps to maintain full API surface forwarding.
 *
 * Inherited key props include:
 * - `separator` — custom separator node between breadcrumb items (defaults to '/')
 * - `maxItems` — maximum number of breadcrumb items before collapsing
 * - `itemsBeforeCollapse` — items shown before the collapsed ellipsis
 * - `itemsAfterCollapse` — items shown after the collapsed ellipsis
 * - `children` — breadcrumb items (typically Link or Typography components)
 * - `sx` — MUI sx prop for theme-aware one-off styling
 * - All standard HTML nav element attributes via MUI's prop forwarding
 */
export interface BreadcrumbsProps extends MUIBreadcrumbsProps {}

/**
 * Breadcrumbs wrapper component that encapsulates MUI's Breadcrumbs for themed
 * navigation hierarchy display.
 *
 * This is a thin wrapper following the MUI composition pattern — it delegates
 * entirely to MUI's Breadcrumbs component, preserving the complete API surface
 * including separator theming, collapse behavior, and WCAG 2.1 AA accessibility
 * compliance (semantic `<nav>` element with `aria-label="breadcrumb"` and
 * proper `<ol>`/`<li>` list semantics).
 *
 * @example
 * ```tsx
 * <Breadcrumbs separator="›" maxItems={3}>
 *   <Link href="/">Home</Link>
 *   <Link href="/category">Category</Link>
 *   <Typography color="text.primary">Current Page</Typography>
 * </Breadcrumbs>
 * ```
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (props, ref) => {
    return <MUIBreadcrumbs ref={ref} {...props} />;
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';
