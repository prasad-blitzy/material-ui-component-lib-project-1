/**
 * ESLint Configuration for Material UI Component Wrapper Library
 *
 * This configuration uses the legacy eslintrc format (CommonJS) with:
 * - TypeScript-aware linting via @typescript-eslint/parser and plugin
 * - ESLint recommended rules as a baseline
 * - Prettier integration to disable conflicting formatting rules
 * - React JSX parsing support for .tsx component files
 *
 * Requires ESLINT_USE_FLAT_CONFIG=false with ESLint v9+ since this uses
 * the legacy .eslintrc.cjs configuration format.
 *
 * @see https://eslint.org/docs/latest/use/configure/
 * @see https://typescript-eslint.io/getting-started/legacy-eslint-setup
 */
module.exports = {
  // Prevent ESLint from searching parent directories for additional configs.
  // This ensures the library uses only this configuration file.
  root: true,

  // Define global variables available in the runtime environment.
  // browser: true — Components render in browser contexts (window, document, etc.)
  // es2020: true — Enable ES2020 globals (BigInt, globalThis, Promise.allSettled, etc.)
  env: {
    browser: true,
    es2020: true,
  },

  // Extend shared configuration presets in order of precedence (later overrides earlier).
  // 1. eslint:recommended — ESLint core recommended rules (no-undef, no-unused-vars base, etc.)
  // 2. plugin:@typescript-eslint/recommended — TypeScript-specific recommended rules
  // 3. prettier — Disables all ESLint rules that conflict with Prettier formatting
  //    (must be LAST to properly override formatting-related rules from other presets)
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],

  // Patterns for files and directories that ESLint should completely ignore.
  // dist/ — Build output artifacts (ESM + CJS bundles, type declarations)
  // node_modules/ — Third-party dependencies
  // vite.config.ts — Vite build configuration (uses different tsconfig context)
  ignorePatterns: ['dist/', 'node_modules/', 'vite.config.ts'],

  // Use the TypeScript parser from @typescript-eslint for parsing .ts and .tsx files.
  // This enables ESLint to understand TypeScript syntax (interfaces, generics, enums, etc.)
  parser: '@typescript-eslint/parser',

  // Parser configuration for TypeScript and JSX support.
  parserOptions: {
    // Parse using the latest ECMAScript standard features.
    ecmaVersion: 'latest',
    // Source files use ES module syntax (import/export).
    sourceType: 'module',
    // Enable JSX parsing for React component files (.tsx).
    ecmaFeatures: {
      jsx: true,
    },
    // Reference the TypeScript project configuration for type-aware linting.
    // This enables @typescript-eslint rules that require type information
    // (e.g., no-floating-promises, no-misused-promises, strict-boolean-expressions).
    project: ['./tsconfig.json'],
  },

  // Register ESLint plugins that provide additional rules.
  // @typescript-eslint — Provides TypeScript-specific linting rules
  plugins: ['@typescript-eslint'],

  // Custom rule overrides tailored for a React component wrapper library.
  rules: {
    // Error on unused variables but allow underscore-prefixed function arguments.
    // This supports the common pattern of destructuring props where some are
    // intentionally unused (e.g., const { _internalProp, ...rest } = props).
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' },
    ],

    // Disable the requirement for explicit return type annotations on functions.
    // TypeScript's type inference is sufficient for most component functions,
    // and explicit return types on React components add noise without benefit.
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Warn (but don't error) on explicit 'any' type usage.
    // Library code should aim for strong typing, but some MUI prop forwarding
    // patterns legitimately require 'any' for full compatibility.
    '@typescript-eslint/no-explicit-any': 'warn',

    // Warn on console.log usage in library source code.
    // Component libraries should not ship with console output; consumers
    // handle their own logging. This catches accidental debug statements.
    'no-console': 'warn',

    // Configure empty object type rule for wrapper library patterns:
    // - allowInterfaces: 'with-single-extends' — permits empty interfaces extending
    //   a single MUI type (e.g., interface ButtonProps extends MUIButtonProps {})
    // - allowObjectTypes: 'always' — permits {} in generic type parameter defaults
    //   (e.g., <P = {}>) which is standard TypeScript for utility types
    '@typescript-eslint/no-empty-object-type': [
      'error',
      { allowInterfaces: 'with-single-extends', allowObjectTypes: 'always' },
    ],

    // Disable the Storybook rule that enforces importing Meta/StoryObj from the
    // framework package (@storybook/react-vite) rather than the renderer package
    // (@storybook/react). AAP §0.8.2 explicitly specifies '@storybook/react' as
    // the canonical import source for type imports, so this rule is disabled to
    // resolve the conflict between the AAP convention and the plugin default.
    'storybook/no-renderer-packages': 'off',
  },

  // Plugin-specific settings.
  settings: {
    // Configure React version detection for any React-aware ESLint rules.
    // 'detect' reads the React version from package.json peerDependencies
    // or devDependencies at runtime, ensuring rules match the project's React version.
    react: {
      version: 'detect',
    },
  },
};
