import fs from 'node:fs';
import path from 'node:path';
import type { Author, BlogSchemaType, Post, PostList } from './types';
import { asAnArray, isValidDate, joinPath, slugify } from '$lib/dist/utils';
import matter from 'gray-matter';
import { kebabCaseToTitle } from '$lib/dist/utils';
import { importImage } from '$lib/dist/image';
import * as config from '$lib/config';
import { IS_PROD } from '$lib/dist/vars';

export class Blog {
  #name: string;
  #dirName: string;
  #schemaType: BlogSchemaType;
  #description: string;
  #showToc: boolean;
  #postsCount: number;
  #relatedPostsCount: number;
  #enableRssFeed: boolean;
  #enableCategory: boolean;
  #enableTag: boolean;
  #enableArchive: boolean;
  #enableSitemap: boolean;
  #PostsArr: Post[];
  #PostsObject: { [key: string]: Post };

  constructor({
    name,
    dirName,
    schemaType = 'Article',
    description = '',
    showToc = true,
    postsCount = 25,
    relatedPostsCount = 4,
    enableRssFeed = true,
    enableCategory = true,
    enableTag = true,
    enableArchive = true,
    enableSitemap = true,
  }: {
    name: string;
    dirName: string;
    schemaType?: BlogSchemaType;
    description?: string;
    showToc?: boolean;
    postsCount?: number;
    relatedPostsCount?: number;
    enableRssFeed?: boolean;
    enableCategory?: boolean;
    enableTag?: boolean;
    enableArchive?: boolean;
    enableSitemap?: boolean;
  }) {
    const startTime = performance.now();

    this.#name = name;
    this.#dirName = dirName;
    this.#schemaType = schemaType;
    this.#description = description;
    this.#showToc = showToc;
    this.#postsCount = postsCount;
    this.#relatedPostsCount = relatedPostsCount;
    this.#enableRssFeed = enableRssFeed;
    this.#enableCategory = enableCategory;
    this.#enableTag = enableTag;
    this.#enableArchive = enableArchive;
    this.#enableSitemap = enableSitemap;

    // only reading the files once
    const posts: Post[] = this.#parseMarkdownFiles();
    // order of function cal matters here
    // since we are using the same posts array for both functions
    // and we are mutating the posts array in the process
    this.#PostsObject = this.#fetchPostsObject(posts);
    this.#PostsArr = this.#fetchPostsList(posts);

    const endTime = performance.now();
    console.log(
      '[BLOG] initialized:',
      this.#name,
      `(⏱️  took ${(endTime - startTime).toFixed(2)}ms)`
    );
  }

  get name(): string {
    return this.#name;
  }

  get dirName(): string {
    return this.#dirName;
  }

  get schemaType(): BlogSchemaType {
    return this.#schemaType;
  }

  get description(): string {
    return this.#description;
  }

  get showToc(): boolean {
    return this.#showToc;
  }

  get enableRssFeed(): boolean {
    return this.#enableRssFeed;
  }

  get enableCategory(): boolean {
    return this.#enableCategory;
  }

  get enableTag(): boolean {
    return this.#enableTag;
  }

  get enableArchive(): boolean {
    return this.#enableArchive;
  }

  getPosts({ all = false }: { all?: boolean } = {}): PostList[] {
    let posts: PostList[] = [];
    this.#PostsArr.forEach((post) => {
      let _post: PostList = {
        title: post.title,
        description: post.description,
        slug: post.slug,
        category: post.category,
        tags: post.tags,
        date: post.date,
        author: post.author,
        lastmod_date: post.lastmod_date,
        image: post.image,
        series: post.series,
      };
      if (!IS_PROD) {
        _post.draft = post.draft;
        _post.unlisted = post.unlisted;
        _post.ghost = post.ghost;
      }
      posts.push(_post);
    });

    if (all) {
      return posts;
    }
    return posts.slice(0, this.#postsCount);
  }

  getPost(slug: string): Post {
    return this.#PostsObject[slugify(slug)];
  }

  getPostSlugs() {
    return Object.keys(this.#PostsObject);
  }

  getPrevNextPosts(slug: string): { prev: PostList | null; next: PostList | null } {
    slug = slugify(slug);
    const posts: PostList[] = this.getPosts({ all: true });
    const index = posts.findIndex((p) => p.slug === slug);
    const next = index > 0 ? posts[index - 1] : null;
    const prev = index < posts.length - 1 ? posts[index + 1] : null;

    return { prev, next };
  }

  categories(): string[] {
    if (!this.#enableCategory) {
      return [];
    }

    const posts: PostList[] = this.getPosts({ all: true });
    const categories: Set<string> = new Set<string>();
    posts.forEach((post) => categories.add(post.category));
    const categoriesArr = Array.from(categories);
    categoriesArr.sort((a, b) => a.localeCompare(b));
    return categoriesArr;
  }

  tags(): string[] {
    if (!this.#enableTag) {
      return [];
    }

    const posts: PostList[] = this.getPosts({ all: true });
    const tags: Set<string> = new Set<string>();
    posts.forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
    const tagsArr = Array.from(tags);
    tagsArr.sort((a, b) => a.localeCompare(b));
    return tagsArr;
  }

  getPostsByCategory(category: string) {
    if (!this.#enableCategory) {
      return {};
    }

    category = slugify(category);
    let name = category;

    const posts: PostList[] = this.getPosts({ all: true }).filter((post) => {
      if (slugify(post.category) === category) {
        name = post.category;
        return true;
      }
      return false;
    });

    return { name, posts: posts };
  }

  getPostsByTag(tag: string) {
    if (!this.#enableTag) {
      return {};
    }

    tag = slugify(tag);
    let name = tag;

    const posts: PostList[] = this.getPosts({ all: true }).filter((post) => {
      for (const tagElem of post.tags ?? []) {
        if (slugify(tagElem) === tag) {
          name = tagElem;
          return true;
        }
      }
      return false;
    });

    return { name, posts: posts };
  }

  relatedBlogPosts(slug: string, min_score: number = 1) {
    const post = this.getPost(slugify(slug));
    const related: any[] = [];

    for (const p of this.getPosts({ all: true })) {
      if (post.slug === p.slug) {
        continue;
      }
      let score = 0;
      // scoring category
      if (slugify(post.category) === slugify(p.category)) {
        score += 3;
      }
      // scoring tags
      for (const tag of post.tags) {
        if (p.tags.includes(tag)) {
          score += 1;
        }
      }

      related.push({
        title: p.title,
        slug: p.slug,
        image: p.image,
        score: score,
      });
    }

    return related
      .filter((rel) => rel.score >= min_score)
      .sort((a, b) => b.score - a.score)
      .slice(0, this.#relatedPostsCount);
  }

  getPostsArchive() {
    if (!this.#enableArchive) {
      return {};
    }

    const posts: PostList[] = this.getPosts({ all: true });
    const yearPosts: { [key: number]: PostList[] } = {};
    for (const post of posts) {
      let year = new Date(post.date).getFullYear();
      yearPosts[year] = asAnArray(yearPosts[year]);
      yearPosts[year].push(post);
    }
    return yearPosts;
  }

  sitemapUrlTags(): string[] {
    if (!this.#enableSitemap) {
      return [];
    }
    let posts = [];
    for (const [slug, post] of Object.entries(this.#PostsObject)) {
      if (slug === post.slug && !post.robotsNoIndex) {
        let lastmod: string = new Date(post.lastmod_date ?? post.date).toISOString();
        posts.push({ slug, lastmod });
      }
    }
    posts = posts.sort((a, b) => {
      return new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime();
    });

    const urls: string[] = [
      `<url>
        <loc>${joinPath(config.siteUrl, this.#dirName)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
      </url>`,
    ];

    for (const post of posts) {
      urls.push(`
        <url>
          <loc>${joinPath(config.siteUrl, this.#dirName, post.slug)}</loc>
          <lastmod>${post.lastmod}</lastmod>
          <changefreq>weekly</changefreq>
        </url>  
      `);
    }

    return urls;
  }

  #contentPath(): string {
    return `src/content/${this.#dirName}`;
  }

  #fetchPostsObject(posts: Post[]) {
    let postData: { [key: string]: Post } = {};

    for (let i = 0; i < posts.length; i++) {
      // Skip draft posts in production
      if (IS_PROD && posts[i].draft === true) {
        continue;
      }

      postData[posts[i].slug] = posts[i];
      for (const alias of asAnArray(posts[i].aliases)) {
        postData[slugify(alias)] = posts[i];
      }
    }

    return postData;
  }

  #fetchPostsList(posts: Post[]) {
    // filter out drafts and unlisted posts
    if (IS_PROD) {
      posts = posts.filter((post) => !post.draft && !post.unlisted && !post.ghost);
    }

    posts = posts.sort((first, second) => {
      return this.#getTime(second.date) - this.#getTime(first.date);
    });
    return posts;
  }

  #parseMarkdownFiles() {
    const posts: Post[] = [];
    const postDirs = this.#fetchBlogPostDir();
    const allAuthors = this.#fetchAuthors();
    const slugs = new Set();

    for (const dir of postDirs) {
      const dirName = path.basename(dir);
      const file = path.resolve(dir, 'index.md');
      if (!fs.existsSync(file)) {
        // Skip directories without index.md (e.g., posts/ listing dir)
        continue;
      }
      const fileContent = fs.readFileSync(file, 'utf-8');
      const { data } = matter(fileContent);

      const title = data.title ?? kebabCaseToTitle(dirName);

      const slug = slugify(data.slug ?? title);
      if (slugs.has(slug)) {
        throw new Error(`Non-unique slug value used for Blog Post: ${dirName}`);
      }

      if (!data.date || !isValidDate(data.date)) {
        throw new Error(
          `No date or invalid date format in Blog Post: ${dirName}. Use yyyy-mm-dd format for date.`
        );
      }

      if (data.lastmod_date) {
        if (!isValidDate(data.lastmod_date)) {
          throw new Error(`Invalid date format for "lastmod_date" in Blog Post: ${dirName}`);
        }
        if (new Date(data.lastmod_date) < new Date(data.date)) {
          throw new Error(`"date" cannot be greater than "lastmod_date" in Blog Post: ${dirName}`);
        }
      }

      // fetching author details
      let authors: Author[] = [];
      for (const author of asAnArray(data.author)) {
        authors.push(allAuthors[author.trim()]);
      }
      const tags = asAnArray(data.tags).map((tag: string) => tag.toLowerCase().trim());

      let imagePath = data.image ?? '';
      let newImageSrc = '';
      try {
        if (imagePath) {
          if (!imagePath.includes('/')) {
            imagePath = joinPath(dirName, imagePath);
          }
          newImageSrc = importImage(imagePath).img.src;
        }
      } catch (e) {
        console.error('Image not found: ' + imagePath);
      }

      let robotsNoIndex: Boolean = config.robotsNoIndex;
      if (data.draft || data.unlisted) {
        robotsNoIndex = true;
      } else if (data.ghost) {
        robotsNoIndex = false;
      } else if (data.robotsNoIndex && typeof data.robotsNoIndex === 'boolean') {
        robotsNoIndex = data.robotsNoIndex;
      }

      let post = {
        title: title,
        description: data.description ?? '',
        slug: slug,
        category: data.category ?? '',
        tags: tags,
        date: data.date,
        author: authors,
        keywords: asAnArray(data.keywords),
        lastmod_date: data.lastmod_date,
        image: newImageSrc,
        series: data.series ?? '',
        draft: data.draft ?? false,
        aliases: asAnArray(data.aliases),
        robotsNoIndex: robotsNoIndex,
        showToc: data.showToc ?? this.#showToc,
        unlisted: data.unlisted ?? false,
        ghost: data.ghost ?? false,
        redirectToUrl: data.redirectToUrl ?? null,
        dirName: dirName,
      } as Post;

      posts.push(post);
      slugs.add(slug);
    }

    return posts;
  }

  #fetchBlogPostDir(): string[] {
    const files = [];
    const fullPath = path.resolve(this.#contentPath());

    for (const file of fs.readdirSync(fullPath)) {
      const filePath = path.resolve(fullPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        files.push(filePath);
      }
    }

    return files;
  }

  #fetchAuthors(): { [key: string]: Author } {
    const filePath = path.resolve(this.#contentPath(), 'authors.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const authors: { [key: string]: Author } = {};
    for (const author of JSON.parse(fileContent)) {
      authors[author.id] = author;
    }
    return authors;
  }

  #getTime(date: string) {
    return new Date(date).getTime();
  }
}
