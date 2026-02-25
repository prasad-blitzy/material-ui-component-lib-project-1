/**
 * @file .storybook/preview.ts
 * @description Global Storybook preview configuration for the component library.
 *
 * Registers the library's ThemeProvider as a global decorator so that every
 * story renders within the library's theme context (including CssBaseline for
 * consistent baseline styling). Also configures default layout parameters and
 * automatic control-type matchers for color and date props.
 *
 * This file uses `.ts` (not `.tsx`) — all element creation uses
 * React.createElement instead of JSX syntax.
 *
 * @module .storybook/preview
 */

import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/theme/ThemeProvider';

/**
 * Global Storybook preview configuration object.
 *
 * - `decorators`: Wraps every story in the library's ThemeProvider, which
 *   provides the default theme (all 6 token modules: colors, typography,
 *   spacing, breakpoints, shadows, shape) and injects CssBaseline for
 *   cross-browser CSS normalization.
 *
 * - `parameters.layout`: Defaults to `'centered'` for most components.
 *   Individual stories can override with `'fullscreen'` (AppBar, Drawer)
 *   or `'padded'` (Grid, Container).
 *
 * - `parameters.controls.matchers`: Auto-detects Storybook control types
 *   from prop names — color picker for props ending in "background" or
 *   "color", date picker for props ending in "Date".
 */
const preview: Preview = {
  decorators: [
    (Story) => React.createElement(ThemeProvider, null, React.createElement(Story)),
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
