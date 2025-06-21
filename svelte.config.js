import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { mdsvexOpts } from './src/lib/dist/mdsvex.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess({}), mdsvex(mdsvexOpts)],
  kit: {
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      // See below for an explanation of these options
      config: undefined,
      platformProxy: {
        configPath: undefined,
        environment: undefined,
        persist: undefined
      },
      fallback: 'plaintext',
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    }),
    prerender: {
      entries: [
        '*'
      ],
      handleHttpError: ({ status, path, referrer, referenceType }) => {
        if (status === 404) {
          return { message: `Not found: ${path}` };
        }
      },
      handleEntryGeneratorMismatch: ({ entry, generatedEntry }) => {
        // Suppress entry generator mismatch errors
        return { message: `Suppressed entry generator mismatch for ${entry} -> ${generatedEntry}` };
      }
    },
  },
};

export default config;
