import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { IconButton } from './IconButton';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Uses `cssVariables: false` to bypass MUI v7's CSS variables mode (which
 * requires the `colorSchemes` API for dark mode) and explicit dark-mode
 * background/text values to override the light-mode defaults from colorTokens.
 */
const darkTheme = createCustomTheme({
  cssVariables: false,
  palette: {
    mode: 'dark',
    background: { default: '#121212', paper: '#121212' },
    text: { primary: '#fff', secondary: 'rgba(255, 255, 255, 0.7)' },
  },
});

/**
 * Storybook meta configuration for the IconButton core component.
 *
 * IconButton is a Pattern C — Accessibility Enforcing wrapper around MUI
 * IconButton. It derives IconButtonProps from MUI by omitting `aria-label`
 * and reintroducing it as a **required string prop**, enforcing WCAG 2.1 AA
 * compliance at the TypeScript level. This guarantees every icon button is
 * announced correctly by screen readers.
 *
 * Since the library does not export MUI icons (`@mui/icons-material`), all
 * stories use Unicode emoji characters as icon placeholders (★, ✎, 🗑, ⚙,
 * 🔍, ⋮, etc.) to demonstrate the component without external icon imports.
 *
 * Every story renders within the library's ThemeProvider to ensure
 * consistent themed rendering with design tokens applied.
 */
const meta = {
  title: 'Core/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    'aria-label': {
      control: 'text',
      description: 'Required accessible label for the icon button. Every IconButton must have a meaningful aria-label for WCAG 2.1 AA compliance.',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'],
      description: 'The color theme applied to the icon button.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the icon button. Affects padding and icon sizing.',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, the icon button is disabled and prevents user interaction.',
    },
    edge: {
      control: 'select',
      options: [false, 'start', 'end'],
      description: 'Edge positioning that applies negative margin to align the icon button with container edges.',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the icon button is clicked.',
    },
    sx: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    'aria-label': 'Action button',
    onClick: fn(),
    children: '★',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'IconButton is an accessibility-enforcing wrapper around MUI IconButton that makes `aria-label` a required string prop. ' +
          'This ensures every icon button is announced correctly by screen readers, enforcing WCAG 2.1 AA compliance at the TypeScript level. ' +
          'All other MUI IconButton props (color, size, edge, disabled, sx) are forwarded transparently.',
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default icon button with the required aria-label prop.
 * Use the controls panel to interactively change color, size, and other props.
 */
export const Default: Story = {
  args: {
    'aria-label': 'Favorite',
    children: '★',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default icon button with a required aria-label for accessibility. The star character serves as an icon placeholder.',
      },
    },
  },
};

/**
 * Displays icon buttons in all available color options side by side.
 * Each button uses a different Unicode icon placeholder and a
 * descriptive aria-label matching the color context.
 */
export const Colors: Story = {
  render: () => {
    const colorConfigs = [
      { color: 'default', icon: '★', label: 'Default action' },
      { color: 'primary', icon: '✎', label: 'Primary action' },
      { color: 'secondary', icon: '⊕', label: 'Secondary action' },
      { color: 'error', icon: '🗑', label: 'Error action' },
      { color: 'warning', icon: '⚙', label: 'Warning action' },
      { color: 'info', icon: '🔍', label: 'Info action' },
      { color: 'success', icon: '✓', label: 'Success action' },
    ] as const;

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        {colorConfigs.map(({ color, icon, label }) => (
          <IconButton
            key={color}
            color={color}
            aria-label={label}
            onClick={fn()}
          >
            {icon}
          </IconButton>
        ))}
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon buttons in all available color options: default, primary, secondary, error, warning, info, and success.',
      },
    },
  },
};

/**
 * Demonstrates the three available icon button sizes (small, medium, large)
 * rendered side by side for visual comparison.
 */
export const Sizes: Story = {
  render: () => {
    const sizeConfigs = [
      { size: 'small', label: 'Small action' },
      { size: 'medium', label: 'Medium action' },
      { size: 'large', label: 'Large action' },
    ] as const;

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        {sizeConfigs.map(({ size, label }) => (
          <IconButton
            key={size}
            size={size}
            aria-label={label}
            onClick={fn()}
          >
            ★
          </IconButton>
        ))}
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Available icon button sizes from small to large. Size affects the padding and hit area around the icon.',
      },
    },
  },
};

/**
 * Disabled icon buttons in several color variants to show
 * the muted visual treatment when interaction is prevented.
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton disabled aria-label="Disabled default" onClick={fn()}>
        ★
      </IconButton>
      <IconButton disabled color="primary" aria-label="Disabled primary" onClick={fn()}>
        ✎
      </IconButton>
      <IconButton disabled color="secondary" aria-label="Disabled secondary" onClick={fn()}>
        ⊕
      </IconButton>
      <IconButton disabled color="error" aria-label="Disabled error" onClick={fn()}>
        🗑
      </IconButton>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled icon buttons preventing user interaction. The muted appearance signals that the action is unavailable.',
      },
    },
  },
};

/**
 * Icon buttons rendered within the dark theme context to verify
 * correct contrast and color rendering on dark backgrounds.
 */
export const DarkMode: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton aria-label="Default dark action" onClick={fn()}>
        ★
      </IconButton>
      <IconButton color="primary" aria-label="Primary dark action" onClick={fn()}>
        ✎
      </IconButton>
      <IconButton color="secondary" aria-label="Secondary dark action" onClick={fn()}>
        ⊕
      </IconButton>
      <IconButton color="error" aria-label="Error dark action" onClick={fn()}>
        🗑
      </IconButton>
    </Stack>
  ),
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100px' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Icon buttons rendered with the dark theme to verify correct contrast and color rendering on dark backgrounds.',
      },
    },
  },
};

/**
 * A realistic toolbar composition demonstrating multiple icon button
 * actions arranged horizontally. Each button has a meaningful aria-label
 * and an appropriate color assignment for its action semantics.
 */
export const FullExample: Story = {
  render: () => (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, display: 'inline-flex' }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton color="primary" aria-label="Search" onClick={fn()}>
          🔍
        </IconButton>
        <IconButton color="primary" aria-label="Edit item" onClick={fn()}>
          ✎
        </IconButton>
        <IconButton color="error" aria-label="Delete item" onClick={fn()}>
          🗑
        </IconButton>
        <IconButton aria-label="Settings" onClick={fn()}>
          ⚙
        </IconButton>
        <IconButton aria-label="More options" onClick={fn()}>
          ⋮
        </IconButton>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A toolbar with multiple icon button actions demonstrating realistic composition with Search, Edit, Delete, Settings, and More options.',
      },
    },
  },
};
