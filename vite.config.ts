import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * @file Vite configuration file for the project.
 * @description This file configures the Vite build tool, which provides a fast development server
 * and bundles the application for production.
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  /**
   * @property {Array} plugins - An array of Vite plugins to use.
   * @property {object} plugins.react - The official Vite plugin for React, which enables features like Fast Refresh.
   */
  plugins: [react()],
  /**
   * @property {object} optimizeDeps - Options for the dependency pre-bundling process.
   * @property {Array<string>} optimizeDeps.exclude - An array of dependencies to exclude from pre-bundling.
   * This is useful for dependencies that have issues with Vite's pre-bundling.
   */
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});