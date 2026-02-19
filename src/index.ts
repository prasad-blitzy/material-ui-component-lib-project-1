/**
 * @file src/index.ts
 * @description Root barrel export — Library public API entry point.
 *
 * This file is the single entry point for the material-ui-component-lib-project-1
 * package. It aggregates and re-exports every public symbol from the three
 * architectural layers of the library:
 *
 *  1. **Theme System** (`./theme`)
 *     - ThemeProvider component for distributing design tokens via React Context
 *     - createCustomTheme factory for building customised MUI themes
 *     - defaultThemeOptions constant with baseline theme configuration
 *     - Design token constants: colorTokens, typographyTokens, spacingTokens,
 *       breakpointTokens, shadowTokens, shapeTokens
 *     - TypeScript types: CustomThemeOptions, ThemeProviderProps, and token types
 *
 *  2. **Wrapper Components** (`./components`)
 *     - Core (7): Button, TextField, Select, Checkbox, Radio, Switch, IconButton
 *     - Layout (6): Box, Container, Grid, Stack, Divider, Paper
 *     - Navigation (5): AppBar, Tabs, Drawer, Breadcrumbs, Link
 *     - Data Display (7): Typography, Table, Card, Avatar, Chip, List, Tooltip
 *     - Feedback (5): Alert, Dialog, Snackbar, CircularProgress, LinearProgress
 *     - All corresponding Props interfaces (ButtonProps, TextFieldProps, etc.)
 *
 *  3. **Shared Types** (`./types`)
 *     - CommonProps, WithTheme, OmitMUIInternals, OverridableComponentProps,
 *       PropsWithRef, ComponentSize, ComponentColor, ComponentVariant
 *
 * Consumer usage:
 * ```tsx
 * import {
 *   ThemeProvider,
 *   createCustomTheme,
 *   Button,
 *   Typography,
 * } from 'material-ui-component-lib-project-1';
 * ```
 *
 * Architecture rules:
 * - Named exports ONLY — no default exports (AAP Section 0.8.3)
 * - Pure re-exports — zero runtime side effects (sideEffects: false in package.json)
 * - No circular imports — this file only re-exports, never imports for internal use
 * - Tree-shakeable — named `export *` allows bundlers to eliminate unused symbols
 * - Unidirectional dependency flow: Theme → Components → Infrastructure (this file)
 *
 * Referenced by:
 * - vite.config.ts → build.lib.entry
 * - package.json   → exports["."]
 * - tsconfig.build.json → includes
 *
 * @module index
 */

// ---------------------------------------------------------------------------
// Theme System
// ---------------------------------------------------------------------------
// ThemeProvider, createCustomTheme, defaultThemeOptions, design tokens
// (colorTokens, typographyTokens, spacingTokens, breakpointTokens,
// shadowTokens, shapeTokens), and all theme-related TypeScript types
// (CustomThemeOptions, ThemeProviderProps, token type aliases).
export * from './theme';

// ---------------------------------------------------------------------------
// Wrapper Components
// ---------------------------------------------------------------------------
// All 30 wrapper components across 5 categories and their Props interfaces:
//   Core:         Button, TextField, Select, Checkbox, Radio, Switch, IconButton
//   Layout:       Box, Container, Grid, Stack, Divider, Paper
//   Navigation:   AppBar, Tabs, Drawer, Breadcrumbs, Link
//   Data Display: Typography, Table, Card, Avatar, Chip, List, Tooltip
//   Feedback:     Alert, Dialog, Snackbar, CircularProgress, LinearProgress
export * from './components';

// ---------------------------------------------------------------------------
// Shared TypeScript Utility Types
// ---------------------------------------------------------------------------
// CommonProps, WithTheme, OmitMUIInternals, OverridableComponentProps,
// PropsWithRef, ComponentSize, ComponentColor, ComponentVariant.
export * from './types';
