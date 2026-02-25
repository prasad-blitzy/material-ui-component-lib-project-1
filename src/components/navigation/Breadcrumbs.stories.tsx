import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Breadcrumbs } from './Breadcrumbs';
import { Link } from './Link';
import { Typography } from '../data-display/Typography';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
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
 * Storybook meta configuration for the Breadcrumbs component.
 *
 * Registers the component under the "Navigation/Breadcrumbs" title, enables
 * autodocs generation, wraps every story in the library's ThemeProvider, and
 * maps meaningful Breadcrumbs props to interactive Storybook controls.
 */
const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Breadcrumbs provides a themed navigation hierarchy display with customizable separators, collapse behavior, and semantic HTML structure (nav > ol > li) for accessibility.',
      },
    },
  },
  argTypes: {
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum visible items before collapsing',
    },
    itemsBeforeCollapse: {
      control: 'number',
      description: 'Items shown before the collapsed section',
    },
    itemsAfterCollapse: {
      control: 'number',
      description: 'Items shown after the collapsed section',
    },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Story: Default
// ---------------------------------------------------------------------------

/**
 * Basic breadcrumb navigation with three items: two navigable Links and a
 * current-page indicator rendered as Typography.
 */
export const Default: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Link href="#" underline="hover" color="inherit">
        Home
      </Link>
      <Link href="#" underline="hover" color="inherit">
        Category
      </Link>
      <Typography color="text.primary">Current Page</Typography>
    </Breadcrumbs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Basic breadcrumb navigation with links and a current page indicator.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: CustomSeparator
// ---------------------------------------------------------------------------

/**
 * Breadcrumbs rendered with three different separator characters stacked
 * vertically. Demonstrates the separator prop customisation.
 */
export const CustomSeparator: Story = {
  render: () => (
    <Stack spacing={2}>
      <Breadcrumbs separator="›">
        <Link href="#" underline="hover" color="inherit">
          Home
        </Link>
        <Link href="#" underline="hover" color="inherit">
          Category
        </Link>
        <Typography color="text.primary">Current Page</Typography>
      </Breadcrumbs>

      <Breadcrumbs separator="-">
        <Link href="#" underline="hover" color="inherit">
          Home
        </Link>
        <Link href="#" underline="hover" color="inherit">
          Category
        </Link>
        <Typography color="text.primary">Current Page</Typography>
      </Breadcrumbs>

      <Breadcrumbs separator=">">
        <Link href="#" underline="hover" color="inherit">
          Home
        </Link>
        <Link href="#" underline="hover" color="inherit">
          Category
        </Link>
        <Typography color="text.primary">Current Page</Typography>
      </Breadcrumbs>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with custom separator characters between items.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: MaxItems
// ---------------------------------------------------------------------------

/**
 * Breadcrumbs with maxItems set to collapse a deep navigation hierarchy.
 * Six items are provided but only the first and last are shown, with an
 * ellipsis in between.
 */
export const MaxItems: Story = {
  render: () => (
    <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
      <Link href="#" underline="hover" color="inherit">
        Home
      </Link>
      <Link href="#" underline="hover" color="inherit">
        Electronics
      </Link>
      <Link href="#" underline="hover" color="inherit">
        Computers
      </Link>
      <Link href="#" underline="hover" color="inherit">
        Laptops
      </Link>
      <Link href="#" underline="hover" color="inherit">
        Gaming
      </Link>
      <Typography color="text.primary">Product Page</Typography>
    </Breadcrumbs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumbs with max items showing collapsed navigation for deep hierarchies.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: WithLinks
// ---------------------------------------------------------------------------

/**
 * Four-level breadcrumb path demonstrating Link components for navigable items
 * and Typography for the current (non-clickable) page.
 */
export const WithLinks: Story = {
  render: () => (
    <Breadcrumbs>
      <Link href="#" underline="hover" color="inherit">
        Home
      </Link>
      <Link href="#" underline="hover" color="inherit">
        Products
      </Link>
      <Link href="#" underline="hover" color="inherit">
        Electronics
      </Link>
      <Typography color="text.primary">Smartphones</Typography>
    </Breadcrumbs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumbs with themed Link components for navigation and Typography for the current page.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: Expanded
// ---------------------------------------------------------------------------

/**
 * Breadcrumbs with many items and maxItems set to demonstrate the built-in
 * expand/collapse interaction. Clicking the ellipsis reveals all items.
 */
export const Expanded: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Collapsed (click ellipsis to expand)
        </Typography>
        <Breadcrumbs maxItems={4} itemsBeforeCollapse={2} itemsAfterCollapse={2}>
          <Link href="#" underline="hover" color="inherit">
            Home
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Dashboard
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Settings
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Account
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Security
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Privacy
          </Link>
          <Typography color="text.primary">Two-Factor Auth</Typography>
        </Breadcrumbs>
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Fully expanded (no maxItems restriction)
        </Typography>
        <Breadcrumbs>
          <Link href="#" underline="hover" color="inherit">
            Home
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Dashboard
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Settings
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Account
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Security
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Privacy
          </Link>
          <Typography color="text.primary">Two-Factor Auth</Typography>
        </Breadcrumbs>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumbs with expandable collapsed items showing navigation depth.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: DarkMode
// ---------------------------------------------------------------------------

/**
 * Breadcrumbs rendered in dark mode using a story-level decorator that
 * overrides the global ThemeProvider with a dark palette theme.
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
    <Breadcrumbs separator="›">
      <Link href="#" underline="hover" color="inherit">
        Home
      </Link>
      <Link href="#" underline="hover" color="inherit">
        Products
      </Link>
      <Link href="#" underline="hover" color="inherit">
        Electronics
      </Link>
      <Typography color="text.primary">Headphones</Typography>
    </Breadcrumbs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumbs rendered in dark mode with proper contrast and readability.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: FullExample
// ---------------------------------------------------------------------------

/**
 * Realistic page header composition featuring breadcrumb navigation above a
 * page title. Uses the right-chevron separator for visual polish and
 * demonstrates a five-level deep navigation hierarchy.
 */
export const FullExample: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs separator="›">
        <Link href="#" underline="hover" color="inherit">
          Home
        </Link>
        <Link href="#" underline="hover" color="inherit">
          Shop
        </Link>
        <Link href="#" underline="hover" color="inherit">
          Electronics
        </Link>
        <Link href="#" underline="hover" color="inherit">
          Audio
        </Link>
        <Typography color="text.primary">Headphones</Typography>
      </Breadcrumbs>
      <Typography variant="h4" sx={{ mt: 1 }}>
        Product Details
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Browse our selection of premium audio equipment and find the perfect
        headphones for your listening experience.
      </Typography>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete page header composition with breadcrumb navigation and page title.',
      },
    },
  },
};
