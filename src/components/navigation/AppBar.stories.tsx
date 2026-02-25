import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { AppBar, Toolbar } from './AppBar';
import { IconButton } from '../core/IconButton';
import { Typography } from '../data-display/Typography';
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

// ---------------------------------------------------------------------------
// Meta Configuration
// ---------------------------------------------------------------------------

/**
 * Storybook meta configuration for the AppBar component.
 *
 * Registers the component under the "Navigation/AppBar" title, enables
 * autodocs generation, wraps every story in the library's ThemeProvider,
 * and maps meaningful AppBar props to interactive Storybook controls.
 *
 * CRITICAL: layout is set to 'fullscreen' because AppBar spans the full
 * viewport width and benefits from a non-centered container.
 */
const meta = {
  title: 'Navigation/AppBar',
  component: AppBar,
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
          'AppBar is a themed top navigation bar wrapper around MUI AppBar. Composed with the Toolbar sub-component for content layout. Supports position variants, color theming, and elevation control.',
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['fixed', 'absolute', 'sticky', 'static', 'relative'],
      description: 'CSS position behavior of the AppBar',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'inherit', 'transparent'],
      description: 'Themed color of the AppBar surface',
    },
    elevation: {
      control: 'number',
      description: 'Shadow depth (0-24)',
    },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    position: 'static',
    onClick: fn(),
  },
} satisfies Meta<typeof AppBar>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Story: Default
// ---------------------------------------------------------------------------

/**
 * Basic AppBar with a Toolbar containing a single application title.
 * Uses position="static" to prevent fixed positioning issues in Storybook.
 */
export const Default: Story = {
  render: (args) => (
    <AppBar {...args}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Application Title
        </Typography>
      </Toolbar>
    </AppBar>
  ),
  args: {
    position: 'static',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic AppBar with a Toolbar containing a title.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: ColorVariants
// ---------------------------------------------------------------------------

/**
 * AppBar rendered in all available color variants stacked vertically.
 * Demonstrates default, primary, secondary, and transparent color options.
 */
export const ColorVariants: Story = {
  render: (args) => (
    <Stack spacing={2}>
      {(['default', 'primary', 'secondary', 'transparent'] as const).map(
        (color) => (
          <AppBar key={color} {...args} position="static" color={color}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {`color="${color}"`}
              </Typography>
            </Toolbar>
          </AppBar>
        )
      )}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'AppBar rendered in all available color variants.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: WithIconButtons
// ---------------------------------------------------------------------------

/**
 * AppBar with icon buttons in the toolbar demonstrating a typical navigation
 * bar layout with menu, search, and account actions. Every IconButton
 * includes a required aria-label for WCAG 2.1 AA compliance.
 */
export const WithIconButtons: Story = {
  render: (args) => (
    <AppBar {...args}>
      <Toolbar>
        <IconButton
          aria-label="menu"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={fn()}
        >
          ≡
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          App Title
        </Typography>
        <IconButton aria-label="search" color="inherit" onClick={fn()}>
          🔍
        </IconButton>
        <IconButton aria-label="account" color="inherit" onClick={fn()}>
          👤
        </IconButton>
      </Toolbar>
    </AppBar>
  ),
  args: {
    position: 'static',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'AppBar with icon buttons in the toolbar for common navigation actions.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: DenseToolbar
// ---------------------------------------------------------------------------

/**
 * AppBar with a dense Toolbar variant for compact navigation.
 * The dense variant reduces the Toolbar height for space-constrained layouts.
 */
export const DenseToolbar: Story = {
  render: (args) => (
    <AppBar {...args}>
      <Toolbar variant="dense">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dense Toolbar
        </Typography>
      </Toolbar>
    </AppBar>
  ),
  args: {
    position: 'static',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'AppBar with a dense toolbar variant for compact navigation.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: Elevated
// ---------------------------------------------------------------------------

/**
 * AppBar at different elevation levels demonstrating shadow depth.
 * Shows elevations 0, 4, 8, and 16 to visualize the shadow scale.
 */
export const Elevated: Story = {
  render: (args) => (
    <Stack spacing={2}>
      {([0, 4, 8, 16] as const).map((elev) => (
        <AppBar key={elev} {...args} position="static" elevation={elev}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {`elevation={${elev}}`}
            </Typography>
          </Toolbar>
        </AppBar>
      ))}
    </Stack>
  ),
  args: {
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'AppBar at different elevation levels demonstrating shadow depth.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: DarkMode
// ---------------------------------------------------------------------------

/**
 * AppBar rendered in dark mode with proper theme contrast.
 * Uses a story-level decorator to override the global ThemeProvider with
 * a dark theme created via createCustomTheme.
 */
export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ bgcolor: 'background.default', minHeight: '100px' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  render: (args) => (
    <AppBar {...args}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dark Mode AppBar
        </Typography>
      </Toolbar>
    </AppBar>
  ),
  args: {
    position: 'static',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'AppBar rendered in dark mode with proper theme contrast.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: FullExample
// ---------------------------------------------------------------------------

/**
 * Complete application header with a navigation menu button, app title,
 * and multiple toolbar action buttons. Includes a placeholder page body
 * area below the AppBar to demonstrate a realistic page layout.
 */
export const FullExample: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '300px' }}>
      <AppBar {...args}>
        <Toolbar>
          <IconButton
            aria-label="open navigation menu"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={fn()}
          >
            ≡
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Application
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="search" color="inherit" onClick={fn()}>
              🔍
            </IconButton>
            <IconButton
              aria-label="notifications"
              color="inherit"
              onClick={fn()}
            >
              🔔
            </IconButton>
            <IconButton
              aria-label="user account"
              color="inherit"
              onClick={fn()}
            >
              👤
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, flexGrow: 1, bgcolor: 'background.default' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Page Content Area
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This area represents the main content of the application, rendered
          below the AppBar. The AppBar stays at the top of the page with the
          navigation menu, title, and toolbar action buttons.
        </Typography>
      </Box>
    </Box>
  ),
  args: {
    position: 'static',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete application header with logo, navigation menu, and toolbar action buttons.',
      },
    },
  },
};
