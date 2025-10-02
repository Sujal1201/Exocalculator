/**
 * @file Tailwind CSS configuration file for the project.
 * @description This file configures the Tailwind CSS framework, including defining which files to scan for classes,
 * extending the default theme with custom colors, and adding plugins.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  /**
   * @property {Array<string>} content - An array of file paths that Tailwind should scan to find utility classes.
   * This ensures that only the necessary CSS is generated.
   */
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  /**
   * @property {object} theme - The section where you define and extend Tailwind's default theme.
   * @property {object} theme.extend - Used to add new values to the theme or override existing ones without replacing them entirely.
   * @property {object} theme.extend.colors - Defines custom colors for the application.
   */
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        'primary-dark': '#3E7AC0',
      },
    },
  },
  /**
   * @property {Array} plugins - An array for registering any Tailwind CSS plugins.
   */
  plugins: [],
};