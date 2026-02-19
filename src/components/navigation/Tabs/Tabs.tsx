import React from 'react';
import MUITabs from '@mui/material/Tabs';
import type { TabsProps as MUITabsProps } from '@mui/material/Tabs';
import MUITab from '@mui/material/Tab';
import type { TabProps as MUITabProps } from '@mui/material/Tab';

/**
 * TabsProps extends the MUI TabsProps interface to maintain full API compatibility
 * with the underlying Material UI Tabs container component.
 *
 * Key inherited props:
 * - `value` — The currently selected tab value (controlled component pattern)
 * - `onChange` — Callback fired when the tab selection changes
 * - `variant` — 'standard' | 'scrollable' | 'fullWidth' (defaults to 'standard')
 * - `orientation` — 'horizontal' | 'vertical'
 * - `centered` — Centers tabs (only for variant="standard")
 * - `scrollButtons` — 'auto' | true | false (for variant="scrollable")
 * - `indicatorColor` — 'primary' | 'secondary'
 * - `textColor` — 'primary' | 'secondary' | 'inherit'
 * - `aria-label` / `aria-labelledby` — Accessibility labels for the tablist
 * - `children` — Tab components as children
 * - `sx` — MUI sx prop for theme-aware styling overrides
 */
export interface TabsProps extends MUITabsProps {}

/**
 * Tabs wrapper component for MUI Tabs.
 *
 * Provides controlled tab navigation with themed styling via the MUI theme system.
 * Tab panels are managed externally by the consumer — this wrapper handles only
 * the tab controls (the tablist and individual tab buttons).
 *
 * Accessibility:
 * - Renders with `role="tablist"` automatically via MUI
 * - Supports keyboard navigation: Left/Right arrows (horizontal), Up/Down arrows (vertical), Home/End
 * - Consumer should provide `aria-label` or `aria-labelledby` on this component
 *
 * @example
 * ```tsx
 * <Tabs value={selectedTab} onChange={handleChange} aria-label="navigation tabs">
 *   <Tab label="Tab One" value="one" />
 *   <Tab label="Tab Two" value="two" />
 *   <Tab label="Tab Three" value="three" />
 * </Tabs>
 * ```
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (props, ref) => {
    return <MUITabs ref={ref} {...props} />;
  }
);

Tabs.displayName = 'Tabs';

/**
 * TabProps extends the MUI TabProps interface to maintain full API compatibility
 * with the underlying Material UI Tab component.
 *
 * Key inherited props:
 * - `label` — The label element (string or ReactNode)
 * - `value` — The value matching the parent Tabs `value` for selection
 * - `disabled` — Disables the tab
 * - `icon` — Icon element displayed in the tab
 * - `iconPosition` — 'top' | 'bottom' | 'start' | 'end'
 * - `wrapped` — Wraps label text for long content
 * - `sx` — MUI sx prop for theme-aware styling overrides
 */
export interface TabProps extends MUITabProps {}

/**
 * Tab wrapper component for MUI Tab.
 *
 * Represents an individual tab within a Tabs container.
 * Each Tab should be a direct child of a Tabs component.
 *
 * Accessibility:
 * - Renders with `role="tab"`, `aria-selected`, and proper `tabIndex` via MUI
 * - Keyboard focus and activation are managed by the parent Tabs component
 *
 * @example
 * ```tsx
 * <Tab label="Settings" value="settings" />
 * <Tab label="Profile" icon={<PersonIcon />} iconPosition="start" value="profile" />
 * <Tab label="Disabled" disabled value="disabled" />
 * ```
 */
export const Tab = React.forwardRef<HTMLDivElement, TabProps>(
  (props, ref) => {
    return <MUITab ref={ref} {...props} />;
  }
);

Tab.displayName = 'Tab';
