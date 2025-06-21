import remarkGfm from 'remark-gfm';
import remarkTableofContents from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { codeToHtml } from 'shiki';
import { escapeSvelte } from 'mdsvex';
import { remarkAddTocHeading, rehypeUnwrapImages, rehypeHideDefaultToc } from './plugins.js';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationErrorLevel,
} from '@shikijs/transformers';

export const mdsvexOpts = {
  extensions: ['.md'],
  smartypants: true,
  remarkPlugins: [
    remarkAddTocHeading,
    remarkGfm,
    [remarkTableofContents, { tight: true, maxDepth: 3 }],
  ],
  rehypePlugins: [rehypeUnwrapImages, rehypeSlug, rehypeAutolinkHeadings, rehypeHideDefaultToc],
  highlight: {
    highlighter: async (/** @type {string} */ code, /** @type {any} */ lang) => {
      const html = await codeToHtml(code, {
        lang,
        // check out: https://shiki.matsu.io/themes
        theme: 'aurora-x',
        transformers: [
          // @ts-ignore
          transformerNotationDiff(),
          // @ts-ignore
          transformerNotationHighlight(),
          // @ts-ignore
          transformerNotationErrorLevel(),
        ],
      });
      const escaped = escapeSvelte(html);
      return `{@html \`${escaped}\` }`;
    },
  },
};
