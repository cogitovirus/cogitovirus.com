import type { Thing, WithContext } from 'schema-dts';
import intoSlug from 'slugify';

export type Schema = Thing | WithContext<Thing>;

export function serializeSchemaMarkup(thing: Schema) {
  return `<script type="application/ld+json">${JSON.stringify(thing)}</script>`;
}

export function joinPath(...segments: string[]) {
  let path: string[] = [];
  for (const segment of segments) {
    let item: string;
    try {
      item = segment.replace(/(^\/+|\/+$)/g, '');
    } catch (e) {
      console.error(e);
      throw new Error('Error joining path segments.');
    }

    if (item !== '') {
      path.push(item);
    }
  }
  return path.join('/');
}

export function kebabCaseToTitle(kebabCase: string): string {
  return kebabCase
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function slugify(value: string): string {
  value = value.replace(/_/g, '-').replace(/\//g, '-');
  return intoSlug(value, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function asAnArray(value: any | any[]): any[] {
  let arr: any[] = [];

  if (Array.isArray(value)) {
    return value;
  } else if (value) {
    arr.push(value);
  }
  return arr;
}

export function stripHTMLTags(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

export function stripHtmlAndMarkdownTags(markdown: string): string {
  return markdown
    .replace(/#+\s+(.*)/g, '$1') // Remove headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
}

export function isValidDate(dateString: string): Boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateString.match(regex)) {
    return false;
  }

  const [year, month, day] = dateString.split('-').map(Number);
  // Note: Months in JavaScript Date object are zero-indexed (0 = January, 11 = December)
  const date = new Date(year, month - 1, day);

  // The getMonth method returns the zero-indexed month
  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return false;
  }

  return true;
}
