import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHead, TableBody, TableRow, TableCell } from './Table';
import { Paper } from '../layout/Paper';
import { Box } from '../layout/Box';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createCustomTheme } from '../../theme/createCustomTheme';

// ---------------------------------------------------------------------------
// Realistic Domain-Appropriate Data
// ---------------------------------------------------------------------------
// Employee data used across all Table stories. Each row represents a
// realistic employee record with name, email, role, department, and status.
// ---------------------------------------------------------------------------

interface EmployeeData {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

const employeeData: EmployeeData[] = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Senior Engineer',
    department: 'Engineering',
    status: 'Active',
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'Active',
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'UX Designer',
    department: 'Design',
    status: 'On Leave',
  },
  {
    name: 'David Kim',
    email: 'david.kim@company.com',
    role: 'Data Analyst',
    department: 'Analytics',
    status: 'Active',
  },
  {
    name: 'Jessica Patel',
    email: 'jessica.patel@company.com',
    role: 'QA Lead',
    department: 'Quality',
    status: 'Active',
  },
];

const columns = ['Name', 'Email', 'Role', 'Department', 'Status'];

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
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded' as const,
    docs: {
      description: {
        component:
          'A themed compound table component with semantic HTML structure (TableHead, TableBody, TableRow, TableCell) for displaying structured tabular data. Wraps MUI Table primitives with consistent theming and ref forwarding.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select' as const,
      options: ['medium', 'small'],
    },
    stickyHeader: {
      control: 'boolean',
    },
    sx: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default Story
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {},
  render: (args) => (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.slice(0, 3).map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default table with header and body showing employee data.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// DenseTable Story
// ---------------------------------------------------------------------------

export const DenseTable: Story = {
  args: { size: 'small' },
  render: (args) => (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dense table with compact row height using size='small'.",
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.slice(0, 3).map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table rendered in dark mode theme context.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// FullExample Story
// ---------------------------------------------------------------------------

export const FullExample: Story = {
  render: () => (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} sx={{ fontWeight: 'bold' }}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((row) => (
            <TableRow key={row.email} hover>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete data grid with 5 columns, 5 rows of realistic employee data, and hover-enabled rows.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// StickyHeader Story
// ---------------------------------------------------------------------------

export const StickyHeader: Story = {
  args: { stickyHeader: true },
  render: (args) => (
    <Paper sx={(theme) => ({ width: '100%', maxHeight: theme.spacing(25), overflow: 'auto' })}>
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((row) => (
            <TableRow key={row.email}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Table with sticky header that remains visible during vertical scrolling.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// HoverRows Story
// ---------------------------------------------------------------------------

export const HoverRows: Story = {
  render: () => (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table rows with hover highlight effect.',
      },
    },
  },
};
