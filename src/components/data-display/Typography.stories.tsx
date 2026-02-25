import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark palette mode,
 * which inverts background and text colors across all MUI semantic tokens.
 */
const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

/**
 * Storybook meta configuration for the Typography data-display component.
 *
 * Typography is a themed text rendering component that wraps MUI Typography
 * with the library's theme system, providing the full MUI typography scale
 * (h1–h6, subtitle1–2, body1–2, caption, overline, button, inherit) with
 * theme-aware color, alignment, gutter, noWrap, and polymorphic component
 * override support. All MUI Typography props are forwarded via forwardRef.
 *
 * Every story renders within the library's ThemeProvider to ensure
 * consistent themed rendering with design tokens applied.
 */
const meta = {
  title: 'Data Display/Typography',
  component: Typography,
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
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
        'button',
        'inherit',
      ],
      description:
        'The typography variant to use. Maps to MUI typography scale tokens defined in the theme.',
    },
    color: {
      control: 'text',
      description:
        'Theme-aware color value such as "primary", "text.secondary", or "error".',
    },
    align: {
      control: 'select',
      options: ['inherit', 'left', 'center', 'right', 'justify'],
      description: 'Text alignment within the containing block.',
    },
    gutterBottom: {
      control: 'boolean',
      description: 'When true, adds bottom margin to the typography element.',
    },
    noWrap: {
      control: 'boolean',
      description:
        'When true, text does not wrap and is truncated with an ellipsis on overflow.',
    },
    paragraph: {
      control: 'boolean',
      description: 'When true, renders the element as a <p> paragraph tag.',
    },
    sx: {
      table: { disable: true },
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Typography renders themed text content using the MUI typography scale through the ' +
          "library's theme system. It supports all MUI typography variants (h1–h6, subtitle1–2, " +
          'body1–2, caption, overline, button, inherit), theme-aware colors, text alignment, ' +
          'gutter bottom margin, noWrap truncation, paragraph mode, and polymorphic component ' +
          'override via the component prop. All MUI Typography props are forwarded through forwardRef.',
      },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Typography with body1 variant.
 * Use the controls panel to interactively change variant, color,
 * align, gutterBottom, noWrap, and paragraph props.
 */
export const Default: Story = {
  args: {
    children: 'Typography Component',
    variant: 'body1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Typography with body1 variant.',
      },
    },
  },
};

/**
 * Complete typography variant scale from h1 through button.
 * Renders every variant in the MUI typography system vertically
 * stacked so the full type hierarchy is visible at a glance.
 */
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      {(
        [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'subtitle1',
          'subtitle2',
          'body1',
          'body2',
          'caption',
          'overline',
          'button',
        ] as const
      ).map((variant) => (
        <Typography key={variant} variant={variant}>
          {variant} — Sample text content
        </Typography>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete typography variant scale from h1 through button.',
      },
    },
  },
};

/**
 * Typography with different theme-aware color values.
 * Demonstrates primary, secondary, text.primary, text.secondary, and error colors
 * applied through the theme's color tokens.
 */
export const Colors: Story = {
  render: () => (
    <Stack spacing={1}>
      {(
        [
          'primary',
          'secondary',
          'text.primary',
          'text.secondary',
          'error',
        ] as const
      ).map((color) => (
        <Typography key={color} variant="body1" color={color}>
          Color: {color}
        </Typography>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography with different theme-aware color values.',
      },
    },
  },
};

/**
 * Typography text alignment options.
 * Demonstrates left, center, right, and justify alignment within
 * a constrained-width container so the alignment effect is clearly visible.
 */
export const Alignment: Story = {
  render: () => (
    <Stack spacing={1} sx={{ width: '100%', maxWidth: 'sm' }}>
      {(['left', 'center', 'right', 'justify'] as const).map((align) => (
        <Typography key={align} variant="body1" align={align}>
          Aligned {align} text content
        </Typography>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography text alignment options.',
      },
    },
  },
};

/**
 * Typography with gutterBottom enabled to add bottom margin.
 * The gutterBottom prop adds a theme-aware bottom margin to create
 * vertical spacing between consecutive text elements.
 */
export const GutterBottom: Story = {
  args: {
    children: 'Typography with gutter bottom adds bottom margin',
    variant: 'h6',
    gutterBottom: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Typography with gutterBottom adds bottom margin.',
      },
    },
  },
};

/**
 * Typography rendered in dark mode theme context.
 * Uses a story-level decorator to override the global ThemeProvider
 * with a dark palette theme created via createCustomTheme.
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
  args: {
    children: 'Dark mode typography',
    variant: 'h4',
  },
  parameters: {
    docs: {
      description: {
        story: 'Typography rendered in dark mode theme context.',
      },
    },
  },
};

/**
 * Realistic article layout composing multiple typography variants.
 * Demonstrates how Typography variants combine to form a readable
 * article structure with heading, subtitle, body text, supporting
 * text, and caption — all using theme-aware colors and spacing.
 */
export const FullExample: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 'sm' }}>
      <Typography variant="h3">Article Title</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Published on January 15, 2025 by Jane Doe
      </Typography>
      <Typography variant="body1">
        Main paragraph text with realistic content about the article topic.
        This paragraph demonstrates the body1 variant in a realistic reading
        context.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Additional supporting text in body2 with secondary color for reduced
        emphasis.
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Photo credit: Stock Images
      </Typography>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Realistic article layout composing multiple typography variants.',
      },
    },
  },
};
