import { forwardRef } from 'react';
import MUIAvatar from '@mui/material/Avatar';
import type { AvatarProps as MUIAvatarProps } from '@mui/material/Avatar';

/**
 * AvatarProps extends MUI's AvatarProps for full prop compatibility.
 *
 * Supports three avatar types:
 * - Image avatar: provide `src` and `alt` props
 * - Letter avatar: provide a string as `children`
 * - Icon avatar: provide an icon React element as `children`
 *
 * All MUI Avatar props are forwarded, including:
 * - `variant`: 'circular' | 'rounded' | 'square' (default: 'circular')
 * - `sx`: theme-aware styling via MUI's sx prop system
 * - `component`: polymorphic root element override
 * - `imgProps`: props forwarded to the underlying img element
 * - `sizes`: responsive image sizes attribute
 * - `slotProps` / `slots`: MUI v7 slot customization pattern
 */
export interface AvatarProps extends MUIAvatarProps {}

/**
 * Avatar wrapper component built on MUI's Avatar primitive.
 *
 * Provides a themed avatar element that supports image, letter, and icon
 * display modes. Uses React.forwardRef to enable ref forwarding to the
 * underlying HTMLDivElement rendered by MUI Avatar.
 *
 * @example
 * ```tsx
 * // Image avatar
 * <Avatar src="/path/to/image.jpg" alt="User Name" />
 *
 * // Letter avatar
 * <Avatar>AB</Avatar>
 *
 * // Icon avatar
 * <Avatar><PersonIcon /></Avatar>
 *
 * // Custom sizing via sx prop
 * <Avatar sx={{ width: 56, height: 56 }} src="/photo.jpg" alt="Large avatar" />
 *
 * // Shape variants
 * <Avatar variant="rounded" src="/photo.jpg" alt="Rounded avatar" />
 * ```
 */
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    return <MUIAvatar ref={ref} {...props} />;
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
