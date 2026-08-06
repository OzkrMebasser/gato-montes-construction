
import { slugify } from "@/lib/utils/slugify";
import type { ContentBlock } from "@/lib/types/blog";

export interface Heading {
  id: string;
  text: string;
}

export function extractHeadings(blocks: ContentBlock[]): Heading[] {
  return blocks
    .filter((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: slugify(b.text), text: b.text }));
}