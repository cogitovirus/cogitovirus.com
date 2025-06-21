import FlexSearch from 'flexsearch';
import type { DocSearch } from './types';

export type Result = {
  slug: string;
  title: string;
  description: string[];
};

let docsIndex: FlexSearch.Index;
let docs: DocSearch[];

export function createDocsIndex(data: DocSearch[]) {
  docsIndex = new FlexSearch.Index({ tokenize: 'forward' });

  data.forEach((doc, i) => {
    const item = `${doc.title} ${doc.description}`;
    docsIndex.add(i, item);
  });

  docs = data;
}

export function searchDocsIndex(searchTerm: string) {
  const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const results = docsIndex.search(match);
  return results
    .map((index: number) => docs[index])
    .map(({ slug, title, description }: DocSearch) => {
      return {
        slug,
        title: replaceTextWithMarker(title, match),
        description: getMatches(description, match),
      };
    });
}

function replaceTextWithMarker(text: string, match: string) {
  const regex = new RegExp(match, 'gi');
  return text.replaceAll(regex, (match) => `<mark>${match}</mark>`);
}

function getMatches(text: string, searchTerm: string, limit = 1) {
  const regex = new RegExp(searchTerm, 'gi');
  const indexes = [];
  let matches = 0;
  let match;

  while ((match = regex.exec(text)) !== null && matches < limit) {
    indexes.push(match.index);
    matches++;
  }

  return indexes.map((index) => {
    const start = index - 20;
    const end = index + 80;
    const excerpt = text.substring(start, end).trim();
    return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
  });
}
