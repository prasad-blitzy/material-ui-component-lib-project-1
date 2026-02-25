import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import React, { useState } from 'react';
import { Snackbar } from './Snackbar';
import { Alert } from './Alert';
import { Button } from '../core/Button';
import { Box } from '../layout/Box';
import { Stack } from '../layout/Stack';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark palette mode,
 * which inverts background and text colors across all MUI semantic tokens.
 */
const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

/**
 * Storybook meta configuration for the Snackbar component.
 *
 * Registers the component under the "Feedback/Snackbar" title, enables
 * autodocs generation, wraps every story in the library's ThemeProvider,
 * and maps all meaningful Snackbar props to interactive Storybook controls.
 */
const meta = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    open: { control: 'boolean' },
    message: { control: 'text' },
    autoHideDuration: { control: { type: 'number' } },
    onClose: { action: 'closed' },
    sx: { table: { disable: true } },
  },
  args: {
    onClose: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Themed Snackbar component for toast-style notifications. Wraps MUI Snackbar with full prop forwarding, ref forwarding, and library theme integration. Supports configurable anchor position, auto-hide duration, and can wrap an Alert for styled severity-based notifications.',
      },
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Snackbar displaying a simple text message in the open state.
 */
export const Default: Story = {
  args: {
    open: true,
    message: 'This is a snackbar message',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Snackbar with a simple text message.',
      },
    },
  },
};

/**
 * Snackbar with a configurable anchor origin. Use the controls panel
 * to change the vertical (top/bottom) and horizontal (left/center/right)
 * placement of the notification.
 */
export const AnchorOrigins: Story = {
  args: {
    open: true,
    message: 'Bottom center snackbar',
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Snackbar with configurable anchor origin position. Use controls to change vertical (top/bottom) and horizontal (left/center/right) placement.',
      },
    },
  },
};

/**
 * Snackbar with a configurable auto-hide duration. The notification
 * will automatically dismiss after the specified number of milliseconds.
 */
export const AutoHideDuration: Story = {
  args: {
    open: true,
    message: 'This snackbar will auto-hide',
    autoHideDuration: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Snackbar with configurable auto-hide duration in milliseconds.',
      },
    },
  },
};

/**
 * Snackbar wrapping an Alert component for severity-based styled
 * notifications. The Alert provides visual severity indicators
 * (success, info, warning, error) with a filled variant.
 */
export const WithAlert: Story = {
  render: (args) => (
    <Snackbar {...args} open>
      <Alert severity="success" variant="filled" onClose={fn()}>
        Operation completed successfully!
      </Alert>
    </Snackbar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Snackbar wrapping an Alert component for styled severity-based notifications.',
      },
    },
  },
};

/**
 * Snackbar rendered in dark mode using a custom dark theme created
 * via the library's createCustomTheme factory.
 */
export const DarkMode: Story = {
  args: {
    open: true,
    message: 'Dark mode snackbar notification',
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
        story: 'Snackbar rendered in dark mode using a custom dark theme.',
      },
    },
  },
};

/**
 * Interactive story demonstrating controlled Snackbar open/close state
 * via React useState. Click the trigger button to show the Snackbar,
 * which auto-hides after 4 seconds or can be dismissed. The clickaway
 * reason is ignored to prevent accidental dismissal.
 */
export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleClose = (
      _event?: React.SyntheticEvent | Event,
      reason?: string,
    ) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    };

    return (
      <Stack spacing={2} alignItems="flex-start">
        <Button variant="contained" onClick={() => setOpen(true)}>
          Show Snackbar
        </Button>
        <Snackbar
          {...args}
          open={open}
          onClose={handleClose}
          autoHideDuration={4000}
          message="This is an interactive snackbar"
        />
      </Stack>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Interactive snackbar with show/hide state control via a trigger button.',
      },
    },
  },
};

/**
 * Realistic notification system composing a Snackbar with an Alert inside.
 * A trigger button opens the notification, which auto-hides after 6 seconds.
 * The Alert provides a styled, severity-based message with a close action.
 */
export const FullExample: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleClose = (
      _event?: React.SyntheticEvent | Event,
      reason?: string,
    ) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    };

    return (
      <Stack spacing={2} alignItems="flex-start">
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Trigger Notification
        </Button>
        <Snackbar
          {...args}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="info" variant="filled" onClose={handleClose}>
            A new software update is available for download.
          </Alert>
        </Snackbar>
      </Stack>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Realistic notification system with an Alert inside a Snackbar, triggered by a button.',
      },
    },
  },
};

/**
 * Snackbar anchored to the bottom-left corner of the viewport.
 * Demonstrates the anchorOrigin prop with a non-default position.
 */
export const BottomLeftAnchor: Story = {
  args: {
    open: true,
    message: 'Bottom left notification',
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Snackbar anchored to the bottom-left corner of the viewport.',
      },
    },
  },
};
