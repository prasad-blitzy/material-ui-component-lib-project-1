import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from './CircularProgress';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { Typography } from '../data-display/Typography';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance for the DarkMode story decorator.
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
 * Storybook meta configuration for the CircularProgress component.
 *
 * Registers the component under the "Feedback/CircularProgress" title,
 * enables autodocs generation, wraps every story in the library's
 * ThemeProvider, and maps all meaningful CircularProgress props to
 * interactive Storybook controls.
 */
const meta = {
  title: 'Feedback/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
    },
    value: {
      control: { type: 'number', min: 0, max: 100 },
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning',
        'inherit',
      ],
    },
    size: {
      control: { type: 'number' },
    },
    thickness: {
      control: { type: 'number' },
    },
    disableShrink: {
      control: 'boolean',
    },
    sx: { table: { disable: true } },
  },
  parameters: {
    layout: 'centered' as const,
    docs: {
      description: {
        component:
          'Themed CircularProgress component providing circular loading indicators. Wraps MUI CircularProgress with full prop forwarding, ref forwarding, and library theme integration. Supports determinate and indeterminate variants with customizable size, thickness, and theme-aware colors.',
      },
    },
  },
} satisfies Meta<typeof CircularProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default indeterminate circular progress spinner.
 *
 * Shows the default CircularProgress behavior with no explicit variant,
 * which renders as an indeterminate continuous spinning animation.
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default indeterminate circular progress spinner.',
      },
    },
  },
};

/**
 * Determinate progress indicator showing a specific completion percentage.
 *
 * Uses the determinate variant with a fixed value of 75 to illustrate
 * how the circular arc fills proportionally to the value prop.
 */
export const Determinate: Story = {
  args: {
    variant: 'determinate',
    value: 75,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Determinate variant displaying a fixed progress value of 75%.',
      },
    },
  },
};

/**
 * Explicit indeterminate variant for documentation clarity.
 *
 * While indeterminate is the default, this story explicitly sets
 * the variant to make the behavior documented and discoverable.
 */
export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Explicitly set indeterminate variant with continuous spinning animation.',
      },
    },
  },
};

/**
 * All six theme color variants displayed side-by-side.
 *
 * Each CircularProgress inherits a different theme palette color
 * to demonstrate the full range of available color options.
 */
export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(
        [
          'primary',
          'secondary',
          'error',
          'info',
          'success',
          'warning',
        ] as const
      ).map((color) => (
        <Stack key={color} spacing={0.5} alignItems="center">
          <CircularProgress color={color} />
          <Typography variant="caption" color="text.secondary">
            {color}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All six theme color variants (primary, secondary, error, info, success, warning) displayed side-by-side with labels.',
      },
    },
  },
};

/**
 * Various size options displayed side-by-side.
 *
 * Demonstrates how the size prop controls the diameter of the
 * circular indicator. Sizes range from compact (20px) to large (80px).
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {([20, 30, 40, 60, 80] as const).map((size) => (
        <Stack key={size} spacing={0.5} alignItems="center">
          <CircularProgress size={size} />
          <Typography variant="caption" color="text.secondary">
            {size}px
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Various size options (20, 30, 40, 60, 80 pixels) displayed side-by-side with dimension labels.',
      },
    },
  },
};

/**
 * CircularProgress rendered in dark mode.
 *
 * Uses a story-level decorator to override the global ThemeProvider
 * with a dark theme created via createCustomTheme. The Box wrapper
 * provides the dark background context.
 */
export const DarkMode: Story = {
  args: {},
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
          'CircularProgress rendered in dark mode using the library dark theme.',
      },
    },
  },
};

/**
 * Realistic loading overlay with centered spinner and label.
 *
 * Demonstrates a practical use case composing CircularProgress with
 * Typography and Box to create a centered loading indicator suitable
 * for content areas, cards, or page-level loading states.
 */
export const FullExample: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="body2" color="text.secondary">
        Loading...
      </Typography>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Realistic loading overlay with centered spinner and label.',
      },
    },
  },
};

/**
 * Multiple determinate spinners at different progress values.
 *
 * Shows CircularProgress in determinate mode at 0%, 25%, 50%, 75%,
 * and 100% completion to illustrate the full range of the value prop.
 */
export const DeterminateValues: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {([0, 25, 50, 75, 100] as const).map((value) => (
        <Stack key={value} spacing={0.5} alignItems="center">
          <CircularProgress variant="determinate" value={value} />
          <Typography variant="caption" color="text.secondary">
            {value}%
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple determinate spinners showing progress at 0%, 25%, 50%, 75%, and 100% to demonstrate the full value range.',
      },
    },
  },
};
