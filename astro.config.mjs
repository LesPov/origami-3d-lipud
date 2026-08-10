import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://LesPov.github.io',
  base: '/origami-3d-lipud',
  integrations: [tailwind()],
});