import { forwardRef } from 'react';
import MUIList from '@mui/material/List';
import type { ListProps as MUIListProps } from '@mui/material/List';
import MUIListItem from '@mui/material/ListItem';
import type { ListItemProps as MUIListItemProps } from '@mui/material/ListItem';
import MUIListItemText from '@mui/material/ListItemText';
import type { ListItemTextProps as MUIListItemTextProps } from '@mui/material/ListItemText';
import MUIListItemIcon from '@mui/material/ListItemIcon';
import type { ListItemIconProps as MUIListItemIconProps } from '@mui/material/ListItemIcon';
import MUIListItemButton from '@mui/material/ListItemButton';
import type { ListItemButtonProps as MUIListItemButtonProps } from '@mui/material/ListItemButton';

/**
 * Props interface for the List wrapper component.
 * Extends MUI ListProps to provide full prop forwarding with type safety.
 * Supports all MUI List props including dense, disablePadding, subheader, and sx.
 */
export interface ListProps extends MUIListProps {}

/**
 * Props interface for the ListItem wrapper component.
 * Extends MUI ListItemProps to provide full prop forwarding with type safety.
 * Supports all MUI ListItem props including alignItems, disableGutters, divider, and secondaryAction.
 */
export interface ListItemProps extends MUIListItemProps {}

/**
 * Props interface for the ListItemText wrapper component.
 * Extends MUI ListItemTextProps to provide full prop forwarding with type safety.
 * Supports all MUI ListItemText props including primary, secondary, inset, and typography props.
 */
export interface ListItemTextProps extends MUIListItemTextProps {}

/**
 * Props interface for the ListItemIcon wrapper component.
 * Extends MUI ListItemIconProps to provide full prop forwarding with type safety.
 * Supports all MUI ListItemIcon props including children and sx.
 */
export interface ListItemIconProps extends MUIListItemIconProps {}

/**
 * Props interface for the ListItemButton wrapper component.
 * Extends MUI ListItemButtonProps to provide full prop forwarding with type safety.
 * Supports all MUI ListItemButton props including selected, disabled, dense, and onClick.
 */
export interface ListItemButtonProps extends MUIListItemButtonProps {}

/**
 * List wrapper component that composes MUI List for themed list layouts.
 * Renders a `<ul>` element by default with MUI's built-in role="list" ARIA semantics.
 * Forwards all MUI List props and ref to the underlying MUI List component.
 *
 * @example
 * ```tsx
 * <List dense disablePadding>
 *   <ListItem>
 *     <ListItemText primary="Item 1" />
 *   </ListItem>
 * </List>
 * ```
 */
export const List = forwardRef<HTMLUListElement, ListProps>(
  function List(props, ref) {
    return <MUIList ref={ref} {...props} />;
  }
);

List.displayName = 'List';

/**
 * ListItem wrapper component that composes MUI ListItem for themed list item layouts.
 * Renders a `<li>` element by default with MUI's built-in role="listitem" ARIA semantics.
 * Forwards all MUI ListItem props and ref to the underlying MUI ListItem component.
 *
 * @example
 * ```tsx
 * <ListItem disablePadding divider>
 *   <ListItemButton>
 *     <ListItemText primary="Clickable item" />
 *   </ListItemButton>
 * </ListItem>
 * ```
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(props, ref) {
    return <MUIListItem ref={ref} {...props} />;
  }
);

ListItem.displayName = 'ListItem';

/**
 * ListItemText wrapper component that composes MUI ListItemText for primary/secondary text content.
 * Renders a `<div>` wrapper containing Typography elements for primary and secondary text.
 * Forwards all MUI ListItemText props and ref to the underlying MUI ListItemText component.
 *
 * @example
 * ```tsx
 * <ListItemText
 *   primary="Primary text"
 *   secondary="Secondary text"
 * />
 * ```
 */
export const ListItemText = forwardRef<HTMLDivElement, ListItemTextProps>(
  function ListItemText(props, ref) {
    return <MUIListItemText ref={ref} {...props} />;
  }
);

ListItemText.displayName = 'ListItemText';

/**
 * ListItemIcon wrapper component that composes MUI ListItemIcon for icon display in list items.
 * Renders a `<div>` wrapper styled for icon alignment within list items.
 * Forwards all MUI ListItemIcon props and ref to the underlying MUI ListItemIcon component.
 *
 * @example
 * ```tsx
 * <ListItemIcon>
 *   <InboxIcon />
 * </ListItemIcon>
 * ```
 */
export const ListItemIcon = forwardRef<HTMLDivElement, ListItemIconProps>(
  function ListItemIcon(props, ref) {
    return <MUIListItemIcon ref={ref} {...props} />;
  }
);

ListItemIcon.displayName = 'ListItemIcon';

/**
 * ListItemButton wrapper component that composes MUI ListItemButton for clickable list items.
 * Renders a `<div>` by default (or `<a>` when href is provided) with keyboard navigation
 * and focus management built in from MUI.
 * Forwards all MUI ListItemButton props and ref to the underlying MUI ListItemButton component.
 *
 * @example
 * ```tsx
 * <ListItemButton selected onClick={handleClick}>
 *   <ListItemIcon>
 *     <InboxIcon />
 *   </ListItemIcon>
 *   <ListItemText primary="Inbox" secondary="5 new messages" />
 * </ListItemButton>
 * ```
 */
export const ListItemButton = forwardRef<HTMLDivElement, ListItemButtonProps>(
  function ListItemButton(props, ref) {
    return <MUIListItemButton ref={ref} {...props} />;
  }
);

ListItemButton.displayName = 'ListItemButton';
