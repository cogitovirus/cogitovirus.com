export type Doc = {
  title: string;
  description: string;
  slug: string;
  order: number;
  date: string;
  lastmod_date: string;
  tags: Array<string>;
  draft: Boolean;
  section: Boolean;
  robotsNoIndex: Boolean;
  children: Doc[];
  path: string;
};

export type DocSearch = {
  title: string;
  slug: string;
  description: string;
};

export type DocSchemaType = 'TechArticle' | 'Article' | 'SoftwareSourceCode';
