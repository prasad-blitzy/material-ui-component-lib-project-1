import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import { Box } from './Box';
import { Stack } from './Stack';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story to demonstrate Container
 * rendering under a dark palette. Created once and shared across dark mode
 * story decorators to avoid unnecessary theme re-creation.
 */
const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Container is a responsive, max-width layout wrapper that centers content horizontally and constrains its width based on the active breakpoint. It supports maxWidth breakpoint control (xs through xl), fixed-width mode, and optional gutter removal for edge-to-edge content rendering.',
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
    },
    fixed: { control: 'boolean' },
    disableGutters: { control: 'boolean' },
    sx: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Container with maxWidth set to lg.
 * Demonstrates the basic responsive page-level content wrapper.
 */
export const Default: Story = {
  args: {
    maxWidth: 'lg',
  },
  render: (args) => (
    <Container {...args}>
      <Box sx={{ bgcolor: 'grey.100', p: 3, borderRadius: 1 }}>
        Container with maxWidth set to lg provides a responsive page-level content
        wrapper. Content is centered horizontally with a maximum width of 1200px at the
        lg breakpoint, while remaining fluid and full-width on smaller viewports.
      </Box>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default Container with maxWidth set to lg, demonstrating the basic responsive page-level content wrapper with centered, width-constrained content.',
      },
    },
  },
};

/**
 * Displays all five maxWidth breakpoint variants stacked vertically
 * to compare their responsive width constraints.
 */
export const MaxWidthVariants: Story = {
  render: () => (
    <Stack direction="column" spacing={3}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Box key={size}>
          <Box sx={{ color: 'text.secondary', typography: 'body2', mb: 1 }}>
            {`maxWidth="${size}"`}
          </Box>
          <Container maxWidth={size}>
            <Box
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                p: 2,
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
              {`Container (${size})`}
            </Box>
          </Container>
        </Box>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Displays all five maxWidth breakpoint variants (xs, sm, md, lg, xl) stacked vertically to compare their responsive width constraints at each tier.',
      },
    },
  },
};

/**
 * Fixed-width Container that uses exact breakpoint pixel widths
 * instead of fluid percentage-based sizing.
 */
export const Fixed: Story = {
  args: {
    fixed: true,
    maxWidth: 'md',
  },
  render: (args) => (
    <Container {...args}>
      <Box sx={{ bgcolor: 'grey.100', p: 3, borderRadius: 1 }}>
        Fixed Container with maxWidth md uses exact breakpoint pixel widths instead of
        fluid percentage-based sizing. The container snaps to the nearest breakpoint
        width, maintaining a constant dimension within each breakpoint range rather than
        scaling fluidly.
      </Box>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Fixed-width Container that uses exact breakpoint pixel widths instead of fluid percentage-based sizing, maintaining a constant width within each breakpoint range.',
      },
    },
  },
};

/**
 * Compares Container with default horizontal gutters versus
 * disableGutters mode to show edge-to-edge content behavior.
 */
export const DisableGutters: Story = {
  render: () => (
    <Stack direction="column" spacing={3}>
      <Box>
        <Box sx={{ color: 'text.secondary', typography: 'body2', mb: 1 }}>
          With gutters (default)
        </Box>
        <Container maxWidth="sm">
          <Box
            sx={{
              bgcolor: 'info.main',
              color: 'info.contrastText',
              p: 2,
              borderRadius: 1,
            }}
          >
            Content with default horizontal padding gutters applied by the Container
          </Box>
        </Container>
      </Box>
      <Box>
        <Box sx={{ color: 'text.secondary', typography: 'body2', mb: 1 }}>
          Without gutters (disableGutters)
        </Box>
        <Container maxWidth="sm" disableGutters>
          <Box
            sx={{
              bgcolor: 'warning.main',
              color: 'warning.contrastText',
              p: 2,
              borderRadius: 1,
            }}
          >
            Content without horizontal padding — extends edge to edge within the
            Container boundaries
          </Box>
        </Container>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Compares Container with default horizontal gutters versus disableGutters mode, showing how gutter removal allows content to extend edge-to-edge within the container boundaries.',
      },
    },
  },
};

/**
 * Container rendered with a dark theme via the library ThemeProvider
 * and createCustomTheme with dark palette mode enabled.
 */
export const DarkMode: Story = {
  render: () => (
    <Container maxWidth="md">
      <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 1 }}>
        Container rendered in dark mode using the library theme system. The
        ThemeProvider decorator applies a dark palette, and all child components
        inherit dark theme tokens for consistent dark mode rendering across the
        entire component tree.
      </Box>
    </Container>
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
        story:
          'Container rendered with a dark theme via the library ThemeProvider and createCustomTheme with dark palette mode enabled.',
      },
    },
  },
};

/**
 * A realistic page shell layout using Container with maxWidth lg,
 * demonstrating a composed header, main content area, and footer.
 */
export const FullExample: Story = {
  render: () => (
    <Container maxWidth="lg">
      <Stack direction="column" spacing={2}>
        <Box
          component="header"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            p: 2,
            borderRadius: 1,
          }}
        >
          Application Header — Navigation and branding area
        </Box>
        <Box
          component="main"
          sx={{
            bgcolor: 'grey.50',
            p: 3,
            borderRadius: 1,
          }}
        >
          Main Content Area — This section demonstrates how Container constrains a full
          page layout with a header, main content area, and footer. All content respects
          the lg breakpoint maximum width (1200px) while remaining responsive on smaller
          viewports. The Container centers the entire page shell horizontally and applies
          consistent horizontal gutters for comfortable reading width.
        </Box>
        <Box
          component="footer"
          sx={{
            bgcolor: 'grey.200',
            color: 'text.secondary',
            p: 2,
            borderRadius: 1,
            textAlign: 'center',
          }}
        >
          Footer Section — Links, copyright, and additional navigation
        </Box>
      </Stack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A realistic page shell layout using Container with maxWidth lg, demonstrating a composed header, main content area, and footer structure for typical application pages.',
      },
    },
  },
};
