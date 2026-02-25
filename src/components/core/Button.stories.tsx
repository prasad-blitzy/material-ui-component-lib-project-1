import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button } from './Button';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Pre-built dark theme instance for DarkMode story decorator.
 * Uses the library's createCustomTheme factory with dark color scheme and
 * explicit dark palette overrides and cssVariables disabled, bypassing
 * the CSS variable scope conflict to demonstrate Button rendering under
 * the dark color scheme with correct dark background and light text.
 */
const darkTheme = createCustomTheme({
  palette: {
    mode: 'dark',
    background: { default: '#121212', paper: '#121212' },
    text: { primary: '#fff', secondary: 'rgba(255, 255, 255, 0.7)' },
  },
  cssVariables: false,
});

/**
 * Storybook metadata configuration for the Button component.
 *
 * Button is a Pattern A (Simple Forward) wrapper around MUI's Button,
 * forwarding all props via React.forwardRef. It supports variant, color,
 * size, disabled, fullWidth, startIcon, endIcon, href, onClick, and
 * all standard MUI Button props through the sx-based theme system.
 */
const meta = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A themed wrapper around MUI Button with full prop forwarding. Supports all MUI Button variants (contained, outlined, text), seven color options, three sizes, and accessibility features including keyboard navigation and ARIA attributes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
        'inherit',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    href: { control: 'text' },
    onClick: { action: 'clicked' },
    sx: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default — The primary Button rendering with contained variant and primary color.
 * Use the Storybook controls panel to interactively change variant, color, size,
 * and other props.
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default button with contained variant and primary color.',
      },
    },
  },
};

/**
 * Variants — Demonstrates all three button variants (contained, outlined, text)
 * rendered side by side for visual comparison.
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" onClick={fn()}>
        Contained
      </Button>
      <Button variant="outlined" onClick={fn()}>
        Outlined
      </Button>
      <Button variant="text" onClick={fn()}>
        Text
      </Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all three button variants side by side.',
      },
    },
  },
};

/**
 * Colors — Renders all six semantic color options for the Button component
 * using the contained variant to clearly display each color token.
 */
export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(
        ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const
      ).map((color) => (
        <Button key={color} variant="contained" color={color} onClick={fn()}>
          {color}
        </Button>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available color options for the Button component.',
      },
    },
  },
};

/**
 * Sizes — Shows the three available button sizes (small, medium, large)
 * in a horizontal row to illustrate the size scale.
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" size="small" onClick={fn()}>
        Small
      </Button>
      <Button variant="contained" size="medium" onClick={fn()}>
        Medium
      </Button>
      <Button variant="contained" size="large" onClick={fn()}>
        Large
      </Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available button sizes from small to large.',
      },
    },
  },
};

/**
 * Disabled — Demonstrates the disabled state across all three button variants,
 * showing that each variant correctly renders its disabled visual treatment.
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" disabled onClick={fn()}>
        Contained
      </Button>
      <Button variant="outlined" disabled onClick={fn()}>
        Outlined
      </Button>
      <Button variant="text" disabled onClick={fn()}>
        Text
      </Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state across all button variants.',
      },
    },
  },
};

/**
 * DarkMode — Renders Button variants and colors with the dark theme applied
 * to validate visual fidelity under the dark color scheme. The story-level
 * decorator overrides the global ThemeProvider with a dark theme instance.
 */
export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100px' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  render: () => (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" color="primary" onClick={fn()}>
          Contained
        </Button>
        <Button variant="outlined" color="primary" onClick={fn()}>
          Outlined
        </Button>
        <Button variant="text" color="primary" onClick={fn()}>
          Text
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        {(
          ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const
        ).map((color) => (
          <Button key={color} variant="contained" color={color} onClick={fn()}>
            {color}
          </Button>
        ))}
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button rendered with the dark theme applied.',
      },
    },
  },
};

/**
 * FullExample — A realistic form action bar composition demonstrating how
 * Button variants are combined in a typical application layout. Features
 * Cancel (text), Reset (outlined), and Submit (contained primary) actions
 * arranged in a right-aligned row inside a paper-colored container.
 */
export const FullExample: Story = {
  render: () => (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="text" onClick={fn()}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={fn()}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={fn()}>
          Submit
        </Button>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A realistic form action bar with cancel, reset, and submit buttons.',
      },
    },
  },
};
