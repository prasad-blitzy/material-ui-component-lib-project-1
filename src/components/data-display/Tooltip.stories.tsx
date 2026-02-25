import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../core/Button';
import { IconButton } from '../core/IconButton';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { Typography } from './Typography';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

/**
 * Dark theme instance used by the DarkMode story decorator.
 * Created via the library's createCustomTheme factory with dark palette mode,
 * which inverts background and text colors across all MUI semantic tokens.
 */
const darkTheme = createCustomTheme({ palette: { mode: 'dark' } });

/**
 * Storybook meta configuration for the Tooltip data-display component.
 *
 * The Tooltip component is a themed wrapper around MUI Tooltip that provides
 * informational popups appearing on hover or focus of the child element. It
 * supports directional placement, optional arrow indicators, customizable
 * enter/leave delays, and full WAI-ARIA tooltip pattern compliance. All MUI
 * Tooltip props are forwarded, including controlled open state, event listener
 * toggles, follow cursor mode, and the MUI v7 slots/slotProps API.
 *
 * Every story renders within the library's ThemeProvider to ensure consistent
 * themed rendering with design tokens applied.
 */
const meta = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'The tooltip content displayed in the popup. Accepts a string or ReactNode.',
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Positioning of the tooltip relative to the child element.',
    },
    arrow: {
      control: 'boolean',
      description: 'If true, adds a directional arrow pointing from the tooltip to the trigger element.',
    },
    enterDelay: {
      control: { type: 'number' },
      description: 'Delay in milliseconds before the tooltip appears after hovering.',
    },
    leaveDelay: {
      control: { type: 'number' },
      description: 'Delay in milliseconds before the tooltip disappears after the cursor leaves.',
    },
    followCursor: {
      control: 'boolean',
      description: 'If true, the tooltip follows the cursor position instead of anchoring to the child element.',
    },
    disableInteractive: {
      control: 'boolean',
      description: 'If true, the tooltip does not stay open when the user hovers over the tooltip itself.',
    },
    sx: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    title: 'Tooltip text',
    children: (<Button variant="contained">Hover Me</Button>),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip displays a themed informational popup that appears on hover or focus of the child element. ' +
          'It supports 12 placement directions, optional arrow indicators, configurable enter/leave delays, ' +
          'follow-cursor mode, and controlled open state. The component wraps MUI Tooltip with the library\'s ' +
          'theme system and preserves full WAI-ARIA tooltip pattern compliance including automatic aria-describedby association.',
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Tooltip rendered on hover of a contained button.
 * Use the controls panel to interactively change title, placement, arrow, and delay props.
 */
export const Default: Story = {
  args: {
    title: 'Tooltip text',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="contained">Hover Me</Button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default tooltip appearing on hover over a button. Use the controls panel to explore placement, arrow, and delay props.',
      },
    },
  },
};

/**
 * Demonstrates the four primary placement directions: top, bottom, left, and right.
 * Tooltips are arranged in a cross pattern to visualize each direction clearly.
 */
export const Placements: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 4 }}>
      <Tooltip title="Top" placement="top">
        <Button variant="outlined">Top</Button>
      </Tooltip>
      <Stack direction="row" spacing={4} alignItems="center">
        <Tooltip title="Left" placement="left">
          <Button variant="outlined">Left</Button>
        </Tooltip>
        <Tooltip title="Right" placement="right">
          <Button variant="outlined">Right</Button>
        </Tooltip>
      </Stack>
      <Tooltip title="Bottom" placement="bottom">
        <Button variant="outlined">Bottom</Button>
      </Tooltip>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip placement options: top, bottom, left, and right arranged in a cross pattern for visual comparison.',
      },
    },
  },
};

/**
 * Tooltip rendered with a directional arrow pointing to the trigger element.
 * The arrow visually connects the tooltip popup to the button it describes.
 */
export const Arrow: Story = {
  args: {
    title: 'Arrow tooltip',
    arrow: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Hover for Arrow Tooltip</Button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with a directional arrow pointing to the trigger element for clear visual association.',
      },
    },
  },
};

/**
 * Tooltip rendered within the library's dark theme context.
 * The story-level decorator overrides the global ThemeProvider
 * with a dark palette mode theme created via createCustomTheme.
 */
export const DarkMode: Story = {
  args: {
    title: 'Dark mode tooltip',
    arrow: true,
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="contained">Dark Mode Tooltip</Button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip rendered in dark mode theme context with an arrow indicator on a dark background.',
      },
    },
  },
};

/**
 * Realistic icon toolbar with tooltips on each action button.
 * Demonstrates a practical use case where tooltips provide context for
 * icon-only buttons in a compact toolbar layout.
 */
export const FullExample: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Document Actions
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}
      >
        <Tooltip title="Edit item" arrow>
          <IconButton aria-label="edit">✏️</IconButton>
        </Tooltip>
        <Tooltip title="Delete item" arrow>
          <IconButton aria-label="delete" color="error">🗑️</IconButton>
        </Tooltip>
        <Tooltip title="Share item" arrow>
          <IconButton aria-label="share" color="primary">📤</IconButton>
        </Tooltip>
        <Tooltip title="Bookmark item" arrow>
          <IconButton aria-label="bookmark" color="secondary">🔖</IconButton>
        </Tooltip>
        <Tooltip title="Print item" arrow>
          <IconButton aria-label="print">🖨️</IconButton>
        </Tooltip>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Realistic icon toolbar with tooltips on each action button. Demonstrates the practical use of tooltips for providing context to icon-only interactive elements.',
      },
    },
  },
};

/**
 * Demonstrates start and end placement variations: top-start, top-end,
 * bottom-start, and bottom-end. These fine-grained placements align the
 * tooltip edge with the trigger element edge rather than centering.
 */
export const PlacementVariations: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center" sx={{ p: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title="Top Start" placement="top-start">
          <Button variant="outlined" size="small">Top Start</Button>
        </Tooltip>
        <Tooltip title="Top End" placement="top-end">
          <Button variant="outlined" size="small">Top End</Button>
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title="Bottom Start" placement="bottom-start">
          <Button variant="outlined" size="small">Bottom Start</Button>
        </Tooltip>
        <Tooltip title="Bottom End" placement="bottom-end">
          <Button variant="outlined" size="small">Bottom End</Button>
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title="Left Start" placement="left-start">
          <Button variant="outlined" size="small">Left Start</Button>
        </Tooltip>
        <Tooltip title="Left End" placement="left-end">
          <Button variant="outlined" size="small">Left End</Button>
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title="Right Start" placement="right-start">
          <Button variant="outlined" size="small">Right Start</Button>
        </Tooltip>
        <Tooltip title="Right End" placement="right-end">
          <Button variant="outlined" size="small">Right End</Button>
        </Tooltip>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip placement start and end variations showing fine-grained positioning: top-start, top-end, bottom-start, bottom-end, left-start, left-end, right-start, and right-end.',
      },
    },
  },
};
