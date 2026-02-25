import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LinearProgress } from './LinearProgress';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { Typography } from '../data-display/Typography';
import { Button } from '../core/Button';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark palette mode,
 * which inverts background and text colors across all MUI semantic tokens.
 */
const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

/**
 * Storybook meta configuration for the LinearProgress component.
 *
 * Registers the component under the "Feedback/LinearProgress" title,
 * enables autodocs generation, wraps every story in the library's
 * ThemeProvider, and maps all meaningful LinearProgress props to
 * interactive Storybook controls.
 */
const meta = {
  title: 'Feedback/LinearProgress',
  component: LinearProgress,
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
      options: ['determinate', 'indeterminate', 'buffer', 'query'],
    },
    value: {
      control: { type: 'number', min: 0, max: 100 },
    },
    valueBuffer: {
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
    sx: { table: { disable: true } },
  },
  parameters: {
    layout: 'padded' as const,
    docs: {
      description: {
        component:
          'Themed LinearProgress component providing horizontal progress indicators. Wraps MUI LinearProgress with full prop forwarding, ref forwarding, and library theme integration. Supports determinate, indeterminate, buffer, and query animation variants with customizable colors.',
      },
    },
  },
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default indeterminate linear progress bar.
 *
 * Shows the default LinearProgress behavior with no explicit variant,
 * which renders as an indeterminate continuous animation.
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default indeterminate linear progress bar.',
      },
    },
  },
};

/**
 * Determinate progress bar showing a specific completion percentage.
 *
 * Uses the determinate variant with a fixed value of 50 to illustrate
 * how the bar fills proportionally to the value prop.
 */
export const Determinate: Story = {
  args: {
    variant: 'determinate',
    value: 50,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Determinate variant displaying a fixed progress value of 50%.',
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
          'Explicitly set indeterminate variant with continuous animation.',
      },
    },
  },
};

/**
 * Buffer variant showing both loaded and buffered progress.
 *
 * The buffer variant displays two progress values: the current value
 * (solid bar) and the valueBuffer (lighter bar), commonly used to
 * show buffering in media players or multi-stage loading.
 */
export const Buffer: Story = {
  args: {
    variant: 'buffer',
    value: 60,
    valueBuffer: 80,
  },
  parameters: {
    docs: {
      description: {
        story: 'Buffer variant showing loaded and buffered progress.',
      },
    },
  },
};

/**
 * All six theme color variants displayed in a vertical stack.
 *
 * Each LinearProgress is set to determinate with a value of 60 to make
 * the color clearly visible. Labels identify each color variant.
 */
export const Colors: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '100%' }}>
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
        <Stack key={color} spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            {color}
          </Typography>
          <LinearProgress variant="determinate" value={60} color={color} />
        </Stack>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All six theme color variants (primary, secondary, error, info, success, warning) displayed vertically with labels.',
      },
    },
  },
};

/**
 * LinearProgress rendered in dark mode.
 *
 * Uses a story-level decorator to override the global ThemeProvider
 * with a dark theme created via createCustomTheme. The Box wrapper
 * provides the dark background context.
 */
export const DarkMode: Story = {
  args: {
    variant: 'determinate',
    value: 60,
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
        story:
          'LinearProgress rendered in dark mode using the library dark theme.',
      },
    },
  },
};

/**
 * Interactive progress bar with controls to adjust the determinate value.
 *
 * Uses React.useState to manage the progress percentage. Buttons allow
 * incrementing and decrementing the value by 10%, clamped between 0 and 100.
 */
export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} />
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              setProgress((prev) => Math.max(prev - 10, 0))
            }
          >
            -10%
          </Button>
          <Typography variant="body2" color="text.secondary">
            {progress}%
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              setProgress((prev) => Math.min(prev + 10, 100))
            }
          >
            +10%
          </Button>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive progress bar with increment and decrement controls to adjust the determinate value.',
      },
    },
  },
};

/**
 * Realistic file upload progress indicator.
 *
 * Demonstrates a practical use case with a filename label,
 * percentage indicator, and a determinate LinearProgress bar
 * composing multiple library components together.
 */
export const FullExample: Story = {
  render: () => {
    const [progress] = useState(45);
    return (
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2">Uploading document.pdf</Typography>
            <Typography variant="body2" color="text.secondary">
              {progress}%
            </Typography>
          </Stack>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" color="text.secondary">
            2.3 MB of 5.1 MB uploaded
          </Typography>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Realistic file upload progress indicator with filename, percentage label, and transfer details.',
      },
    },
  },
};
