// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [
    sanity({
      projectId: 'xc9qh5w3',
      dataset: 'production',
      apiVersion: '2026-03-01',
      useCdn: false,
      studioBasePath: '/admin',
      studioRouterHistory: 'hash',
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});