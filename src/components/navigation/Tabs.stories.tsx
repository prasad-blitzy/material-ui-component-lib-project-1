import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Tabs, Tab } from './Tabs';
import { Box } from '../layout/Box';
import { Typography } from '../data-display/Typography';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance for DarkMode story decorator.
 * Uses the library's createCustomTheme factory with dark palette mode
 * and cssVariables disabled for reliable dark background rendering.
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
 * Storybook meta configuration for the Tabs component.
 *
 * Registers the component under the "Navigation/Tabs" title, enables
 * autodocs generation, wraps every story in the library's ThemeProvider,
 * and maps all meaningful Tabs props to interactive Storybook controls.
 *
 * The Tabs component is a compound component composed with the Tab
 * sub-component for individual tab controls within a tablist.
 */
const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
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
          'Tabs provides themed tab-based navigation with controlled value selection. Composed with the Tab sub-component for individual tab controls. Supports standard, scrollable, and full-width variants.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'number',
      description: 'The currently selected tab index or value',
    },
    variant: {
      control: 'select',
      options: ['standard', 'scrollable', 'fullWidth'],
      description: 'Tab layout variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation direction',
    },
    centered: {
      control: 'boolean',
      description: 'Center tabs (standard variant only)',
    },
    indicatorColor: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Color of the active tab indicator',
    },
    textColor: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit'],
      description: 'Text color of tab labels',
    },
    onChange: { action: 'changed' },
    sx: { table: { disable: true } },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default — basic tab navigation with three tabs in standard layout.
 * Uses the default variant and renders three simple labeled tabs.
 */
export const Default: Story = {
  render: (args) => (
    <Tabs {...args} value={0}>
      <Tab label="Tab One" />
      <Tab label="Tab Two" />
      <Tab label="Tab Three" />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic tab navigation with three tabs in standard layout.',
      },
    },
  },
};

/**
 * Variants — demonstrates all three tab layout variants:
 * standard, scrollable, and full-width.
 */
export const Variants: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Standard
        </Typography>
        <Tabs value={0} aria-label="standard variant tabs">
          <Tab label="Tab One" />
          <Tab label="Tab Two" />
          <Tab label="Tab Three" />
        </Tabs>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Scrollable
        </Typography>
        <Tabs
          value={0}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable variant tabs"
        >
          <Tab label="Tab One" />
          <Tab label="Tab Two" />
          <Tab label="Tab Three" />
          <Tab label="Tab Four" />
          <Tab label="Tab Five" />
          <Tab label="Tab Six" />
          <Tab label="Tab Seven" />
          <Tab label="Tab Eight" />
        </Tabs>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Full Width
        </Typography>
        <Tabs value={0} variant="fullWidth" aria-label="full width variant tabs">
          <Tab label="Tab One" />
          <Tab label="Tab Two" />
          <Tab label="Tab Three" />
        </Tabs>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tabs in standard, scrollable, and full-width layout variants.',
      },
    },
  },
};

/**
 * DisabledTab — tab navigation with a disabled tab that cannot be selected.
 */
export const DisabledTab: Story = {
  render: () => (
    <Tabs value={0} aria-label="tabs with disabled tab">
      <Tab label="Active" />
      <Tab label="Disabled Tab" disabled />
      <Tab label="Also Active" />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tab navigation with a disabled tab that cannot be selected.',
      },
    },
  },
};

/**
 * Centered — centered tab alignment for standard variant layout.
 * The centered prop only applies when variant is standard.
 */
export const Centered: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Tabs value={0} centered aria-label="centered tabs">
        <Tab label="Tab One" />
        <Tab label="Tab Two" />
        <Tab label="Tab Three" />
      </Tabs>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Centered tab alignment for standard variant layout.',
      },
    },
  },
};

/**
 * DarkMode — tabs rendered in dark mode with proper theme contrast.
 * Overrides the global ThemeProvider decorator with a dark theme instance.
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
    <Tabs value={0} aria-label="dark mode tabs">
      <Tab label="Tab One" />
      <Tab label="Tab Two" />
      <Tab label="Tab Three" />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs rendered in dark mode with proper theme contrast.',
      },
    },
  },
};

/**
 * Interactive — controlled tabs with React.useState demonstrating
 * real tab switching and content panel display.
 */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    return (
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Tabs value={value} onChange={handleChange} aria-label="interactive tabs">
          <Tab label="Tab One" />
          <Tab label="Tab Two" />
          <Tab label="Tab Three" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {value === 0 && <Typography>Content for Tab One</Typography>}
          {value === 1 && <Typography>Content for Tab Two</Typography>}
          {value === 2 && <Typography>Content for Tab Three</Typography>}
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive tabs with controlled state showing content switching between tab panels.',
      },
    },
  },
};

/**
 * VerticalTabs — vertical tab orientation with side panel content layout.
 * Demonstrates the orientation="vertical" prop with tabs arranged vertically
 * alongside a content area.
 */
export const VerticalTabs: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    return (
      <Box sx={{ display: 'flex', minHeight: 200 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
          aria-label="vertical tabs"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Settings" />
          <Tab label="Profile" />
          <Tab label="Account" />
        </Tabs>
        <Box sx={{ p: 3, flexGrow: 1 }}>
          {value === 0 && (
            <Typography>Manage your application settings and preferences.</Typography>
          )}
          {value === 1 && (
            <Typography>View and edit your user profile information.</Typography>
          )}
          {value === 2 && (
            <Typography>Account security and billing details.</Typography>
          )}
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Vertical tab orientation with side panel content layout.',
      },
    },
  },
};

/**
 * FullExample — complete tabbed content panel with multiple sections
 * demonstrating real-world tab navigation for a product detail view.
 * Uses React.useState for controlled tab switching with realistic
 * domain-appropriate content in each panel.
 */
export const FullExample: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="product detail tabs"
          >
            <Tab label="Overview" />
            <Tab label="Details" />
            <Tab label="Reviews" />
          </Tabs>
        </Box>
        <Box sx={{ p: 3 }}>
          {value === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Product Overview
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                The MUI Component Library provides a comprehensive set of
                pre-built React components with theming, accessibility, and
                responsive design baked in. Ideal for enterprise applications
                and design system implementations.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last updated: January 2025
              </Typography>
            </Box>
          )}
          {value === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Technical Details
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Framework: React 19 with TypeScript 5.9
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Build Tool: Vite 7.3 with ESM output
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Styling: Emotion CSS-in-JS with MUI theme tokens
              </Typography>
              <Typography variant="body2">
                Components: 30 themed wrapper components across 5 categories
              </Typography>
            </Box>
          )}
          {value === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                User Reviews
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Excellent library for rapid prototyping and production-ready UI
                development. The theme system is flexible and well-documented.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                3 reviews from verified users
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete tabbed content panel with multiple sections demonstrating real-world tab navigation.',
      },
    },
  },
};
