export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "keyList"; items: { label: string; description: string }[] }
  | { type: "quote"; text: string };

export interface BlogPostMeta {
  id: string;
  image: string;
  date: string;
  readTime: number;
  author?: string;
}

export interface BlogPostTranslation {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: ContentBlock[];
}

export type BlogPostSummary = BlogPostMeta & Omit<BlogPostTranslation, "content">;
export type BlogPost = BlogPostMeta & BlogPostTranslation;