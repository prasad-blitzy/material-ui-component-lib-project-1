/**
 * Core Components Category Barrel Export
 *
 * Aggregates and re-exports all 7 core input/action wrapper components and their
 * associated TypeScript props interfaces. This barrel serves as the single import
 * point for the core component category, consumed by the components aggregate
 * barrel at src/components/index.ts via `export * from './core'`.
 *
 * Exported components:
 *  - Button        — Themed button with contained, outlined, and text variants
 *  - TextField     — Themed text input with label, validation, and helper text
 *  - Select        — Themed dropdown select with MenuItem for option rendering
 *  - Checkbox      — Themed checkbox with FormControlLabel integration
 *  - Radio         — Themed radio button and RadioGroup for grouped selection
 *  - Switch        — Themed toggle switch with FormControlLabel integration
 *  - IconButton    — Themed icon-only button with enforced aria-label
 *
 * Architecture rules enforced:
 *  - Named exports only (no default exports) for tree-shakeability
 *  - Pure re-exports with zero runtime side effects (sideEffects: false)
 *  - No cross-component imports; each component module is independent
 *  - No circular dependencies; this file only re-exports from child barrels
 *
 * @module components/core
 */

// Button — Primary action component with themed variant support
export { Button } from './Button';
export type { ButtonProps } from './Button';

// TextField — Themed text input with validation and helper text
export { TextField } from './TextField';
export type { TextFieldProps } from './TextField';

// Select — Themed dropdown select with MenuItem for option rendering
export { Select, MenuItem } from './Select';
export type { SelectProps, MenuItemProps } from './Select';

// Checkbox — Themed checkbox control with label integration
export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';

// Radio — Themed radio button and radio group for exclusive selection
export { Radio, RadioGroup } from './Radio';
export type { RadioProps, RadioGroupProps } from './Radio';

// Switch — Themed toggle switch control with label integration
export { Switch } from './Switch';
export type { SwitchProps } from './Switch';

// IconButton — Themed icon-only action button with accessible labeling
export { IconButton } from './IconButton';
export type { IconButtonProps } from './IconButton';
