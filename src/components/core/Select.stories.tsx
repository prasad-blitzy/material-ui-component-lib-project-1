import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Select, MenuItem } from './Select';
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
 * Storybook meta configuration for the Select core component.
 *
 * Select is a Pattern A — Simple Forward wrapper around MUI Select.
 * It forwards all MUI Select props and ref to the underlying primitive.
 * The component re-exports MenuItem and MenuItemProps as companion
 * items required for building dropdown option lists. All three
 * variants (outlined, filled, standard) are supported and all MUI
 * Select capabilities (value, onChange, multiple, displayEmpty, label,
 * error, disabled, fullWidth, size) are forwarded unchanged.
 */
const meta = {
  title: 'Core/Select',
  component: Select,
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
          'A themed Select dropdown component wrapping MUI Select with MenuItem composition. Supports outlined, filled, and standard variants with full MUI Select prop forwarding including controlled/uncontrolled modes, multiple selection, and error states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select' as const,
      options: ['outlined', 'filled', 'standard'],
    },
    label: { control: 'text' as const },
    disabled: { control: 'boolean' as const },
    error: { control: 'boolean' as const },
    fullWidth: { control: 'boolean' as const },
    size: {
      control: 'select' as const,
      options: ['small', 'medium'],
    },
    multiple: { control: 'boolean' as const },
    displayEmpty: { control: 'boolean' as const },
    onChange: { action: 'changed' },
    sx: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    variant: 'outlined',
    onChange: fn(),
  },
} satisfies Meta;

export default meta;

/**
 * Story type derived from the meta configuration.
 *
 * Uses Meta (without a component generic) because SelectProps is a
 * discriminated union type (MUISelectProps) across outlined, filled,
 * and standard variants. This union causes StoryObj<Meta<typeof Select>>
 * to resolve args to `never`. The unparameterised Meta produces a
 * permissive Story type while still rendering the correct component.
 */
type Story = StoryObj<typeof meta>;

/**
 * Default Select displaying a placeholder option and three selectable items.
 * Uses displayEmpty to render the placeholder text when no value is selected.
 */
export const Default: Story = {
  render: () => (
    <Select value="" displayEmpty onChange={fn()} sx={{ minWidth: 200 }}>
      <MenuItem value="">Select an option</MenuItem>
      <MenuItem value="option1">Option 1</MenuItem>
      <MenuItem value="option2">Option 2</MenuItem>
      <MenuItem value="option3">Option 3</MenuItem>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default Select with placeholder and three options.',
      },
    },
  },
};

/**
 * All three Select variants rendered side-by-side: outlined (default),
 * filled, and standard. Each variant displays the same set of MenuItem
 * options with a consistent minimum width for visual comparison.
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['outlined', 'filled', 'standard'] as const).map((variant) => (
        <Select
          key={variant}
          variant={variant}
          value=""
          displayEmpty
          onChange={fn()}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">{variant}</MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
        </Select>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All three Select variants: outlined, filled, and standard.',
      },
    },
  },
};

/**
 * Select with the label prop set to demonstrate the notched outline label.
 * The label prop controls the text displayed in the outlined variant's
 * notched border area, providing a visual label for the dropdown field.
 */
export const WithLabel: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Select
        label="Category"
        value=""
        displayEmpty
        onChange={fn()}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="electronics">Electronics</MenuItem>
        <MenuItem value="clothing">Clothing</MenuItem>
        <MenuItem value="books">Books</MenuItem>
      </Select>
      <Select
        label="Status"
        variant="filled"
        value=""
        displayEmpty
        onChange={fn()}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">All Statuses</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
      </Select>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select with a label for the dropdown field.',
      },
    },
  },
};

/**
 * Select in disabled state preventing any user interaction.
 * Demonstrates the visual treatment when the dropdown is locked
 * in both empty and pre-selected states.
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Select
        value=""
        displayEmpty
        disabled
        onChange={fn()}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">No selection</MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
      </Select>
      <Select
        value="option1"
        disabled
        onChange={fn()}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="option1">Pre-selected</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
      </Select>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Select in disabled state preventing user interaction.',
      },
    },
  },
};

/**
 * Select displaying an error state with the red error indicator.
 * Demonstrates the visual error treatment on the Select border
 * to signal validation failures.
 */
export const ErrorState: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Select
        value=""
        displayEmpty
        error
        onChange={fn()}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">Required field</MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
      </Select>
      <Select
        variant="filled"
        value=""
        displayEmpty
        error
        onChange={fn()}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">Filled error</MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
      </Select>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select displaying an error state.',
      },
    },
  },
};

/**
 * Select rendered with the dark theme decorator.
 * Overrides the global ThemeProvider with a dark palette to verify
 * correct visual rendering in dark mode, including dropdown contrast
 * and MenuItem visibility.
 */
export const DarkMode: Story = {
  render: () => (
    <Stack direction="column" spacing={2}>
      <Select
        value=""
        displayEmpty
        onChange={fn()}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
      <Select
        variant="filled"
        value="option2"
        onChange={fn()}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
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
        story: 'Select rendered with the dark theme.',
      },
    },
  },
};

/**
 * A controlled Select demonstrating interactive state management with
 * useState. The selected value updates in real time as the user picks
 * a different option from the dropdown.
 */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        value={value}
        onChange={(e) => setValue(String(e.target.value))}
        displayEmpty
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">Select a fruit</MenuItem>
        <MenuItem value="apple">Apple</MenuItem>
        <MenuItem value="banana">Banana</MenuItem>
        <MenuItem value="cherry">Cherry</MenuItem>
        <MenuItem value="mango">Mango</MenuItem>
      </Select>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A controlled Select demonstrating interactive state management with useState.',
      },
    },
  },
};

/**
 * A realistic filter form composition with multiple Select dropdowns
 * arranged in a vertical stack inside a themed paper surface. Each
 * dropdown provides meaningful domain-specific options for a typical
 * data filtering use case.
 */
export const FullExample: Story = {
  render: () => {
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    return (
      <Box
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 1,
          maxWidth: 400,
        }}
      >
        <Stack direction="column" spacing={2}>
          <Select
            value={category}
            onChange={(e) => setCategory(String(e.target.value))}
            displayEmpty
            sx={{ minWidth: 300 }}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
            <MenuItem value="books">Books</MenuItem>
            <MenuItem value="home">Home &amp; Garden</MenuItem>
          </Select>
          <Select
            value={status}
            onChange={(e) => setStatus(String(e.target.value))}
            displayEmpty
            sx={{ minWidth: 300 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </Select>
          <Select
            value={priority}
            onChange={(e) => setPriority(String(e.target.value))}
            displayEmpty
            sx={{ minWidth: 300 }}
          >
            <MenuItem value="">All Priorities</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A filter form with multiple Select dropdowns for filtering data.',
      },
    },
  },
};
