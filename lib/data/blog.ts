import enCommon from "../../public/locales/en/common.json";
import esCommon from "../../public/locales/es/common.json";
import { blogPostsMeta } from "./blog-meta";
import type { BlogPost, BlogPostSummary, BlogPostTranslation } from "@/lib/types/blog";

type Locale = "en" | "es";

const localeData: Record<Locale, any> = { en: enCommon, es: esCommon };

function getTranslation(locale: Locale, id: string): BlogPostTranslation | undefined {
  return localeData[locale]?.blog?.posts?.[id];
}

export function getAllPosts(locale: Locale): BlogPostSummary[] {
  return blogPostsMeta
    .map((meta) => {
      const translation = getTranslation(locale, meta.id);
      if (!translation) return null;
      const { content, ...rest } = translation;
      return { ...meta, ...rest };
    })
    .filter((p): p is BlogPostSummary => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | undefined {
  const meta = blogPostsMeta.find((m) => getTranslation(locale, m.id)?.slug === slug);
  if (!meta) return undefined;

  const translation = getTranslation(locale, meta.id);
  if (!translation) return undefined;

  return { ...meta, ...translation };
}

export function getAllSlugs(locale: Locale): string[] {
  return blogPostsMeta
    .map((meta) => getTranslation(locale, meta.id)?.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export function getAlternateSlugs(id: string): { en?: string; es?: string } {
  return {
    en: getTranslation("en", id)?.slug,
    es: getTranslation("es", id)?.slug,
  };
}