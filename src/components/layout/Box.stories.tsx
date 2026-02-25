import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { Stack } from './Stack';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark color scheme
 * with explicit dark palette values and cssVariables disabled.
 * Since the library's default theme uses cssVariables: true, this override
 * ensures the nested ThemeProvider uses traditional Emotion-based theming
 * with dark background (#121212) and light text (#fff) values.
 * Defined at module level to avoid re-creation on each render.
 */
const darkTheme = createCustomTheme({
  palette: {
    mode: 'dark',
    background: { default: '#121212', paper: '#121212' },
    text: { primary: '#fff', secondary: 'rgba(255, 255, 255, 0.7)' },
  },
  cssVariables: false,
});

/**
 * Storybook meta configuration for the Box layout component.
 *
 * Box is a theme-aware container and spacing layout wrapper component that
 * wraps MUI's Box with ref forwarding. It supports the full MUI sx prop system
 * for theme-token-based inline styling, polymorphic rendering via the component
 * prop, and all standard HTML div attributes.
 *
 * Every story renders within the library's ThemeProvider to ensure consistent
 * themed rendering with design tokens applied.
 */
const meta = {
  title: 'Layout/Box',
  component: Box,
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
          'Box is a theme-aware container and spacing layout wrapper component. It wraps MUI Box with ref forwarding and supports the full sx prop system for theme-token-based inline styling. Box also supports polymorphic rendering via the component prop, allowing it to render as any valid HTML element or React component while maintaining access to theme tokens through the sx prop.',
      },
    },
  },
  argTypes: {
    component: {
      control: 'text',
      description:
        'The root element type for polymorphic rendering. Defaults to div but can be set to any valid HTML element (e.g., section, article, main) or React component.',
    },
    sx: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Box rendering with basic padding and themed background.
 * Demonstrates the simplest use case of Box as a themed container
 * with sx prop styling.
 */
export const Default: Story = {
  args: {
    sx: { p: 2, bgcolor: 'background.paper' },
    children: 'Box Content',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default Box usage with basic padding and themed background color. Box renders as a div element with theme-aware sx prop styling, providing a simple themed container for content.',
      },
    },
  },
};

/**
 * Multiple Box instances demonstrating different sx prop configurations
 * including padding, background color, borders, display modes, and
 * border-radius — all using theme tokens.
 */
export const WithSxProp: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          borderRadius: 1,
        }}
      >
        Primary Background
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'secondary.light',
          color: 'secondary.contrastText',
          borderRadius: 1,
        }}
      >
        Secondary Background
      </Box>
      <Box
        sx={{
          p: 2,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        Bordered
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 120,
          height: 60,
          borderRadius: 1,
        }}
      >
        Flex Center
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates multiple sx prop configurations side by side — themed background colors (primary.light, secondary.light), borders via borderColor with the divider token, flex display centering, and consistent borderRadius from the shape token system.',
      },
    },
  },
};

/**
 * Box rendered as a semantic HTML section element via the component prop.
 * Demonstrates polymorphic rendering where Box changes its root element
 * while retaining full sx prop and theme token support.
 */
export const AsSection: Story = {
  args: {
    component: 'section',
    sx: { p: 3, bgcolor: 'grey.100', borderRadius: 1 },
    children: 'Section Content',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Box with component="section" for semantic HTML rendering. The polymorphic component prop allows Box to render as any valid HTML element (section, article, main, nav, etc.) while maintaining full access to theme tokens and the sx prop system.',
      },
    },
  },
};

/**
 * Nested Box components demonstrating layout composition with flex display.
 * The outer Box acts as a flex container with inner Boxes using different
 * themed background colors and padding values.
 */
export const NestedBoxes: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 3,
        bgcolor: 'grey.50',
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 2,
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Column 1
      </Box>
      <Box
        sx={{
          flex: 1,
          p: 2,
          bgcolor: 'secondary.light',
          color: 'secondary.contrastText',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Column 2
      </Box>
      <Box
        sx={{
          flex: 1,
          p: 2,
          bgcolor: 'info.light',
          color: 'info.contrastText',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Column 3
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Nested Box composition demonstrating flex layout. The outer Box acts as a flex container (display: flex, gap: 2), while inner Boxes use theme color tokens (primary.light, secondary.light, info.light) for backgrounds and borderRadius from the shape token system.',
      },
    },
  },
};

/**
 * Box rendered in dark mode using a story-level ThemeProvider decorator
 * override. The dark theme inverts background and text colors, demonstrating
 * how Box adapts to theme mode changes through semantic token references.
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
      <Box
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderRadius: 1,
        }}
      >
        Paper Surface
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.dark',
          color: 'primary.contrastText',
          borderRadius: 1,
        }}
      >
        Primary Dark
      </Box>
      <Box
        sx={{
          p: 2,
          border: 1,
          borderColor: 'divider',
          color: 'text.secondary',
          borderRadius: 1,
        }}
      >
        Bordered in Dark
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Box rendered in dark mode via a story-level ThemeProvider decorator using createCustomTheme with palette mode set to dark. Demonstrates how semantic tokens (background.paper, text.primary, primary.dark, divider) automatically adapt to the dark color scheme.',
      },
    },
  },
};

/**
 * Realistic card-like layout composition built entirely with Box components.
 * Demonstrates Box as a versatile container for structured layouts with
 * header, content, and footer sections — all styled exclusively with theme
 * tokens via the sx prop.
 */
export const FullExample: Story = {
  render: () => (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 3,
        maxWidth: 400,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Box sx={{ typography: 'h6', fontWeight: 500 }}>Team Dashboard</Box>
        <Box sx={{ typography: 'caption', opacity: 0.85 }}>
          Project management overview
        </Box>
      </Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ typography: 'body2', color: 'text.secondary', pb: 2 }}>
          This card-like layout is composed entirely from Box components using
          the sx prop with theme tokens. The header uses primary.main for its
          background, the content area uses standard padding with text.secondary
          for body copy, and the footer is separated by a divider border.
        </Box>
        <Stack direction="row" spacing={1}>
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              bgcolor: 'success.light',
              color: 'success.contrastText',
              borderRadius: 1,
              typography: 'caption',
            }}
          >
            Active
          </Box>
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              bgcolor: 'warning.light',
              color: 'warning.contrastText',
              borderRadius: 1,
              typography: 'caption',
            }}
          >
            In Review
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
          Updated: February 2025
        </Box>
        <Box sx={{ typography: 'caption', color: 'primary.main' }}>
          View Details
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Realistic card-like layout composed entirely from Box components. Features a primary-colored header with title and subtitle, a content body with descriptive text and status tags, and a divider-separated footer — all styled exclusively with theme tokens via the sx prop. Demonstrates Box as a versatile building block for structured UI compositions.',
      },
    },
  },
};
