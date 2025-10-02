/**
 * @file PostCSS configuration file for the project.
 * @description This configuration file enables PostCSS plugins. It is used here to
 * integrate Tailwind CSS and Autoprefixer into the build process.
 *
 * @property {object} plugins - An object defining the PostCSS plugins to be used.
 * @property {object} plugins.tailwindcss - Enables Tailwind CSS processing.
 * @property {object} plugins.autoprefixer - Automatically adds vendor prefixes to CSS rules for browser compatibility.
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};