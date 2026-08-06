import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { getAllSlugs, getAlternateSlugs, getPostBySlug } from '@/lib/data/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs('en').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug('en', slug);
  if (!post) return {};

  const alt = getAlternateSlugs(post.id);
  const canonicalUrl = `https://www.handymaninwickenburg.com/blog/${slug}`;

  return {
    title: `${post.title} | Gato Montes Construction`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        ...(alt.es && { es: `https://www.handymaninwickenburg.com/blog-articulos/${alt.es}` }),
      },
    },
    openGraph: {
      title: `${post.title} | Gato Montes Construction`,
      description: post.excerpt,
      images: [post.image],
      locale: 'en_US',
      type: 'article',
    },
  };
}

export default async function BlogPostPageEN({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug('en', slug);
  if (!post) notFound();
  return <BlogPostLayout post={post} backHref="/blog" />;
}