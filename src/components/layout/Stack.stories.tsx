import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Box } from './Box';
import { Divider } from './Divider';
import { Button } from '../core/Button';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance created via the library's theme factory for use in the
 * DarkMode story decorator. Uses the standard dark palette mode which inverts
 * background and text colors across all MUI semantic tokens.
 */
const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

/**
 * Storybook meta configuration for the Stack layout component.
 *
 * Stack is a convenience component for CSS flexbox layouts with configurable
 * direction, spacing, dividers, and flex gap support. It wraps MUI's Stack
 * component with full prop forwarding and ref support.
 */
const meta = {
  title: 'Layout/Stack',
  component: Stack,
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
          'Stack is a convenience component for CSS flexbox layouts with configurable direction, spacing, dividers, and flex gap support. It wraps MUI Stack with full prop forwarding and ref support, making it the primary layout primitive for arranging child elements in a single dimension.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    spacing: {
      control: 'number',
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
    },
    justifyContent: {
      control: 'select',
      options: [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
    },
    useFlexGap: {
      control: 'boolean',
    },
    divider: { table: { disable: true } },
    sx: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    direction: 'column',
    spacing: 2,
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Stack rendering with column direction and spacing of 2 theme units
 * between child items. Uses the controls panel for interactive prop exploration.
 */
export const Default: Story = {
  args: {
    direction: 'column',
    spacing: 2,
  },
  render: (args) => (
    <Stack {...args}>
      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.light',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Item 1
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.light',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Item 2
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.light',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Item 3
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default Stack rendering with column direction and spacing of 2 theme units between items.',
      },
    },
  },
};

/**
 * Horizontal Stack with direction="row" arranging items side by side.
 */
export const Horizontal: Story = {
  args: {
    direction: 'row',
    spacing: 2,
  },
  render: (args) => (
    <Stack {...args}>
      <Box
        sx={{
          p: 2,
          bgcolor: 'info.light',
          borderRadius: 1,
          textAlign: 'center',
          minWidth: 80,
        }}
      >
        Left
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'info.light',
          borderRadius: 1,
          textAlign: 'center',
          minWidth: 80,
        }}
      >
        Center
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'info.light',
          borderRadius: 1,
          textAlign: 'center',
          minWidth: 80,
        }}
      >
        Right
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal Stack with direction="row" arranging items side by side in a single line.',
      },
    },
  },
};

/**
 * Vertical Stack explicitly demonstrating the default column direction.
 */
export const Vertical: Story = {
  args: {
    direction: 'column',
    spacing: 2,
  },
  render: (args) => (
    <Stack {...args}>
      <Box
        sx={{
          p: 2,
          bgcolor: 'success.light',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        First
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'success.light',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Second
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'success.light',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Third
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Vertical Stack explicitly demonstrating the default column direction with items stacked top to bottom.',
      },
    },
  },
};

/**
 * Demonstrates different spacing values (0 through 4) showing increasing gaps
 * between items in each row.
 */
export const WithSpacing: Story = {
  render: () => (
    <Stack direction="column" spacing={4}>
      {([0, 1, 2, 3, 4] as const).map((spacingValue) => (
        <Box key={spacingValue}>
          <Box sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary' }}>
            {`spacing=${spacingValue}`}
          </Box>
          <Stack direction="row" spacing={spacingValue}>
            <Box
              sx={{
                p: 1.5,
                bgcolor: 'primary.light',
                borderRadius: 1,
                textAlign: 'center',
                minWidth: 60,
              }}
            >
              A
            </Box>
            <Box
              sx={{
                p: 1.5,
                bgcolor: 'primary.light',
                borderRadius: 1,
                textAlign: 'center',
                minWidth: 60,
              }}
            >
              B
            </Box>
            <Box
              sx={{
                p: 1.5,
                bgcolor: 'primary.light',
                borderRadius: 1,
                textAlign: 'center',
                minWidth: 60,
              }}
            >
              C
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates different spacing values (0 through 4) showing increasing gaps between items in each row.',
      },
    },
  },
};

/**
 * Stack with divider elements rendered between each child, showing both vertical
 * dividers in a horizontal Stack and horizontal dividers in a vertical Stack.
 */
export const WithDividers: Story = {
  render: () => (
    <Stack direction="column" spacing={4}>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary' }}>
          Horizontal Stack with Vertical Dividers
        </Box>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: 'secondary.light',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            Section 1
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: 'secondary.light',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            Section 2
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: 'secondary.light',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            Section 3
          </Box>
        </Stack>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary' }}>
          Vertical Stack with Horizontal Dividers
        </Box>
        <Stack direction="column" spacing={2} divider={<Divider />}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'info.light',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            Row 1
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: 'info.light',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            Row 2
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: 'info.light',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            Row 3
          </Box>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Stack with divider elements rendered between each child. Shows both vertical dividers in a horizontal Stack and horizontal dividers in a vertical Stack.',
      },
    },
  },
};

/**
 * Demonstrates different alignItems values with items of varying heights to
 * clearly show alignment behavior differences.
 */
export const AlignItems: Story = {
  render: () => (
    <Stack direction="column" spacing={4}>
      {(['flex-start', 'center', 'flex-end', 'stretch'] as const).map(
        (alignment) => (
          <Box key={alignment}>
            <Box sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary' }}>
              {`alignItems="${alignment}"`}
            </Box>
            <Stack
              direction="row"
              spacing={2}
              alignItems={alignment}
              sx={{
                bgcolor: 'grey.100',
                p: 2,
                borderRadius: 1,
                minHeight: 100,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  bgcolor: 'warning.light',
                  borderRadius: 1,
                  minHeight: 30,
                  textAlign: 'center',
                }}
              >
                Short
              </Box>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'warning.light',
                  borderRadius: 1,
                  minHeight: 60,
                  textAlign: 'center',
                }}
              >
                Medium
              </Box>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'warning.light',
                  borderRadius: 1,
                  minHeight: 90,
                  textAlign: 'center',
                }}
              >
                Tall
              </Box>
            </Stack>
          </Box>
        ),
      )}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates different alignItems values (flex-start, center, flex-end, stretch) with items of varying heights to show alignment behavior.',
      },
    },
  },
};

/**
 * Stack rendered in dark mode using a custom dark theme, demonstrating how
 * Stack items adapt to the dark color scheme.
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
    <Stack direction="column" spacing={2}>
      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.dark',
          color: 'primary.contrastText',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Dark Item 1
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'secondary.dark',
          color: 'secondary.contrastText',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Dark Item 2
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'info.dark',
          color: 'info.contrastText',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Dark Item 3
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Stack rendered in dark mode using a custom dark theme, demonstrating how Stack items adapt to the dark color scheme.',
      },
    },
  },
};

/**
 * A realistic form layout composition demonstrating Stack used for vertical
 * form fields and horizontal button groups, showcasing practical UI patterns.
 */
export const FullExample: Story = {
  render: () => (
    <Box sx={{ width: 360 }}>
      <Stack direction="column" spacing={3}>
        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 1,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          User Registration
        </Box>
        <Stack direction="column" spacing={2}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              color: 'text.secondary',
            }}
          >
            Full Name
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              color: 'text.secondary',
            }}
          >
            Email Address
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              color: 'text.secondary',
            }}
          >
            Password
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="text">Cancel</Button>
          <Button variant="contained">Register</Button>
        </Stack>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A realistic form layout composition demonstrating Stack used for vertical form fields and horizontal button groups, showcasing practical UI layout patterns.',
      },
    },
  },
};
