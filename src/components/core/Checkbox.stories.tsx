import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
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
 * Storybook meta configuration for the Checkbox core component.
 *
 * Checkbox is a Pattern B — Conditional Label wrapper around MUI Checkbox.
 * When a `label` prop is provided, the component wraps in MUI's
 * FormControlLabel for accessible labeling. Without a label, it renders
 * a bare MUI Checkbox control. All standard MUI Checkbox props (checked,
 * onChange, color, disabled, indeterminate, size, etc.) are forwarded
 * to the underlying MUI primitive.
 */
const meta = {
  title: 'Core/Checkbox',
  component: Checkbox,
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
          'A themed checkbox component with optional FormControlLabel wrapping. When a `label` prop is provided, the checkbox is rendered inside a FormControlLabel for accessible labeling. Without a label, a standalone checkbox control is rendered.',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' as const },
    label: { control: 'text' as const },
    labelPlacement: {
      control: 'select' as const,
      options: ['end', 'start', 'top', 'bottom'],
    },
    color: {
      control: 'select' as const,
      options: [
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
        'default',
      ],
    },
    disabled: { control: 'boolean' as const },
    indeterminate: { control: 'boolean' as const },
    size: {
      control: 'select' as const,
      options: ['small', 'medium'],
    },
    onChange: { action: 'changed' },
    sx: { table: { disable: true } },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default checkbox without a label — Pattern B bare mode.
 * Renders a standalone checkbox control without FormControlLabel wrapping.
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Default checkbox without a label, rendered as a standalone control.',
      },
    },
  },
};

/**
 * Checkbox with a label — triggers FormControlLabel wrapping.
 * Demonstrates Pattern B labeled mode where the checkbox is wrapped
 * in MUI FormControlLabel for accessible labeling.
 */
export const WithLabel: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox with a label rendered via FormControlLabel wrapping.',
      },
    },
  },
};

/**
 * All four label placement options rendered side-by-side.
 * Demonstrates end, start, top, and bottom placements via the
 * labelPlacement prop on Pattern B's FormControlLabel integration.
 */
export const LabelPlacements: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      {(['end', 'start', 'top', 'bottom'] as const).map((placement) => (
        <Checkbox
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
 * Checkboxes rendered in all available color options.
 * Each checkbox is checked to clearly display its assigned theme color.
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
        <Checkbox
          key={color}
          label={color}
          color={color}
          defaultChecked
          onChange={fn()}
        />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox in all available color options.',
      },
    },
  },
};

/**
 * Disabled checkboxes in both unchecked and checked states.
 * Demonstrates the disabled visual treatment and interaction lock.
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Checkbox label="Disabled unchecked" disabled onChange={fn()} />
      <Checkbox
        label="Disabled checked"
        disabled
        defaultChecked
        onChange={fn()}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Disabled checkbox in both checked and unchecked states.',
      },
    },
  },
};

/**
 * Checkbox rendered with the dark theme decorator.
 * Overrides the global ThemeProvider with a dark palette to verify
 * correct visual rendering in dark mode.
 */
export const DarkMode: Story = {
  render: () => (
    <Stack direction="column" spacing={2}>
      <Checkbox
        label="Dark mode checkbox"
        defaultChecked
        onChange={fn()}
      />
      <Checkbox label="Unchecked in dark" onChange={fn()} />
    </Stack>
  ),
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
  parameters: {
    docs: {
      description: {
        story: 'Checkbox rendered with the dark theme.',
      },
    },
  },
};

/**
 * Controlled checkbox with dynamic label showing the current checked state.
 * Uses React useState inside the render function for real-time interactive
 * state management of the checkbox toggle.
 */
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label={checked ? 'Checked' : 'Unchecked'}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A controlled Checkbox with dynamic label showing current checked state.',
      },
    },
  },
};

/**
 * A realistic settings panel composition demonstrating multiple labeled
 * checkboxes arranged in a vertical stack within a themed paper surface.
 * Showcases typical real-world usage of the Checkbox component.
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
      <Stack direction="column" spacing={1}>
        <Checkbox
          label="Enable notifications"
          defaultChecked
          onChange={fn()}
        />
        <Checkbox label="Dark mode" onChange={fn()} />
        <Checkbox label="Auto-save" defaultChecked onChange={fn()} />
        <Checkbox label="Show tooltips" onChange={fn()} />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A settings panel with multiple checkbox options.',
      },
    },
  },
};
