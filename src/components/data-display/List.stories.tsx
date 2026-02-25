import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from './List';
import { Box } from '../layout/Box';
import { Paper } from '../layout/Paper';
import { Divider } from '../layout/Divider';
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
 * Storybook meta configuration for the List data-display compound component.
 *
 * The List component is a themed wrapper around MUI List that provides a
 * compound component API for rendering ordered and unordered lists with
 * items, icons, primary/secondary text, and interactive button variants.
 * Sub-components include ListItem, ListItemText, ListItemIcon, and
 * ListItemButton — all forwarding refs and MUI props transparently.
 *
 * Every story renders within the library's ThemeProvider to ensure
 * consistent themed rendering with design tokens applied.
 */
const meta = {
  title: 'Data Display/List',
  component: List,
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
          'A themed compound component for rendering lists with items, icons, ' +
          'primary and secondary text, and interactive button variants. Composes ' +
          'List, ListItem, ListItemText, ListItemIcon, and ListItemButton sub-components.',
      },
    },
  },
  argTypes: {
    dense: { control: 'boolean' },
    disablePadding: { control: 'boolean' },
    sx: { table: { disable: true } },
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default list rendering three basic text items inside a Paper surface.
 * Use the controls panel to toggle dense mode and padding.
 */
export const Default: Story = {
  args: {},
  render: (args) => (
    <Paper sx={(theme) => ({ width: '100%', maxWidth: theme.spacing(45) })}>
      <List {...args}>
        <ListItem>
          <ListItemText primary="List Item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="List Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="List Item 3" />
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default list with basic text items wrapped in a Paper surface.',
      },
    },
  },
};

/**
 * List items displaying icon elements via the ListItemIcon sub-component.
 * Uses emoji placeholders as icon content since MUI icon imports are
 * not permitted in the library's story layer.
 */
export const WithIcons: Story = {
  render: () => (
    <Paper sx={(theme) => ({ width: '100%', maxWidth: theme.spacing(45) })}>
      <List>
        <ListItem>
          <ListItemIcon>📥</ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem>
          <ListItemIcon>📝</ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem>
          <ListItemIcon>📤</ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List items with icon elements using the ListItemIcon sub-component.',
      },
    },
  },
};

/**
 * Demonstrates the ListItemText secondary prop for displaying
 * additional descriptive text beneath the primary label.
 */
export const WithSecondaryText: Story = {
  render: () => (
    <Paper sx={(theme) => ({ width: '100%', maxWidth: theme.spacing(45) })}>
      <List>
        <ListItem>
          <ListItemText primary="Inbox" secondary="5 new messages" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Drafts" secondary="2 unsaved drafts" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Sent" secondary="Last sent 2 hours ago" />
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List items with primary and secondary text content using the ListItemText sub-component.',
      },
    },
  },
};

/**
 * Interactive list using ListItemButton for clickable items.
 * One item is marked as selected to demonstrate the selected state.
 * All click handlers use fn() for Storybook action logging.
 */
export const Interactive: Story = {
  render: () => (
    <Paper sx={(theme) => ({ width: '100%', maxWidth: theme.spacing(45) })}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={fn()}>
            <ListItemIcon>📥</ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton selected onClick={fn()}>
            <ListItemIcon>⭐</ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={fn()}>
            <ListItemIcon>📤</ListItemIcon>
            <ListItemText primary="Sent" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive list with clickable ListItemButton items and a selected state.',
      },
    },
  },
};

/**
 * List rendered within the dark theme context. The story-level decorator
 * overrides the global ThemeProvider with a dark palette mode theme.
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
    <Paper sx={(theme) => ({ width: '100%', maxWidth: theme.spacing(45) })}>
      <List>
        <ListItem>
          <ListItemIcon>📥</ListItemIcon>
          <ListItemText primary="Inbox" secondary="5 new messages" />
        </ListItem>
        <ListItem>
          <ListItemIcon>⭐</ListItemIcon>
          <ListItemText primary="Starred" secondary="12 starred items" />
        </ListItem>
        <ListItem>
          <ListItemIcon>📤</ListItemIcon>
          <ListItemText primary="Sent" secondary="Last sent 1 hour ago" />
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List rendered in dark mode theme context with icons and secondary text.',
      },
    },
  },
};

/**
 * Realistic settings menu composing all List sub-components: ListItemButton
 * for interactive navigation, ListItemIcon for category icons, ListItemText
 * for primary labels and secondary descriptions, and Divider for visual
 * section separators. All click handlers use fn() for action logging.
 */
export const FullExample: Story = {
  render: () => (
    <Paper sx={(theme) => ({ width: '100%', maxWidth: theme.spacing(45) })}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={fn()}>
            <ListItemIcon>👤</ListItemIcon>
            <ListItemText
              primary="Profile"
              secondary="Manage your account settings"
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={fn()}>
            <ListItemIcon>🔔</ListItemIcon>
            <ListItemText
              primary="Notifications"
              secondary="Configure alert preferences"
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={fn()}>
            <ListItemIcon>🔒</ListItemIcon>
            <ListItemText
              primary="Privacy"
              secondary="Control your data sharing"
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={fn()}>
            <ListItemIcon>🎨</ListItemIcon>
            <ListItemText
              primary="Theme"
              secondary="Choose light or dark mode"
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={fn()}>
            <ListItemIcon>🚪</ListItemIcon>
            <ListItemText
              primary="Logout"
              secondary="Sign out of your account"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Realistic settings menu with icons, primary text, secondary descriptions, ' +
          'dividers, and clickable items composing all List sub-components.',
      },
    },
  },
};

/**
 * Dense list variant with reduced item padding via the dense prop.
 * Demonstrates compact list rendering for space-constrained layouts.
 */
export const Dense: Story = {
  args: { dense: true },
  render: (args) => (
    <Paper sx={(theme) => ({ width: '100%', maxWidth: theme.spacing(45) })}>
      <List {...args}>
        <ListItem>
          <ListItemText primary="Dense Item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dense Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dense Item 3" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dense Item 4" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dense Item 5" />
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dense list with reduced item padding for compact layouts.',
      },
    },
  },
};
