import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from './Dialog';
import { Button } from '../core/Button';
import { Typography } from '../data-display/Typography';
import { Box } from '../layout/Box';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance for the DarkMode story decorator.
 * Uses the library's createCustomTheme factory with dark palette mode.
 */
const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

/**
 * Storybook meta configuration for the Dialog component.
 *
 * Registers the component under the "Feedback/Dialog" title, enables
 * autodocs generation, wraps every story in the library's ThemeProvider,
 * and maps all meaningful Dialog props to interactive Storybook controls.
 *
 * The Dialog is a compound component composed with DialogTitle,
 * DialogContent, and DialogActions sub-components for structured
 * modal dialog layouts.
 */
const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
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
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
    },
    fullWidth: { control: 'boolean' },
    fullScreen: { control: 'boolean' },
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
          'Themed Dialog component providing a modal dialog system with DialogTitle, DialogContent, and DialogActions sub-components. Wraps MUI Dialog with full prop forwarding, ref forwarding, and library theme integration. Supports configurable maxWidth, fullWidth, fullScreen, and scroll behavior.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Dialog displaying a basic open dialog with a title,
 * content area, and a single action button.
 */
export const Default: Story = {
  args: {
    open: true,
    maxWidth: 'sm',
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogContent>
        <Typography>
          Dialog content goes here. This is a basic dialog demonstrating the
          default configuration with a title, content area, and action buttons.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={fn()}>Close</Button>
      </DialogActions>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default Dialog with a title, content area, and a single action button.',
      },
    },
  },
};

/**
 * Dialog with configurable maxWidth and fullWidth enabled.
 * Use the Storybook controls panel to switch between xs, sm, md,
 * lg, and xl maxWidth breakpoints to observe dialog sizing behavior.
 */
export const MaxWidthVariants: Story = {
  args: {
    open: true,
    maxWidth: 'md',
    fullWidth: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle>Medium Width Dialog</DialogTitle>
      <DialogContent>
        <Typography>
          This dialog demonstrates the maxWidth prop set to medium with
          fullWidth enabled. Use the controls panel to switch between xs, sm,
          md, lg, and xl maxWidth values to observe sizing differences.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={fn()}>Cancel</Button>
        <Button variant="contained" onClick={fn()}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Dialog with configurable maxWidth and fullWidth enabled. Use controls to switch between xs, sm, md, lg, and xl sizes.',
      },
    },
  },
};

/**
 * Dialog with the fullWidth prop enabled, stretching to fill the
 * maximum width allowed by the maxWidth breakpoint constraint.
 */
export const FullWidth: Story = {
  args: {
    open: true,
    maxWidth: 'sm',
    fullWidth: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle>Full Width Dialog</DialogTitle>
      <DialogContent>
        <Typography>
          This dialog stretches to fill the maximum width allowed by the
          maxWidth constraint. The fullWidth prop ensures the dialog spans the
          entire available width up to the specified breakpoint.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={fn()}>Cancel</Button>
        <Button variant="contained" onClick={fn()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Dialog with fullWidth enabled, stretching to the maximum width defined by the maxWidth breakpoint.',
      },
    },
  },
};

/**
 * Dialog rendered in dark mode using a custom dark theme created
 * via the library's createCustomTheme factory with dark palette mode.
 */
export const DarkMode: Story = {
  args: {
    open: true,
    maxWidth: 'sm',
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle>Dark Mode Dialog</DialogTitle>
      <DialogContent>
        <Typography>
          This dialog renders in dark mode using a custom dark theme created via
          the createCustomTheme factory. All sub-components inherit the dark
          palette automatically through the ThemeProvider context.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={fn()}>Cancel</Button>
        <Button variant="contained" onClick={fn()}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
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
        story: 'Dialog rendered in dark mode using a custom dark theme.',
      },
    },
  },
};

/**
 * Interactive story demonstrating controlled Dialog open/close state
 * via React useState. Click the trigger button to open the Dialog,
 * then use Cancel or Confirm to close it.
 */
export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Interactive Dialog</DialogTitle>
          <DialogContent>
            <Typography>
              This dialog opens and closes via state control. Click the trigger
              button to open and use Cancel or Confirm to close.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
  args: {
    open: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive dialog with open/close state control via a trigger button.',
      },
    },
  },
};

/**
 * Realistic confirmation dialog composing a "Delete Item" scenario
 * with a trigger button, warning title, descriptive content, and
 * Cancel/Delete action buttons. Uses useState for controlled open/close.
 */
export const FullExample: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Delete Item</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(false)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
  args: {
    open: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Realistic confirmation dialog with Delete Item title, warning text, and Cancel/Delete action buttons.',
      },
    },
  },
};

/**
 * Compact dialog with maxWidth set to xs for quick confirmation
 * prompts that require minimal screen space.
 */
export const SmallDialog: Story = {
  args: {
    open: true,
    maxWidth: 'xs',
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle>Quick Confirm</DialogTitle>
      <DialogContent>
        <Typography>Proceed with this action?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={fn()}>No</Button>
        <Button variant="contained" onClick={fn()}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Compact dialog with maxWidth set to xs for quick confirmation prompts.',
      },
    },
  },
};

/**
 * Large dialog with maxWidth set to lg and fullWidth enabled,
 * providing ample space for detailed content such as forms,
 * tables, or long-form text.
 */
export const LargeDialog: Story = {
  args: {
    open: true,
    maxWidth: 'lg',
    fullWidth: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle>Detailed Information</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          This large dialog provides ample space for detailed content such as
          forms, tables, or long-form text. The maxWidth is set to lg with
          fullWidth enabled to maximize the available content area.
        </Typography>
        <Typography>
          Large dialogs are ideal for complex interactions that require
          significant screen real estate, including multi-step wizards, data
          entry forms, or content previews.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={fn()}>Cancel</Button>
        <Button variant="contained" onClick={fn()}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Large dialog with maxWidth set to lg and fullWidth enabled for content-heavy interactions.',
      },
    },
  },
};
