import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Link } from './Link';
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
 * Storybook meta configuration for the Link component.
 *
 * Registers the component under the "Navigation/Link" title, enables autodocs
 * generation, wraps every story in the library's ThemeProvider, and maps
 * meaningful Link props to interactive Storybook controls.
 */
const meta = {
  title: 'Navigation/Link',
  component: Link,
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
          'Link is a themed wrapper around MUI Link providing anchor element functionality with typography integration, underline control, and themed color support.',
      },
    },
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'The URL the link points to',
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
      description: 'Controls underline decoration',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'inherit',
        'error',
        'info',
        'success',
        'warning',
      ],
      description: 'Themed color from the palette',
    },
    variant: {
      control: 'select',
      options: [
        'inherit',
        'body1',
        'body2',
        'h6',
        'h5',
        'h4',
        'subtitle1',
        'subtitle2',
        'caption',
      ],
      description: 'Typography variant for text styling',
    },
    children: {
      control: 'text',
      description: 'Link content',
    },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Story: Default
// ---------------------------------------------------------------------------

/**
 * Default — basic link with default styling and primary color.
 */
export const Default: Story = {
  args: {
    href: '#',
    children: 'Default Link',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic link with default styling and primary color.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: UnderlineVariants
// ---------------------------------------------------------------------------

/**
 * UnderlineVariants — demonstrates the three underline options
 * (always, hover, none) rendered side-by-side for comparison.
 */
export const UnderlineVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Link href="#" underline="always" onClick={fn()}>
        Always Underline
      </Link>
      <Link href="#" underline="hover" onClick={fn()}>
        Hover Underline
      </Link>
      <Link href="#" underline="none" onClick={fn()}>
        No Underline
      </Link>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Displays the three underline decoration options: always visible, visible on hover only, and no underline.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: Colors
// ---------------------------------------------------------------------------

/**
 * Colors — renders a link in every available theme color for side-by-side
 * comparison of the palette integration.
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
          'inherit',
        ] as const
      ).map((color) => (
        <Link key={color} href="#" color={color} onClick={fn()}>
          {color}
        </Link>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Shows the Link component in all available theme colors: primary, secondary, error, info, success, warning, and inherit.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: TypographyVariants
// ---------------------------------------------------------------------------

/**
 * TypographyVariants — demonstrates how the Link component integrates with
 * the MUI typography variant scale, rendering links in different text sizes
 * and weights.
 */
export const TypographyVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      {(
        ['h4', 'h5', 'h6', 'body1', 'body2', 'subtitle1', 'subtitle2', 'caption'] as const
      ).map((variant) => (
        <Link key={variant} href="#" variant={variant} onClick={fn()}>
          {variant} link
        </Link>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Renders the Link with different typography variants to show how text size and weight change while retaining link styling.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: ExternalLink
// ---------------------------------------------------------------------------

/**
 * ExternalLink — demonstrates an external link with target="_blank" and
 * rel="noopener noreferrer" for safe external navigation.
 */
export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    children: 'External Link',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An external link that opens in a new tab with secure rel attributes (noopener noreferrer) applied.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: DarkMode
// ---------------------------------------------------------------------------

/**
 * DarkMode — renders links on a dark background using the library's dark
 * theme to verify color contrast and readability in dark mode contexts.
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
    <Stack direction="row" spacing={2} alignItems="center">
      <Link href="#" color="primary" onClick={fn()}>
        Primary
      </Link>
      <Link href="#" color="secondary" onClick={fn()}>
        Secondary
      </Link>
      <Link href="#" color="error" onClick={fn()}>
        Error
      </Link>
      <Link href="#" color="info" onClick={fn()}>
        Info
      </Link>
      <Link href="#" color="success" onClick={fn()}>
        Success
      </Link>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Renders links on a dark theme background to verify that link colors maintain adequate contrast and readability in dark mode.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Story: FullExample
// ---------------------------------------------------------------------------

/**
 * FullExample — a realistic footer navigation layout composing multiple
 * Link instances within a styled container, demonstrating how the component
 * is used in a production-like footer navigation pattern.
 */
export const FullExample: Story = {
  render: () => (
    <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Link href="#" underline="hover" color="inherit" onClick={fn()}>
          Home
        </Link>
        <Link href="#" underline="hover" color="inherit" onClick={fn()}>
          About
        </Link>
        <Link href="#" underline="hover" color="inherit" onClick={fn()}>
          Services
        </Link>
        <Link href="#" underline="hover" color="inherit" onClick={fn()}>
          Contact
        </Link>
        <Link href="#" underline="hover" color="inherit" onClick={fn()}>
          Privacy Policy
        </Link>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A realistic footer navigation layout with multiple links using hover underline and inherited color, arranged horizontally in a styled container.',
      },
    },
  },
};
