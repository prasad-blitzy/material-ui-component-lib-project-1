import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Alert } from './Alert';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark palette mode.
 */
const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

/**
 * Storybook meta configuration for the Alert feedback component.
 *
 * The Alert component is a themed wrapper around MUI Alert that displays
 * severity-based notification banners. It supports four severity levels
 * (success, info, warning, error) and three visual variants (standard,
 * filled, outlined). All MUI Alert props are forwarded, including onClose,
 * action, icon, and sx.
 *
 * Every story renders within the library's ThemeProvider to ensure
 * consistent themed rendering with design tokens applied.
 */
const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: 'The severity level of the alert, determining its icon and color scheme.',
    },
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'outlined'],
      description: 'The visual variant of the alert surface.',
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when the close button is clicked. When provided, a close icon button is rendered.',
    },
    children: {
      control: 'text',
      description: 'The content displayed inside the alert.',
    },
    sx: {
      table: { disable: true },
    },
  },
  args: {
    onClose: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Alert displays a short, important message that attracts the user\'s attention without interrupting their workflow. ' +
          'It supports four severity levels (success, info, warning, error) and three visual variants (standard, filled, outlined). ' +
          'The component wraps MUI Alert with the library\'s theme system for consistent design token usage.',
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Alert rendered with info severity.
 * Use the controls panel to interactively change severity, variant, and other props.
 */
export const Default: Story = {
  args: {
    severity: 'info',
    children: 'This is an info alert — check it out!',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Alert with info severity. Use the controls panel to explore all available props interactively.',
      },
    },
  },
};

/**
 * Displays all four severity levels stacked vertically to compare
 * their icon, color, and messaging conventions side by side.
 */
export const Severities: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '100%', minWidth: 400 }}>
      <Alert severity="success">This is a success alert — your action was completed.</Alert>
      <Alert severity="info">This is an info alert — here is some useful information.</Alert>
      <Alert severity="warning">This is a warning alert — proceed with caution.</Alert>
      <Alert severity="error">This is an error alert — something went wrong.</Alert>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All four severity levels (success, info, warning, error) displayed in a vertical stack for visual comparison.',
      },
    },
  },
};

/**
 * Demonstrates the three visual variants of Alert: standard (default),
 * filled (solid background), and outlined (border only).
 */
export const Variants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '100%', minWidth: 400 }}>
      <Alert severity="info" variant="standard">
        Standard variant — the default surface style.
      </Alert>
      <Alert severity="info" variant="filled">
        Filled variant — solid background for stronger emphasis.
      </Alert>
      <Alert severity="info" variant="outlined">
        Outlined variant — border-only for subtle emphasis.
      </Alert>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The three visual variants (standard, filled, outlined) shown with info severity to highlight surface style differences.',
      },
    },
  },
};

/**
 * Alert with a close button enabled via the onClose callback.
 * Clicking the close icon fires the mocked onClose action.
 */
export const WithClose: Story = {
  args: {
    severity: 'warning',
    children: 'This alert can be closed — click the X icon.',
    onClose: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with an onClose callback that renders a close icon button. The action is logged in the Storybook actions panel.',
      },
    },
  },
};

/**
 * All four severity levels rendered with the filled variant,
 * which uses a solid background color for maximum visual emphasis.
 */
export const FilledVariants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '100%', minWidth: 400 }}>
      <Alert severity="success" variant="filled">
        Filled success — operation completed successfully.
      </Alert>
      <Alert severity="info" variant="filled">
        Filled info — important information for you.
      </Alert>
      <Alert severity="warning" variant="filled">
        Filled warning — attention required before proceeding.
      </Alert>
      <Alert severity="error" variant="filled">
        Filled error — a critical issue needs your attention.
      </Alert>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All four severity levels with the filled variant, providing high-contrast solid backgrounds for strong visual emphasis.',
      },
    },
  },
};

/**
 * All four severity levels rendered with the outlined variant,
 * which uses a border-only style for more subtle notifications.
 */
export const OutlinedVariants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '100%', minWidth: 400 }}>
      <Alert severity="success" variant="outlined">
        Outlined success — changes saved.
      </Alert>
      <Alert severity="info" variant="outlined">
        Outlined info — new features available.
      </Alert>
      <Alert severity="warning" variant="outlined">
        Outlined warning — your session is expiring soon.
      </Alert>
      <Alert severity="error" variant="outlined">
        Outlined error — failed to load data.
      </Alert>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All four severity levels with the outlined variant, using borders only for subtle, less visually intrusive notifications.',
      },
    },
  },
};

/**
 * Alert rendered within the library's dark theme context.
 * The story-level decorator overrides the global ThemeProvider
 * with a dark palette mode theme.
 */
export const DarkMode: Story = {
  args: {
    severity: 'info',
    children: 'This alert is rendered in dark mode.',
  },
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
        story: 'Alert displayed within the dark theme context using the library\'s createCustomTheme with dark palette mode.',
      },
    },
  },
};

/**
 * A realistic notification stack demonstrating all four severity
 * levels with descriptive, real-world messages. Some alerts include
 * close buttons to show the onClose interaction pattern.
 */
export const FullExample: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      <Alert severity="success" onClose={fn()}>
        Your changes have been saved successfully.
      </Alert>
      <Alert severity="info">
        A new software update is available. Please review the release notes.
      </Alert>
      <Alert severity="warning" onClose={fn()}>
        Your session will expire in 5 minutes. Save your work to avoid losing changes.
      </Alert>
      <Alert severity="error" onClose={fn()}>
        Failed to submit the form. Please check your inputs and try again.
      </Alert>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A realistic notification stack showing all four severity levels with real-world messages. ' +
          'Some alerts include close buttons to demonstrate the onClose callback pattern.',
      },
    },
  },
};
