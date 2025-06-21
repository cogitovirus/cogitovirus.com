import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Doc, DocSchemaType, DocSearch } from './types';
import { isValidDate, joinPath, kebabCaseToTitle, slugify } from '$lib/dist/utils';
import { docsPath, siteUrl } from '$lib/config';
import { defaultDoc, fillInDocsData } from './utils';
import { IS_PROD } from '$lib/dist/vars';
import * as config from '$lib/config';

export class Documentation {
  #name: string;
  #dirName: string;
  #description: string;
  #schemaType: DocSchemaType;
  #enableSitemap: boolean;
  #DocsArr: Doc[];
  #DocsObject: { [key: string]: Doc };

  constructor({
    name,
    dirName,
    description,
    schemaType,
    enableSitemap = true,
  }: {
    name: string;
    dirName: string;
    description: string;
    schemaType: DocSchemaType;
    enableSitemap?: boolean;
  }) {
    const start = performance.now();

    this.#name = name;
    this.#dirName = dirName;
    this.#description = description;
    this.#schemaType = schemaType;
    this.#enableSitemap = enableSitemap;
    // reading docs from fs
    const docsList = this.#fetchDocsList();
    // deep copy docsList to avoid reference issues
    this.#DocsObject = this.#fetchDocsObject(JSON.parse(JSON.stringify(docsList)));
    this.#DocsArr = docsList;

    const end = performance.now();
    console.log(`[Docs] ${name} loaded in ${(end - start).toFixed(2)}ms`);
  }

  get name(): string {
    return this.#name;
  }

  get dirName(): string {
    return this.#dirName;
  }

  get description(): string {
    return this.#description;
  }

  get schemaType(): DocSchemaType {
    return this.#schemaType;
  }

  getDocs(): Doc[] {
    return this.#DocsArr;
  }

  getDoc(slug: string): Doc | undefined {
    return this.#DocsObject[slug];
  }

  sitemapUrlTags(): string[] {
    if (!this.#enableSitemap) {
      return [];
    }
    const urls: string[] = [];
    for (const [slug, doc] of Object.entries(this.#DocsObject)) {
      if (slug === doc.slug && !doc.robotsNoIndex) {
        let lastmod = new Date();
        if (isValidDate(doc.lastmod_date)) {
          lastmod = new Date(doc.lastmod_date);
        } else if (isValidDate(doc.date)) {
          lastmod = new Date(doc.date);
        }

        urls.push(`
          <url>
            <loc>${joinPath(siteUrl, docsPath, slug)}</loc>
            <lastmod>${lastmod.toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
          </url>  
        `);
      }
    }
    return urls;
  }

  getPrevNextDocs(slug: string): { prev: Doc | null; next: Doc | null } {
    const docs = this.flatDocList();
    const index = docs.findIndex((d) => d.slug === slug);
    const prev = index > 0 ? docs[index - 1] : null;
    const next = index < docs.length - 1 ? docs[index + 1] : null;

    return { prev, next };
  }

  flatDocList(docs: Doc[] | undefined = undefined): Doc[] {
    docs = docs === undefined ? this.getDocs() : docs;
    let docsList: Doc[] = [];

    for (const doc of docs) {
      docsList.push(doc);
      if (doc.children.length > 0) {
        docsList = docsList.concat(this.flatDocList(doc.children));
      }
    }

    return docsList;
  }

  getSearchData(): DocSearch[] {
    let data: DocSearch[] = [];

    for (const doc of this.flatDocList()) {
      data.push({
        title: doc.title,
        slug: doc.slug,
        description: doc.description,
      } as DocSearch);
    }

    return data;
  }

  get #contentPath(): string {
    return `src/content/${this.#dirName}`;
  }

  #fetchDocsObject(docs: Doc[]) {
    let data: { [key: string]: Doc } = {};

    for (let i = 0; i < docs.length; i++) {
      data[docs[i].slug] = docs[i];
      if (docs[i].children.length > 0) {
        data = { ...data, ...this.#fetchDocsObject(docs[i].children) };
      }
    }

    return data;
  }

  #fetchDocsList(docs: Doc[] | undefined = undefined): Doc[] {
    if (docs === undefined) {
      docs = this.#parseMarkdownFiles();
      docs = IS_PROD ? this.#filterDocs(docs) : docs;
    }

    for (let i = 0; i < docs.length; i++) {
      if (docs[i].children.length > 0) {
        docs[i].children = this.#fetchDocsList(docs[i].children);
      }
    }

    docs = (docs as Doc[]).sort((first, second) => {
      return first.order - second.order;
    });

    return docs;
  }

  #filterDocs(docs: Doc[]): Doc[] {
    docs = docs.filter((doc) => doc.draft === false);
    for (let i = 0; i < docs.length; i++) {
      if (docs[i].children.length > 0) {
        docs[i].children = this.#filterDocs(docs[i].children);
      }
    }
    return docs;
  }

  #parseMarkdownFiles(
    dir: string = this.#contentPath,
    parentSlug: string = '',
    maxDepth: number = 3
  ): Doc[] {
    const docs: Doc[] = [];
    const docsPath = path.resolve(dir);
    const slugs = new Set();

    if (maxDepth <= 0) {
      return docs;
    }

    if (dir === this.#contentPath) {
      let doc;
      let fallbackDoc = defaultDoc();
      fallbackDoc.title = 'Docs Home';
      fallbackDoc.order = 1;

      try {
        doc = this.#parseMarkdownFile(path.resolve(this.#contentPath, 'index.md'), parentSlug);
        doc = fillInDocsData(doc, fallbackDoc);
      } catch (e) {
        doc = fallbackDoc;
      }
      // base doc slug must be empty string
      doc.slug = '';
      docs.push(doc);
    }

    for (const file of fs.readdirSync(docsPath)) {
      const filePath = path.resolve(docsPath, file);
      const stat = fs.statSync(filePath);
      const justFileName = path.basename(file).replace('.md', '');

      const nonUniqueSlugError = new Error(`Non-unique slug value used for Doc: ${filePath}`);

      let fallbackDoc = defaultDoc();
      fallbackDoc.title = kebabCaseToTitle(justFileName);
      fallbackDoc.slug = joinPath(parentSlug ?? '', slugify(justFileName));

      if (stat.isDirectory()) {
        let docDir: Doc;
        let foundIndexFile = true;

        try {
          docDir = this.#parseMarkdownFile(path.resolve(filePath, 'index.md'), parentSlug);
          docDir = fillInDocsData(docDir, fallbackDoc);
        } catch (e) {
          docDir = fallbackDoc;
          foundIndexFile = false;
        }

        const children = this.#parseMarkdownFiles(filePath, docDir.slug, maxDepth - 1);
        docDir.children = children;

        if (foundIndexFile && children.length > 0) {
          if (slugs.has(docDir.slug)) {
            throw nonUniqueSlugError;
          }

          docs.push(docDir);
          slugs.add(docDir.slug);
        }
      } else if (filePath.endsWith('.md') && !filePath.endsWith('index.md')) {
        let docPage = this.#parseMarkdownFile(filePath, parentSlug);
        docPage = fillInDocsData(docPage, fallbackDoc);

        if (slugs.has(docPage.slug)) {
          throw nonUniqueSlugError;
        }

        docs.push(docPage);
        slugs.add(docPage.slug);
      }
    }

    return docs;
  }

  #parseMarkdownFile(filePath: string, parentSlug: string): Doc {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    let currPath = filePath.split(this.#contentPath)[1];

    if (data.date && !isValidDate(data.date)) {
      throw new Error(
        `No date or invalid date format in Docs: ${currPath}. Use yyyy-mm-dd format for date.`
      );
    }

    if (data.lastmod_date) {
      if (!isValidDate(data.lastmod_date)) {
        throw new Error(`Invalid date format for "lastmod_date" in Docs: ${currPath}`);
      }
      if (data.date && new Date(data.lastmod_date) < new Date(data.date)) {
        throw new Error(`"date" cannot be greater than "lastmod_date" in Docs: ${currPath}`);
      }
    }

    let slug: string = '';
    if (data.slug || data.title) {
      slug = joinPath(parentSlug, slugify(data.slug ?? data.title ?? ''));
    }

    let robotsNoIndex: Boolean = config.robotsNoIndex;
    if (data.draft) {
      robotsNoIndex = true;
    } else if (data.robotsNoIndex && typeof data.robotsNoIndex === 'boolean') {
      robotsNoIndex = data.robotsNoIndex;
    }

    currPath = currPath.replace(/\.md$/, '');
    currPath = joinPath(currPath);

    return {
      title: data.title,
      description: data.description ?? '',
      slug: slug,
      order: data.order,
      date: data.date,
      lastmod_date: data.lastmod_date,
      tags: data.tags,
      draft: data.draft ?? false,
      section: data.section ?? false,
      robotsNoIndex: robotsNoIndex,
      children: [] as Doc[],
      path: currPath,
    };
  }
}
