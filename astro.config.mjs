import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gaertenvonhoerschelmann.de', // Replace with actual domain
  integrations: [react(), tailwind(), sitemap()]
});
