import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Drawer } from './Drawer';
import { Button } from '../core/Button';
import { Box } from '../layout/Box';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '../data-display/List';
import { Typography } from '../data-display/Typography';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

// ---------------------------------------------------------------------------
// Dark Theme Instance
// ---------------------------------------------------------------------------
// Pre-built dark theme for the DarkMode story decorator.
// Uses `cssVariables: false` to bypass MUI v7's CSS variables mode (which
// requires the `colorSchemes` API for dark mode) and explicit dark-mode
// background/text values to override the light-mode defaults from colorTokens.
// ---------------------------------------------------------------------------

const darkTheme = createCustomTheme({
  cssVariables: false,
  palette: {
    mode: 'dark',
    background: { default: '#121212', paper: '#121212' },
    text: { primary: '#fff', secondary: 'rgba(255, 255, 255, 0.7)' },
  },
});

// ---------------------------------------------------------------------------
// Meta Configuration
// ---------------------------------------------------------------------------

/**
 * Storybook meta configuration for the Drawer component.
 *
 * Registers the component under the "Navigation/Drawer" title, enables
 * autodocs generation, wraps every story in the library's ThemeProvider,
 * and maps meaningful Drawer props to interactive Storybook controls.
 *
 * CRITICAL: layout is set to 'fullscreen' because Drawer is an overlay/panel.
 */
const meta = {
  title: 'Navigation/Drawer',
  component: Drawer,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Drawer is a themed side panel navigation wrapper around MUI Drawer. Supports temporary (modal), persistent (toggleable), and permanent (always visible) variants with configurable anchor positions.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls drawer visibility',
    },
    anchor: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Side from which the drawer slides in',
    },
    variant: {
      control: 'select',
      options: ['temporary', 'persistent', 'permanent'],
      description: 'Drawer behavior variant',
    },
    elevation: {
      control: 'number',
      description: 'Shadow depth for temporary variant (0-24)',
    },
    onClose: { action: 'closed' },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Story: Default
// ---------------------------------------------------------------------------

/**
 * Permanent drawer displaying a navigation list, always visible without
 * toggle. Uses the permanent variant so the drawer renders in the
 * document flow without an overlay.
 */
export const Default: Story = {
  render: (args) => (
    <Drawer {...args} variant="permanent" open>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Navigation
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Permanent drawer displaying a navigation list, always visible without toggle.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: Anchors
// ---------------------------------------------------------------------------

/**
 * Drawer sliding in from all four anchor positions: left, right, top, and
 * bottom. Each button opens the corresponding anchor drawer. Left and right
 * anchors use a fixed width of 250px; top and bottom anchors use a fixed
 * height of 250px.
 */
export const Anchors: Story = {
  render: () => {
    const [activeAnchor, setActiveAnchor] = React.useState<
      'left' | 'right' | 'top' | 'bottom' | null
    >(null);

    return (
      <Box sx={{ p: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          onClick={() => setActiveAnchor('left')}
        >
          Open Left
        </Button>
        <Button
          variant="outlined"
          onClick={() => setActiveAnchor('right')}
        >
          Open Right
        </Button>
        <Button
          variant="outlined"
          onClick={() => setActiveAnchor('top')}
        >
          Open Top
        </Button>
        <Button
          variant="outlined"
          onClick={() => setActiveAnchor('bottom')}
        >
          Open Bottom
        </Button>

        {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
          <Drawer
            key={anchor}
            anchor={anchor}
            open={activeAnchor === anchor}
            onClose={() => setActiveAnchor(null)}
          >
            <Box
              sx={{
                width:
                  anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
                height:
                  anchor === 'top' || anchor === 'bottom' ? 250 : 'auto',
                p: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                {anchor.charAt(0).toUpperCase() + anchor.slice(1)} Drawer
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setActiveAnchor(null)}
                  >
                    <ListItemText primary="Close" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Menu Item 1" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Menu Item 2" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        ))}
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Drawer sliding in from all four anchor positions: left, right, top, and bottom.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: Variants
// ---------------------------------------------------------------------------

/**
 * Drawer in temporary (modal overlay), persistent (toggleable), and
 * permanent (always visible) variants. Toggle buttons control the
 * temporary and persistent drawers while the permanent drawer is always
 * rendered.
 */
export const Variants: Story = {
  render: () => {
    const [temporaryOpen, setTemporaryOpen] = React.useState(false);
    const [persistentOpen, setPersistentOpen] = React.useState(false);

    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => setTemporaryOpen(true)}
          >
            Open Temporary
          </Button>
          <Button
            variant="outlined"
            onClick={() => setPersistentOpen(!persistentOpen)}
          >
            {persistentOpen ? 'Close' : 'Open'} Persistent
          </Button>
        </Box>

        <Drawer
          variant="temporary"
          open={temporaryOpen}
          onClose={() => setTemporaryOpen(false)}
        >
          <Box sx={{ width: 250, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Temporary Drawer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Modal overlay that closes on backdrop click or escape key.
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setTemporaryOpen(false)}>
                  <ListItemText primary="Close" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Box sx={{ display: 'flex' }}>
          <Drawer
            variant="persistent"
            open={persistentOpen}
            anchor="left"
            sx={{
              '& .MuiDrawer-paper': { position: 'relative' },
            }}
          >
            <Box sx={{ width: 250, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Persistent Drawer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Toggleable panel that pushes content aside when open.
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': { position: 'relative' },
            }}
          >
            <Box sx={{ width: 250, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Permanent Drawer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Always visible, cannot be closed.
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="About" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Drawer in temporary (modal overlay), persistent (toggleable), and permanent (always visible) variants.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: DarkMode
// ---------------------------------------------------------------------------

/**
 * Drawer rendered in dark mode with proper theme contrast and surface
 * colors. Uses a story-level decorator that overrides the global
 * ThemeProvider with a dark palette theme.
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
  render: (args) => (
    <Drawer {...args} variant="permanent" open>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Navigation
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Drawer rendered in dark mode with proper theme contrast and surface colors.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: Interactive
// ---------------------------------------------------------------------------

/**
 * Interactive drawer with open/close toggle demonstrating controlled
 * state management. Click the button to open the drawer; click a list
 * item or the backdrop to close it.
 */
export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Box sx={{ p: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
        <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
          <Box sx={{ width: 250, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Drawer Content
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpen(false)}>
                  <ListItemText primary="Close Drawer" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Menu Item 1" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Menu Item 2" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive drawer with open/close toggle demonstrating controlled state management.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: WithHeader
// ---------------------------------------------------------------------------

/**
 * Drawer with a themed header section above the navigation list. The
 * header uses the primary color as background with contrasting text.
 * Permanent variant for static display.
 */
export const WithHeader: Story = {
  render: (args) => (
    <Drawer {...args} variant="permanent" open>
      <Box sx={{ width: 250 }}>
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            p: 2,
          }}
        >
          <Typography variant="h6">My App</Typography>
          <Typography variant="caption">Navigation Panel</Typography>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Drawer with a themed header section above the navigation list.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: FullExample
// ---------------------------------------------------------------------------

/**
 * Complete side navigation layout with a permanent drawer, styled header,
 * five navigation items, and a main content area. Demonstrates a realistic
 * app shell layout using the library's Drawer, Typography, List, and Box
 * components together.
 */
export const FullExample: Story = {
  render: () => (
    <Box sx={{ display: 'flex', minHeight: 400 }}>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': { position: 'relative' },
        }}
      >
        <Box sx={{ width: 250 }}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              p: 2,
            }}
          >
            <Typography variant="h6">Navigation</Typography>
          </Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton selected>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Messages" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Calendar" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Help" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: 'background.default',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Main Content
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is the main content area of the application. The permanent
          drawer on the left provides navigation between application
          sections. Select a menu item to navigate to that section.
        </Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete side navigation layout with permanent drawer, navigation items, and main content area.',
      },
    },
  },
};
