import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { Box } from './Box';
import { Stack } from './Stack';
import { Typography } from '../data-display/Typography';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance for DarkMode story decorator with explicit dark palette values
 * and cssVariables disabled for proper dark mode rendering.
 * Created once at module scope to avoid re-creation on every render.
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
 * Storybook meta configuration for the Divider layout component.
 *
 * Divider is a themed horizontal or vertical separator wrapping MUI Divider
 * with full prop forwarding via React.forwardRef. It supports orientation
 * variants, text content, flex-item usage, and theme-driven styling.
 */
const meta = {
  title: 'Layout/Divider',
  component: Divider,
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
          'A themed horizontal or vertical separator component that wraps MUI Divider with full prop forwarding, supporting orientation variants, text content dividers, flex-item usage, and theme-driven styling via the library ThemeProvider.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['fullWidth', 'inset', 'middle'],
    },
    flexItem: {
      control: 'boolean',
    },
    textAlign: {
      control: 'select',
      options: ['center', 'left', 'right'],
    },
    children: {
      control: 'text',
    },
    sx: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default — A basic horizontal Divider separating two content areas.
 */
export const Default: Story = {
  render: () => (
    <Box sx={{ width: 360 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Content above the divider</Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Content below the divider</Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A basic horizontal Divider separating two content areas using default props.',
      },
    },
  },
};

/**
 * Horizontal — Explicit horizontal orientation with fullWidth and inset variants.
 */
export const Horizontal: Story = {
  render: () => (
    <Box sx={{ width: 360 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Section One</Typography>
        <Typography variant="body2" color="text.secondary">
          First section content with descriptive text.
        </Typography>
      </Box>
      <Divider orientation="horizontal" />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Section Two</Typography>
        <Typography variant="body2" color="text.secondary">
          Second section content with descriptive text.
        </Typography>
      </Box>
      <Divider orientation="horizontal" variant="inset" />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Section Three</Typography>
        <Typography variant="body2" color="text.secondary">
          Third section with an inset divider above.
        </Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal Divider with explicit orientation prop, showing fullWidth and inset variants between content sections.',
      },
    },
  },
};

/**
 * Vertical — Vertical Divider inside a flex container with flexItem prop.
 */
export const Vertical: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', height: 100 }}>
      <Box sx={{ px: 2 }}>
        <Typography variant="body1">Left</Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ px: 2 }}>
        <Typography variant="body1">Center</Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ px: 2 }}>
        <Typography variant="body1">Right</Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Vertical Divider used inside a flex container with the flexItem prop to separate inline content areas.',
      },
    },
  },
};

/**
 * WithText — Dividers with text children and various textAlign placements.
 */
export const WithText: Story = {
  render: () => (
    <Box sx={{ width: 360 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2">Content above</Typography>
      </Box>
      <Divider textAlign="left">Left Aligned</Divider>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2">Content between dividers</Typography>
      </Box>
      <Divider>Center Aligned</Divider>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2">More content</Typography>
      </Box>
      <Divider textAlign="right">Right Aligned</Divider>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2">Content below</Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Divider with text children and different textAlign values (left, center, right), demonstrating the text divider capability.',
      },
    },
  },
};

/**
 * FlexItem — Vertical Divider working as a flex item separator.
 */
export const FlexItem: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', height: 60 }}>
      <Typography variant="body2" sx={{ px: 2 }}>
        Item A
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="body2" sx={{ px: 2 }}>
        Item B
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="body2" sx={{ px: 2 }}>
        Item C
      </Typography>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Divider used as a flex item separator with orientation="vertical" and flexItem prop inside a flex container.',
      },
    },
  },
};

/**
 * DarkMode — Divider rendered with a dark theme context.
 */
export const DarkMode: Story = {
  render: () => (
    <Box sx={{ width: 360 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Content above</Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Content below</Typography>
      </Box>
      <Divider>Section Title</Divider>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Final section</Typography>
      </Box>
    </Box>
  ),
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: 100 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Divider rendered in dark mode using a custom dark theme, demonstrating theme-aware divider color in a dark context.',
      },
    },
  },
};

/**
 * FullExample — A realistic account settings layout using multiple Divider variants.
 */
export const FullExample: Story = {
  render: () => (
    <Box
      sx={{
        width: 480,
        bgcolor: 'background.paper',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Account Settings</Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your account preferences and profile information.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Typography variant="subtitle1">Profile</Typography>
        <Typography variant="body2" color="text.secondary">
          Update your personal details and avatar.
        </Typography>
      </Box>
      <Divider variant="inset" />
      <Box sx={{ p: 3 }}>
        <Typography variant="subtitle1">Security</Typography>
        <Typography variant="body2" color="text.secondary">
          Change your password and enable two-factor authentication.
        </Typography>
      </Box>
      <Divider>Notifications</Divider>
      <Box sx={{ p: 3 }}>
        <Typography variant="subtitle1">Email Alerts</Typography>
        <Typography variant="body2" color="text.secondary">
          Configure which notifications you receive by email.
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ p: 3 }}>
        <Typography variant="subtitle1">Push Notifications</Typography>
        <Typography variant="body2" color="text.secondary">
          Control push notification preferences for mobile devices.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Last updated: January 15, 2025
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="caption" color="text.secondary">
            Version 2.1.0
          </Typography>
        </Stack>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A realistic account settings layout using multiple Divider variants — fullWidth, inset, middle, and text dividers — to separate content sections, with a vertical divider in the footer metadata area.',
      },
    },
  },
};
