export type Post = {
  title: string;
  description: string;
  slug: string;
  category: string;
  tags: Array<string>;
  date: string;
  author: Array<Author>;
  keywords: Array<string>;
  lastmod_date: string;
  image: string;
  series: string;
  draft?: Boolean;
  aliases: Array<string>;
  robotsNoIndex: Boolean;
  showToc: Boolean;
  unlisted?: Boolean;
  ghost?: Boolean;
  redirectToUrl: string | null;
  dirName: string;
};

export type PostList = Pick<
  Post,
  | 'title'
  | 'description'
  | 'slug'
  | 'category'
  | 'tags'
  | 'date'
  | 'author'
  | 'lastmod_date'
  | 'image'
  | 'series'
  | 'draft'
  | 'unlisted'
  | 'ghost'
>;

export type Author = {
  id: string;
  type: 'Person' | 'Organization';
  name: string;
  url: string | null;
  avatar: string | null;
};

export type BlogSchemaType =
  | 'BlogPosting'
  | 'TechArticle'
  | 'Article'
  | 'NewsArticle'
  | 'Report'
  | 'SoftwareSourceCode';
