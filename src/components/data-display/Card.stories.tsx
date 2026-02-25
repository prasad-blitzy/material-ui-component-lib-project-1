import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
} from './Card';
import { Button } from '../core/Button';
import { Typography } from './Typography';
import { Box } from '../layout/Box';
import { Stack } from '../layout/Stack';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

// ---------------------------------------------------------------------------
// Dark Theme
// ---------------------------------------------------------------------------
// Pre-built dark theme instance for the DarkMode story decorator.
// Uses the library's createCustomTheme factory with dark palette mode.
// ---------------------------------------------------------------------------

const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

// ---------------------------------------------------------------------------
// Meta Configuration
// ---------------------------------------------------------------------------

const meta = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered' as const,
    docs: {
      description: {
        component:
          'A themed surface container component with sub-components (CardHeader, CardContent, CardActions, CardMedia) for grouping related content and actions. Supports elevation and outlined variants with consistent theming and ref forwarding.',
      },
    },
  },
  argTypes: {
    raised: {
      control: 'boolean',
    },
    variant: {
      control: 'select' as const,
      options: ['elevation', 'outlined'],
    },
    sx: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default Story
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {},
  render: (args) => (
    <Card {...args} sx={(theme) => ({ maxWidth: theme.spacing(43) })}>
      <CardHeader title="Card Title" subheader="Card Subtitle" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This is a basic card with header and content sections demonstrating
          the compound component composition pattern.
        </Typography>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default Card with header and content sub-components.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// WithMedia Story
// ---------------------------------------------------------------------------

export const WithMedia: Story = {
  render: () => (
    <Card sx={(theme) => ({ maxWidth: theme.spacing(43) })}>
      <CardMedia
        component="div"
        sx={{
          height: 140,
          bgcolor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" sx={{ color: 'primary.contrastText' }}>
          Media Area
        </Typography>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Card with Media
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card demonstrates the CardMedia sub-component for displaying
          images, videos, or placeholder media content.
        </Typography>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with a media area using the CardMedia sub-component.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Raised Story
// ---------------------------------------------------------------------------

export const Raised: Story = {
  args: { raised: true },
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Card sx={(theme) => ({ maxWidth: theme.spacing(43) })}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Default Card
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Standard elevation for comparison.
          </Typography>
        </CardContent>
      </Card>
      <Card {...args} sx={(theme) => ({ maxWidth: theme.spacing(43) })}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Raised Card
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A raised card with increased elevation shadow for visual emphasis.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Raised card with increased elevation for visual emphasis.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// OutlinedVariant Story
// ---------------------------------------------------------------------------

export const OutlinedVariant: Story = {
  args: { variant: 'outlined' },
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Card sx={(theme) => ({ maxWidth: theme.spacing(43) })}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Elevation Card
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Default elevation variant with shadow.
          </Typography>
        </CardContent>
      </Card>
      <Card {...args} sx={(theme) => ({ maxWidth: theme.spacing(43) })}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Outlined Card
          </Typography>
          <Typography variant="body2" color="text.secondary">
            An outlined card with a visible border instead of elevation shadow.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outlined card variant with a border instead of elevation shadow.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// DarkMode Story
// ---------------------------------------------------------------------------

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
    <Card sx={(theme) => ({ maxWidth: theme.spacing(43) })}>
      <CardHeader
        title="Dark Mode Card"
        subheader="Themed for dark backgrounds"
      />
      <CardMedia
        component="div"
        sx={{
          height: 140,
          bgcolor: 'primary.dark',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" sx={{ color: 'primary.contrastText' }}>
          Media Area
        </Typography>
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This card renders within the dark mode theme context, demonstrating
          how surfaces, text, and media areas adapt to the dark palette.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={fn()}>
          Share
        </Button>
        <Button size="small" variant="contained" onClick={fn()}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card rendered in dark mode theme context.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// FullExample Story — Product Card
// ---------------------------------------------------------------------------

export const FullExample: Story = {
  render: () => (
    <Card sx={(theme) => ({ maxWidth: theme.spacing(43) })}>
      <CardHeader
        title="Premium Headphones"
        subheader="Electronics • Audio"
      />
      <CardMedia
        component="div"
        sx={{
          height: 194,
          bgcolor: 'secondary.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ color: 'secondary.contrastText' }}>
          🎧
        </Typography>
      </CardMedia>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          High-fidelity wireless headphones with active noise cancellation and
          30-hour battery life.
        </Typography>
        <Typography variant="h6" color="primary">
          $299.99
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={fn()}>
          Share
        </Button>
        <Button size="small" variant="contained" onClick={fn()}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Realistic product card with header, media placeholder, content, price, and action buttons.',
      },
    },
  },
};
