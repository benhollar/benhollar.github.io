// @ts-check
import { satteri } from "@astrojs/markdown-satteri";
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import { mdastReadingTimePlugin } from './src/plugins/mdast-reading-time';

// https://astro.build/config
export default defineConfig({
  site: "https://benhollar.com",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: "slack-ochin"
    },
    processor: satteri({
      mdastPlugins: [mdastReadingTimePlugin]
    })
  }
});
