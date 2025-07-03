// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './src/plugins/remark-reading-timew.mjs';

// https://astro.build/config
export default defineConfig({
  site: "https://benhollar.com",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: "slack-ochin"
    },
    remarkPlugins: [remarkReadingTime]
  }
});
