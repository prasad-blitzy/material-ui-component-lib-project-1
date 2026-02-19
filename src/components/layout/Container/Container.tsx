import { forwardRef } from 'react';
import MUIContainer from '@mui/material/Container';
import type { ContainerProps as MUIContainerProps } from '@mui/material/Container';

/**
 * ContainerProps extends MUI's ContainerProps, providing the full MUI Container
 * API surface including maxWidth, fixed, disableGutters, component, sx, classes,
 * and children props. Custom extensions can be added to this interface as needed.
 */
export interface ContainerProps extends MUIContainerProps {}

/**
 * Container — A themed wrapper around MUI's Container component.
 *
 * Provides a responsive, max-width container for page-level content layout.
 * Supports all MUI Container props including maxWidth breakpoint control,
 * fixed-width mode, gutter management, and theme-aware sx styling.
 *
 * All props and refs are forwarded directly to the underlying MUI Container,
 * preserving the complete MUI API surface while enabling library-level
 * customization and consistent theming.
 *
 * @example
 * ```tsx
 * <Container maxWidth="lg">
 *   <Typography variant="h4">Page Content</Typography>
 * </Container>
 * ```
 *
 * @example
 * ```tsx
 * <Container fixed disableGutters maxWidth="md" sx={{ py: 4 }}>
 *   {children}
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    return <MUIContainer ref={ref} {...props} />;
  }
);

Container.displayName = 'Container';
