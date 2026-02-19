/**
 * Components Aggregate Barrel Export
 *
 * Re-exports all 5 component category barrels, providing a single import surface
 * for all 30+ wrapper components and their associated TypeScript prop interfaces.
 * This file is consumed by the root barrel at src/index.ts via:
 *   export * from './components';
 *
 * Component categories:
 *  - Core (7 components): Button, TextField, Select, Checkbox, Radio, Switch, IconButton
 *  - Layout (6 components): Box, Container, Grid, Stack, Divider, Paper
 *  - Navigation (5 components): AppBar, Tabs, Drawer, Breadcrumbs, Link
 *  - Data Display (7 components): Typography, Table, Card, Avatar, Chip, List, Tooltip
 *  - Feedback (5 components): Alert, Dialog, Snackbar, CircularProgress, LinearProgress
 *
 * Architecture rules enforced:
 *  - Named exports only (no default exports) for tree-shakeability
 *  - Pure re-exports with zero runtime side effects (sideEffects: false)
 *  - No cross-category imports; each category barrel is independent
 *  - No circular dependencies; this file only re-exports from child barrels
 *  - Unidirectional dependency flow: category barrels → this aggregate → root barrel
 *
 * @module components
 */

// Core input/action components: Button, TextField, Select, Checkbox, Radio, RadioGroup, Switch, IconButton
export * from './core';

// Layout container/spacing components: Box, Container, Grid, Stack, Divider, Paper
export * from './layout';

// Navigation components: AppBar, Toolbar, Tabs, Tab, Drawer, Breadcrumbs, Link
export * from './navigation';

// Data display components: Typography, Table, Card, Avatar, Chip, List, Tooltip (plus sub-components)
export * from './data-display';

// Feedback/notification components: Alert, Dialog, Snackbar, CircularProgress, LinearProgress
export * from './feedback';
