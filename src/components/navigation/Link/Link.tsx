import { forwardRef } from 'react';
import MUILink from '@mui/material/Link';
import type { LinkProps as MUILinkProps } from '@mui/material/Link';

/**
 * LinkProps extends MUI's LinkProps interface to provide the full API surface
 * of MUI's Link component. This includes href, underline, color, variant,
 * sx, component, children, and all standard anchor HTML attributes.
 *
 * The interface is extended (rather than aliased) to allow future custom
 * prop additions without breaking the public API contract.
 */
export interface LinkProps extends MUILinkProps {}

/**
 * Link — A themed wrapper around MUI's Link component.
 *
 * This component provides a themed anchor element with typography integration,
 * inheriting MUI's built-in accessibility features (semantic `<a>` element,
 * proper ARIA roles, keyboard navigation, and focus management).
 *
 * All MUI Link props are forwarded, including:
 * - `href` — The link destination URL
 * - `underline` — Controls underline decoration ('always' | 'hover' | 'none')
 * - `color` — Themed color from the palette (defaults to 'primary')
 * - `variant` — Typography variant for text styling (defaults to 'inherit')
 * - `sx` — MUI sx prop for theme-aware one-off styling
 * - `component` — Polymorphic component override
 *
 * Ref forwarding is supported to provide direct access to the underlying
 * HTMLAnchorElement.
 *
 * @example
 * ```tsx
 * <Link href="/about" underline="hover" color="secondary">
 *   About Us
 * </Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    return <MUILink ref={ref} {...props} />;
  }
);

Link.displayName = 'Link';
