import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { Box } from './Box';
import { Paper } from './Paper';
import { Stack } from './Stack';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark palette mode,
 * which inverts background and text semantic color tokens.
 * Defined at module level to avoid re-creation on each render.
 */
const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

/**
 * Reusable placeholder item component used across Grid stories to visualize
 * grid column and row relationships. Renders a colored Box with centered text
 * label indicating the grid item's purpose or position.
 */
const GridItem = ({
  label,
  bgcolor = 'primary.light',
}: {
  label: string;
  bgcolor?: string;
}) => (
  <Box
    sx={{
      bgcolor,
      p: 2,
      textAlign: 'center',
      borderRadius: 1,
      color: 'primary.contrastText',
      fontWeight: 500,
    }}
  >
    {label}
  </Box>
);

/**
 * Storybook meta configuration for the Grid layout component.
 *
 * Grid is a responsive 12-column layout system built on CSS flexbox, wrapping
 * MUI Grid v7 with full prop forwarding and ref support. It supports both
 * container and item modes, responsive sizing via the `size` prop (replacing
 * the v5 individual xs/sm/md/lg/xl props), column offsetting via the `offset`
 * prop, and configurable spacing, columns, direction, and wrapping.
 *
 * Every story renders within the library's ThemeProvider to ensure consistent
 * themed rendering with design tokens applied.
 */
const meta = {
  title: 'Layout/Grid',
  component: Grid,
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
          'Grid is a responsive 12-column layout system built on CSS flexbox, wrapping MUI Grid v7. Supports container and item modes with responsive sizing via the `size` prop (e.g., `size={{ xs: 12, md: 6 }}`), column offsetting via `offset`, configurable spacing, custom column counts, flex direction, and wrapping. Use Grid to build responsive page layouts, dashboards, and multi-column content arrangements.',
      },
    },
  },
  argTypes: {
    container: {
      control: 'boolean',
      description:
        'When true, enables flex container behavior so child Grid items can be sized and spaced.',
    },
    spacing: {
      control: 'number',
      description:
        'Gap between grid items using theme.spacing() factor. Applies to container Grid elements.',
    },
    columns: {
      control: 'number',
      description:
        'Number of columns in the grid layout. Defaults to 12. Items size relative to this total.',
    },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Flex-direction style property for the container Grid.',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description:
        'Flex-wrap behavior controlling whether items wrap to new lines.',
    },
    sx: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Grid layout with a 3-column responsive grid container.
 * Items span full width on mobile (xs: 12) and distribute evenly
 * across 3 columns on medium screens and above (md: 4).
 */
export const Default: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <GridItem label="Column 1" bgcolor="primary.light" />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <GridItem label="Column 2" bgcolor="primary.main" />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <GridItem label="Column 3" bgcolor="primary.dark" />
      </Grid>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Basic 3-column Grid layout using the MUI v7 `size` prop. Items stack vertically on mobile (xs: 12) and arrange in three equal columns on medium screens (md: 4).',
      },
    },
  },
};

/**
 * Simple 2-column layout demonstrating equal-width columns that stack on
 * mobile and sit side-by-side on medium viewports.
 */
export const BasicGrid: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <GridItem label="Left Column" bgcolor="primary.light" />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <GridItem label="Right Column" bgcolor="secondary.light" />
      </Grid>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Simple 2-column layout with equal width columns. Items span full width on mobile (xs: 12) and split into two equal halves on medium screens (md: 6).',
      },
    },
  },
};

/**
 * Responsive columns that adapt across all breakpoints: full width on
 * extra-small, 2 columns on small, 3 columns on medium, and 4 columns
 * on large screens.
 */
export const ResponsiveColumns: Story = {
  render: () => (
    <Grid container spacing={2}>
      {(
        [
          { label: 'Item 1', bgcolor: 'primary.light' },
          { label: 'Item 2', bgcolor: 'secondary.light' },
          { label: 'Item 3', bgcolor: 'info.light' },
          { label: 'Item 4', bgcolor: 'success.light' },
        ] as const
      ).map((item) => (
        <Grid key={item.label} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GridItem label={item.label} bgcolor={item.bgcolor} />
        </Grid>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Responsive columns that adapt across breakpoints: 1 column on xs (12/12), 2 columns on sm (6/12), 3 columns on md (4/12), and 4 columns on lg (3/12). Resize the viewport to observe the layout reflow at each breakpoint tier.',
      },
    },
  },
};

/**
 * Spacing comparison showing Grid containers with spacing values from
 * 0 (no gap) through 4 (32px gap). Each row displays the spacing
 * factor value and three colored items.
 */
export const Spacing: Story = {
  render: () => (
    <Stack spacing={4}>
      {([0, 1, 2, 3, 4] as const).map((spacingValue) => (
        <Box key={spacingValue}>
          <Box sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
            {`spacing={${spacingValue}}`}
          </Box>
          <Grid container spacing={spacingValue}>
            <Grid size={{ xs: 4 }}>
              <GridItem
                label={`A (${spacingValue})`}
                bgcolor="primary.light"
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <GridItem
                label={`B (${spacingValue})`}
                bgcolor="primary.main"
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <GridItem
                label={`C (${spacingValue})`}
                bgcolor="primary.dark"
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Spacing comparison demonstrating Grid containers with spacing values from 0 (no gap) through 4 (32px gap). Each row shows the spacing factor and three equally sized items to visualize the gap difference.',
      },
    },
  },
};

/**
 * Nested Grid layout with an outer container holding a wide primary area
 * (with its own inner Grid) and a narrow sidebar. Demonstrates how Grid
 * containers can be composed hierarchically for complex layouts.
 */
export const NestedGrid: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper sx={{ p: 2 }} elevation={2}>
          <Box sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
            Main Area (nested grid inside)
          </Box>
          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <GridItem label="Nested 1" bgcolor="info.light" />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <GridItem label="Nested 2" bgcolor="info.main" />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          sx={{
            p: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          elevation={2}
        >
          <Box sx={{ fontWeight: 500, color: 'text.secondary' }}>Sidebar</Box>
        </Paper>
      </Grid>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Nested Grid layout showing a Grid container within a Grid item. The main area (8 columns on md) contains an inner Grid with two sub-items, while the sidebar (4 columns on md) displays standalone content. Paper surfaces provide visual separation.',
      },
    },
  },
};

/**
 * Grid rendered in dark mode using the library's createCustomTheme with
 * dark palette mode. Paper surfaces and text colors automatically adapt
 * to the dark theme tokens.
 */
export const DarkMode: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2, textAlign: 'center' }} elevation={3}>
          Panel 1
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2, textAlign: 'center' }} elevation={3}>
          Panel 2
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2, textAlign: 'center' }} elevation={3}>
          Panel 3
        </Paper>
      </Grid>
    </Grid>
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
          'Grid layout rendered in dark mode using the library createCustomTheme factory with dark palette mode. Paper surfaces and text colors automatically adapt to the dark theme tokens.',
      },
    },
  },
};

/**
 * Full dashboard layout example demonstrating a realistic composition:
 * - Full-width header row spanning all 12 columns
 * - Sidebar (3 columns on md) and main content area (9 columns on md)
 * - Bottom row with 3 equal-width metric cards
 * Uses Paper for elevated card surfaces and Box for colored section blocks.
 */
export const FullExample: Story = {
  render: () => (
    <Grid container spacing={2}>
      {/* Full-width header row */}
      <Grid size={{ xs: 12 }}>
        <Paper
          sx={{
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
          elevation={2}
        >
          <Box sx={{ fontWeight: 700, typography: 'h6' }}>
            Analytics Dashboard
          </Box>
          <Box sx={{ typography: 'body2', mt: 0.5, opacity: 0.9 }}>
            Real-time performance metrics and system overview
          </Box>
        </Paper>
      </Grid>

      {/* Sidebar navigation */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2, height: '100%' }} elevation={1}>
          <Box sx={{ fontWeight: 600, mb: 1.5, color: 'text.primary' }}>
            Navigation
          </Box>
          <Stack spacing={1}>
            {(['Overview', 'Users', 'Revenue', 'Settings'] as const).map(
              (item) => (
                <Box
                  key={item}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: item === 'Overview' ? 'primary.light' : 'transparent',
                    color:
                      item === 'Overview'
                        ? 'primary.contrastText'
                        : 'text.secondary',
                    fontWeight: item === 'Overview' ? 600 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {item}
                </Box>
              )
            )}
          </Stack>
        </Paper>
      </Grid>

      {/* Main content area */}
      <Grid size={{ xs: 12, md: 9 }}>
        <Paper sx={{ p: 3, minHeight: 200 }} elevation={1}>
          <Box sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
            Performance Overview
          </Box>
          <Box sx={{ color: 'text.secondary', mb: 2, typography: 'body2' }}>
            System uptime and response metrics for the last 30 days
          </Box>
          <Box
            sx={{
              bgcolor: 'action.hover',
              borderRadius: 1,
              p: 4,
              textAlign: 'center',
              color: 'text.disabled',
            }}
          >
            Chart visualization area
          </Box>
        </Paper>
      </Grid>

      {/* Bottom metric cards row */}
      {(
        [
          {
            title: 'Active Users',
            value: '12,847',
            change: '+8.2% from last month',
            color: 'success.light',
          },
          {
            title: 'Server Response',
            value: '142ms',
            change: '-12% avg latency',
            color: 'info.light',
          },
          {
            title: 'Error Rate',
            value: '0.03%',
            change: 'Within target SLA',
            color: 'warning.light',
          },
        ] as const
      ).map((metric) => (
        <Grid key={metric.title} size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }} elevation={1}>
            <Box sx={{ color: 'text.secondary', typography: 'body2' }}>
              {metric.title}
            </Box>
            <Box sx={{ fontWeight: 700, typography: 'h5', my: 0.5 }}>
              {metric.value}
            </Box>
            <Box
              sx={{
                typography: 'caption',
                color: 'text.secondary',
                bgcolor: metric.color,
                display: 'inline-block',
                px: 1,
                py: 0.25,
                borderRadius: 0.5,
              }}
            >
              {metric.change}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Full dashboard layout demonstrating realistic Grid composition: a full-width header row, sidebar navigation (3 columns on md) with main content area (9 columns on md), and a bottom row of 3 equal-width metric cards. Uses Paper for elevated surfaces and Box for content blocks with domain-appropriate placeholder data.',
      },
    },
  },
};
