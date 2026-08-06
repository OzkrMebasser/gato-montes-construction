import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { getAllSlugs, getAlternateSlugs, getPostBySlug } from '@/lib/data/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs('es').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug('es', slug);
  if (!post) return {};

  const alt = getAlternateSlugs(post.id);
  const canonicalUrl = `https://www.handymaninwickenburg.com/blog-articulos/${slug}`;

  return {
    title: `${post.title} | Gato Montes Construction`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: canonicalUrl,
        ...(alt.en && { en: `https://www.handymaninwickenburg.com/blog/${alt.en}` }),
      },
    },
    openGraph: {
      title: `${post.title} | Gato Montes Construction`,
      description: post.excerpt,
      images: [post.image],
      locale: 'es_MX',
      type: 'article',
    },
  };
}

export default async function BlogArticuloPageES({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug('es', slug);
  if (!post) notFound();
  return <BlogPostLayout post={post} backHref="/blog-articulos" />;
}