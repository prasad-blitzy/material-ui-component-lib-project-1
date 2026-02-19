# Material UI Component Library

A React component wrapper library built on top of Material UI (MUI) v7, providing themed, accessible, and type-safe components for enterprise applications.

![MUI v7](https://img.shields.io/badge/MUI-v7-007FFF?logo=mui)
![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript 5.9](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite 7](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![License MIT](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

- **30 Themed Wrapper Components** across 5 categories — Core, Layout, Navigation, Data Display, and Feedback
- **Full TypeScript Support** with comprehensive type definitions and strict mode enabled
- **Custom ThemeProvider** with design tokens for colors, typography, spacing, breakpoints, shadows, and shapes
- **Dark / Light Mode Support** with runtime theme switching via React Context
- **WCAG 2.1 AA Accessibility** compliance inherited from MUI's built-in ARIA attributes, keyboard navigation, and focus management
- **Tree-Shakeable Distribution** in ESM + CJS dual-format bundles — import only what you use
- **Full MUI Prop Forwarding** with `React.forwardRef` support on every component
- **Zero Hardcoded CSS** — all styling resolves through MUI theme tokens via the `sx` prop system

---

## 📦 Installation

Install the library along with its required peer dependencies:

```bash
npm install material-ui-component-lib-project-1 @mui/material @emotion/react @emotion/styled react react-dom
```

### Peer Dependencies

| Package | Version |
|---------|---------|
| `react` | ^19.0.0 |
| `react-dom` | ^19.0.0 |
| `@mui/material` | ^7.0.0 |
| `@emotion/react` | ^11.14.0 |
| `@emotion/styled` | ^11.14.0 |

> **Note:** All runtime dependencies are declared as peer dependencies to prevent version duplication. Your application must provide its own copies of React, MUI, and Emotion.

---

## 🚀 Quick Start

### Basic Usage

Wrap your application with the `ThemeProvider` and start using components:

```tsx
import { ThemeProvider, Button, Card, Typography } from 'material-ui-component-lib-project-1';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Typography variant="h5">Hello World</Typography>
        <Button variant="contained" color="primary">
          Click Me
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

### Custom Theme

Use `createCustomTheme` to override default design tokens:

```tsx
import { ThemeProvider, createCustomTheme } from 'material-ui-component-lib-project-1';

const customTheme = createCustomTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your application */}
    </ThemeProvider>
  );
}
```

### Importing Individual Components

Components can be imported directly from the package:

```tsx
import { Button, TextField, Alert, Stack } from 'material-ui-component-lib-project-1';

function LoginForm() {
  return (
    <Stack spacing={2}>
      <TextField label="Email" variant="outlined" />
      <TextField label="Password" variant="outlined" type="password" />
      <Button variant="contained" color="primary">
        Sign In
      </Button>
      <Alert severity="info">Enter your credentials to continue.</Alert>
    </Stack>
  );
}
```

---

## 🧩 Component Catalog

All 30 components are organized into 5 categories:

### Core (7 Components)

| Component | MUI Base | Description |
|-----------|----------|-------------|
| `Button` | `MUI Button` | Button with themed variants — contained, outlined, text |
| `TextField` | `MUI TextField` | Text input with themed styling and validation support |
| `Select` | `MUI Select` | Dropdown select with themed options |
| `Checkbox` | `MUI Checkbox` | Checkbox with FormControlLabel integration |
| `Radio` | `MUI RadioGroup + Radio` | Radio button group with themed states |
| `Switch` | `MUI Switch` | Toggle switch with FormControlLabel integration |
| `IconButton` | `MUI IconButton` | Icon button with enforced aria-label accessibility |

### Layout (6 Components)

| Component | MUI Base | Description |
|-----------|----------|-------------|
| `Box` | `MUI Box` | Theme-aware container with full `sx` prop support |
| `Container` | `MUI Container` | Responsive max-width container |
| `Grid` | `MUI Grid` | Responsive 12-column grid layout |
| `Stack` | `MUI Stack` | Flex-direction stacking layout |
| `Divider` | `MUI Divider` | Themed horizontal/vertical separator |
| `Paper` | `MUI Paper` | Surface container with elevation shadow |

### Navigation (5 Components)

| Component | MUI Base | Description |
|-----------|----------|-------------|
| `AppBar` | `MUI AppBar` | Themed top navigation bar |
| `Tabs` | `MUI Tabs + Tab` | Tab navigation with indicator theming |
| `Drawer` | `MUI Drawer` | Side navigation panel |
| `Breadcrumbs` | `MUI Breadcrumbs` | Navigation hierarchy with themed separators |
| `Link` | `MUI Link` | Themed anchor element with typography integration |

### Data Display (7 Components)

| Component | MUI Base | Description |
|-----------|----------|-------------|
| `Typography` | `MUI Typography` | Text rendering with theme typography scale |
| `Table` | `MUI Table` | Data table with themed headers, rows, and cells |
| `Card` | `MUI Card` | Content container with header, content, actions, and media |
| `Avatar` | `MUI Avatar` | Image, letter, or icon avatar with themed sizing |
| `Chip` | `MUI Chip` | Compact element for tags, filters, and actions |
| `List` | `MUI List` | Item list with themed layout and icon support |
| `Tooltip` | `MUI Tooltip` | Informational popup with themed positioning |

### Feedback (5 Components)

| Component | MUI Base | Description |
|-----------|----------|-------------|
| `Alert` | `MUI Alert` | Notification banner with severity variants |
| `Dialog` | `MUI Dialog` | Modal dialog with title, content, and actions |
| `Snackbar` | `MUI Snackbar` | Toast notification with auto-hide support |
| `CircularProgress` | `MUI CircularProgress` | Spinner loading indicator |
| `LinearProgress` | `MUI LinearProgress` | Progress bar with determinate/indeterminate modes |

---

## 🎨 Theme System

The library provides a comprehensive theme system built on MUI's `createTheme()` API.

### Design Tokens

| Token Category | Theme Path | Description |
|---------------|------------|-------------|
| **Colors** | `theme.palette.*` | Primary, secondary, error, warning, info, success, background, text |
| **Typography** | `theme.typography.*` | Font families, sizes, weights, line heights (h1–h6, body1–2, caption, button) |
| **Spacing** | `theme.spacing()` | 8px base unit with multiplier scale (0–6) |
| **Breakpoints** | `theme.breakpoints.*` | xs (0), sm (600px), md (900px), lg (1200px), xl (1536px) |
| **Shadows** | `theme.shadows[]` | 25 elevation levels (0–24) |
| **Shape** | `theme.shape.*` | Border radius values |

### ThemeProvider

The `ThemeProvider` component wraps MUI's `ThemeProvider` and includes `CssBaseline` for consistent baseline styling:

```tsx
import { ThemeProvider } from 'material-ui-component-lib-project-1';

function App() {
  return (
    <ThemeProvider>
      {/* All child components receive theme context */}
    </ThemeProvider>
  );
}
```

### Custom Theme Overrides

Use `createCustomTheme` to produce a theme object with your custom token overrides:

```tsx
import { createCustomTheme, ThemeProvider } from 'material-ui-component-lib-project-1';

const theme = createCustomTheme({
  palette: {
    primary: { main: '#6200ea' },
    secondary: { main: '#03dac6' },
    background: { default: '#fafafa' },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 700 },
  },
  spacing: 8,
  shape: { borderRadius: 8 },
});

function App() {
  return <ThemeProvider theme={theme}>{/* ... */}</ThemeProvider>;
}
```

### Dark / Light Mode

The theme system supports dark and light modes:

```tsx
import { createCustomTheme, ThemeProvider } from 'material-ui-component-lib-project-1';

const darkTheme = createCustomTheme({
  palette: { mode: 'dark' },
});

const lightTheme = createCustomTheme({
  palette: { mode: 'light' },
});

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Switch checked={isDark} onChange={() => setIsDark(!isDark)} />
      {/* Application content */}
    </ThemeProvider>
  );
}
```

---

## 🛠 Development

### Available Scripts

```bash
npm run build        # Build ESM + CJS bundles and TypeScript declarations
npm run build:vite   # Build Vite library output only
npm run build:types  # Generate TypeScript declaration files only
npm run typecheck    # Run TypeScript type checking without emit
npm run lint         # Run ESLint code analysis
npm run format       # Run Prettier code formatting
npm run clean        # Remove dist/ directory
```

### Prerequisites

- **Node.js** ≥ 20.19
- **npm** ≥ 11.0

### Building the Library

```bash
# Install dependencies
npm install

# Build the library (ESM + CJS + type declarations)
npm run build
```

The build output is written to the `dist/` directory:

```
dist/
├── index.es.js      # ESM bundle (tree-shakeable)
├── index.cjs.js     # CJS bundle (Node.js/legacy)
└── types/           # TypeScript declaration files (.d.ts)
```

---

## 📁 Project Structure

```
src/
├── theme/                    # Theme system
│   ├── ThemeProvider.tsx      # Custom ThemeProvider wrapping MUI
│   ├── createCustomTheme.ts  # Factory function for MUI createTheme()
│   ├── types.ts              # Theme TypeScript interfaces
│   ├── tokens/               # Design token definitions
│   │   ├── colors.ts         # Color palette tokens
│   │   ├── typography.ts     # Typography scale tokens
│   │   ├── spacing.ts        # Spacing scale tokens
│   │   ├── breakpoints.ts    # Responsive breakpoint tokens
│   │   ├── shadows.ts        # Shadow/elevation tokens
│   │   ├── shape.ts          # Border radius tokens
│   │   └── index.ts          # Token barrel export
│   └── index.ts              # Theme barrel export
├── components/
│   ├── core/                 # Button, TextField, Select, Checkbox, Radio, Switch, IconButton
│   ├── layout/               # Box, Container, Grid, Stack, Divider, Paper
│   ├── navigation/           # AppBar, Tabs, Drawer, Breadcrumbs, Link
│   ├── data-display/         # Typography, Table, Card, Avatar, Chip, List, Tooltip
│   ├── feedback/             # Alert, Dialog, Snackbar, CircularProgress, LinearProgress
│   └── index.ts              # Components barrel export
├── types/
│   └── index.ts              # Shared TypeScript utility types
└── index.ts                  # Library root entry point
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
