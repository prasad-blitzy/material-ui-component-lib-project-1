import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Switch } from './Switch';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { Typography } from '../data-display/Typography';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark color scheme
 * with explicit dark palette values and cssVariables disabled.
 * Since the library's default theme uses cssVariables: true, this override
 * ensures the nested ThemeProvider uses traditional Emotion-based theming
 * with dark background (#121212) and light text (#fff) values.
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
 * Storybook meta configuration for the Switch core component.
 *
 * Switch is a Pattern B — Conditional Label wrapper around MUI Switch.
 * When a `label` prop is provided, the component wraps in MUI's
 * FormControlLabel to render an accessible labeled toggle. When no label
 * is provided, a bare MUI Switch is rendered. The `labelPlacement` prop
 * controls label positioning relative to the toggle (end, start, top,
 * bottom). All standard MUI Switch props (checked, onChange, color, size,
 * disabled, defaultChecked) are forwarded transparently.
 *
 * Every story renders within the library's ThemeProvider to ensure
 * consistent themed rendering with design tokens applied.
 */
const meta = {
  title: 'Core/Switch',
  component: Switch,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'When true, the switch is in the on state.',
    },
    label: {
      control: 'text',
      description:
        'Optional label text. When provided, the switch is wrapped in a FormControlLabel for accessible labeling.',
    },
    labelPlacement: {
      control: 'select',
      options: ['end', 'start', 'top', 'bottom'],
      description:
        'Position of the label relative to the switch control. Only applies when the label prop is provided.',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
        'default',
      ],
      description: 'The color theme applied to the switch.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the switch toggle. Affects overall dimensions.',
    },
    disabled: {
      control: 'boolean',
      description:
        'When true, the switch is disabled and prevents user interaction.',
    },
    onChange: {
      action: 'changed',
      description:
        'Callback fired when the switch toggle state changes. Receives the change event and the new checked boolean.',
    },
    sx: {
      table: { disable: true },
    },
  },
  args: {
    onChange: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Switch is a themed toggle component wrapping MUI Switch with optional FormControlLabel integration. ' +
          'When a `label` prop is provided, the switch is automatically wrapped in a FormControlLabel for accessible labeling. ' +
          'Without a label, the bare switch toggle is rendered. All MUI Switch props (checked, onChange, color, size, disabled) are forwarded transparently.',
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default switch toggle without a label (Pattern B bare mode).
 * The bare switch renders as a standalone MUI Switch without
 * FormControlLabel wrapping.
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default switch toggle without a label.',
      },
    },
  },
};

/**
 * Switch with a label rendered via FormControlLabel wrapping.
 * Providing the `label` prop triggers the Pattern B conditional
 * wrapping behavior, producing an accessible labeled toggle control.
 */
export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Switch with a label rendered via FormControlLabel wrapping.',
      },
    },
  },
};

/**
 * Demonstrates all four label placement options (end, start, top, bottom).
 * Each switch is labeled to indicate its placement configuration.
 */
export const LabelPlacements: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      {(['end', 'start', 'top', 'bottom'] as const).map((placement) => (
        <Switch
          key={placement}
          label={placement}
          labelPlacement={placement}
          defaultChecked
          onChange={fn()}
        />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All label placement options: end, start, top, and bottom.',
      },
    },
  },
};

/**
 * Displays switches in all available color options. Each switch is
 * defaultChecked to reveal the active track and thumb color for each
 * theme palette entry.
 */
export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(
        [
          'primary',
          'secondary',
          'error',
          'warning',
          'info',
          'success',
          'default',
        ] as const
      ).map((color) => (
        <Switch
          key={color}
          color={color}
          label={color}
          defaultChecked
          onChange={fn()}
        />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch in all available color options.',
      },
    },
  },
};

/**
 * Small and medium size Switch options displayed side by side.
 * Each switch is defaultChecked and labeled with its size name.
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['small', 'medium'] as const).map((size) => (
        <Switch
          key={size}
          size={size}
          label={size}
          defaultChecked
          onChange={fn()}
        />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Small and medium size Switch options.',
      },
    },
  },
};

/**
 * Disabled switch in both on and off states. The disabled attribute
 * prevents user interaction while visually indicating the inactive state.
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Switch label="Disabled on" disabled defaultChecked onChange={fn()} />
      <Switch label="Disabled off" disabled onChange={fn()} />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled switch in both on and off states.',
      },
    },
  },
};

/**
 * Switch rendered with the dark theme. Uses a story-level decorator that
 * overrides the global ThemeProvider with a dark theme created via
 * createCustomTheme, wrapped in a dark background container.
 */
export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{ p: 3, bgcolor: 'background.default', minHeight: '100px' }}
        >
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  render: () => (
    <Stack direction="column" spacing={1}>
      <Switch label="Dark mode switch" defaultChecked onChange={fn()} />
      <Switch label="Notifications" onChange={fn()} />
      <Switch label="Auto-save" defaultChecked color="secondary" onChange={fn()} />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch rendered with the dark theme.',
      },
    },
  },
};

/**
 * A controlled Switch with dynamic label showing current toggle state.
 * Uses React useState inside the render function to demonstrate real-time
 * interactive toggling with label text that updates on every state change.
 */
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        label={checked ? 'Enabled' : 'Disabled'}
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A controlled Switch with dynamic label showing current toggle state.',
      },
    },
  },
};

/**
 * A preferences panel with multiple toggle switches. Demonstrates a
 * realistic composed use case with multiple labeled switches arranged
 * in a vertical stack within a themed container.
 */
export const FullExample: Story = {
  render: () => (
    <Box
      sx={{
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 1,
        maxWidth: 400,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Preferences
      </Typography>
      <Stack direction="column" spacing={1}>
        <Switch
          label="Email notifications"
          defaultChecked
          onChange={fn()}
        />
        <Switch
          label="Push notifications"
          defaultChecked
          onChange={fn()}
        />
        <Switch label="Dark mode" onChange={fn()} />
        <Switch
          label="Auto-update"
          defaultChecked
          color="secondary"
          onChange={fn()}
        />
        <Switch label="Show preview" onChange={fn()} />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A preferences panel with multiple toggle switches.',
      },
    },
  },
};
