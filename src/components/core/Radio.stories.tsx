import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import React from 'react';
import { Radio, RadioGroup } from './Radio';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Uses `cssVariables: false` to bypass MUI v7's CSS variables mode (which
 * requires the `colorSchemes` API for dark mode) and explicit dark-mode
 * background/text values to override the light-mode defaults from colorTokens.
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
 * Storybook meta configuration for the Radio core component.
 *
 * Radio is a Pattern B — Conditional Label wrapper around MUI Radio.
 * When a `label` prop is provided, the component wraps in MUI's
 * FormControlLabel to render an accessible labeled radio button. When no
 * label is provided, a bare MUI Radio is rendered. The `labelPlacement`
 * prop controls label positioning relative to the control (end, start,
 * top, bottom).
 *
 * RadioGroup is a companion component that provides mutual exclusion
 * context — child Radio buttons use the `value` prop for selection.
 *
 * Every story renders within the library's ThemeProvider to ensure
 * consistent themed rendering with design tokens applied.
 */
const meta = {
  title: 'Core/Radio',
  component: Radio,
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
      description: 'When true, the radio button is selected.',
    },
    label: {
      control: 'text',
      description:
        'Optional label text. When provided, the radio is wrapped in a FormControlLabel for accessible labeling.',
    },
    labelPlacement: {
      control: 'select',
      options: ['end', 'start', 'top', 'bottom'],
      description:
        'Position of the label relative to the radio control. Only applies when the label prop is provided.',
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
      description: 'The color theme applied to the radio button.',
    },
    disabled: {
      control: 'boolean',
      description:
        'When true, the radio button is disabled and prevents user interaction.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the radio button.',
    },
    onChange: {
      action: 'changed',
      description:
        'Callback fired when the radio selection changes. Receives the change event.',
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
          'Radio is a themed radio button wrapping MUI Radio with optional FormControlLabel integration and RadioGroup support. ' +
          'When a `label` prop is provided, the radio is automatically wrapped in a FormControlLabel for accessible labeling. ' +
          'Without a label, the bare radio button is rendered. Use RadioGroup to group multiple Radio buttons for mutual exclusion.',
      },
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default radio button without a label (Pattern B bare mode).
 * Renders as a standalone MUI Radio without FormControlLabel wrapping.
 */
export const Default: Story = {
  render: (args) => <Radio {...args} defaultChecked />,
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Default radio button without a label, rendered as a standalone control.',
      },
    },
  },
};

/**
 * Radio buttons with labels inside a RadioGroup for mutual exclusion.
 * Demonstrates the labeled Radio with RadioGroup composition pattern
 * where only one radio in the group can be selected at a time.
 */
export const WithLabel: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <Radio value="option1" label="Option 1" onChange={fn()} />
      <Radio value="option2" label="Option 2" onChange={fn()} />
      <Radio value="option3" label="Option 3" onChange={fn()} />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Radio buttons with labels inside a RadioGroup for mutual exclusion.',
      },
    },
  },
};

/**
 * Demonstrates all four label placement options (end, start, top, bottom).
 * Each radio is labeled to indicate its placement configuration and
 * rendered in its checked state to show the full visual treatment.
 */
export const LabelPlacements: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      {(['end', 'start', 'top', 'bottom'] as const).map((placement) => (
        <Radio
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
 * Displays radio buttons in all available color options. Each radio is
 * defaultChecked to reveal the active fill color for each theme palette
 * entry.
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
        <Radio
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
        story: 'Radio button in all available color options.',
      },
    },
  },
};

/**
 * Disabled radio button in both selected and unselected states.
 * The disabled attribute prevents user interaction while visually
 * indicating the inactive state.
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Radio
        label="Disabled selected"
        disabled
        defaultChecked
        onChange={fn()}
      />
      <Radio label="Disabled unselected" disabled onChange={fn()} />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Disabled radio button in both selected and unselected states.',
      },
    },
  },
};

/**
 * Radio buttons rendered with the dark theme. Uses a story-level decorator
 * that overrides the global ThemeProvider with a dark theme created via
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
    <RadioGroup defaultValue="option1">
      <Radio value="option1" label="Option 1" onChange={fn()} />
      <Radio value="option2" label="Option 2" onChange={fn()} />
      <Radio
        value="option3"
        label="Option 3"
        color="secondary"
        onChange={fn()}
      />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons rendered with the dark theme.',
      },
    },
  },
};

/**
 * A controlled RadioGroup demonstrating interactive selection with useState.
 * Uses React.useState inside the render function to manage the currently
 * selected radio value and displays it below the group.
 */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState('option1');
    return (
      <Stack spacing={1}>
        <RadioGroup
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
        <Box sx={{ color: 'text.secondary' }}>Selected: {value}</Box>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A controlled RadioGroup demonstrating interactive selection with useState.',
      },
    },
  },
};

/**
 * A survey question with radio button answer options. Demonstrates a
 * realistic composed use case with a question heading, RadioGroup, and
 * multiple labeled Radio answer options within a themed container.
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
      <Box sx={{ typography: 'h6', mb: 2 }}>
        How satisfied are you with our service?
      </Box>
      <RadioGroup defaultValue="satisfied" onChange={fn()}>
        <Radio value="very-satisfied" label="Very Satisfied" />
        <Radio value="satisfied" label="Satisfied" />
        <Radio value="neutral" label="Neutral" />
        <Radio value="unsatisfied" label="Unsatisfied" />
      </RadioGroup>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A survey question with radio button answer options.',
      },
    },
  },
};
