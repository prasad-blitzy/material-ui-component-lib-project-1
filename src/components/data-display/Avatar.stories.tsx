import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { Typography } from './Typography';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark palette mode
 * and explicit background/text colors for reliable dark rendering.
 * Defined at module level to avoid re-creation on each render.
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
 * Storybook meta configuration for the Avatar data-display component.
 *
 * Avatar is a themed wrapper around MUI Avatar that supports three display
 * modes: image avatar (via `src` + `alt`), letter avatar (text `children`),
 * and icon avatar (icon element as `children`). It provides circular,
 * rounded, and square shape variants, theme-aware sizing via the `sx` prop,
 * and full prop forwarding to the underlying MUI primitive.
 *
 * Every story renders within the library's ThemeProvider to ensure
 * consistent themed rendering with design tokens applied.
 */
const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    src: {
      control: 'text',
      description: 'The image source URL for an image avatar.',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image, used for accessibility.',
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
      description: 'The shape variant of the avatar: circular (default), rounded, or square.',
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
          'Avatar renders a themed avatar element supporting image, letter, and icon display modes. ' +
          'It wraps MUI Avatar with the library\'s theme system, providing circular, rounded, and square ' +
          'shape variants with theme-aware sizing via the sx prop. All MUI Avatar props are forwarded, ' +
          'including src, alt, variant, children, imgProps, sizes, and slotProps.',
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default letter avatar displaying initials.
 * Use the controls panel to interactively change src, alt, and variant props.
 */
export const Default: Story = {
  args: {
    children: 'AB',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default letter avatar displaying initials. The avatar uses the theme\'s default background color.',
      },
    },
  },
};

/**
 * Avatar with an image source loaded from an external URL.
 * Demonstrates the image avatar mode using `src` and `alt` props.
 */
export const ImageAvatar: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User Avatar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with an image source. When a valid `src` is provided, the avatar renders the image.',
      },
    },
  },
};

/**
 * Letter avatars with themed background colors.
 * Demonstrates using the `sx` prop to apply palette colors as backgrounds.
 */
export const LetterAvatar: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
      <Avatar sx={{ bgcolor: 'secondary.main' }}>MK</Avatar>
      <Avatar sx={{ bgcolor: 'error.main' }}>TS</Avatar>
      <Avatar sx={{ bgcolor: 'success.main' }}>RW</Avatar>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Letter avatars with themed background colors applied via the sx prop using palette tokens.',
      },
    },
  },
};

/**
 * Avatar shape variants: circular, rounded, and square.
 * Demonstrates all three variant options available on the Avatar component.
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['circular', 'rounded', 'square'] as const).map((variant) => (
        <Avatar key={variant} variant={variant}>
          AB
        </Avatar>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar shape variants: circular (default), rounded, and square.',
      },
    },
  },
};

/**
 * Avatars at different sizes using the sx prop.
 * Shows small (24×24), medium (40×40 default), large (56×56), and extra-large (80×80).
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>S</Avatar>
      <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
      <Avatar sx={{ width: 56, height: 56 }}>L</Avatar>
      <Avatar sx={{ width: 80, height: 80, fontSize: '2rem' }}>XL</Avatar>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars at different sizes using the sx prop: small (24px), medium (40px default), large (56px), and extra-large (80px).',
      },
    },
  },
};

/**
 * Avatars rendered in dark mode theme context.
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
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
      <Avatar sx={{ bgcolor: 'secondary.main' }}>MK</Avatar>
      <Avatar variant="rounded" sx={{ bgcolor: 'error.main' }}>TS</Avatar>
      <Avatar variant="square" sx={{ bgcolor: 'success.main' }}>RW</Avatar>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars rendered in dark mode theme context with themed background colors.',
      },
    },
  },
};

/**
 * Realistic user list with avatars, names, and role descriptions.
 * Composes Avatar with Typography and layout primitives to demonstrate
 * a production-ready user list pattern.
 */
export const FullExample: Story = {
  render: () => (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
        <Box>
          <Typography variant="body1">Jane Doe</Typography>
          <Typography variant="caption" color="text.secondary">
            Product Designer
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'secondary.main' }}>MK</Avatar>
        <Box>
          <Typography variant="body1">Michael Kim</Typography>
          <Typography variant="caption" color="text.secondary">
            Senior Engineer
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'error.main' }}>TS</Avatar>
        <Box>
          <Typography variant="body1">Tara Singh</Typography>
          <Typography variant="caption" color="text.secondary">
            Engineering Manager
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'success.main' }}>RW</Avatar>
        <Box>
          <Typography variant="body1">Rachel Wu</Typography>
          <Typography variant="caption" color="text.secondary">
            Data Analyst
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'warning.main' }}>AL</Avatar>
        <Box>
          <Typography variant="body1">Alex Lopez</Typography>
          <Typography variant="caption" color="text.secondary">
            QA Lead
          </Typography>
        </Box>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Realistic user list with avatars, names, and role descriptions using themed palette colors.',
      },
    },
  },
};
