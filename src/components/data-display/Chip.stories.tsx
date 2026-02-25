import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Chip } from './Chip';
import { Avatar } from './Avatar';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark palette mode
 * and explicit background/text colors for reliable dark rendering.
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
 * Storybook meta configuration for the Chip data-display component.
 *
 * The Chip component is a themed wrapper around MUI Chip that renders
 * compact elements for tags, labels, and actions. It supports filled and
 * outlined variants, seven semantic color options, deletable and clickable
 * states, avatar/icon integration, and two size options (small/medium).
 * All MUI Chip props are forwarded, including onDelete, onClick, icon,
 * avatar, deleteIcon, and sx.
 *
 * Every story renders within the library's ThemeProvider to ensure
 * consistent themed rendering with design tokens applied.
 */
const meta = {
  title: 'Data Display/Chip',
  component: Chip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text content displayed inside the chip.',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'The visual variant of the chip surface: filled (default) or outlined.',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'The semantic color of the chip, applied from the theme palette.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the chip: small or medium (default).',
    },
    clickable: {
      control: 'boolean',
      description: 'If true, the chip appears clickable with hover and ripple effects.',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the chip is disabled with reduced opacity and no interactions.',
    },
    onDelete: {
      action: 'deleted',
      description: 'Callback fired when the delete icon is clicked. When provided, a delete icon is rendered.',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the chip body is clicked.',
    },
    sx: {
      table: { disable: true },
    },
  },
  args: {
    label: 'Chip',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Chip renders a themed compact element for tags, labels, and actions. ' +
          'It supports filled and outlined variants, seven semantic colors from the theme palette, ' +
          'deletable and clickable states, avatar integration, and two size options. ' +
          'The component wraps MUI Chip with the library\'s theme system for consistent design token usage.',
      },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default filled chip with a text label.
 * Use the controls panel to interactively change label, variant, color, and size props.
 */
export const Default: Story = {
  args: {
    label: 'Default Chip',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default filled chip with a text label rendered using the library\'s default theme.',
      },
    },
  },
};

/**
 * Chip visual variants side by side: filled (default) and outlined.
 * Filled chips have a solid background, while outlined chips have a transparent
 * background with a visible border.
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip label="Filled" variant="filled" />
      <Chip label="Outlined" variant="outlined" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chip visual variants side by side: filled (solid background) and outlined (transparent background with border).',
      },
    },
  },
};

/**
 * All seven theme color options rendered as filled chips.
 * Colors are derived from the library's design token palette.
 */
export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'wrap' }}>
      {(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'] as const).map(
        (color) => (
          <Chip key={color} label={color} color={color} />
        ),
      )}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available theme color options rendered as filled chips: default, primary, secondary, error, info, success, and warning.',
      },
    },
  },
};

/**
 * Chip with a delete icon and onDelete callback.
 * When onDelete is provided, MUI renders a close/delete icon button at the end of the chip.
 */
export const Deletable: Story = {
  args: {
    label: 'Deletable',
    onDelete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip with a delete icon button. The onDelete callback is logged to the Storybook actions panel when clicked.',
      },
    },
  },
};

/**
 * Clickable chip with hover and ripple interactions.
 * The clickable prop enables visual feedback (elevation, ripple) on click.
 */
export const Clickable: Story = {
  args: {
    label: 'Clickable',
    clickable: true,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Clickable chip with hover elevation and ripple effect. The onClick callback is logged to the Storybook actions panel.',
      },
    },
  },
};

/**
 * Chip with an Avatar element demonstrating icon/avatar integration.
 * Since MUI icons cannot be imported directly per library rules, the Avatar
 * component from the library is used with letter content.
 */
export const WithIcon: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip label="With Avatar" avatar={<Avatar>M</Avatar>} />
      <Chip
        label="Colored Avatar"
        avatar={<Avatar sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>A</Avatar>}
      />
      <Chip
        label="Deletable with Avatar"
        avatar={<Avatar>D</Avatar>}
        onDelete={fn()}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chip variants with Avatar elements demonstrating icon/avatar integration using the library\'s Avatar component.',
      },
    },
  },
};

/**
 * Chip size variants: small and medium rendered side by side.
 * Small chips have reduced height and font size for compact layouts.
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip label="Small" size="small" />
      <Chip label="Medium" size="medium" />
      <Chip label="Small Outlined" size="small" variant="outlined" />
      <Chip label="Medium Outlined" size="medium" variant="outlined" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chip size variants side by side: small (compact) and medium (default) in both filled and outlined variants.',
      },
    },
  },
};

/**
 * Disabled chip with reduced opacity and no interactive behavior.
 * Both click and delete actions are suppressed in the disabled state.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled chip rendered with reduced opacity. All click and delete interactions are suppressed.',
      },
    },
  },
};

/**
 * Chips rendered within the library's dark theme context.
 * The story-level decorator overrides the global ThemeProvider with a dark
 * theme instance to demonstrate chip rendering on dark backgrounds.
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
    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'wrap' }}>
      <Chip label="Default" color="default" />
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Error" color="error" onDelete={fn()} />
      <Chip label="Info" color="info" variant="outlined" />
      <Chip label="Success" color="success" clickable onClick={fn()} />
      <Chip label="Warning" color="warning" variant="outlined" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chips rendered in a dark mode theme context showing all seven colors with mixed variants, delete actions, and clickable states.',
      },
    },
  },
};

/**
 * Realistic filter tag bar composing deletable and clickable chips.
 * Demonstrates a practical use case with technology-themed filter tags
 * where active filters are deletable and suggested tags are clickable.
 */
export const FullExample: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        <Chip label="React" color="primary" onDelete={fn()} />
        <Chip label="TypeScript" color="secondary" onDelete={fn()} />
        <Chip label="Material UI" color="info" onDelete={fn()} />
        <Chip label="Storybook" variant="outlined" clickable onClick={fn()} />
        <Chip label="Vite" variant="outlined" clickable onClick={fn()} />
        <Chip label="ESLint" variant="outlined" clickable onClick={fn()} />
        <Chip
          label="Design Tokens"
          color="success"
          avatar={<Avatar>D</Avatar>}
          onDelete={fn()}
        />
        <Chip label="Disabled Tag" disabled variant="outlined" />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Realistic filter tag bar with deletable active filters, clickable suggested tags, avatar-enhanced chips, and a disabled tag.',
      },
    },
  },
};
