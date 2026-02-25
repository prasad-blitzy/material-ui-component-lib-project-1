import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { TextField } from './TextField';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
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
 * Storybook meta configuration for the TextField core component.
 *
 * TextField is a Pattern A — Simple Forward wrapper around MUI TextField.
 * It forwards all MUI TextField props (variant, label, helperText, error,
 * size, fullWidth, disabled, required, multiline, type, placeholder) and
 * ref to the underlying primitive via React.forwardRef<HTMLDivElement>.
 * All visual styling flows through the MUI ThemeProvider context.
 */
const meta = {
  title: 'Core/TextField',
  component: TextField,
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
          'A themed text field component wrapping MUI TextField with full prop forwarding. Supports outlined, filled, and standard variants with label, helper text, error state, and all standard MUI TextField capabilities.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select' as const,
      options: ['outlined', 'filled', 'standard'],
    },
    label: { control: 'text' as const },
    placeholder: { control: 'text' as const },
    helperText: { control: 'text' as const },
    error: { control: 'boolean' as const },
    disabled: { control: 'boolean' as const },
    required: { control: 'boolean' as const },
    fullWidth: { control: 'boolean' as const },
    multiline: { control: 'boolean' as const },
    size: {
      control: 'select' as const,
      options: ['small', 'medium'],
    },
    type: {
      control: 'select' as const,
      options: ['text', 'password', 'number', 'email'],
    },
    onChange: { action: 'changed' },
    sx: { table: { disable: true } },
  },
  args: {
    label: 'Label',
    variant: 'outlined' as const,
    onChange: fn(),
  },
} satisfies Meta;

export default meta;

/**
 * Story type derived from the meta configuration.
 *
 * Uses Meta (without a component generic) because TextFieldProps is a
 * discriminated union type (MUITextFieldProps) across outlined, filled,
 * and standard variants. This union causes StoryObj<Meta<typeof TextField>>
 * to resolve args to `never`. The unparameterised Meta produces a
 * permissive Story type while still rendering the correct component.
 */
type Story = StoryObj<typeof meta>;

/**
 * Default outlined text field with a label.
 * Renders the TextField in its default outlined variant with interactive
 * Storybook controls for exploring all available props.
 */
export const Default: Story = {
  args: {
    label: 'Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default outlined text field with a label.',
      },
    },
  },
};

/**
 * All three TextField variants rendered side by side.
 * Demonstrates the visual differences between outlined, filled,
 * and standard variants of the TextField component.
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['outlined', 'filled', 'standard'] as const).map((variant) => (
        <TextField
          key={variant}
          variant={variant}
          label={variant}
          onChange={fn()}
        />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All three TextField variants: outlined, filled, and standard.',
      },
    },
  },
};

/**
 * TextField with helper text displayed below the input.
 * Shows how supplementary guidance text appears beneath the field
 * to assist users in completing the form correctly.
 */
export const WithHelperText: Story = {
  args: {
    label: 'Email',
    helperText: 'Enter your email address',
    placeholder: 'user@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'TextField with helper text displayed below the input.',
      },
    },
  },
};

/**
 * TextField in error state with error helper text.
 * Demonstrates the visual error treatment with red border
 * and error-colored helper text for form validation feedback.
 */
export const ErrorState: Story = {
  args: {
    label: 'Email',
    error: true,
    helperText: 'Invalid email address',
  },
  parameters: {
    docs: {
      description: {
        story: 'TextField in error state with error helper text.',
      },
    },
  },
};

/**
 * Disabled TextFields across all three variants.
 * Demonstrates the disabled visual treatment and interaction lock
 * for outlined, filled, and standard variants.
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['outlined', 'filled', 'standard'] as const).map((variant) => (
        <TextField
          key={variant}
          variant={variant}
          label={variant}
          disabled
          onChange={fn()}
        />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state across all TextField variants.',
      },
    },
  },
};

/**
 * Small and medium size TextField options rendered side by side.
 * Demonstrates the two available size variants for the TextField
 * component and their impact on input field height and spacing.
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['small', 'medium'] as const).map((size) => (
        <TextField
          key={size}
          size={size}
          label={size}
          onChange={fn()}
        />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Small and medium size TextField options.',
      },
    },
  },
};

/**
 * TextField rendered with the dark theme decorator.
 * Overrides the global ThemeProvider with a dark palette to verify
 * correct visual rendering of all three variants in dark mode.
 */
export const DarkMode: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['outlined', 'filled', 'standard'] as const).map((variant) => (
        <TextField
          key={variant}
          variant={variant}
          label={variant}
          onChange={fn()}
        />
      ))}
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
        story: 'TextField rendered with the dark theme.',
      },
    },
  },
};

/**
 * Controlled TextField demonstrating interactive state management.
 * Uses React useState inside the render function for real-time input
 * tracking with a character count displayed as dynamic helper text.
 */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TextField
        label="Type here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText={`${value.length} characters`}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A controlled TextField demonstrating interactive state management with useState.',
      },
    },
  },
};

/**
 * A realistic login form composed of multiple TextFields.
 * Demonstrates real-world composition of TextField components in a
 * themed surface with email and password inputs arranged vertically.
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
      <Stack direction="column" spacing={2}>
        <TextField
          label="Email"
          type="email"
          placeholder="user@example.com"
          helperText="Enter your registered email"
          onChange={fn()}
        />
        <TextField
          label="Password"
          type="password"
          helperText="Must be at least 8 characters"
          onChange={fn()}
        />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A login form composed of multiple TextFields.',
      },
    },
  },
};
