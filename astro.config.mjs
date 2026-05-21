
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && !!repo && !!owner;
const isOrgPagesRepo = !!repo && !!owner && repo === `${owner}.github.io`;
const configuredSiteUrl = process.env.PAGES_SITE_URL?.trim();
const configuredBasePath = process.env.PAGES_BASE_PATH?.trim();
const defaultSiteUrl = isGithubPagesBuild
  ? isOrgPagesRepo
    ? `https://${owner}.github.io/`
    : `https://${owner}.github.io/${repo}/`
  : 'https://caslab.ece.vt.edu/';
const defaultBasePath = isGithubPagesBuild
  ? isOrgPagesRepo
    ? '/'
    : `/${repo}`
  : '/';

// https://astro.build/config
export default defineConfig({
  site: configuredSiteUrl || defaultSiteUrl,
  base: configuredBasePath || (configuredSiteUrl ? '/' : defaultBasePath),
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
    // assetsInlineLimit: 10240, // 10KB to inline achievements.css (7.5KB)
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // assetsInlineLimit: 10240,
    }
  },

  integrations: [react()]
});
