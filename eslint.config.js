import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

/**
 * @file ESLint configuration file for the project.
 * @description This configuration sets up the linting rules for TypeScript and React.
 * It extends recommended configurations from ESLint and TypeScript-ESLint,
 * and includes plugins for React Hooks and React Refresh.
 *
 * @property {Array<object>} config - The main configuration array for ESLint.
 * @property {object} ignores - Specifies files and directories to be ignored by the linter.
 * @property {object} extends - An array of base configurations to extend.
 * @property {Array<string>} files - A glob pattern specifying which files this configuration applies to.
 * @property {object} languageOptions - Defines language-specific options, including ECMAScript version and global variables.
 * @property {object} plugins - Registers plugins to be used by ESLint.
 * @property {object} rules - Defines specific linting rules and their severity.
 */
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);