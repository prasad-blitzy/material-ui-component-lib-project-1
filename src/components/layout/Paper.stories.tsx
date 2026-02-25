import type { Meta, StoryObj } from '@storybook/react';
import { Paper } from './Paper';
import { Stack } from './Stack';
import { Box } from './Box';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark palette mode.
 * Defined at module level to avoid re-creation on each render.
 */
const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

/**
 * Storybook meta configuration for the Paper layout component.
 *
 * Paper is a themed wrapper around MUI Paper that provides an elevated surface
 * container with themed shadow and background color. It supports two visual
 * variants — elevation (shadow-based depth) and outlined (border-based) — along
 * with configurable elevation levels (0–24) and optional square corners.
 *
 * Every story renders within the library's ThemeProvider to ensure consistent
 * themed rendering with design tokens applied.
 */
const meta = {
  title: 'Layout/Paper',
  component: Paper,
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
          'Paper is a themed elevated surface container wrapping MUI Paper. It uses theme.palette.background.paper for its background and theme.shadows[elevation] for box-shadow depth (0–24 levels). Supports elevation and outlined variants, configurable border-radius via the square prop, and full theme-aware styling through the sx prop.',
      },
    },
  },
  argTypes: {
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
      description:
        'Shadow depth level from 0 (no shadow) to 24 (maximum shadow). Maps to theme.shadows[elevation].',
    },
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'],
      description:
        'Visual variant — elevation uses box-shadow for depth, outlined uses a 1px border from theme.palette.divider.',
    },
    square: {
      control: 'boolean',
      description:
        'When true, removes the border-radius controlled by theme.shape.borderRadius (default 4px).',
    },
    sx: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    elevation: 1,
  },
} satisfies Meta<typeof Paper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Paper surface with elevation 1 and standard padding.
 * Demonstrates the basic elevated surface with themed background and shadow.
 */
export const Default: Story = {
  args: {
    children: 'Paper Surface',
    sx: { p: 3 },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic Paper surface with default elevation of 1 and standard padding, showing the themed background color and subtle box-shadow.',
      },
    },
  },
};

/**
 * Elevation progression showing shadow depth levels from 0 (flat) to 24
 * (maximum depth). Each Paper displays its elevation number.
 */
export const Elevations: Story = {
  render: () => (
    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
      {([0, 1, 2, 3, 4, 8, 12, 16, 24] as const).map((elev) => (
        <Paper
          key={elev}
          elevation={elev}
          sx={{
            p: 2,
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {elev}
        </Paper>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Elevation progression from 0 (no shadow) through 24 (maximum shadow), demonstrating how theme.shadows maps to visual depth. Each Paper shows its elevation level number.',
      },
    },
  },
};

/**
 * Outlined variant uses a 1px border from theme.palette.divider instead of
 * a box-shadow, providing a flat surface with a subtle border.
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Paper Surface',
    sx: { p: 3 },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Outlined variant replaces the box-shadow with a 1px solid border using theme.palette.divider, providing a flat bordered surface suitable for card-like layouts without elevation.',
      },
    },
  },
};

/**
 * Comparison of rounded (default) and square Paper surfaces side by side.
 * The square prop removes theme.shape.borderRadius (default 4px).
 */
export const Square: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Paper elevation={3} sx={{ p: 3 }}>
        Rounded (default)
      </Paper>
      <Paper elevation={3} square sx={{ p: 3 }}>
        Square (no border-radius)
      </Paper>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of the default rounded corners (theme.shape.borderRadius of 4px) versus the square prop which removes border-radius entirely.',
      },
    },
  },
};

/**
 * Paper surfaces rendered in dark mode using a story-level ThemeProvider
 * override. Dark mode changes the background color and shadow appearance
 * of Paper surfaces.
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
    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
      {([0, 1, 4, 8, 16, 24] as const).map((elev) => (
        <Paper
          key={elev}
          elevation={elev}
          sx={{
            p: 2,
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {elev}
        </Paper>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Paper surfaces rendered in dark mode via a story-level ThemeProvider decorator using createCustomTheme with palette mode set to dark. In dark mode, Paper background shifts to a darker surface color and elevation creates subtle lightening effects rather than shadows.',
      },
    },
  },
};

/**
 * Realistic content panel demonstrating Paper as an elevated container
 * with structured header, content, and footer sections using library
 * layout primitives.
 */
export const FullExample: Story = {
  render: () => (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400 }}>
      <Box sx={{ pb: 2 }}>
        <Box
          sx={{
            typography: 'h6',
            color: 'text.primary',
            fontWeight: 500,
          }}
        >
          Project Overview
        </Box>
        <Box
          sx={{
            typography: 'caption',
            color: 'text.secondary',
          }}
        >
          Dashboard Panel
        </Box>
      </Box>
      <Box sx={{ pb: 2 }}>
        <Box
          sx={{
            typography: 'body2',
            color: 'text.secondary',
            lineHeight: 1.6,
          }}
        >
          This elevated panel demonstrates a realistic use case for the Paper
          component as a content container. Paper provides themed background
          color, configurable shadow depth, and consistent border-radius from
          the design token system, making it ideal for card-like content panels
          and dashboard widgets.
        </Box>
      </Box>
      <Stack direction="row" spacing={1} sx={{ pb: 2 }}>
        <Paper variant="outlined" sx={{ px: 1.5, py: 0.5 }}>
          <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
            Status: Active
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ px: 1.5, py: 0.5 }}>
          <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
            Priority: High
          </Box>
        </Paper>
      </Stack>
      <Box
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          pt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
          Last updated: January 2025
        </Box>
        <Box sx={{ typography: 'caption', color: 'primary.main' }}>
          View Details
        </Box>
      </Box>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Realistic elevated content panel composing Paper with Box and Stack from the library. Demonstrates a structured layout with header, content body, outlined metadata tags, and a divider-separated footer — all styled exclusively with theme tokens via the sx prop.',
      },
    },
  },
};
