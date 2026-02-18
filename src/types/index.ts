/**
 * @file src/types/index.ts
 * @description Shared TypeScript utility types for the Material UI wrapper component library.
 *
 * This is a foundational module that sits at the bottom of the dependency chain.
 * All 30 wrapper components across 5 categories (Core, Layout, Navigation,
 * Data Display, Feedback), the theme system, and the root barrel export
 * consume types defined here.
 *
 * Architecture rules enforced:
 * - Named exports ONLY (no default exports)
 * - Zero internal imports (only external packages: react, @mui/material/styles)
 * - No circular dependencies
 * - No runtime code — pure type definitions for tree-shaking safety
 * - TypeScript strict mode compatible
 *
 * Dependency flow: Foundation (this file) → Theme → Components → Infrastructure
 */

import type React from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

// ---------------------------------------------------------------------------
// Common Props Interface
// ---------------------------------------------------------------------------

/**
 * CommonProps — shared HTML/MUI attributes accepted by all wrapper components.
 *
 * Provides a baseline set of props that every wrapper component can extend,
 * ensuring a consistent API surface across the library. Consumers can always
 * pass className, style, id, sx, and children to any component.
 *
 * @example
 * ```tsx
 * interface ButtonProps extends CommonProps {
 *   variant?: 'contained' | 'outlined' | 'text';
 * }
 * ```
 */
export interface CommonProps {
  /** CSS class name for consumer styling and CSS-module integration. */
  className?: string;

  /** Inline React style object for quick one-off styling adjustments. */
  style?: React.CSSProperties;

  /** HTML id attribute for DOM identification and label association. */
  id?: string;

  /**
   * MUI sx prop for theme-aware responsive styling.
   * Accepts a superset of CSS properties with access to theme tokens via
   * callback syntax: `sx={{ color: (theme) => theme.palette.primary.main }}`.
   */
  sx?: SxProps<Theme>;

  /** React children rendered within the component. */
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Theme Helper Types
// ---------------------------------------------------------------------------

/**
 * WithTheme — extends a props type with an optional explicit `theme` property.
 *
 * Used by components that may optionally accept a theme directly rather than
 * relying solely on React Context provided by ThemeProvider.
 *
 * @typeParam P - The base props type to extend. Defaults to an empty object.
 *
 * @example
 * ```tsx
 * type ThemedButtonProps = WithTheme<ButtonProps>;
 * // Equivalent to: ButtonProps & { theme?: Theme }
 * ```
 */
export type WithTheme<P = {}> = P & { theme?: Theme };

// ---------------------------------------------------------------------------
// MUI Internal Props Omission Utility
// ---------------------------------------------------------------------------

/**
 * OmitMUIInternals — removes MUI internal props that should not be exposed
 * in the wrapper component's public API.
 *
 * MUI components carry internal props such as `classes` (JSS/Emotion class
 * name mapping) and `ownerState` (internal component state tracking) that
 * are implementation details. Wrapper components use this utility to present
 * a cleaner public prop interface while still forwarding remaining MUI props.
 *
 * @typeParam P - The full MUI component props type to sanitize.
 *
 * @example
 * ```tsx
 * type CleanButtonProps = OmitMUIInternals<MUIButtonProps>;
 * // MUIButtonProps minus 'classes' and 'ownerState'
 * ```
 */
export type OmitMUIInternals<P> = Omit<P, 'classes' | 'ownerState'>;

// ---------------------------------------------------------------------------
// Component Prop Forwarding Generics
// ---------------------------------------------------------------------------

/**
 * OverridableComponentProps — merges MUI component props with custom wrapper
 * extension props, giving custom props precedence on key conflicts.
 *
 * This enables wrapper components to override specific MUI prop types (e.g.,
 * narrowing a union or replacing a callback signature) while preserving the
 * full MUI prop surface for consumer convenience.
 *
 * @typeParam M - The MUI component's full props type.
 * @typeParam P - Custom extension props added by the wrapper. Defaults to {}.
 *
 * @example
 * ```tsx
 * type CustomSelectProps = OverridableComponentProps<
 *   MUISelectProps,
 *   { value: string } // narrows MUI's generic value type to string
 * >;
 * ```
 */
export type OverridableComponentProps<M, P = {}> = Omit<M, keyof P> & P;

/**
 * PropsWithRef — augments a props type with a typed ref for React.forwardRef
 * compatibility.
 *
 * Every wrapper component in this library uses React.forwardRef. This utility
 * ensures the ref prop is correctly typed against the underlying DOM element,
 * providing full TypeScript intellisense for ref consumers.
 *
 * @typeParam P - The base props type.
 * @typeParam E - The HTML element type the ref targets. Defaults to HTMLElement.
 *
 * @example
 * ```tsx
 * type ButtonPropsWithRef = PropsWithRef<ButtonProps, HTMLButtonElement>;
 * // ButtonProps & { ref?: React.Ref<HTMLButtonElement> }
 * ```
 */
export type PropsWithRef<P, E extends HTMLElement = HTMLElement> = P & {
  ref?: React.Ref<E>;
};

// ---------------------------------------------------------------------------
// Shared Component Literal Union Types
// ---------------------------------------------------------------------------

/**
 * ComponentSize — standard size variants used across multiple wrapper components.
 *
 * Aligns with MUI's three-tier sizing model. Components such as Button,
 * TextField, IconButton, Chip, and progress indicators accept this type.
 */
export type ComponentSize = 'small' | 'medium' | 'large';

/**
 * ComponentColor — standard color options aligned with the MUI palette.
 *
 * Maps directly to MUI's semantic color tokens plus the 'inherit' passthrough.
 * Used by components such as Button, IconButton, Checkbox, Radio, Switch,
 * Chip, Alert, CircularProgress, and LinearProgress.
 */
export type ComponentColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'inherit';

/**
 * ComponentVariant — standard visual variant pattern for interactive elements.
 *
 * Matches MUI Button's three variant options. Also applicable to other
 * components that support a similar contained/outlined/text visual pattern.
 */
export type ComponentVariant = 'contained' | 'outlined' | 'text';
