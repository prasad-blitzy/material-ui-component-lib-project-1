import { forwardRef } from 'react';
import MUITypography from '@mui/material/Typography';
import type { TypographyProps as MUITypographyProps } from '@mui/material/Typography';

/**
 * TypographyProps extends MUI's TypographyProps interface, providing a type
 * extension point for future custom props while maintaining full compatibility
 * with MUI's Typography API surface.
 *
 * All standard MUI Typography props are inherited:
 * - variant: h1-h6, subtitle1-2, body1-2, caption, overline, button, inherit
 * - component: Polymorphic HTML element or React component override
 * - color: Theme-aware color token (primary, secondary, error, etc.)
 * - align: Text alignment (inherit, left, center, right, justify)
 * - gutterBottom: Adds bottom margin when true
 * - noWrap: Truncate text with ellipsis on overflow
 * - paragraph: Renders as <p> element when true
 * - sx: MUI sx prop for theme-aware inline styling
 * - children: React.ReactNode content
 */
export interface TypographyProps extends MUITypographyProps {}

/**
 * Typography wrapper component that wraps MUI's Typography primitive.
 *
 * This is the core text rendering component in the data display category,
 * providing themed text styles through MUI's typography scale tokens.
 * It renders semantic HTML elements based on the variant prop (e.g.,
 * variant="h1" renders <h1>, variant="body1" renders <p>).
 *
 * Follows the MUI composition pattern — delegates entirely to the MUI
 * primitive with full prop forwarding. All styling is resolved through
 * MUI theme tokens via theme.typography.* at render time.
 *
 * Uses React.forwardRef to enable consumers to attach refs to the
 * underlying MUI DOM element. The ref type is HTMLElement to accommodate
 * the various HTML elements Typography may render (h1-h6, p, span, etc.).
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Heading 1</Typography>
 * <Typography variant="body1" color="text.secondary">Body text</Typography>
 * <Typography variant="caption" gutterBottom>Caption with margin</Typography>
 * <Typography variant="h2" component="h1">Visually h2, semantically h1</Typography>
 * ```
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (props, ref) => {
    return <MUITypography ref={ref} {...props} />;
  }
);

Typography.displayName = 'Typography';
