import { forwardRef } from 'react';
import MUICard from '@mui/material/Card';
import type { CardProps as MUICardProps } from '@mui/material/Card';
import MUICardHeader from '@mui/material/CardHeader';
import type { CardHeaderProps as MUICardHeaderProps } from '@mui/material/CardHeader';
import MUICardContent from '@mui/material/CardContent';
import type { CardContentProps as MUICardContentProps } from '@mui/material/CardContent';
import MUICardActions from '@mui/material/CardActions';
import type { CardActionsProps as MUICardActionsProps } from '@mui/material/CardActions';
import MUICardMedia from '@mui/material/CardMedia';
import type { CardMediaProps as MUICardMediaProps } from '@mui/material/CardMedia';

/**
 * CardProps extends MUI CardProps, providing full prop forwarding
 * for the Card surface container component.
 *
 * Key inherited props: variant ('elevation' | 'outlined'), raised, elevation, square, children, sx
 */
export interface CardProps extends MUICardProps {}

/**
 * CardHeaderProps extends MUI CardHeaderProps, providing full prop forwarding
 * for the Card header sub-component.
 *
 * Key inherited props: title, subheader, avatar, action, titleTypographyProps, subheaderTypographyProps, sx
 */
export interface CardHeaderProps extends MUICardHeaderProps {}

/**
 * CardContentProps extends MUI CardContentProps, providing full prop forwarding
 * for the Card body content sub-component.
 *
 * Key inherited props: children, sx
 */
export interface CardContentProps extends MUICardContentProps {}

/**
 * CardActionsProps extends MUI CardActionsProps, providing full prop forwarding
 * for the Card footer actions sub-component.
 *
 * Key inherited props: disableSpacing, children, sx
 */
export interface CardActionsProps extends MUICardActionsProps {}

/**
 * CardMediaProps extends MUI CardMediaProps, providing full prop forwarding
 * for the Card media (image/video) sub-component.
 *
 * Key inherited props: component, image, src, alt, sx
 */
export interface CardMediaProps extends MUICardMediaProps {}

/**
 * Card — Themed wrapper around MUI Card.
 *
 * A surface container component for grouping related content and actions.
 * Supports elevation and outlined variants via the `variant` prop.
 * Compose with CardHeader, CardContent, CardActions, and CardMedia sub-components.
 *
 * @example
 * ```tsx
 * <Card variant="outlined">
 *   <CardHeader title="Title" subheader="Subtitle" />
 *   <CardContent>Body content</CardContent>
 *   <CardActions><Button>Action</Button></CardActions>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(props, ref) {
    return <MUICard ref={ref} {...props} />;
  }
);

Card.displayName = 'Card';

/**
 * CardHeader — Themed wrapper around MUI CardHeader.
 *
 * Renders a card header section with title, subheader, avatar, and action areas.
 * Supports MUI v7 slot pattern for customization.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(props, ref) {
    return <MUICardHeader ref={ref} {...props} />;
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardContent — Themed wrapper around MUI CardContent.
 *
 * Renders the main body content area of a card with appropriate padding.
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent(props, ref) {
    return <MUICardContent ref={ref} {...props} />;
  }
);

CardContent.displayName = 'CardContent';

/**
 * CardActions — Themed wrapper around MUI CardActions.
 *
 * Renders the footer actions area of a card with appropriate spacing.
 * Use `disableSpacing` to remove default spacing between child elements.
 */
export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  function CardActions(props, ref) {
    return <MUICardActions ref={ref} {...props} />;
  }
);

CardActions.displayName = 'CardActions';

/**
 * CardMedia — Themed wrapper around MUI CardMedia.
 *
 * Renders media content (images, videos) within a card.
 * Use the `component` prop to specify the media element type (e.g., 'img').
 * Provide an `alt` prop for image accessibility.
 *
 * @example
 * ```tsx
 * <CardMedia component="img" image="/photo.jpg" alt="Description" height="140" />
 * ```
 */
export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  function CardMedia(props, ref) {
    return <MUICardMedia ref={ref} {...props} />;
  }
);

CardMedia.displayName = 'CardMedia';
