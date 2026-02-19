/**
 * Card module barrel export.
 *
 * Re-exports all Card wrapper components and their TypeScript props interfaces
 * from the Card implementation file. This barrel enables clean import paths
 * for consumers and the parent data-display category barrel.
 *
 * Exported components: Card, CardHeader, CardContent, CardActions, CardMedia
 * Exported types: CardProps, CardHeaderProps, CardContentProps, CardActionsProps, CardMediaProps
 */
export {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
} from './Card';

export type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardActionsProps,
  CardMediaProps,
} from './Card';
